import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiFetch } from "@/lib/api";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  slug: string;
  variant_id?: number; // Added for live ritual enforcement
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Basic Actions
  addItem: (product: Omit<CartItem, "quantity">, quantity?: number, openCart?: boolean) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotals: () => { subtotal: number; totalItems: number };
  
  // Ritual Actions
  submitOrder: (addressId?: number, guestAddress?: any) => Promise<{ order_number: string }>;
  clearError: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isLoading: false,
      error: null,

      addItem: (product, quantity = 1, openCart = true) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
            isOpen: openCart,
          });
        } else {
          set({
            items: [...items, { ...product as any, id: Number(product.id), quantity }],
            isOpen: openCart,
          });
        }
      },

      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) return;
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      clearError: () => set({ error: null }),

      getTotals: () => {
        const items = get().items;
        const subtotal = items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
        return { subtotal, totalItems };
      },

      submitOrder: async (addressId, guestAddress) => {
        set({ isLoading: true, error: null });
        const { items } = get();
        
        const payload = {
          address_id: addressId,
          address: guestAddress, // For guests
          items: items.map(item => ({
            product_id: item.id,
            variant_id: item.variant_id,
            quantity: item.quantity
          }))
        };

        try {
          const response = await apiFetch<{ order_number: string }>("/orders", {
            method: "POST",
            body: JSON.stringify(payload)
          });
          
          set({ items: [], isLoading: false }); // Clear cart on success
          return response;
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
          throw err;
        }
      }
    }),
    {
      name: "baksho-cart",
      partialize: (state) => ({ items: state.items }), // Only persist cart items
    }
  )
);

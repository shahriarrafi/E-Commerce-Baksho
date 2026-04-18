import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiFetch } from "@/lib/api";

export interface Address {
  id: number;
  label: string;
  address: string;
  phone: string;
  is_default: boolean;
}

interface AddressStore {
  addresses: Address[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchAddresses: () => Promise<void>;
  addAddress: (data: Omit<Address, "id">) => Promise<void>;
  updateAddress: (id: number, data: Partial<Address>) => Promise<void>;
  deleteAddress: (id: number) => Promise<void>;
  setDefaultAddress: (id: number) => Promise<void>;
}

export const useAddressStore = create<AddressStore>()(
  persist(
    (set, get) => ({
      addresses: [],
      isLoading: false,
      error: null,

      fetchAddresses: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiFetch<Address[]>("/addresses");
          set({ addresses: response || [], isLoading: false });
        } catch (err: any) {
          set({ error: err.message, isLoading: false, addresses: [] });
        }
      },

      addAddress: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiFetch<Address>("/addresses", {
            method: "POST",
            body: JSON.stringify(data),
          });
          const currentAddresses = Array.isArray(get().addresses) ? get().addresses : [];
          set({ 
            addresses: [...currentAddresses, response],
            isLoading: false 
          });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
          throw err;
        }
      },

      updateAddress: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiFetch<Address>(`/addresses/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
          });
          const currentAddresses = Array.isArray(get().addresses) ? get().addresses : [];
          set({ 
            addresses: currentAddresses.map(a => a.id === id ? response : a),
            isLoading: false 
          });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
          throw err;
        }
      },

      deleteAddress: async (id) => {
        set({ isLoading: true, error: null });
        try {
          await apiFetch(`/addresses/${id}`, { method: "DELETE" });
          const currentAddresses = Array.isArray(get().addresses) ? get().addresses : [];
          set({ 
            addresses: currentAddresses.filter(a => a.id !== id),
            isLoading: false 
          });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
          throw err;
        }
      },

      setDefaultAddress: async (id) => {
        set({ isLoading: true, error: null });
        try {
          await apiFetch(`/addresses/${id}/default`, { method: "PATCH" });
          const currentAddresses = Array.isArray(get().addresses) ? get().addresses : [];
          set({ 
            addresses: currentAddresses.map(a => ({
              ...a,
              is_default: a.id === id
            })),
            isLoading: false 
          });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
          throw err;
        }
      },
    }),
    {
      name: "baksho-addresses",
      partialize: (state) => ({ addresses: Array.isArray(state.addresses) ? state.addresses : [] }),
    }
  )
);

import { create } from "zustand";
import { apiFetch } from "@/lib/api";

export interface Category {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
  children?: Category[];
}

interface CategoryStore {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await apiFetch<{ data: Category[] }>("/categories");
      set({ categories: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      console.error("Discovery ritual failed:", err);
    }
  },
}));

import { create } from "zustand";
import { apiFetch } from "@/lib/api";

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
}

interface FAQStore {
  faqGroups: Record<string, FAQItem[]>;
  isLoading: boolean;
  error: string | null;
  fetchFAQs: () => Promise<void>;
}

export const useFAQStore = create<FAQStore>((set) => ({
  faqGroups: {},
  isLoading: false,
  error: null,
  fetchFAQs: async () => {
    set({ isLoading: true, error: null });
    try {
      const groups = await apiFetch<Record<string, FAQItem[]>>("/faqs");
      set({ faqGroups: groups, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
}));

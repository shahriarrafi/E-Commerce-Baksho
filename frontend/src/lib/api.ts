
import { MOCK_PRODUCT, CATEGORIES } from "./constants";

/**
 * Service to simulate API calls
 */
export const api = {
  products: {
    /**
     * Get a single product by slug
     */
    getBySlug: async (slug: string) => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // For now, always return the mock product
      // In real app, find by slug from array
      return {
        ...MOCK_PRODUCT,
        slug: slug
      };
    },

    /**
     * Get all products or filter by category
     */
    list: async (category?: string) => {
      await new Promise((resolve) => setTimeout(resolve, 400));
      
      // Return 9 mock items
      return Array.from({ length: 9 }).map((_, i) => ({
        ...MOCK_PRODUCT,
        id: `p${i}`,
        name: `Premium Item ${i + 1}`,
        price: 99 + i * 10
      }));
    }
  },

  categories: {
    /**
     * Get all categories
     */
    list: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return CATEGORIES;
    }
  }
};

import { useAuthStore } from "@/store/useAuthStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";
const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || "http://127.0.0.1:8000/storage";

interface FetchOptions extends RequestInit {
  params?: Record<string, any>;
}

export async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...init } = options;
  
  const token = useAuthStore.getState().token;
  
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");
  
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let url = `${API_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  const response = await fetch(url, {
    ...init,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      useAuthStore.getState().logout();
      
      // Do not redirect to auth if we are doing a Guest manifestation or Identity check
      const publicEndpoints = ["/orders", "/me"];
      const isPublicEndpoint = publicEndpoints.some(e => endpoint.startsWith(e));
      
      if (typeof window !== 'undefined' && !isPublicEndpoint) {
        window.location.href = '/auth';
      }
    }
    
    // Inventory Enlightenment (Stock errors & Validation)
    if (response.status === 422) {
      let errorMessage = data.message;
      
      // Reach deeper into the high-fidelity error manifest if possible
      if (data.errors) {
        const firstError = Object.values(data.errors).flat()[0];
        if (firstError) errorMessage = firstError as string;
      }
      
      throw new Error(errorMessage || "The selected product is currently out of manifestation (Out of Stock).");
    }

    throw new Error(data.message || "Something went wrong in the ritual.");
  }

  return data;
}

export const getStorageUrl = (path: string | null | undefined) => {
  if (!path) return "/placeholder.webp";
  if (path.startsWith("http")) return path;
  
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  
  return `${STORAGE_URL}/${cleanPath}`;
};

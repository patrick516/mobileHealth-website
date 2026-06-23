// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
}

export const api = {
  // GET request
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  },

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};

// Specific API functions
export const contactApi = {
  submit: (data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) => api.post("/contact", data),
};

export const newsletterApi = {
  subscribe: (email: string) => api.post("/newsletter/subscribe", { email }),
  unsubscribe: (email: string) =>
    api.post("/newsletter/unsubscribe", { email }),
};

export const blogApi = {
  getAll: (params?: { page?: number; limit?: number; category?: string }) => {
    const query = new URLSearchParams();
    if (params?.page) query.append("page", String(params.page));
    if (params?.limit) query.append("limit", String(params.limit));
    if (params?.category) query.append("category", params.category);
    return api.get(`/blog?${query.toString()}`);
  },
  getOne: (slug: string) => api.get(`/blog/${slug}`),
};

export const faqApi = {
  getAll: (category?: string) => {
    const query = category ? `?category=${category}` : "";
    return api.get(`/faqs${query}`);
  },
};

export const testimonialApi = {
  getAll: () => api.get("/testimonials"),
};

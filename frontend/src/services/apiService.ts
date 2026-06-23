import api from "../config/api";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
  total?: number;
  totalPages?: number;
  currentPage?: number;
}

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    api.post<ApiResponse<{ token: string; user: any }>>("/auth/login", {
      email,
      password,
    }),
  logout: () => api.post<ApiResponse>("/auth/logout"),
  getProfile: () => api.get<ApiResponse>("/auth/me"),
};

// Admin API
export const adminApi = {
  getAll: (params?: { page?: number; limit?: number }) =>
    api.get<ApiResponse<any[]>>("/admins", { params }),
  create: (data: {
    fullName: string;
    email: string;
    password: string;
    role: string;
  }) => api.post<ApiResponse>("/admins", data),
  update: (id: string, data: any) =>
    api.put<ApiResponse>(`/admins/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/admins/${id}`),
};

// Blog API
export const blogApi = {
  getAll: (params?: { page?: number; limit?: number; status?: string }) =>
    api.get<ApiResponse<any[]>>("/blog", { params }),
  getOne: (id: string) => api.get<ApiResponse>(`/blog/${id}`),
  create: (data: any) => api.post<ApiResponse>("/blog", data),
  update: (id: string, data: any) => api.put<ApiResponse>(`/blog/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/blog/${id}`),
};

// Contact API
export const contactApi = {
  getAll: (params?: { page?: number; limit?: number; status?: string }) =>
    api.get<ApiResponse<any[]>>("/contact", { params }),
  getOne: (id: string) => api.get<ApiResponse>(`/contact/${id}`),
  reply: (id: string, data: { replyMessage: string }) =>
    api.post<ApiResponse>(`/contact/${id}/reply`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/contact/${id}`),
};

// FAQ API
export const faqApi = {
  getAll: () => api.get<ApiResponse<any[]>>("/faqs"),
  create: (data: {
    question: string;
    answer: string;
    category?: string;
    order?: number;
  }) => api.post<ApiResponse>("/faqs", data),
  update: (id: string, data: any) => api.put<ApiResponse>(`/faqs/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/faqs/${id}`),
};

// Testimonial API
export const testimonialApi = {
  getAll: () => api.get<ApiResponse<any[]>>("/testimonials"),
  create: (data: {
    name: string;
    content: string;
    role?: string;
    organization?: string;
    avatar?: string;
    rating?: number;
  }) => api.post<ApiResponse>("/testimonials", data),
  update: (id: string, data: any) =>
    api.put<ApiResponse>(`/testimonials/${id}`, data),
  delete: (id: string) => api.delete<ApiResponse>(`/testimonials/${id}`),
};

// Analytics API - FIXED: Use /stats which maps to dashboard
export const analyticsApi = {
  getStats: () => api.get<ApiResponse<any>>("/analytics/stats"),
  getChartData: (params?: { period?: string }) =>
    api.get<ApiResponse<any>>("/analytics/dashboard", { params }),
};

// Settings API
export const settingApi = {
  getAll: () => api.get<ApiResponse<any[]>>("/settings"),
  update: (key: string, value: any) =>
    api.put<ApiResponse>(`/settings/${key}`, { value }),
  getPublic: () => api.get<ApiResponse>("/settings/public"),
};

// Newsletter API
export const newsletterApi = {
  subscribe: (email: string) =>
    api.post<ApiResponse>("/newsletter/subscribe", { email }),
  unsubscribe: (email: string) =>
    api.post<ApiResponse>("/newsletter/unsubscribe", { email }),
};

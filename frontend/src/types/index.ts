export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN';
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  publishedAt?: string;
  tags: string[];
  author: User;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'NEW' | 'READ' | 'REPLIED';
  repliedAt?: string;
  replyMessage?: string;
  createdAt: string;
}

export interface Setting {
  key: string;
  value: any;
  description?: string;
  group: string;
}

export interface AnalyticsData {
  totals: {
    pageViews: number;
    downloads: number;
  };
  today: {
    pageViews: number;
    downloads: number;
  };
  periods: {
    week: number;
    month: number;
  };
  topPages: Array<{ _id: string; count: number }>;
  recentActivity: any[];
}

export interface DashboardStats {
  totalAdmins: number;
  totalBlogs: number;
  totalContacts: number;
  totalNewsletter: number;
  recentContacts: Contact[];
  recentBlogs: BlogPost[];
}

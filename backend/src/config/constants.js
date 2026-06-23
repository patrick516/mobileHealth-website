export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
};

export const CONTACT_STATUS = {
  NEW: "NEW",
  READ: "READ",
  REPLIED: "REPLIED",
};

export const BLOG_STATUS = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  ARCHIVED: "ARCHIVED",
};

export const SETTINGS_GROUPS = {
  GENERAL: "general",
  CONTACT: "contact",
  SOCIAL: "social",
  SEO: "seo",
  FEATURES: "features",
};

export const DEFAULT_SETTINGS = {
  siteName: "MobileHealth Malawi",
  siteDescription: "Community Health Worker Platform",
  siteLogo: "/images/logo.png",
  contactEmail: "info@mobilehealth.mw",
  contactPhone: "+265 999 000 001",
  address: "Blantyre, Malawi",
  facebook: "https://facebook.com/mobilehealth",
  twitter: "https://twitter.com/mobilehealth",
  instagram: "https://instagram.com/mobilehealth",
  youtube: "https://youtube.com/mobilehealth",
  features: {
    offlineMode: true,
    multiLanguage: true,
    dataSync: true,
    emergencyAlerts: true,
  },
};

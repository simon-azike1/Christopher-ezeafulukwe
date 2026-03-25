export const API_ENDPOINTS = {
  // Blog
  BLOG_LIST: '/api/blog',
  BLOG_BY_ID: '/api/blog/by-id',
  BLOG_CREATE: '/api/blog',
  BLOG_UPDATE: (id) => `/api/blog/${id}`,
  BLOG_ALL_ADMIN: '/api/blog/admin/all',
  BLOG_PUBLISH: (id) => `/api/blog/${id}`,
  
  // Contact
  CONTACT_LIST: '/api/contact',
  CONTACT_SUBMIT: '/api/contact',
  
  // Auth
  ADMIN_LOGIN: '/api/admin/login',
  
  // Dashboard
  DASHBOARD_BLOGS: '/api/blog?limit=100',
  DASHBOARD_CONTACTS: '/api/contact',
  DASHBOARD_ALL_POSTS: '/api/blog/all',
  // Projects
  PROJECTS_LIST: '/api/projects',

  // Memberships
  MEMBERSHIPS_LIST: '/api/memberships',

  // Education
  EDUCATION_LIST: '/api/education',

  // Foundation
  FOUNDATION_LIST: '/api/foundation',

  // Career
  CAREER_LIST: '/api/career',

  // About / Site Info
  ABOUT_INFO: '/api/about',

  // Admin extensions (future)
  ADMIN_PROJECTS: '/api/admin/projects',
  ADMIN_MEMBERSHIPS: '/api/admin/memberships',
} 

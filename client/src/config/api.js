// API configuration for different environments
const config = {
  development: {
    baseURL: '/api', // Uses Vite proxy in development
  },
  production: {
    baseURL: 'https://ai-summarizer-wtsk.onrender.com/api', // Direct backend URL in production
  }
}

const environment = import.meta.env.MODE || 'development'
export const API_CONFIG = config[environment]

export const API_ENDPOINTS = {
  summarize: `${API_CONFIG.baseURL}/summarize`,
  email: `${API_CONFIG.baseURL}/email`,
  health: `${API_CONFIG.baseURL}/health`
}

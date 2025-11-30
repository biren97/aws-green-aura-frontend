import api from './api'

// Auth endpoints
export const authService = {
  register: (data) => api.post('/users/register/', data),
  login: (username, password) => api.post('/auth/login/', { username, password }),
  logout: () => api.post('/auth/logout/'),
  forgotPassword: (email) => api.post('/users/forgot_password/', { email }),
  resetPassword: (token, password) => api.post('/auth/reset-password/', { token, password }),
}

// Strategy endpoints
export const strategyService = {
  getStrategies: (page = 1, limit = 12) => api.get(`/strategies?page=${page}&limit=${limit}`),
  getStrategyById: (id) => api.get(`/strategies/${id}`),
  getStrategyTrades: (strategyId, page = 1, limit = 10) => 
    api.get(`/strategies/${strategyId}/trades?page=${page}&limit=${limit}`),
}

// Stock recommendation endpoints
export const stockService = {
  getRecommendations: (strategyId, page = 1, limit = 10) => 
    api.get(`/stocks/recommendations?strategy_id=${strategyId}&page=${page}&limit=${limit}`),
  getSingleRecommendation: (id) => api.get(`/stocks/recommendations/${id}`),
}

// User endpoints
export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  changePassword: (data) => api.put('/users/change-password', data),
}

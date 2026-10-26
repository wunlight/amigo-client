import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000,
  withCredentials: true,
})

apiClient.interceptors.response.use(
  (res) => res,
  (e) => {
    console.error('API error: ', e)
    return Promise.reject(e)
  },
)

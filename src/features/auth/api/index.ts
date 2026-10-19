import type { SuccessResponse } from '@/types/response'
import { apiClient } from '@/utils/api-client'
import type { LoginPayload, LoginResponse } from '../types/auth'

export const login = (payload: LoginPayload) =>
  apiClient.post<SuccessResponse<LoginResponse>>('/v1/login', payload)

export const logout = () => apiClient.post('/v1/logout')

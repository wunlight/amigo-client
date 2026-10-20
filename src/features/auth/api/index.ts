import type { SuccessResponse } from '@/types/response.type'
import { apiClient } from '@/utils/api-client'
import type { LoginPayload, LoginResponse } from '../types/auth.type'

export const login = (payload: LoginPayload) =>
  apiClient.post<SuccessResponse<LoginResponse>>('/v1/login', payload)

export const me = () => apiClient.get<SuccessResponse<LoginResponse>>('/v1/me')

export const logout = () => apiClient.post('/v1/logout')

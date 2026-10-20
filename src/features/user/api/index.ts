import type { PaginatedResponse, SuccessResponse } from '@/types/response.type'
import { apiClient } from '@/utils/api-client'
import type { CreateUserPayload, UpdateUserPayload, UserDTO } from '../types/user.type'

export const listUsers = () => apiClient.get<PaginatedResponse<UserDTO>>(`/v1/users`)

export const getUserById = (id: string) =>
  apiClient.get<SuccessResponse<UserDTO>>(`/v1/users/${id}`)

export const createUser = (payload: CreateUserPayload) =>
  apiClient.post<SuccessResponse<UserDTO>>(`/v1/users`, payload)

export const updateUser = (id: string, payload: UpdateUserPayload) =>
  apiClient.put<SuccessResponse<UserDTO>>(`/v1/users/${id}`, payload)

export const deleteUser = (id: string) => apiClient.delete(`/v1/users/${id}`)

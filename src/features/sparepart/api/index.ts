import type { PaginatedResponse, SuccessResponse } from '@/types/response'
import { apiClient } from '@/utils/api-client'
import type {
  CreateSparepartPayload,
  SparepartDTO,
  UpdateSparepartPayload,
} from '../types/sparepart'

export const listSpareparts = () => apiClient.get<PaginatedResponse<SparepartDTO>>(`/v1/spareparts`)

export const getSparepartById = (id: string) =>
  apiClient.get<SuccessResponse<SparepartDTO>>(`/v1/spareparts/${id}`)

export const createSparepart = (payload: CreateSparepartPayload) =>
  apiClient.post<SuccessResponse<SparepartDTO>>(`/v1/spareparts`, payload)

export const updateSparepart = (id: string, payload: UpdateSparepartPayload) =>
  apiClient.put<SuccessResponse<SparepartDTO>>(`/v1/spareparts/${id}`, payload)

export const deleteSparepart = (id: string) => apiClient.delete(`/v1/spareparts/${id}`)

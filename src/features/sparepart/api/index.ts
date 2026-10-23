import type { PaginatedResponse, SuccessResponse } from '@/types/response.type'
import { apiClient } from '@/utils/api-client'
import type {
  CreateSparepartPayload,
  SparepartDTO,
  UpdateSparepartPayload,
} from '../types/sparepart.type'

export const listSpareparts = (page: number = 1, perPage: number = 10) =>
  apiClient.get<PaginatedResponse<SparepartDTO>>(`/v1/spareparts`, {
    params: {
      page,
      per_page: perPage,
    },
  })

export const getSparepartById = (id: string) =>
  apiClient.get<SuccessResponse<SparepartDTO>>(`/v1/spareparts/${id}`)

export const createSparepart = (payload: CreateSparepartPayload) =>
  apiClient.post<SuccessResponse<SparepartDTO>>(`/v1/spareparts`, payload)

export const updateSparepart = (id: string, payload: UpdateSparepartPayload) =>
  apiClient.put<SuccessResponse<SparepartDTO>>(`/v1/spareparts/${id}`, payload)

export const deleteSparepart = (id: string) => apiClient.delete(`/v1/spareparts/${id}`)

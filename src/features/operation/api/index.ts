import type { PaginatedResponse, SuccessResponse } from '@/types/response.type'
import { apiClient } from '@/utils/api-client'
import type {
  CreateOperationPayload,
  OperationDTO,
  UpdateOperationPayload,
} from '../types/operation.type'

export const listOperations = (page: number = 1, perPage: number = 10) =>
  apiClient.get<PaginatedResponse<OperationDTO>>(`/v1/operations`, {
    params: {
      page,
      per_page: perPage,
    },
  })

export const getOperationById = (id: string) =>
  apiClient.get<SuccessResponse<OperationDTO>>(`/v1/operations/${id}`)

export const createOperation = (payload: CreateOperationPayload) =>
  apiClient.post<SuccessResponse<OperationDTO>>(`/v1/operations`, payload)

export const updateOperation = (id: string, payload: UpdateOperationPayload) =>
  apiClient.put<SuccessResponse<OperationDTO>>(`/v1/operations/${id}`, payload)

export const deleteOperation = (id: string) => apiClient.delete(`/v1/operations/${id}`)

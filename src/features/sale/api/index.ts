import type { PaginatedResponse, SuccessResponse } from '@/types/response.type'
import { apiClient } from '@/utils/api-client'
import type { SaleDTO } from '../types/sale.type'

export const listSales = (page: number = 1, perPage: number = 10) =>
  apiClient.get<PaginatedResponse<SaleDTO>>(`/v1/sales`, {
    params: {
      page,
      per_page: perPage,
    },
  })

export const getSaleById = (id: string) =>
  apiClient.get<SuccessResponse<SaleDTO>>(`/v1/sales/${id}`)

export const refundSale = (id: string) =>
  apiClient.post<SuccessResponse<{ message: string; sale_id: string }>>(`/v1/sales/${id}/refund`)

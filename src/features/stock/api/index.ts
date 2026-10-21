import type { SuccessResponse } from '@/types/response.type'
import { apiClient } from '@/utils/api-client'
import type { CreateStockOpnamePayload } from '../types/opname.type'
import type { CreateRestockPayload } from '../types/restock.type'
import type { StockOverview } from '../types/stock.type'

export const getStockOverview = () =>
  apiClient.get<SuccessResponse<StockOverview>>('/v1/stocks/overview')

export const createStockOpname = (payload: CreateStockOpnamePayload) =>
  apiClient.post<SuccessResponse<{ stock_opname_id: string }>>('/v1/stocks/opnames', payload)

export const createRestock = (payload: CreateRestockPayload) =>
  apiClient.post<SuccessResponse<{ restock_id: string }>>('/v1/stocks/restock', payload)

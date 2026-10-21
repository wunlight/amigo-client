import type { SuccessResponse } from '@/types/response.type'
import { apiClient } from '@/utils/api-client'
import type { RestockOverview } from '../types/restock.type'

export const getRestockOverview = () =>
  apiClient<SuccessResponse<RestockOverview>>('/v1/restocks/overview')

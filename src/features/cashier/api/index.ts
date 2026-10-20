import type { SuccessResponse } from '@/types/response'
import { apiClient } from '@/utils/api-client'
import type { CheckoutPayload, CheckoutResponse } from '../types/cart.type'

export const checkout = (payload: CheckoutPayload) =>
  apiClient.post<SuccessResponse<CheckoutResponse>>('/v1/sales/checkout', payload)

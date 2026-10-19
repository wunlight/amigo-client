import type { PaginatedResponse } from '@/types/response'
import { apiClient } from '@/utils/api-client'
import type { ServiceDTO } from '../types/service'

export const listServices = () => apiClient.get<PaginatedResponse<ServiceDTO>>(`/v1/services`)

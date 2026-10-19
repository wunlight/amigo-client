import type { PaginatedResponse } from '@/types/response'
import { apiClient } from '@/utils/api-client'
import type { SparepartDTO } from '../types/sparepart'

export const listSpareparts = () => apiClient.get<PaginatedResponse<SparepartDTO>>(`/v1/spareparts`)

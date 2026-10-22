import type { SuccessResponse } from '@/types/response.type'
import { apiClient } from '@/utils/api-client'
import type { DashboardResponse, OverviewResponse } from '@/features/dashboard/types/dashboard.type'

export const getDashboardOverview = () =>
  apiClient.get<SuccessResponse<OverviewResponse>>('/v1/dashboard/overview')

export const getDashboard = () => apiClient.get<SuccessResponse<DashboardResponse>>('/v1/dashboard')

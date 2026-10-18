export type SuccessResponse<T> = {
  success: true
  data: T
}

type PaginatedMeta = {
  page: number
  per_page: number
  total: number
  total_page: number
}

export type PaginatedResponse<T> = {
  success: true
  data: T[]
  meta: PaginatedMeta
}

export type ErrorResponse = {
  success: false
  error: string
}

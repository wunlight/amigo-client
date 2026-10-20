export type OperationDTO = {
  id: string
  name: string
  selling_price: number
  created_at: string
  updated_at: string
}

export type CreateOperationPayload = {
  name: string
  selling_price: number
}

export type UpdateOperationPayload = {
  name: string
  selling_price: number
}

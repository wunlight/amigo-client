export type SparepartDTO = {
  id: string
  name: string
  selling_price: number
  stock: number
  created_at: string
  updated_at: string
}

export type CreateSparepartPayload = {
  name: string
  selling_price: number
  initial_stock: number
}

export type UpdateSparepartPayload = {
  name: string
  selling_price: number
}

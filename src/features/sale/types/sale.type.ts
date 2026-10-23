export type CartItemType = 'sparepart' | 'operation'

export type SaleSparepartItem = {
  id: string
  sale_id: string
  sparepart_id: string
  quantity: number
  unit_price: number
  subtotal: number
  created_at: string
}

export type SaleOperationItem = {
  id: string
  sale_id: string
  operation_id: string
  quantity: number
  unit_price: number
  subtotal: number
  created_at: string
}

export type SaleDTO = {
  id: string
  user_id: string
  idempotency_key: string
  total_amount: number
  notes: string
  status: string
  sparepart_items: SaleSparepartItem[]
  operation_items: SaleOperationItem[]
  created_at: string
}

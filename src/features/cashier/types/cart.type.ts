export type CartItemType = 'sparepart' | 'operation'

export type CartItem = {
  type: CartItemType
  id: string
  name: string
  available_stock: number
  price: number
  quantity: number
}

export type CheckoutItem = {
  type: CartItemType
  id: string
  quantity: number
  unit_price: number
}

export type CheckoutPayload = {
  items: CheckoutItem[]
  notes: string
  idempotency_key: string
}

export type CheckoutReceiptItem = {
  type: CartItemType
  id: string
  name: string
  quantity: number
  unit_price: number
  subtotal: number
}

export type CheckoutResponse = {
  sale_id: string
  created_at: string
  total_amount: number
  items: CheckoutReceiptItem[]
  notes?: string
}

export type CartItemType = 'sparepart' | 'operation'

export type CartItem = {
  type: CartItemType
  id: string
  name: string
  availableStock: number
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

export type CheckoutResponse = {
  sale_id: string
}

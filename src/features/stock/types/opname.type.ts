export type StockOpnameItem = {
  sparepart_id: string
  quantity: number
}

export type CreateStockOpnamePayload = {
  idempotency_key: string
  notes: string
  items: StockOpnameItem[]
}

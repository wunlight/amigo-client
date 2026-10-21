export type RestockItem = {
  sparepart_id: string
  quantity: number
  unit_cost: number
}

export type CreateRestockPayload = {
  idempotency_key: string
  notes: string
  items: RestockItem[]
}

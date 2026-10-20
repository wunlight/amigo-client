export type CartItem = {
  type: 'sparepart' | 'operation'
  id: string
  name: string
  availableStock: number
  price: number
  quantity: number
}

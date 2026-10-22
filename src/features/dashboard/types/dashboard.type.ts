export type StockAlertItem = {
  id: string
  name: string
  current_stock: number
  selling_price: number
}

export type OverviewResponse = {
  daily_revenue: number
  todays_transactions: number
  low_stock_items: StockAlertItem[]
  out_of_stock_items: StockAlertItem[]
}

export type RevenueTrend = {
  date: string
  amount: number
}

export type TopSparepartItem = {
  id: string
  name: string
  total_qty: number
  revenue: number
  thumbnail: string
}

export type RecentSaleItem = {
  sale_id: string
  total_amount: number
  item_count: number
  created_at: string
}

export type CriticalStockItem = {
  id: string
  name: string
  current_stock: number
  selling_price: number
  status: 'critical' | 'low' | 'out_of_stock'
}

export type DashboardResponse = {
  revenue_data: RevenueTrend[]
  top_sold_sparepart: TopSparepartItem[]
  recent_sales: RecentSaleItem[]
  critical_items: CriticalStockItem[]
}

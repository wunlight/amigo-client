export type AdjustStockPayload = {
  sparepart_id: string;
  quantity: number;
  stock_direction: "IN" | "OUT";
  notes: string;
};

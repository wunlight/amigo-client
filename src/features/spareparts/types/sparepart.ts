export type InitSparepartPayload = {
  name: string;
  selling_price: number;
  initial_stock: number;
};

export type Sparepart = {
  id: string;
  name: string;
  selling_price: number;
  stock: number;
  purchase_price: number | null;
  created_at: string;
  updated_at: string;
};

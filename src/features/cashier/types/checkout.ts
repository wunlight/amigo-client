export type CheckoutItemInput = {
  item_id: string;
  type: "sparepart" | "service";
  price: number;
  qty: number;
};

export type CheckoutPayload = {
  total_amount: number;
  items: CheckoutItemInput[];
};

export type CheckoutItemOutput = {
  name: string;
  price: number;
  qty: number;
  subtotal: number;
};

export type CheckoutResponse = {
  date: string;
  total_amount: number;
  items: CheckoutItemOutput[];
};

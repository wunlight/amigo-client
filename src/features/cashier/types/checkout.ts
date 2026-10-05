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

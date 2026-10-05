import { apiClient } from "../../../lib/api-client";
import type { CheckoutPayload } from "../types/checkout";

export const createSale = (payload: CheckoutPayload) =>
  apiClient.post("/sales", payload);

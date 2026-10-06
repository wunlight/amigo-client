import { apiClient } from "../../../lib/api-client";
import type { CheckoutPayload, CheckoutResponse } from "../types/checkout";

export const createSale = (payload: CheckoutPayload) =>
  apiClient.post<CheckoutResponse>("/sales", payload);

import { apiClient } from "../../../lib/api-client";
import type { AdjustStockPayload } from "../types/stock";

export const adjustStock = (payload: AdjustStockPayload) =>
  apiClient.post("/stocks/adjustment", payload);

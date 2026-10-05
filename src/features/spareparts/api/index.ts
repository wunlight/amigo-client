import { apiClient } from "../../../lib/api-client";
import type { InitSparepartPayload, Sparepart } from "../types/sparepart";

export const initSparepart = (payload: InitSparepartPayload) =>
  apiClient.post<Sparepart>("/spareparts/init", payload);

export const listSpareparts = () => apiClient.get<Sparepart[]>("/spareparts");

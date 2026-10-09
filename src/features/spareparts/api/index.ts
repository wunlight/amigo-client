import { apiClient } from "../../../lib/api-client";
import type {
  InitSparepartPayload,
  Sparepart,
  UpdateSparepartPayload,
} from "../types/sparepart";

export const initSparepart = (payload: InitSparepartPayload) =>
  apiClient.post<Sparepart>("/spareparts/init", payload);

export const listSpareparts = () => apiClient.get<Sparepart[]>("/spareparts");

export const updateSparepart = (id: string, payload: UpdateSparepartPayload) =>
  apiClient.put<Sparepart>(`/spareparts/${id}`, payload);

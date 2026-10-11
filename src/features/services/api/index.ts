import { apiClient } from "../../../lib/api-client";
import type {
  AddServicePayload,
  Service,
  UpdateServicePayload,
} from "../types/service";

export const addService = (payload: AddServicePayload) =>
  apiClient.post<Service>("/services", payload);

export const listServices = () => apiClient.get<Service[]>("/services");

export const updateService = (id: string, payload: UpdateServicePayload) =>
  apiClient.put<Service>(`/services/${id}`, payload);

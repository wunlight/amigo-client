import { apiClient } from "../../../lib/api-client";
import type { AddServicePayload, Service } from "../types/service";

export const addService = (payload: AddServicePayload) =>
  apiClient.post<Service>("/services", payload);

export const listServices = () => apiClient.get<Service[]>("/services");

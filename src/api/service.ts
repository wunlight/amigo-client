import { apiClient } from "../lib/api-client";
import type { AddServicePayload, ServiceItem } from "../types/service";

export const addService = (payload: AddServicePayload) =>
  apiClient.post("/services", payload);

export const listServices = () => apiClient.get<ServiceItem[]>("/services");

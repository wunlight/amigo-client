import { apiClient } from "../lib/api-client";
import type { AddServicePayload } from "../types/service";

export const addService = (payload: AddServicePayload) =>
  apiClient.post("/services", payload);

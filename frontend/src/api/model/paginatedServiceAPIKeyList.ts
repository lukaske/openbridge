/**
 * Generated by orval v6.27.1 🍺
 * Do not edit manually.
 * OpenBridge.me API
 * This is the OpenBridge.me client API. It is used to interact with the OpenBridge.me platform. For specific APIs we recommend using their respective documentation.
 * OpenAPI spec version: 1.0.0
 */
import type { ServiceAPIKey } from "./serviceAPIKey";

export interface PaginatedServiceAPIKeyList {
  count?: number;
  /** @nullable */
  next?: string | null;
  /** @nullable */
  previous?: string | null;
  results?: ServiceAPIKey[];
}

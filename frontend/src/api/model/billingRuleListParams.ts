/**
 * Generated by orval v6.27.1 🍺
 * Do not edit manually.
 * OpenBridge.me API
 * This is the OpenBridge.me client API. It is used to interact with the OpenBridge.me platform. For specific APIs we recommend using their respective documentation.
 * OpenAPI spec version: 1.0.0
 */

export type BillingRuleListParams = {
  api_service?: number;
  id?: number;
  /**
   * Which field to use when ordering the results.
   */
  ordering?: string;
  /**
   * A page number within the paginated result set.
   */
  page?: number;
  /**
   * A search term.
   */
  search?: string;
};

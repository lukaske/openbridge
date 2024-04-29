/**
 * Generated by orval v6.27.1 🍺
 * Do not edit manually.
 * OpenBridge.me API
 * This is the OpenBridge.me client API. It is used to interact with the OpenBridge.me platform. For specific APIs we recommend using their respective documentation.
 * OpenAPI spec version: 1.0.0
 */
import { useQuery } from "@tanstack/react-query";
import type {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { customInstance } from "../../../services/custom-axios-instance";
import type { ErrorType } from "../../../services/custom-axios-instance";

export const clientAnalyticsRetrieve = (signal?: AbortSignal) => {
  return customInstance<void>({
    url: `/api/client-analytics/`,
    method: "GET",
    signal,
  });
};

export const getClientAnalyticsRetrieveQueryKey = () => {
  return [`/api/client-analytics/`] as const;
};

export const getClientAnalyticsRetrieveQueryOptions = <
  TData = Awaited<ReturnType<typeof clientAnalyticsRetrieve>>,
  TError = ErrorType<unknown>
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof clientAnalyticsRetrieve>>,
      TError,
      TData
    >
  >;
}) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getClientAnalyticsRetrieveQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof clientAnalyticsRetrieve>>
  > = ({ signal }) => clientAnalyticsRetrieve(signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof clientAnalyticsRetrieve>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ClientAnalyticsRetrieveQueryResult = NonNullable<
  Awaited<ReturnType<typeof clientAnalyticsRetrieve>>
>;
export type ClientAnalyticsRetrieveQueryError = ErrorType<unknown>;

export const useClientAnalyticsRetrieve = <
  TData = Awaited<ReturnType<typeof clientAnalyticsRetrieve>>,
  TError = ErrorType<unknown>
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof clientAnalyticsRetrieve>>,
      TError,
      TData
    >
  >;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getClientAnalyticsRetrieveQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

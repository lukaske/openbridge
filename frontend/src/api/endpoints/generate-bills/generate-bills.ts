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

export const generateBillsRetrieve = (signal?: AbortSignal) => {
  return customInstance<void>({
    url: `/api/generate-bills/`,
    method: "GET",
    signal,
  });
};

export const getGenerateBillsRetrieveQueryKey = () => {
  return [`/api/generate-bills/`] as const;
};

export const getGenerateBillsRetrieveQueryOptions = <
  TData = Awaited<ReturnType<typeof generateBillsRetrieve>>,
  TError = ErrorType<unknown>
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof generateBillsRetrieve>>,
      TError,
      TData
    >
  >;
}) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGenerateBillsRetrieveQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof generateBillsRetrieve>>
  > = ({ signal }) => generateBillsRetrieve(signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof generateBillsRetrieve>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GenerateBillsRetrieveQueryResult = NonNullable<
  Awaited<ReturnType<typeof generateBillsRetrieve>>
>;
export type GenerateBillsRetrieveQueryError = ErrorType<unknown>;

export const useGenerateBillsRetrieve = <
  TData = Awaited<ReturnType<typeof generateBillsRetrieve>>,
  TError = ErrorType<unknown>
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof generateBillsRetrieve>>,
      TError,
      TData
    >
  >;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGenerateBillsRetrieveQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

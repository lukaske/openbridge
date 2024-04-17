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

export const keyGenRetrieve = (signal?: AbortSignal) => {
  return customInstance<void>({ url: `/api/key-gen/`, method: "GET", signal });
};

export const getKeyGenRetrieveQueryKey = () => {
  return [`/api/key-gen/`] as const;
};

export const getKeyGenRetrieveQueryOptions = <
  TData = Awaited<ReturnType<typeof keyGenRetrieve>>,
  TError = ErrorType<unknown>
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof keyGenRetrieve>>,
    TError,
    TData
  >;
}) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getKeyGenRetrieveQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof keyGenRetrieve>>> = ({
    signal,
  }) => keyGenRetrieve(signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof keyGenRetrieve>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type KeyGenRetrieveQueryResult = NonNullable<
  Awaited<ReturnType<typeof keyGenRetrieve>>
>;
export type KeyGenRetrieveQueryError = ErrorType<unknown>;

export const useKeyGenRetrieve = <
  TData = Awaited<ReturnType<typeof keyGenRetrieve>>,
  TError = ErrorType<unknown>
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof keyGenRetrieve>>,
    TError,
    TData
  >;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getKeyGenRetrieveQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};
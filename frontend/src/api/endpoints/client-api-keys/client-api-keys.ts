/**
 * Generated by orval v6.27.1 🍺
 * Do not edit manually.
 * OpenBridge.me API
 * This is the OpenBridge.me client API. It is used to interact with the OpenBridge.me platform. For specific APIs we recommend using their respective documentation.
 * OpenAPI spec version: 1.0.0
 */
import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import type {
  ClientApiKeysListParams,
  PaginatedServiceAPIKeyList,
  PatchedServiceAPIKey,
  ServiceAPIKey,
} from "../../model";
import { customInstance } from "../../../services/custom-axios-instance";
import type {
  ErrorType,
  BodyType,
} from "../../../services/custom-axios-instance";

type IsAny<T> = 0 extends 1 & T ? true : false;
type IsUnknown<T> = IsAny<T> extends true
  ? false
  : unknown extends T
  ? true
  : false;
type Primitive = string | number | boolean | bigint | symbol | undefined | null;
type isBuiltin = Primitive | Function | Date | Error | RegExp;
type NonReadonly<T> = T extends Exclude<isBuiltin, Error>
  ? T
  : T extends Map<infer Key, infer Value>
  ? Map<NonReadonly<Key>, NonReadonly<Value>>
  : T extends ReadonlyMap<infer Key, infer Value>
  ? Map<NonReadonly<Key>, NonReadonly<Value>>
  : T extends WeakMap<infer Key, infer Value>
  ? WeakMap<NonReadonly<Key>, NonReadonly<Value>>
  : T extends Set<infer Values>
  ? Set<NonReadonly<Values>>
  : T extends ReadonlySet<infer Values>
  ? Set<NonReadonly<Values>>
  : T extends WeakSet<infer Values>
  ? WeakSet<NonReadonly<Values>>
  : T extends Promise<infer Value>
  ? Promise<NonReadonly<Value>>
  : T extends {}
  ? { -readonly [Key in keyof T]: NonReadonly<T[Key]> }
  : IsUnknown<T> extends true
  ? unknown
  : T;

export const clientApiKeysList = (
  params?: ClientApiKeysListParams,
  signal?: AbortSignal
) => {
  return customInstance<PaginatedServiceAPIKeyList>({
    url: `/api/client-api-keys/`,
    method: "GET",
    params,
    signal,
  });
};

export const getClientApiKeysListQueryKey = (
  params?: ClientApiKeysListParams
) => {
  return [`/api/client-api-keys/`, ...(params ? [params] : [])] as const;
};

export const getClientApiKeysListQueryOptions = <
  TData = Awaited<ReturnType<typeof clientApiKeysList>>,
  TError = ErrorType<unknown>
>(
  params?: ClientApiKeysListParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof clientApiKeysList>>,
        TError,
        TData
      >
    >;
  }
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getClientApiKeysListQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof clientApiKeysList>>
  > = ({ signal }) => clientApiKeysList(params, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof clientApiKeysList>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ClientApiKeysListQueryResult = NonNullable<
  Awaited<ReturnType<typeof clientApiKeysList>>
>;
export type ClientApiKeysListQueryError = ErrorType<unknown>;

export const useClientApiKeysList = <
  TData = Awaited<ReturnType<typeof clientApiKeysList>>,
  TError = ErrorType<unknown>
>(
  params?: ClientApiKeysListParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof clientApiKeysList>>,
        TError,
        TData
      >
    >;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getClientApiKeysListQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const clientApiKeysCreate = (
  serviceAPIKey: BodyType<NonReadonly<ServiceAPIKey>>
) => {
  return customInstance<ServiceAPIKey>({
    url: `/api/client-api-keys/`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: serviceAPIKey,
  });
};

export const getClientApiKeysCreateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientApiKeysCreate>>,
    TError,
    { data: BodyType<NonReadonly<ServiceAPIKey>> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof clientApiKeysCreate>>,
  TError,
  { data: BodyType<NonReadonly<ServiceAPIKey>> },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof clientApiKeysCreate>>,
    { data: BodyType<NonReadonly<ServiceAPIKey>> }
  > = (props) => {
    const { data } = props ?? {};

    return clientApiKeysCreate(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type ClientApiKeysCreateMutationResult = NonNullable<
  Awaited<ReturnType<typeof clientApiKeysCreate>>
>;
export type ClientApiKeysCreateMutationBody = BodyType<
  NonReadonly<ServiceAPIKey>
>;
export type ClientApiKeysCreateMutationError = ErrorType<unknown>;

export const useClientApiKeysCreate = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientApiKeysCreate>>,
    TError,
    { data: BodyType<NonReadonly<ServiceAPIKey>> },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof clientApiKeysCreate>>,
  TError,
  { data: BodyType<NonReadonly<ServiceAPIKey>> },
  TContext
> => {
  const mutationOptions = getClientApiKeysCreateMutationOptions(options);

  return useMutation(mutationOptions);
};
export const clientApiKeysRetrieve = (prefix: string, signal?: AbortSignal) => {
  return customInstance<ServiceAPIKey>({
    url: `/api/client-api-keys/${prefix}/`,
    method: "GET",
    signal,
  });
};

export const getClientApiKeysRetrieveQueryKey = (prefix: string) => {
  return [`/api/client-api-keys/${prefix}/`] as const;
};

export const getClientApiKeysRetrieveQueryOptions = <
  TData = Awaited<ReturnType<typeof clientApiKeysRetrieve>>,
  TError = ErrorType<unknown>
>(
  prefix: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof clientApiKeysRetrieve>>,
        TError,
        TData
      >
    >;
  }
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getClientApiKeysRetrieveQueryKey(prefix);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof clientApiKeysRetrieve>>
  > = ({ signal }) => clientApiKeysRetrieve(prefix, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!prefix,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof clientApiKeysRetrieve>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ClientApiKeysRetrieveQueryResult = NonNullable<
  Awaited<ReturnType<typeof clientApiKeysRetrieve>>
>;
export type ClientApiKeysRetrieveQueryError = ErrorType<unknown>;

export const useClientApiKeysRetrieve = <
  TData = Awaited<ReturnType<typeof clientApiKeysRetrieve>>,
  TError = ErrorType<unknown>
>(
  prefix: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof clientApiKeysRetrieve>>,
        TError,
        TData
      >
    >;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getClientApiKeysRetrieveQueryOptions(prefix, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const clientApiKeysUpdate = (
  prefix: string,
  serviceAPIKey: BodyType<NonReadonly<ServiceAPIKey>>
) => {
  return customInstance<ServiceAPIKey>({
    url: `/api/client-api-keys/${prefix}/`,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data: serviceAPIKey,
  });
};

export const getClientApiKeysUpdateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientApiKeysUpdate>>,
    TError,
    { prefix: string; data: BodyType<NonReadonly<ServiceAPIKey>> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof clientApiKeysUpdate>>,
  TError,
  { prefix: string; data: BodyType<NonReadonly<ServiceAPIKey>> },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof clientApiKeysUpdate>>,
    { prefix: string; data: BodyType<NonReadonly<ServiceAPIKey>> }
  > = (props) => {
    const { prefix, data } = props ?? {};

    return clientApiKeysUpdate(prefix, data);
  };

  return { mutationFn, ...mutationOptions };
};

export type ClientApiKeysUpdateMutationResult = NonNullable<
  Awaited<ReturnType<typeof clientApiKeysUpdate>>
>;
export type ClientApiKeysUpdateMutationBody = BodyType<
  NonReadonly<ServiceAPIKey>
>;
export type ClientApiKeysUpdateMutationError = ErrorType<unknown>;

export const useClientApiKeysUpdate = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientApiKeysUpdate>>,
    TError,
    { prefix: string; data: BodyType<NonReadonly<ServiceAPIKey>> },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof clientApiKeysUpdate>>,
  TError,
  { prefix: string; data: BodyType<NonReadonly<ServiceAPIKey>> },
  TContext
> => {
  const mutationOptions = getClientApiKeysUpdateMutationOptions(options);

  return useMutation(mutationOptions);
};
export const clientApiKeysPartialUpdate = (
  prefix: string,
  patchedServiceAPIKey: BodyType<NonReadonly<PatchedServiceAPIKey>>
) => {
  return customInstance<ServiceAPIKey>({
    url: `/api/client-api-keys/${prefix}/`,
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    data: patchedServiceAPIKey,
  });
};

export const getClientApiKeysPartialUpdateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientApiKeysPartialUpdate>>,
    TError,
    { prefix: string; data: BodyType<NonReadonly<PatchedServiceAPIKey>> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof clientApiKeysPartialUpdate>>,
  TError,
  { prefix: string; data: BodyType<NonReadonly<PatchedServiceAPIKey>> },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof clientApiKeysPartialUpdate>>,
    { prefix: string; data: BodyType<NonReadonly<PatchedServiceAPIKey>> }
  > = (props) => {
    const { prefix, data } = props ?? {};

    return clientApiKeysPartialUpdate(prefix, data);
  };

  return { mutationFn, ...mutationOptions };
};

export type ClientApiKeysPartialUpdateMutationResult = NonNullable<
  Awaited<ReturnType<typeof clientApiKeysPartialUpdate>>
>;
export type ClientApiKeysPartialUpdateMutationBody = BodyType<
  NonReadonly<PatchedServiceAPIKey>
>;
export type ClientApiKeysPartialUpdateMutationError = ErrorType<unknown>;

export const useClientApiKeysPartialUpdate = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientApiKeysPartialUpdate>>,
    TError,
    { prefix: string; data: BodyType<NonReadonly<PatchedServiceAPIKey>> },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof clientApiKeysPartialUpdate>>,
  TError,
  { prefix: string; data: BodyType<NonReadonly<PatchedServiceAPIKey>> },
  TContext
> => {
  const mutationOptions = getClientApiKeysPartialUpdateMutationOptions(options);

  return useMutation(mutationOptions);
};
export const clientApiKeysDestroy = (prefix: string) => {
  return customInstance<void>({
    url: `/api/client-api-keys/${prefix}/`,
    method: "DELETE",
  });
};

export const getClientApiKeysDestroyMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientApiKeysDestroy>>,
    TError,
    { prefix: string },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof clientApiKeysDestroy>>,
  TError,
  { prefix: string },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof clientApiKeysDestroy>>,
    { prefix: string }
  > = (props) => {
    const { prefix } = props ?? {};

    return clientApiKeysDestroy(prefix);
  };

  return { mutationFn, ...mutationOptions };
};

export type ClientApiKeysDestroyMutationResult = NonNullable<
  Awaited<ReturnType<typeof clientApiKeysDestroy>>
>;

export type ClientApiKeysDestroyMutationError = ErrorType<unknown>;

export const useClientApiKeysDestroy = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof clientApiKeysDestroy>>,
    TError,
    { prefix: string },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof clientApiKeysDestroy>>,
  TError,
  { prefix: string },
  TContext
> => {
  const mutationOptions = getClientApiKeysDestroyMutationOptions(options);

  return useMutation(mutationOptions);
};

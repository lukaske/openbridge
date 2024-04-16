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
  BillingRule,
  BillingRuleListParams,
  PaginatedBillingRuleList,
  PatchedBillingRule,
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

export const billingRuleList = (
  params?: BillingRuleListParams,
  signal?: AbortSignal
) => {
  return customInstance<PaginatedBillingRuleList>({
    url: `/api/billing-rule/`,
    method: "GET",
    params,
    signal,
  });
};

export const getBillingRuleListQueryKey = (params?: BillingRuleListParams) => {
  return [`/api/billing-rule/`, ...(params ? [params] : [])] as const;
};

export const getBillingRuleListQueryOptions = <
  TData = Awaited<ReturnType<typeof billingRuleList>>,
  TError = ErrorType<unknown>
>(
  params?: BillingRuleListParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof billingRuleList>>,
      TError,
      TData
    >;
  }
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getBillingRuleListQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof billingRuleList>>> = ({
    signal,
  }) => billingRuleList(params, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof billingRuleList>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type BillingRuleListQueryResult = NonNullable<
  Awaited<ReturnType<typeof billingRuleList>>
>;
export type BillingRuleListQueryError = ErrorType<unknown>;

export const useBillingRuleList = <
  TData = Awaited<ReturnType<typeof billingRuleList>>,
  TError = ErrorType<unknown>
>(
  params?: BillingRuleListParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof billingRuleList>>,
      TError,
      TData
    >;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getBillingRuleListQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const billingRuleCreate = (
  billingRule: BodyType<NonReadonly<BillingRule>>
) => {
  return customInstance<BillingRule>({
    url: `/api/billing-rule/`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: billingRule,
  });
};

export const getBillingRuleCreateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof billingRuleCreate>>,
    TError,
    { data: BodyType<NonReadonly<BillingRule>> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof billingRuleCreate>>,
  TError,
  { data: BodyType<NonReadonly<BillingRule>> },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof billingRuleCreate>>,
    { data: BodyType<NonReadonly<BillingRule>> }
  > = (props) => {
    const { data } = props ?? {};

    return billingRuleCreate(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type BillingRuleCreateMutationResult = NonNullable<
  Awaited<ReturnType<typeof billingRuleCreate>>
>;
export type BillingRuleCreateMutationBody = BodyType<NonReadonly<BillingRule>>;
export type BillingRuleCreateMutationError = ErrorType<unknown>;

export const useBillingRuleCreate = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof billingRuleCreate>>,
    TError,
    { data: BodyType<NonReadonly<BillingRule>> },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof billingRuleCreate>>,
  TError,
  { data: BodyType<NonReadonly<BillingRule>> },
  TContext
> => {
  const mutationOptions = getBillingRuleCreateMutationOptions(options);

  return useMutation(mutationOptions);
};
export const billingRuleRetrieve = (id: number, signal?: AbortSignal) => {
  return customInstance<BillingRule>({
    url: `/api/billing-rule/${id}/`,
    method: "GET",
    signal,
  });
};

export const getBillingRuleRetrieveQueryKey = (id: number) => {
  return [`/api/billing-rule/${id}/`] as const;
};

export const getBillingRuleRetrieveQueryOptions = <
  TData = Awaited<ReturnType<typeof billingRuleRetrieve>>,
  TError = ErrorType<unknown>
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof billingRuleRetrieve>>,
      TError,
      TData
    >;
  }
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getBillingRuleRetrieveQueryKey(id);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof billingRuleRetrieve>>
  > = ({ signal }) => billingRuleRetrieve(id, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof billingRuleRetrieve>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type BillingRuleRetrieveQueryResult = NonNullable<
  Awaited<ReturnType<typeof billingRuleRetrieve>>
>;
export type BillingRuleRetrieveQueryError = ErrorType<unknown>;

export const useBillingRuleRetrieve = <
  TData = Awaited<ReturnType<typeof billingRuleRetrieve>>,
  TError = ErrorType<unknown>
>(
  id: number,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof billingRuleRetrieve>>,
      TError,
      TData
    >;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getBillingRuleRetrieveQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const billingRuleUpdate = (
  id: number,
  billingRule: BodyType<NonReadonly<BillingRule>>
) => {
  return customInstance<BillingRule>({
    url: `/api/billing-rule/${id}/`,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data: billingRule,
  });
};

export const getBillingRuleUpdateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof billingRuleUpdate>>,
    TError,
    { id: number; data: BodyType<NonReadonly<BillingRule>> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof billingRuleUpdate>>,
  TError,
  { id: number; data: BodyType<NonReadonly<BillingRule>> },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof billingRuleUpdate>>,
    { id: number; data: BodyType<NonReadonly<BillingRule>> }
  > = (props) => {
    const { id, data } = props ?? {};

    return billingRuleUpdate(id, data);
  };

  return { mutationFn, ...mutationOptions };
};

export type BillingRuleUpdateMutationResult = NonNullable<
  Awaited<ReturnType<typeof billingRuleUpdate>>
>;
export type BillingRuleUpdateMutationBody = BodyType<NonReadonly<BillingRule>>;
export type BillingRuleUpdateMutationError = ErrorType<unknown>;

export const useBillingRuleUpdate = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof billingRuleUpdate>>,
    TError,
    { id: number; data: BodyType<NonReadonly<BillingRule>> },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof billingRuleUpdate>>,
  TError,
  { id: number; data: BodyType<NonReadonly<BillingRule>> },
  TContext
> => {
  const mutationOptions = getBillingRuleUpdateMutationOptions(options);

  return useMutation(mutationOptions);
};
export const billingRulePartialUpdate = (
  id: number,
  patchedBillingRule: BodyType<NonReadonly<PatchedBillingRule>>
) => {
  return customInstance<BillingRule>({
    url: `/api/billing-rule/${id}/`,
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    data: patchedBillingRule,
  });
};

export const getBillingRulePartialUpdateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof billingRulePartialUpdate>>,
    TError,
    { id: number; data: BodyType<NonReadonly<PatchedBillingRule>> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof billingRulePartialUpdate>>,
  TError,
  { id: number; data: BodyType<NonReadonly<PatchedBillingRule>> },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof billingRulePartialUpdate>>,
    { id: number; data: BodyType<NonReadonly<PatchedBillingRule>> }
  > = (props) => {
    const { id, data } = props ?? {};

    return billingRulePartialUpdate(id, data);
  };

  return { mutationFn, ...mutationOptions };
};

export type BillingRulePartialUpdateMutationResult = NonNullable<
  Awaited<ReturnType<typeof billingRulePartialUpdate>>
>;
export type BillingRulePartialUpdateMutationBody = BodyType<
  NonReadonly<PatchedBillingRule>
>;
export type BillingRulePartialUpdateMutationError = ErrorType<unknown>;

export const useBillingRulePartialUpdate = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof billingRulePartialUpdate>>,
    TError,
    { id: number; data: BodyType<NonReadonly<PatchedBillingRule>> },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof billingRulePartialUpdate>>,
  TError,
  { id: number; data: BodyType<NonReadonly<PatchedBillingRule>> },
  TContext
> => {
  const mutationOptions = getBillingRulePartialUpdateMutationOptions(options);

  return useMutation(mutationOptions);
};
export const billingRuleDestroy = (id: number) => {
  return customInstance<void>({
    url: `/api/billing-rule/${id}/`,
    method: "DELETE",
  });
};

export const getBillingRuleDestroyMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof billingRuleDestroy>>,
    TError,
    { id: number },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof billingRuleDestroy>>,
  TError,
  { id: number },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof billingRuleDestroy>>,
    { id: number }
  > = (props) => {
    const { id } = props ?? {};

    return billingRuleDestroy(id);
  };

  return { mutationFn, ...mutationOptions };
};

export type BillingRuleDestroyMutationResult = NonNullable<
  Awaited<ReturnType<typeof billingRuleDestroy>>
>;

export type BillingRuleDestroyMutationError = ErrorType<unknown>;

export const useBillingRuleDestroy = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof billingRuleDestroy>>,
    TError,
    { id: number },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof billingRuleDestroy>>,
  TError,
  { id: number },
  TContext
> => {
  const mutationOptions = getBillingRuleDestroyMutationOptions(options);

  return useMutation(mutationOptions);
};

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
  Jwt,
  Login,
  PasswordChange,
  PasswordReset,
  PasswordResetConfirm,
  PatchedUserDetails,
  Register,
  ResendEmailVerification,
  RestAuthDetail,
  TokenRefresh,
  TokenVerify,
  UserDetails,
  VerifyEmail,
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

/**
 * Check the credentials and return the REST Token
if the credentials are valid and authenticated.
Calls Django Auth login method to register User ID
in Django session framework

Accept the following POST parameters: username, password
Return the REST Framework Token Object's key.
 */
export const authLoginCreate = (login: BodyType<Login>) => {
  return customInstance<Jwt>({
    url: `/api/auth/login/`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: login,
  });
};

export const getAuthLoginCreateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authLoginCreate>>,
    TError,
    { data: BodyType<Login> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authLoginCreate>>,
  TError,
  { data: BodyType<Login> },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authLoginCreate>>,
    { data: BodyType<Login> }
  > = (props) => {
    const { data } = props ?? {};

    return authLoginCreate(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthLoginCreateMutationResult = NonNullable<
  Awaited<ReturnType<typeof authLoginCreate>>
>;
export type AuthLoginCreateMutationBody = BodyType<Login>;
export type AuthLoginCreateMutationError = ErrorType<unknown>;

export const useAuthLoginCreate = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authLoginCreate>>,
    TError,
    { data: BodyType<Login> },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof authLoginCreate>>,
  TError,
  { data: BodyType<Login> },
  TContext
> => {
  const mutationOptions = getAuthLoginCreateMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * Calls Django logout method and delete the Token object
assigned to the current User object.

Accepts/Returns nothing.
 */
export const authLogoutCreate = () => {
  return customInstance<RestAuthDetail>({
    url: `/api/auth/logout/`,
    method: "POST",
  });
};

export const getAuthLogoutCreateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authLogoutCreate>>,
    TError,
    void,
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authLogoutCreate>>,
  TError,
  void,
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authLogoutCreate>>,
    void
  > = () => {
    return authLogoutCreate();
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthLogoutCreateMutationResult = NonNullable<
  Awaited<ReturnType<typeof authLogoutCreate>>
>;

export type AuthLogoutCreateMutationError = ErrorType<unknown>;

export const useAuthLogoutCreate = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authLogoutCreate>>,
    TError,
    void,
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof authLogoutCreate>>,
  TError,
  void,
  TContext
> => {
  const mutationOptions = getAuthLogoutCreateMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * Calls Django Auth SetPasswordForm save method.

Accepts the following POST parameters: new_password1, new_password2
Returns the success/fail message.
 */
export const authPasswordChangeCreate = (
  passwordChange: BodyType<PasswordChange>
) => {
  return customInstance<RestAuthDetail>({
    url: `/api/auth/password/change/`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: passwordChange,
  });
};

export const getAuthPasswordChangeCreateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authPasswordChangeCreate>>,
    TError,
    { data: BodyType<PasswordChange> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authPasswordChangeCreate>>,
  TError,
  { data: BodyType<PasswordChange> },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authPasswordChangeCreate>>,
    { data: BodyType<PasswordChange> }
  > = (props) => {
    const { data } = props ?? {};

    return authPasswordChangeCreate(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthPasswordChangeCreateMutationResult = NonNullable<
  Awaited<ReturnType<typeof authPasswordChangeCreate>>
>;
export type AuthPasswordChangeCreateMutationBody = BodyType<PasswordChange>;
export type AuthPasswordChangeCreateMutationError = ErrorType<unknown>;

export const useAuthPasswordChangeCreate = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authPasswordChangeCreate>>,
    TError,
    { data: BodyType<PasswordChange> },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof authPasswordChangeCreate>>,
  TError,
  { data: BodyType<PasswordChange> },
  TContext
> => {
  const mutationOptions = getAuthPasswordChangeCreateMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * Calls Django Auth PasswordResetForm save method.

Accepts the following POST parameters: email
Returns the success/fail message.
 */
export const authPasswordResetCreate = (
  passwordReset: BodyType<PasswordReset>
) => {
  return customInstance<RestAuthDetail>({
    url: `/api/auth/password/reset/`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: passwordReset,
  });
};

export const getAuthPasswordResetCreateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authPasswordResetCreate>>,
    TError,
    { data: BodyType<PasswordReset> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authPasswordResetCreate>>,
  TError,
  { data: BodyType<PasswordReset> },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authPasswordResetCreate>>,
    { data: BodyType<PasswordReset> }
  > = (props) => {
    const { data } = props ?? {};

    return authPasswordResetCreate(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthPasswordResetCreateMutationResult = NonNullable<
  Awaited<ReturnType<typeof authPasswordResetCreate>>
>;
export type AuthPasswordResetCreateMutationBody = BodyType<PasswordReset>;
export type AuthPasswordResetCreateMutationError = ErrorType<unknown>;

export const useAuthPasswordResetCreate = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authPasswordResetCreate>>,
    TError,
    { data: BodyType<PasswordReset> },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof authPasswordResetCreate>>,
  TError,
  { data: BodyType<PasswordReset> },
  TContext
> => {
  const mutationOptions = getAuthPasswordResetCreateMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * Password reset e-mail link is confirmed, therefore
this resets the user's password.

Accepts the following POST parameters: token, uid,
    new_password1, new_password2
Returns the success/fail message.
 */
export const authPasswordResetConfirmCreate = (
  passwordResetConfirm: BodyType<PasswordResetConfirm>
) => {
  return customInstance<RestAuthDetail>({
    url: `/api/auth/password/reset/confirm/`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: passwordResetConfirm,
  });
};

export const getAuthPasswordResetConfirmCreateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authPasswordResetConfirmCreate>>,
    TError,
    { data: BodyType<PasswordResetConfirm> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authPasswordResetConfirmCreate>>,
  TError,
  { data: BodyType<PasswordResetConfirm> },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authPasswordResetConfirmCreate>>,
    { data: BodyType<PasswordResetConfirm> }
  > = (props) => {
    const { data } = props ?? {};

    return authPasswordResetConfirmCreate(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthPasswordResetConfirmCreateMutationResult = NonNullable<
  Awaited<ReturnType<typeof authPasswordResetConfirmCreate>>
>;
export type AuthPasswordResetConfirmCreateMutationBody =
  BodyType<PasswordResetConfirm>;
export type AuthPasswordResetConfirmCreateMutationError = ErrorType<unknown>;

export const useAuthPasswordResetConfirmCreate = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authPasswordResetConfirmCreate>>,
    TError,
    { data: BodyType<PasswordResetConfirm> },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof authPasswordResetConfirmCreate>>,
  TError,
  { data: BodyType<PasswordResetConfirm> },
  TContext
> => {
  const mutationOptions =
    getAuthPasswordResetConfirmCreateMutationOptions(options);

  return useMutation(mutationOptions);
};
export const authRegistrationCreate = (register: BodyType<Register>) => {
  return customInstance<Jwt>({
    url: `/api/auth/registration/`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: register,
  });
};

export const getAuthRegistrationCreateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authRegistrationCreate>>,
    TError,
    { data: BodyType<Register> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authRegistrationCreate>>,
  TError,
  { data: BodyType<Register> },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authRegistrationCreate>>,
    { data: BodyType<Register> }
  > = (props) => {
    const { data } = props ?? {};

    return authRegistrationCreate(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthRegistrationCreateMutationResult = NonNullable<
  Awaited<ReturnType<typeof authRegistrationCreate>>
>;
export type AuthRegistrationCreateMutationBody = BodyType<Register>;
export type AuthRegistrationCreateMutationError = ErrorType<unknown>;

export const useAuthRegistrationCreate = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authRegistrationCreate>>,
    TError,
    { data: BodyType<Register> },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof authRegistrationCreate>>,
  TError,
  { data: BodyType<Register> },
  TContext
> => {
  const mutationOptions = getAuthRegistrationCreateMutationOptions(options);

  return useMutation(mutationOptions);
};
export const authRegistrationResendEmailCreate = (
  resendEmailVerification: BodyType<ResendEmailVerification>
) => {
  return customInstance<RestAuthDetail>({
    url: `/api/auth/registration/resend-email/`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: resendEmailVerification,
  });
};

export const getAuthRegistrationResendEmailCreateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authRegistrationResendEmailCreate>>,
    TError,
    { data: BodyType<ResendEmailVerification> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authRegistrationResendEmailCreate>>,
  TError,
  { data: BodyType<ResendEmailVerification> },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authRegistrationResendEmailCreate>>,
    { data: BodyType<ResendEmailVerification> }
  > = (props) => {
    const { data } = props ?? {};

    return authRegistrationResendEmailCreate(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthRegistrationResendEmailCreateMutationResult = NonNullable<
  Awaited<ReturnType<typeof authRegistrationResendEmailCreate>>
>;
export type AuthRegistrationResendEmailCreateMutationBody =
  BodyType<ResendEmailVerification>;
export type AuthRegistrationResendEmailCreateMutationError = ErrorType<unknown>;

export const useAuthRegistrationResendEmailCreate = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authRegistrationResendEmailCreate>>,
    TError,
    { data: BodyType<ResendEmailVerification> },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof authRegistrationResendEmailCreate>>,
  TError,
  { data: BodyType<ResendEmailVerification> },
  TContext
> => {
  const mutationOptions =
    getAuthRegistrationResendEmailCreateMutationOptions(options);

  return useMutation(mutationOptions);
};
export const authRegistrationVerifyEmailCreate = (
  verifyEmail: BodyType<VerifyEmail>
) => {
  return customInstance<RestAuthDetail>({
    url: `/api/auth/registration/verify-email/`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: verifyEmail,
  });
};

export const getAuthRegistrationVerifyEmailCreateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authRegistrationVerifyEmailCreate>>,
    TError,
    { data: BodyType<VerifyEmail> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authRegistrationVerifyEmailCreate>>,
  TError,
  { data: BodyType<VerifyEmail> },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authRegistrationVerifyEmailCreate>>,
    { data: BodyType<VerifyEmail> }
  > = (props) => {
    const { data } = props ?? {};

    return authRegistrationVerifyEmailCreate(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthRegistrationVerifyEmailCreateMutationResult = NonNullable<
  Awaited<ReturnType<typeof authRegistrationVerifyEmailCreate>>
>;
export type AuthRegistrationVerifyEmailCreateMutationBody =
  BodyType<VerifyEmail>;
export type AuthRegistrationVerifyEmailCreateMutationError = ErrorType<unknown>;

export const useAuthRegistrationVerifyEmailCreate = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authRegistrationVerifyEmailCreate>>,
    TError,
    { data: BodyType<VerifyEmail> },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof authRegistrationVerifyEmailCreate>>,
  TError,
  { data: BodyType<VerifyEmail> },
  TContext
> => {
  const mutationOptions =
    getAuthRegistrationVerifyEmailCreateMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * Takes a refresh type JSON web token and returns an access type JSON web
token if the refresh token is valid.
 */
export const authTokenRefreshCreate = (
  tokenRefresh: BodyType<NonReadonly<TokenRefresh>>
) => {
  return customInstance<TokenRefresh>({
    url: `/api/auth/token/refresh/`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: tokenRefresh,
  });
};

export const getAuthTokenRefreshCreateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authTokenRefreshCreate>>,
    TError,
    { data: BodyType<NonReadonly<TokenRefresh>> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authTokenRefreshCreate>>,
  TError,
  { data: BodyType<NonReadonly<TokenRefresh>> },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authTokenRefreshCreate>>,
    { data: BodyType<NonReadonly<TokenRefresh>> }
  > = (props) => {
    const { data } = props ?? {};

    return authTokenRefreshCreate(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthTokenRefreshCreateMutationResult = NonNullable<
  Awaited<ReturnType<typeof authTokenRefreshCreate>>
>;
export type AuthTokenRefreshCreateMutationBody = BodyType<
  NonReadonly<TokenRefresh>
>;
export type AuthTokenRefreshCreateMutationError = ErrorType<unknown>;

export const useAuthTokenRefreshCreate = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authTokenRefreshCreate>>,
    TError,
    { data: BodyType<NonReadonly<TokenRefresh>> },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof authTokenRefreshCreate>>,
  TError,
  { data: BodyType<NonReadonly<TokenRefresh>> },
  TContext
> => {
  const mutationOptions = getAuthTokenRefreshCreateMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * Takes a token and indicates if it is valid.  This view provides no
information about a token's fitness for a particular use.
 */
export const authTokenVerifyCreate = (tokenVerify: BodyType<TokenVerify>) => {
  return customInstance<TokenVerify>({
    url: `/api/auth/token/verify/`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: tokenVerify,
  });
};

export const getAuthTokenVerifyCreateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authTokenVerifyCreate>>,
    TError,
    { data: BodyType<TokenVerify> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authTokenVerifyCreate>>,
  TError,
  { data: BodyType<TokenVerify> },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authTokenVerifyCreate>>,
    { data: BodyType<TokenVerify> }
  > = (props) => {
    const { data } = props ?? {};

    return authTokenVerifyCreate(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthTokenVerifyCreateMutationResult = NonNullable<
  Awaited<ReturnType<typeof authTokenVerifyCreate>>
>;
export type AuthTokenVerifyCreateMutationBody = BodyType<TokenVerify>;
export type AuthTokenVerifyCreateMutationError = ErrorType<unknown>;

export const useAuthTokenVerifyCreate = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authTokenVerifyCreate>>,
    TError,
    { data: BodyType<TokenVerify> },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof authTokenVerifyCreate>>,
  TError,
  { data: BodyType<TokenVerify> },
  TContext
> => {
  const mutationOptions = getAuthTokenVerifyCreateMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * Reads and updates UserModel fields
Accepts GET, PUT, PATCH methods.

Default accepted fields: username, first_name, last_name
Default display fields: pk, username, email, first_name, last_name
Read-only fields: pk, email

Returns UserModel fields.
 */
export const authUserRetrieve = (signal?: AbortSignal) => {
  return customInstance<UserDetails>({
    url: `/api/auth/user/`,
    method: "GET",
    signal,
  });
};

export const getAuthUserRetrieveQueryKey = () => {
  return [`/api/auth/user/`] as const;
};

export const getAuthUserRetrieveQueryOptions = <
  TData = Awaited<ReturnType<typeof authUserRetrieve>>,
  TError = ErrorType<unknown>
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof authUserRetrieve>>,
    TError,
    TData
  >;
}) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getAuthUserRetrieveQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof authUserRetrieve>>
  > = ({ signal }) => authUserRetrieve(signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof authUserRetrieve>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AuthUserRetrieveQueryResult = NonNullable<
  Awaited<ReturnType<typeof authUserRetrieve>>
>;
export type AuthUserRetrieveQueryError = ErrorType<unknown>;

export const useAuthUserRetrieve = <
  TData = Awaited<ReturnType<typeof authUserRetrieve>>,
  TError = ErrorType<unknown>
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof authUserRetrieve>>,
    TError,
    TData
  >;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getAuthUserRetrieveQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Reads and updates UserModel fields
Accepts GET, PUT, PATCH methods.

Default accepted fields: username, first_name, last_name
Default display fields: pk, username, email, first_name, last_name
Read-only fields: pk, email

Returns UserModel fields.
 */
export const authUserUpdate = (
  userDetails: BodyType<NonReadonly<UserDetails>>
) => {
  return customInstance<UserDetails>({
    url: `/api/auth/user/`,
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data: userDetails,
  });
};

export const getAuthUserUpdateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authUserUpdate>>,
    TError,
    { data: BodyType<NonReadonly<UserDetails>> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authUserUpdate>>,
  TError,
  { data: BodyType<NonReadonly<UserDetails>> },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authUserUpdate>>,
    { data: BodyType<NonReadonly<UserDetails>> }
  > = (props) => {
    const { data } = props ?? {};

    return authUserUpdate(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthUserUpdateMutationResult = NonNullable<
  Awaited<ReturnType<typeof authUserUpdate>>
>;
export type AuthUserUpdateMutationBody = BodyType<NonReadonly<UserDetails>>;
export type AuthUserUpdateMutationError = ErrorType<unknown>;

export const useAuthUserUpdate = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authUserUpdate>>,
    TError,
    { data: BodyType<NonReadonly<UserDetails>> },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof authUserUpdate>>,
  TError,
  { data: BodyType<NonReadonly<UserDetails>> },
  TContext
> => {
  const mutationOptions = getAuthUserUpdateMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * Reads and updates UserModel fields
Accepts GET, PUT, PATCH methods.

Default accepted fields: username, first_name, last_name
Default display fields: pk, username, email, first_name, last_name
Read-only fields: pk, email

Returns UserModel fields.
 */
export const authUserPartialUpdate = (
  patchedUserDetails: BodyType<NonReadonly<PatchedUserDetails>>
) => {
  return customInstance<UserDetails>({
    url: `/api/auth/user/`,
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    data: patchedUserDetails,
  });
};

export const getAuthUserPartialUpdateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authUserPartialUpdate>>,
    TError,
    { data: BodyType<NonReadonly<PatchedUserDetails>> },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authUserPartialUpdate>>,
  TError,
  { data: BodyType<NonReadonly<PatchedUserDetails>> },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authUserPartialUpdate>>,
    { data: BodyType<NonReadonly<PatchedUserDetails>> }
  > = (props) => {
    const { data } = props ?? {};

    return authUserPartialUpdate(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthUserPartialUpdateMutationResult = NonNullable<
  Awaited<ReturnType<typeof authUserPartialUpdate>>
>;
export type AuthUserPartialUpdateMutationBody = BodyType<
  NonReadonly<PatchedUserDetails>
>;
export type AuthUserPartialUpdateMutationError = ErrorType<unknown>;

export const useAuthUserPartialUpdate = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authUserPartialUpdate>>,
    TError,
    { data: BodyType<NonReadonly<PatchedUserDetails>> },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof authUserPartialUpdate>>,
  TError,
  { data: BodyType<NonReadonly<PatchedUserDetails>> },
  TContext
> => {
  const mutationOptions = getAuthUserPartialUpdateMutationOptions(options);

  return useMutation(mutationOptions);
};

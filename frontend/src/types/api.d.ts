import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Definitions {
    export interface CookieTokenRefresh {
        /**
         * Refresh
         * WIll override cookie.
         */
        refresh?: string;
        /**
         * Access
         */
        access?: string;
    }
    export interface Login {
        /**
         * Username
         */
        username?: string;
        /**
         * Email
         */
        email?: string; // email
        /**
         * Password
         */
        password: string;
    }
    export interface PasswordChange {
        /**
         * New password1
         */
        new_password1: string;
        /**
         * New password2
         */
        new_password2: string;
    }
    export interface PasswordReset {
        /**
         * Email
         */
        email: string; // email
    }
    export interface PasswordResetConfirm {
        /**
         * New password1
         */
        new_password1: string;
        /**
         * New password2
         */
        new_password2: string;
        /**
         * Uid
         */
        uid: string;
        /**
         * Token
         */
        token: string;
    }
    export interface Register {
        /**
         * Username
         */
        username: string;
        /**
         * Email
         */
        email?: string; // email
        /**
         * Password1
         */
        password1: string;
        /**
         * Password2
         */
        password2: string;
    }
    export interface ResendEmailVerification {
        /**
         * Email
         */
        email?: string; // email
    }
    export interface TokenVerify {
        /**
         * Token
         */
        token: string;
    }
    export interface User {
        /**
         * Url
         */
        url?: string; // uri
        /**
         * Username
         * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
         */
        username: string; // ^[\w.@+-]+$
        /**
         * Email address
         */
        email?: string; // email
        /**
         * Staff status
         * Designates whether the user can log into this admin site.
         */
        is_staff?: boolean;
    }
    export interface UserDetails {
        /**
         * ID
         */
        pk?: number;
        /**
         * Username
         * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
         */
        username: string; // ^[\w.@+-]+$
        /**
         * Email address
         */
        email?: string; // email
        /**
         * First name
         */
        first_name?: string;
        /**
         * Last name
         */
        last_name?: string;
    }
    export interface VerifyEmail {
        /**
         * Key
         */
        key: string;
    }
}
declare namespace Paths {
    namespace ApiV1Users$Id {
        namespace Parameters {
            /**
             * A unique integer value identifying this user.
             */
            export type Id = number;
        }
        export interface PathParameters {
            id: /* A unique integer value identifying this user. */ Parameters.Id;
        }
    }
    namespace ApiV1UsersCreate {
        export interface BodyParameters {
            data: Parameters.Data;
        }
        namespace Parameters {
            export type Data = Definitions.User;
        }
        namespace Responses {
            export type $201 = Definitions.User;
        }
    }
    namespace ApiV1UsersList {
        namespace Responses {
            export type $200 = Definitions.User[];
        }
    }
    namespace ApiV1UsersPartialUpdate {
        export interface BodyParameters {
            data: Parameters.Data;
        }
        namespace Parameters {
            export type Data = Definitions.User;
        }
        namespace Responses {
            export type $200 = Definitions.User;
        }
    }
    namespace ApiV1UsersRead {
        namespace Responses {
            export type $200 = Definitions.User;
        }
    }
    namespace ApiV1UsersUpdate {
        export interface BodyParameters {
            data: Parameters.Data;
        }
        namespace Parameters {
            export type Data = Definitions.User;
        }
        namespace Responses {
            export type $200 = Definitions.User;
        }
    }
    namespace UserAuthLoginCreate {
        export interface BodyParameters {
            data: Parameters.Data;
        }
        namespace Parameters {
            export type Data = Definitions.Login;
        }
        namespace Responses {
            export type $201 = Definitions.Login;
        }
    }
    namespace UserAuthPasswordChangeCreate {
        export interface BodyParameters {
            data: Parameters.Data;
        }
        namespace Parameters {
            export type Data = Definitions.PasswordChange;
        }
        namespace Responses {
            export type $201 = Definitions.PasswordChange;
        }
    }
    namespace UserAuthPasswordResetConfirmCreate {
        export interface BodyParameters {
            data: Parameters.Data;
        }
        namespace Parameters {
            export type Data = Definitions.PasswordResetConfirm;
        }
        namespace Responses {
            export type $201 = Definitions.PasswordResetConfirm;
        }
    }
    namespace UserAuthPasswordResetCreate {
        export interface BodyParameters {
            data: Parameters.Data;
        }
        namespace Parameters {
            export type Data = Definitions.PasswordReset;
        }
        namespace Responses {
            export type $201 = Definitions.PasswordReset;
        }
    }
    namespace UserAuthRegistrationCreate {
        export interface BodyParameters {
            data: Parameters.Data;
        }
        namespace Parameters {
            export type Data = Definitions.Register;
        }
        namespace Responses {
            export type $201 = Definitions.Register;
        }
    }
    namespace UserAuthRegistrationResendEmailCreate {
        export interface BodyParameters {
            data: Parameters.Data;
        }
        namespace Parameters {
            export type Data = Definitions.ResendEmailVerification;
        }
        namespace Responses {
            export type $201 = Definitions.ResendEmailVerification;
        }
    }
    namespace UserAuthRegistrationVerifyEmailCreate {
        export interface BodyParameters {
            data: Parameters.Data;
        }
        namespace Parameters {
            export type Data = Definitions.VerifyEmail;
        }
        namespace Responses {
            export type $201 = Definitions.VerifyEmail;
        }
    }
    namespace UserAuthTokenRefreshCreate {
        export interface BodyParameters {
            data: Parameters.Data;
        }
        namespace Parameters {
            export type Data = Definitions.CookieTokenRefresh;
        }
        namespace Responses {
            export type $201 = Definitions.CookieTokenRefresh;
        }
    }
    namespace UserAuthTokenVerifyCreate {
        export interface BodyParameters {
            data: Parameters.Data;
        }
        namespace Parameters {
            export type Data = Definitions.TokenVerify;
        }
        namespace Responses {
            export type $201 = Definitions.TokenVerify;
        }
    }
    namespace UserAuthUserPartialUpdate {
        export interface BodyParameters {
            data: Parameters.Data;
        }
        namespace Parameters {
            export type Data = Definitions.UserDetails;
        }
        namespace Responses {
            export type $200 = Definitions.UserDetails;
        }
    }
    namespace UserAuthUserRead {
        namespace Responses {
            export type $200 = Definitions.UserDetails;
        }
    }
    namespace UserAuthUserUpdate {
        export interface BodyParameters {
            data: Parameters.Data;
        }
        namespace Parameters {
            export type Data = Definitions.UserDetails;
        }
        namespace Responses {
            export type $200 = Definitions.UserDetails;
        }
    }
}

export interface OperationMethods {
  /**
   * api_v1_users_list
   */
  'api_v1_users_list'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApiV1UsersList.Responses.$200>
  /**
   * api_v1_users_create
   */
  'api_v1_users_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApiV1UsersCreate.Responses.$201>
  /**
   * api_v1_users_read
   */
  'api_v1_users_read'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApiV1UsersRead.Responses.$200>
  /**
   * api_v1_users_update
   */
  'api_v1_users_update'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApiV1UsersUpdate.Responses.$200>
  /**
   * api_v1_users_partial_update
   */
  'api_v1_users_partial_update'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ApiV1UsersPartialUpdate.Responses.$200>
  /**
   * api_v1_users_delete
   */
  'api_v1_users_delete'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * user-auth_login_create - Check the credentials and return the REST Token
   * if the credentials are valid and authenticated.
   * Calls Django Auth login method to register User ID
   * in Django session framework
   * 
   * Accept the following POST parameters: username, password
   * Return the REST Framework Token Object's key.
   */
  'user-auth_login_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserAuthLoginCreate.Responses.$201>
  /**
   * user-auth_logout_list - Calls Django logout method and delete the Token object
   * assigned to the current User object.
   * 
   * Accepts/Returns nothing.
   */
  'user-auth_logout_list'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * user-auth_logout_create - Calls Django logout method and delete the Token object
   * assigned to the current User object.
   * 
   * Accepts/Returns nothing.
   */
  'user-auth_logout_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<any>
  /**
   * user-auth_password_change_create - Calls Django Auth SetPasswordForm save method.
   * 
   * Accepts the following POST parameters: new_password1, new_password2
   * Returns the success/fail message.
   */
  'user-auth_password_change_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserAuthPasswordChangeCreate.Responses.$201>
  /**
   * user-auth_password_reset_create - Calls Django Auth PasswordResetForm save method.
   * 
   * Accepts the following POST parameters: email
   * Returns the success/fail message.
   */
  'user-auth_password_reset_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserAuthPasswordResetCreate.Responses.$201>
  /**
   * user-auth_password_reset_confirm_create - Password reset e-mail link is confirmed, therefore
   * this resets the user's password.
   * 
   * Accepts the following POST parameters: token, uid,
   *     new_password1, new_password2
   * Returns the success/fail message.
   */
  'user-auth_password_reset_confirm_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserAuthPasswordResetConfirmCreate.Responses.$201>
  /**
   * user-auth_registration_create
   */
  'user-auth_registration_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserAuthRegistrationCreate.Responses.$201>
  /**
   * user-auth_registration_resend-email_create
   */
  'user-auth_registration_resend-email_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserAuthRegistrationResendEmailCreate.Responses.$201>
  /**
   * user-auth_registration_verify-email_create
   */
  'user-auth_registration_verify-email_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserAuthRegistrationVerifyEmailCreate.Responses.$201>
  /**
   * user-auth_token_refresh_create
   */
  'user-auth_token_refresh_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserAuthTokenRefreshCreate.Responses.$201>
  /**
   * user-auth_token_verify_create - Takes a token and indicates if it is valid.  This view provides no
   * information about a token's fitness for a particular use.
   */
  'user-auth_token_verify_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserAuthTokenVerifyCreate.Responses.$201>
  /**
   * user-auth_user_read - Reads and updates UserModel fields
   * Accepts GET, PUT, PATCH methods.
   * 
   * Default accepted fields: username, first_name, last_name
   * Default display fields: pk, username, email, first_name, last_name
   * Read-only fields: pk, email
   * 
   * Returns UserModel fields.
   */
  'user-auth_user_read'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserAuthUserRead.Responses.$200>
  /**
   * user-auth_user_update - Reads and updates UserModel fields
   * Accepts GET, PUT, PATCH methods.
   * 
   * Default accepted fields: username, first_name, last_name
   * Default display fields: pk, username, email, first_name, last_name
   * Read-only fields: pk, email
   * 
   * Returns UserModel fields.
   */
  'user-auth_user_update'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserAuthUserUpdate.Responses.$200>
  /**
   * user-auth_user_partial_update - Reads and updates UserModel fields
   * Accepts GET, PUT, PATCH methods.
   * 
   * Default accepted fields: username, first_name, last_name
   * Default display fields: pk, username, email, first_name, last_name
   * Read-only fields: pk, email
   * 
   * Returns UserModel fields.
   */
  'user-auth_user_partial_update'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserAuthUserPartialUpdate.Responses.$200>
}

export interface PathsDictionary {
  ['/api/v1/users/']: {
    /**
     * api_v1_users_list
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApiV1UsersList.Responses.$200>
    /**
     * api_v1_users_create
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApiV1UsersCreate.Responses.$201>
  }
  ['/api/v1/users/{id}/']: {
    /**
     * api_v1_users_read
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApiV1UsersRead.Responses.$200>
    /**
     * api_v1_users_update
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApiV1UsersUpdate.Responses.$200>
    /**
     * api_v1_users_partial_update
     */
    'patch'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ApiV1UsersPartialUpdate.Responses.$200>
    /**
     * api_v1_users_delete
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/user-auth/login/']: {
    /**
     * user-auth_login_create - Check the credentials and return the REST Token
     * if the credentials are valid and authenticated.
     * Calls Django Auth login method to register User ID
     * in Django session framework
     * 
     * Accept the following POST parameters: username, password
     * Return the REST Framework Token Object's key.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserAuthLoginCreate.Responses.$201>
  }
  ['/user-auth/logout/']: {
    /**
     * user-auth_logout_list - Calls Django logout method and delete the Token object
     * assigned to the current User object.
     * 
     * Accepts/Returns nothing.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
    /**
     * user-auth_logout_create - Calls Django logout method and delete the Token object
     * assigned to the current User object.
     * 
     * Accepts/Returns nothing.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<any>
  }
  ['/user-auth/password/change/']: {
    /**
     * user-auth_password_change_create - Calls Django Auth SetPasswordForm save method.
     * 
     * Accepts the following POST parameters: new_password1, new_password2
     * Returns the success/fail message.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserAuthPasswordChangeCreate.Responses.$201>
  }
  ['/user-auth/password/reset/']: {
    /**
     * user-auth_password_reset_create - Calls Django Auth PasswordResetForm save method.
     * 
     * Accepts the following POST parameters: email
     * Returns the success/fail message.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserAuthPasswordResetCreate.Responses.$201>
  }
  ['/user-auth/password/reset/confirm/']: {
    /**
     * user-auth_password_reset_confirm_create - Password reset e-mail link is confirmed, therefore
     * this resets the user's password.
     * 
     * Accepts the following POST parameters: token, uid,
     *     new_password1, new_password2
     * Returns the success/fail message.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserAuthPasswordResetConfirmCreate.Responses.$201>
  }
  ['/user-auth/registration/']: {
    /**
     * user-auth_registration_create
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserAuthRegistrationCreate.Responses.$201>
  }
  ['/user-auth/registration/resend-email/']: {
    /**
     * user-auth_registration_resend-email_create
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserAuthRegistrationResendEmailCreate.Responses.$201>
  }
  ['/user-auth/registration/verify-email/']: {
    /**
     * user-auth_registration_verify-email_create
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserAuthRegistrationVerifyEmailCreate.Responses.$201>
  }
  ['/user-auth/token/refresh/']: {
    /**
     * user-auth_token_refresh_create
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserAuthTokenRefreshCreate.Responses.$201>
  }
  ['/user-auth/token/verify/']: {
    /**
     * user-auth_token_verify_create - Takes a token and indicates if it is valid.  This view provides no
     * information about a token's fitness for a particular use.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserAuthTokenVerifyCreate.Responses.$201>
  }
  ['/user-auth/user/']: {
    /**
     * user-auth_user_read - Reads and updates UserModel fields
     * Accepts GET, PUT, PATCH methods.
     * 
     * Default accepted fields: username, first_name, last_name
     * Default display fields: pk, username, email, first_name, last_name
     * Read-only fields: pk, email
     * 
     * Returns UserModel fields.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserAuthUserRead.Responses.$200>
    /**
     * user-auth_user_update - Reads and updates UserModel fields
     * Accepts GET, PUT, PATCH methods.
     * 
     * Default accepted fields: username, first_name, last_name
     * Default display fields: pk, username, email, first_name, last_name
     * Read-only fields: pk, email
     * 
     * Returns UserModel fields.
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserAuthUserUpdate.Responses.$200>
    /**
     * user-auth_user_partial_update - Reads and updates UserModel fields
     * Accepts GET, PUT, PATCH methods.
     * 
     * Default accepted fields: username, first_name, last_name
     * Default display fields: pk, username, email, first_name, last_name
     * Read-only fields: pk, email
     * 
     * Returns UserModel fields.
     */
    'patch'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserAuthUserPartialUpdate.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
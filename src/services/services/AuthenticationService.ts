/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Session } from '../models/Session';
import type { SuccessReponse } from '../models/SuccessReponse';
import type { UserLoginInput } from '../models/UserLoginInput';
import type { UserSignUpInput } from '../models/UserSignUpInput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthenticationService {
  /**
   * Login User
   * @param requestBody
   * @returns SuccessReponse OK
   * @throws ApiError
   */
  public static postLoginUser(
    requestBody?: UserLoginInput,
  ): CancelablePromise<SuccessReponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/auth/login',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        401: `Unauthorized`,
        409: `Conflict`,
        500: `Server Internal Error.`,
      },
    });
  }
  /**
   * Sign Up User
   * @param requestBody
   * @returns SuccessReponse OK
   * @throws ApiError
   */
  public static postSignUpUser(
    requestBody?: UserSignUpInput,
  ): CancelablePromise<SuccessReponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/auth/signup',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Validation Error`,
        409: `Conflict`,
        500: `Server Internal Error.`,
      },
    });
  }
  /**
   * Get User Session
   * @returns Session OK
   * @throws ApiError
   */
  public static getCurrentSession(): CancelablePromise<Session> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/auth/session',
      errors: {
        401: `Unauthorized`,
        500: `Server Internal Error.`,
      },
    });
  }
  /**
   * Delete Current Session
   * @returns Session OK
   * @throws ApiError
   */
  public static deleteCurrentSession(): CancelablePromise<Session> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/auth/session',
      errors: {
        401: `Unauthorized`,
        500: `Server Internal Error.`,
      },
    });
  }
}

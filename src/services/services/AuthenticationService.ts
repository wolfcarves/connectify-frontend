/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserLoginInput } from '../models/UserLoginInput';
import type { UserLoginResponse } from '../models/UserLoginResponse';
import type { UserSignUpInput } from '../models/UserSignUpInput';
import type { UserSignupResponse } from '../models/UserSignupResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthenticationService {
    /**
     * Login User
     * @param requestBody
     * @returns UserLoginResponse Login successfully.
     * @throws ApiError
     */
    public static postLoginUser(
        requestBody?: UserLoginInput,
    ): CancelablePromise<UserLoginResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
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
     * @returns UserSignupResponse Signup successfully.
     * @throws ApiError
     */
    public static postSignUpUser(
        requestBody?: UserSignUpInput,
    ): CancelablePromise<UserSignupResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/signup',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation Error`,
                409: `Conflict`,
                500: `Server Internal Error.`,
            },
        });
    }
}

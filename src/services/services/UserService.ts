/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetUserProfileResponseSchema } from '../models/GetUserProfileResponseSchema';
import type { SuccessReponse } from '../models/SuccessReponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * Upload Profile Image
     * @returns SuccessReponse OK
     * @throws ApiError
     */
    public static postUploadUserProfileImage({
        formData,
    }: {
        /**
         * OK
         */
        formData?: {
            avatar?: any;
        },
    }): CancelablePromise<SuccessReponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/user/profile/avatar',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Validation Error`,
                401: `Unauthorized`,
                500: `Server Internal Error.`,
            },
        });
    }
    /**
     * Delete Profile Image
     * @returns SuccessReponse OK
     * @throws ApiError
     */
    public static deleteUserProfileImage(): CancelablePromise<SuccessReponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/user/profile/avatar',
            errors: {
                400: `Validation Error`,
                401: `Unauthorized`,
                500: `Server Internal Error.`,
            },
        });
    }
    /**
     * Get User Profile
     * @returns GetUserProfileResponseSchema OK
     * @throws ApiError
     */
    public static getUserProfile({
        userId,
        username,
    }: {
        userId?: number,
        username?: string,
    }): CancelablePromise<GetUserProfileResponseSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/user/profile',
            query: {
                'userId': userId,
                'username': username,
            },
            errors: {
                400: `Validation Error`,
                401: `Unauthorized`,
                500: `Server Internal Error.`,
            },
        });
    }
}

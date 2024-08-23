/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SuccessReponse } from '../models/SuccessReponse';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * Upload Profile Image
     * @param formData OK
     * @returns SuccessReponse OK
     * @throws ApiError
     */
    public static postUploadUserProfileImage(
        formData?: {
            avatar?: any;
        },
    ): CancelablePromise<SuccessReponse> {
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
     * @param userId
     * @param username
     * @returns any OK
     * @throws ApiError
     */
    public static getUserProfile(
        userId?: number,
        username?: string,
    ): CancelablePromise<{
        data: User;
    }> {
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

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
     * Get User Profile
     * @returns any OK
     * @throws ApiError
     */
    public static getUserProfile({
        userId,
        username,
    }: {
        userId?: number,
        username?: string,
    }): CancelablePromise<{
        data: User;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/profile',
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
    /**
     * Get Users
     * @returns any OK
     * @throws ApiError
     */
    public static getUsers({
        search,
        page,
        perPage,
    }: {
        search?: string,
        page?: number,
        perPage?: number,
    }): CancelablePromise<{
        data: Array<User>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users',
            query: {
                'search': search,
                'page': page,
                'per_page': perPage,
            },
            errors: {
                400: `Validation Error`,
                401: `Unauthorized`,
                500: `Server Internal Error.`,
            },
        });
    }
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
            url: '/api/v1/users/profile/avatar',
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
            url: '/api/v1/users/profile/avatar',
            errors: {
                400: `Validation Error`,
                401: `Unauthorized`,
                500: `Server Internal Error.`,
            },
        });
    }
}

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SuccessReponse } from '../models/SuccessReponse';
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
}

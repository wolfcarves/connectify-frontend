/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SuccessReponse } from '../models/SuccessReponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LikeService {
    /**
     * Like User Posts
     * @param postId
     * @returns SuccessReponse OK
     * @throws ApiError
     */
    public static postLikePost(
        postId: number,
    ): CancelablePromise<SuccessReponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/like/post/{postId}',
            path: {
                'postId': postId,
            },
            errors: {
                401: `Not Found`,
                500: `Server Internal Error.`,
            },
        });
    }
}

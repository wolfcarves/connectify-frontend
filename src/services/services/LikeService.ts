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
     * Like User Post
     * @returns SuccessReponse OK
     * @throws ApiError
     */
    public static postLikePost({
        postId,
    }: {
        postId: number,
    }): CancelablePromise<SuccessReponse> {
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
    /**
     * Like User Comment
     * @returns SuccessReponse OK
     * @throws ApiError
     */
    public static postLikeComment({
        commentId,
    }: {
        commentId: number,
    }): CancelablePromise<SuccessReponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/like/comment/{commentId}',
            path: {
                'commentId': commentId,
            },
            errors: {
                401: `Not Found`,
                500: `Server Internal Error.`,
            },
        });
    }
}

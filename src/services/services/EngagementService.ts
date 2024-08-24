/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Comment } from '../models/Comment';
import type { SuccessReponse } from '../models/SuccessReponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EngagementService {
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
            url: '/api/v1/post/like/{postId}',
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
     * Comment To User Posts
     * @param postId
     * @param requestBody
     * @returns SuccessReponse OK
     * @throws ApiError
     */
    public static postPostComment(
        postId: number,
        requestBody?: {
            comment: string;
        },
    ): CancelablePromise<SuccessReponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/post/comment/{postId}',
            path: {
                'postId': postId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Not Found`,
                500: `Server Internal Error.`,
            },
        });
    }
    /**
     * Get Post Comments
     * @param postId
     * @returns any OK
     * @throws ApiError
     */
    public static getPostComments(
        postId: number,
    ): CancelablePromise<{
        data: Array<Comment>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/post/comment/{postId}',
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

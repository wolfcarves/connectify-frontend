/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Comment } from '../models/Comment';
import type { Pagination } from '../models/Pagination';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CommentService {
    /**
     * Comment To User Posts
     * @param postId
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postPostComment(
        postId: number,
        requestBody?: {
            comment: string;
        },
    ): CancelablePromise<{
        data: {
            id: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/comment/post/{postId}',
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
     * @param page
     * @returns any OK
     * @throws ApiError
     */
    public static getPostComments(
        postId: number,
        page?: number,
    ): CancelablePromise<{
        data: Array<Comment>;
        pagination: Pagination;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/comment/post/{postId}',
            path: {
                'postId': postId,
            },
            query: {
                'page': page,
            },
            errors: {
                401: `Not Found`,
                500: `Server Internal Error.`,
            },
        });
    }
}

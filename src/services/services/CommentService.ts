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
     * @returns any OK
     * @throws ApiError
     */
    public static postPostComment({
        postId,
        commentId,
        requestBody,
    }: {
        postId?: number,
        commentId?: number,
        requestBody?: {
            content: string;
        },
    }): CancelablePromise<{
        data: {
            id: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/comment',
            query: {
                'postId': postId,
                'commentId': commentId,
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
     * @returns any OK
     * @throws ApiError
     */
    public static getPostComments({
        postId,
        commentId,
        page,
        perPage,
    }: {
        postId?: number,
        commentId?: number,
        page?: number,
        perPage?: number,
    }): CancelablePromise<{
        data: Array<Comment>;
        pagination: Pagination;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/comment',
            query: {
                'postId': postId,
                'commentId': commentId,
                'page': page,
                'perPage': perPage,
            },
            errors: {
                401: `Not Found`,
                500: `Server Internal Error.`,
            },
        });
    }
}

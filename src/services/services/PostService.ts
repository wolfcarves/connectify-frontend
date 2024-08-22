/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePostInput } from '../models/CreatePostInput';
import type { Post } from '../models/Post';
import type { SuccessReponse } from '../models/SuccessReponse';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PostService {
    /**
     * Create Post
     * @param requestBody OK
     * @returns SuccessReponse OK
     * @throws ApiError
     */
    public static postCreatePost(
        requestBody?: CreatePostInput,
    ): CancelablePromise<SuccessReponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/post',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation Error`,
                401: `Unauthorized`,
                500: `Server Internal Error.`,
            },
        });
    }
    /**
     * Get User Posts
     * @param userId
     * @returns any OK
     * @throws ApiError
     */
    public static getUserPosts(
        userId: number,
    ): CancelablePromise<{
        data: Array<{
            post: Post;
            user: User;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/post/all/{userId}',
            path: {
                'userId': userId,
            },
            errors: {
                401: `Not Found`,
                500: `Server Internal Error.`,
            },
        });
    }
    /**
     * Get User Post
     * @param postId
     * @returns any OK
     * @throws ApiError
     */
    public static getUserPost(
        postId: number,
    ): CancelablePromise<{
        data: {
            post: Post;
            user: User;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/post/{postId}',
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
     * Get User Posts
     * @param postId
     * @returns any OK
     * @throws ApiError
     */
    public static getUserPosts1(
        postId: number,
    ): CancelablePromise<{
        data: {
            post: Post;
            user: User;
        };
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/post/{postId}',
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

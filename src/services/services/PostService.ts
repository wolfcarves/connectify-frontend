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
     * @param username
     * @param page
     * @param perPage
     * @returns any OK
     * @throws ApiError
     */
    public static getUserPosts(
        username: string,
        page?: number,
        perPage?: number,
    ): CancelablePromise<{
        data: Array<{
            post: Post;
            user: User;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/post/all/{username}',
            path: {
                'username': username,
            },
            query: {
                'page': page,
                'per_page': perPage,
            },
            errors: {
                401: `Unauthorized`,
                500: `Server Internal Error.`,
            },
        });
    }
    /**
     * Get User Post
     * @param uuid
     * @returns any OK
     * @throws ApiError
     */
    public static getUserPost(
        uuid: string,
    ): CancelablePromise<{
        data: {
            post: Post;
            user: User;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/post/{uuid}',
            path: {
                'uuid': uuid,
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
    public static deleteUserPost(
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
    /**
     * Save User Post
     * @param postId
     * @returns SuccessReponse OK
     * @throws ApiError
     */
    public static saveUserPost(
        postId: number,
    ): CancelablePromise<SuccessReponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/post/save/{postId}',
            path: {
                'postId': postId,
            },
            errors: {
                401: `Not Found`,
                409: `Conflict`,
                500: `Server Internal Error.`,
            },
        });
    }
    /**
     * Unsave User Post
     * @param postId
     * @returns SuccessReponse OK
     * @throws ApiError
     */
    public static unSaveUserPost(
        postId: number,
    ): CancelablePromise<SuccessReponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/post/unsave/{postId}',
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

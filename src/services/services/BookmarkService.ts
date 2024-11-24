/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Bookmark } from '../models/Bookmark';
import type { SuccessReponse } from '../models/SuccessReponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BookmarkService {
    /**
     * Get Save Posts | Get Bookmarks
     * @param page
     * @param perPage
     * @returns any OK
     * @throws ApiError
     */
    public static getBookmarks(
        page?: number,
        perPage?: number,
    ): CancelablePromise<{
        data: Array<Bookmark>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/bookmark/posts',
            query: {
                'page': page,
                'per_page': perPage,
            },
            errors: {
                401: `Not Found`,
                409: `Conflict`,
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
            url: '/api/v1/bookmark/post/save/{postId}',
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
            url: '/api/v1/bookmark/post/unsave/{postId}',
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

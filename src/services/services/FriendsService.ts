/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Friend } from '../models/Friend';
import type { FriendRequest } from '../models/FriendRequest';
import type { FriendSuggestion } from '../models/FriendSuggestion';
import type { SuccessReponse } from '../models/SuccessReponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FriendsService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getFriendSuggestions(): CancelablePromise<{
        data: Array<FriendSuggestion>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/friends/suggestions',
            errors: {
                500: `Server Internal Error.`,
            },
        });
    }
    /**
     * @returns SuccessReponse OK
     * @throws ApiError
     */
    public static sendFriendRequest({
        receiverId,
    }: {
        receiverId: number,
    }): CancelablePromise<SuccessReponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/friends/request/send/{receiverId}',
            path: {
                'receiverId': receiverId,
            },
            errors: {
                401: `Not Found`,
                500: `Server Internal Error.`,
            },
        });
    }
    /**
     * @returns SuccessReponse OK
     * @throws ApiError
     */
    public static cancelFriendRequest({
        requesterId,
    }: {
        requesterId: number,
    }): CancelablePromise<SuccessReponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/friends/request/cancel/{requesterId}',
            path: {
                'requesterId': requesterId,
            },
            errors: {
                400: `Bad Request Error`,
                401: `Not Found`,
                500: `Server Internal Error.`,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getFriendRequests(): CancelablePromise<{
        data: Array<FriendRequest>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/friends/requests',
            errors: {
                500: `Server Internal Error.`,
            },
        });
    }
    /**
     * @returns SuccessReponse OK
     * @throws ApiError
     */
    public static acceptFriendRequest({
        friendId,
    }: {
        friendId: number,
    }): CancelablePromise<SuccessReponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/friends/request/accept/{friendId}',
            path: {
                'friendId': friendId,
            },
            errors: {
                401: `Not Found`,
                500: `Server Internal Error.`,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getFriendList({
        userId,
    }: {
        userId: number,
    }): CancelablePromise<{
        data: Array<Friend>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/friends/list/{userId}',
            path: {
                'userId': userId,
            },
            errors: {
                500: `Server Internal Error.`,
            },
        });
    }
    /**
     * @returns SuccessReponse OK
     * @throws ApiError
     */
    public static unfriendUser({
        friendId,
    }: {
        friendId: number,
    }): CancelablePromise<SuccessReponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/friends/remove/{friendId}',
            path: {
                'friendId': friendId,
            },
            errors: {
                401: `Not Found`,
                500: `Server Internal Error.`,
            },
        });
    }
}

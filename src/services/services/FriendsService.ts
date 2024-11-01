/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
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
        data: Array<{
            id: number;
            avatar: string;
            name: string;
            username: string;
            status: 'accepted' | 'pending';
        }>;
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
     * @param receiverId
     * @returns SuccessReponse OK
     * @throws ApiError
     */
    public static sendFriendRequest(
        receiverId: string,
    ): CancelablePromise<SuccessReponse> {
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
     * @param receiverId
     * @returns SuccessReponse OK
     * @throws ApiError
     */
    public static cancelFriendRequest(
        receiverId: string,
    ): CancelablePromise<SuccessReponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/friends/request/cancel/{receiverId}',
            path: {
                'receiverId': receiverId,
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
        data: {
            id: number;
            user: {
                id: number;
                name: string;
                avatar: string;
            };
            created_at: string;
            status: 'accepted' | 'pending';
        };
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
     * @param friendId
     * @returns SuccessReponse OK
     * @throws ApiError
     */
    public static acceptFriendRequest(
        friendId: string,
    ): CancelablePromise<SuccessReponse> {
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
    public static getFriendList(): CancelablePromise<{
        data: {
            id: number;
            user: {
                id: number;
                name: string;
                avatar: string;
            };
            created_at: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/friends/list',
        });
    }
    /**
     * @param friendId
     * @returns SuccessReponse OK
     * @throws ApiError
     */
    public static unfriendUser(
        friendId: string,
    ): CancelablePromise<SuccessReponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/friends/remove/{friendId}',
            path: {
                'friendId': friendId,
            },
        });
    }
}

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Chat } from '../models/Chat';
import type { ChatMessage } from '../models/ChatMessage';
import type { ChatSendMessageInput } from '../models/ChatSendMessageInput';
import type { ChatSendMessageResponse } from '../models/ChatSendMessageResponse';
import type { Pagination } from '../models/Pagination';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ChatService {
    /**
     * Create Chat
     * @returns any OK
     * @throws ApiError
     */
    public static postCreateChat({
        recipientId,
    }: {
        recipientId: number,
    }): CancelablePromise<{
        data: {
            chat_id: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/chats/create/{recipientId}',
            path: {
                'recipientId': recipientId,
            },
            errors: {
                400: `Bad Request Error`,
                401: `Not Found`,
                500: `Server Internal Error.`,
            },
        });
    }
    /**
     * Get Chat List
     * @returns any OK
     * @throws ApiError
     */
    public static getChats({
        page,
        perPage,
    }: {
        page?: number,
        perPage?: number,
    }): CancelablePromise<{
        data: Array<Chat>;
        pagination: Pagination;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/chats',
            query: {
                'page': page,
                'per_page': perPage,
            },
            errors: {
                400: `Bad Request Error`,
                401: `Not Found`,
                500: `Server Internal Error.`,
            },
        });
    }
    /**
     * Get Chat Messages
     * @returns any OK
     * @throws ApiError
     */
    public static getChatMessages({
        chatId,
    }: {
        chatId: number,
    }): CancelablePromise<{
        data: Array<ChatMessage>;
        pagination: Pagination;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/chats/{chatId}',
            path: {
                'chatId': chatId,
            },
            errors: {
                400: `Bad Request Error`,
                401: `Not Found`,
                500: `Server Internal Error.`,
            },
        });
    }
    /**
     * Send Chat Message
     * @returns any OK
     * @throws ApiError
     */
    public static postChatSendMessage({
        chatId,
        requestBody,
    }: {
        chatId: number,
        /**
         * OK
         */
        requestBody?: ChatSendMessageInput,
    }): CancelablePromise<{
        data: ChatSendMessageResponse;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/chats/send/{chatId}',
            path: {
                'chatId': chatId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request Error`,
                401: `Not Found`,
                500: `Server Internal Error.`,
            },
        });
    }
}

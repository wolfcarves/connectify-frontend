/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Reply } from '../models/Reply';
import type { SuccessReponse } from '../models/SuccessReponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReplyService {
    /**
     * Reply To User Comment
     * @param commentId
     * @param requestBody
     * @returns SuccessReponse OK
     * @throws ApiError
     */
    public static postPostReply(
        commentId: number,
        requestBody?: {
            reply: string;
        },
    ): CancelablePromise<SuccessReponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/reply/comment/{commentId}',
            path: {
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
     * Get Comment Replies
     * @param commentId
     * @returns any OK
     * @throws ApiError
     */
    public static getCommentReplies(
        commentId: number,
    ): CancelablePromise<{
        data: Array<Reply>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/reply/comment/{commentId}',
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

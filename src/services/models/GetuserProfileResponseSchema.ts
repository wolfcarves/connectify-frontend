/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from './User';
export type GetUserProfileResponseSchema = {
    data: (User & {
        is_friend: boolean;
        has_request: boolean;
        request_from?: 'us' | 'them' | null;
    });
};


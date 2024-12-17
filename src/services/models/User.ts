/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type User = {
    id: number;
    avatar: string;
    email: string;
    name: string;
    username: string;
    friends_count: number;
    is_friend: boolean;
    has_request: boolean;
    request_from?: 'us' | 'them' | null;
    created_at: string;
    updated_at: string;
};


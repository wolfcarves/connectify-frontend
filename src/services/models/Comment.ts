/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommentInput } from './CommentInput';
export type Comment = (CommentInput & {
    content?: string;
    id: number;
    user: {
        id: number;
        avatar: string;
        name: string;
        username: string;
    };
    is_liked: boolean;
    likes_count: number;
    replies_count: number;
    created_at: string;
    updated_at: string;
});


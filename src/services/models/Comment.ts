/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommentInput } from './CommentInput';
export type Comment = (CommentInput & {
    comment?: string;
    id: number;
    user: {
        id: number;
        avatar: string;
        name: string;
        username: string;
    };
    created_at: string;
    updated_at: string;
});


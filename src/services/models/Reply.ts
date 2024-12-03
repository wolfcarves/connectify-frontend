/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReplyInput } from './ReplyInput';
export type Reply = (ReplyInput & {
    id: number;
    user: {
        id: number;
        avatar: string;
        name: string;
        username: string;
    };
    reply: string;
    created_at: string;
    updated_at: string;
});


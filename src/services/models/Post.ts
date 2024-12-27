/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Audience } from './Audience';
export type Post = {
    content: string;
    audience: Audience;
    id: number;
    uuid: string;
    is_saved: boolean;
    is_liked: boolean;
    likes_count: number;
    comments_count: number;
    images: Array<{
        image: string;
        created_at: string;
        updated_at: string;
    }>;
    created_at: string;
    updated_at: string;
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Post = {
    content: string;
    audience?: 'public' | 'friends' | 'private';
    id: number;
    uuid: string;
    is_saved: boolean;
    is_liked: boolean;
    images: Array<{
        image: string;
        created_at: string;
        updated_at: string;
    }>;
    created_at: string;
    updated_at: string;
};


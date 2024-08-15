/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreatePostInput = {
    content: string;
    audience?: CreatePostInput.audience;
};
export namespace CreatePostInput {
    export enum audience {
        PUBLIC = 'public',
        PRIVATE = 'private',
    }
}


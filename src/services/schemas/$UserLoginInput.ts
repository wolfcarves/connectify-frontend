/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserLoginInput = {
    properties: {
        username: {
            type: 'string',
            isRequired: true,
            maxLength: 100,
            minLength: 1,
        },
        password: {
            type: 'string',
            isRequired: true,
            maxLength: 100,
            minLength: 1,
        },
    },
} as const;

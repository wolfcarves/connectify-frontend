/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserSignUpInput = {
    type: 'all-of',
    contains: [{
        type: 'User',
    }, {
        properties: {
            confirm_password: {
                type: 'string',
                isRequired: true,
            },
        },
    }],
} as const;

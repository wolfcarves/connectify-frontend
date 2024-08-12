/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ValidationError = {
    properties: {
        message: {
            type: 'string',
            isRequired: true,
        },
        statusCode: {
            type: 'number',
            isRequired: true,
        },
        validationError: {
            type: 'array',
            contains: {
                properties: {
                    validation: {
                        type: 'string',
                        isRequired: true,
                    },
                    code: {
                        type: 'string',
                        isRequired: true,
                    },
                    message: {
                        type: 'string',
                        isRequired: true,
                    },
                    path: {
                        type: 'array',
                        contains: {
                            type: 'string',
                        },
                        isRequired: true,
                    },
                },
            },
            isRequired: true,
        },
    },
} as const;

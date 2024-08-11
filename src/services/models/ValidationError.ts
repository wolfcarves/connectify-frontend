/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ValidationError = {
    message: string;
    statusCode: number;
    validationError: Array<{
        validation: string;
        code: string;
        message: string;
        path: Array<string>;
    }>;
};


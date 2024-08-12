/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SuccessReponse } from './SuccessReponse';
export type SessionResponse = (SuccessReponse & {
    id: number;
    data: {
        email: string;
        username: string;
    };
});


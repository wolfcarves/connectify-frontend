/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from './User';
export type GetuserProfileResponseSchema = {
    data: (User & {
        isFriend: boolean;
        hasRequest: boolean;
        requestFrom?: 'us' | 'them' | null;
    });
};


/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Pagination } from '../models/Pagination';
import type { Post } from '../models/Post';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FeedService {
  /**
   * Get Feed World Posts
   * @returns any OK
   * @throws ApiError
   */
  public static getFeedWorldPosts({
    page,
    per_page,
  }: {
    page?: number;
    per_page?: number;
  }): CancelablePromise<{
    data: Array<{
      post: Post;
      user: User;
    }>;
    pagination: Pagination;
  }> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/feed/posts/world',
      query: {
        page: page,
        per_page: per_page,
      },
      errors: {
        401: `Not Found`,
        500: `Server Internal Error.`,
      },
    });
  }
  /**
   * Get Feed Friends Posts
   * @returns any OK
   * @throws ApiError
   */
  public static getFeedFriendsPosts({
    page,
    per_page,
  }: {
    page?: number;
    per_page?: number;
  }): CancelablePromise<{
    data: Array<{
      post: Post;
      user: User;
    }>;
  }> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/feed/posts/friends',
      query: {
        page: page,
        per_page: per_page,
      },
      errors: {
        401: `Not Found`,
        500: `Server Internal Error.`,
      },
    });
  }
}

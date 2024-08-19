import { PostService } from '@/services';

export default async function fetchAllUserPosts(userId: number) {
  const response = await PostService.getUserPosts(userId);

  return response.data;
}

import { create } from 'zustand';

interface LikedPostsStore {
  postIds: number[];
  updatePostIds: (postId: number) => void;
}

export const useLikedPostsStore = create<LikedPostsStore>(set => ({
  postIds: [],
  updatePostIds: postId =>
    set(state => {
      if (state.postIds.includes(postId))
        return { postIds: state.postIds.filter(id => id !== postId) };

      return {
        postIds: [...state.postIds, postId],
      };
    }),
}));

'use client';

import React from 'react';
import PostCard from '@/components/modules/Post/PostCard';
import { Post } from '@/services';

type FeedPostsProps = {
  data?: Post[];
};

const FeedPosts = ({ data }: FeedPostsProps) => {
  return (
    <>
      {/* {data?.map(props => {
        return <UserPostCard key={props.id} {...props} />;
      })} */}
    </>
  );
};

export default FeedPosts;

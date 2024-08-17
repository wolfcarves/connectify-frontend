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
      <PostCard
        id={1}
        user_id={5}
        audience="public"
        content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci inventore dolor earum autem temporibus cum dignissimos, impedit blanditiis minima delectus aut facere perferendis, voluptate provident?"
        likes={0}
        comments={0}
        shares={0}
      />

      {/* {data?.map(props => {
        return <UserPostCard key={props.id} {...props} />;
      })} */}
    </>
  );
};

export default FeedPosts;

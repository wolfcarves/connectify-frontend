'use client';

import React from 'react';
import UserPostCard from './UserPostCard';
import { Post } from '@/services';

type UserPostsProps = {
  data?: Post[];
};

const UserPosts = ({ data }: UserPostsProps) => {
  return (
    <>
      {data?.map(props => {
        return <UserPostCard key={props.id} {...props} />;
      })}
    </>
  );
};

export default UserPosts;

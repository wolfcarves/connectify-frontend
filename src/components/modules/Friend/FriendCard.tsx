import React from 'react';
import { User as UserType } from '@/services/models/User';
import User from '../User/User';

interface FriendCardProps
  extends Pick<UserType, 'id' | 'avatar' | 'name' | 'username'> {}

const FriendCard = ({ id, avatar, name, username }: FriendCardProps) => {
  return (
    <div
      key={id}
      className="flex gap-2 items-center bg-card border h-max rounded-2xl p-3"
    >
      <User avatar={avatar} name={name} username={username} />
    </div>
  );
};

export default FriendCard;

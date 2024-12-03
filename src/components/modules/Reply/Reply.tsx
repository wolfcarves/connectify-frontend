import React from 'react';
import { Reply as ReplyProps } from '@/services';
import { ReplyCard } from './ReplyCard';

const Reply = ({ data }: { data?: ReplyProps }) => {
  return (
    <ReplyCard>
      <ReplyCard.Content
        avatar={data?.user.avatar}
        username={data?.user.username}
        name={data?.user.name}
        reply={data?.reply}
      />
      <ReplyCard.Action />
    </ReplyCard>
  );
};

export default Reply;

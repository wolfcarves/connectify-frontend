import ReplyInput from '@/components/modules/Reply/ReplyInput';
import React from 'react';

const ReplyCreateForm = ({ avatar }: { avatar: string }) => {
  return (
    <>
      <ReplyInput avatar={avatar} />
    </>
  );
};

export default ReplyCreateForm;

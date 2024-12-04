import ReplyInput from '@/components/modules/Reply/ReplyInput';
import React from 'react';

const ReplyCreateForm = ({
  avatar,
  isLoading,
}: {
  avatar: string;
  isLoading?: boolean;
}) => {
  if (isLoading) return <></>;

  return (
    <>
      <ReplyInput avatar={avatar} />
    </>
  );
};

export default ReplyCreateForm;

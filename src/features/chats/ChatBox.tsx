import React from 'react';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import { IoMdArrowRoundBack } from 'react-icons/io';

const ChatBox = ({ onBackClick }: { onBackClick: () => void }) => {
  return (
    <div className="p-3">
      <div className="flex gap-x-2 items-center">
        <Button
          size="icon"
          icon={<IoMdArrowRoundBack size={20} />}
          variant="ghost"
          onClick={onBackClick}
        />

        <Typography.Span title="Rodel Crisosto" />
      </div>
    </div>
  );
};

export default ChatBox;

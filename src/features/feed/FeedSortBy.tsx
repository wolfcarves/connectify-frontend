'use client';

import React from 'react';
import Divider from '@/components/common/Divider/Divider';
import Typography from '@/components/ui/typography';
import { MdArrowDropDown } from 'react-icons/md';
import { Button } from '@/components/ui/button';

const FeedSortBy = () => {
  return (
    <div className="flex items-center py-2">
      <Divider />
      <div className="flex items-center min-w-max ps-4 pe-1">
        <Typography.Span
          title="Sort by:"
          size="sm"
          weight="semibold"
          color="muted"
        />

        <Button
          variant="opacity"
          size="xxs"
          className="group flex items-center px-1"
        >
          <Typography.Span
            title="World"
            size="sm"
            weight="bold"
            color="muted"
          />
          <MdArrowDropDown className="text-muted group-hover:opacity-80 -ms-1" />
        </Button>
      </div>
    </div>
  );
};

export default FeedSortBy;

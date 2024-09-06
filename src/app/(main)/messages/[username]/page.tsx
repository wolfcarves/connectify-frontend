'use client';

import React from 'react';
import Avatar from '@/components/common/Avatar/Avatar';
import { Button } from '@/components/ui/button';
import { DotsThreeOutline } from '@phosphor-icons/react';

const MessageByUsernamePage = () => {
  return (
    <div className="relative flex flex-col flex-1 h-full">
      <header>
        <div className="flex justify-between items-center border-b py-4">
          <div className="flex gap-2 items-center">
            <Avatar
              src="https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-6/426478588_1067297597823198_6531849147015316511_n.png?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFWJ4PUrQ3qshOwomMpWbM6NobuTV87syQ2hu5NXzuzJB7j1Ws2Q59yYpeITMcH2mSlnqUu2uBlR73RE9fHwQnA&_nc_ohc=1dfrInjQIIwQ7kNvgEz5Ocd&_nc_ht=scontent.fmnl4-7.fna&_nc_gid=Ay09rLWoSsWtTu_erpQhd1H&oh=00_AYAcNElT0DtTm6j-mGxlAItguD3v8ah0T3fHTobtauc0dA&oe=66E0DFA6"
              size="base"
            />

            <span className="font-medium">Rodel Crisosto</span>
          </div>
          <Button variant="ghost" icon={<DotsThreeOutline size={18} />} />
        </div>
      </header>

      <div className="flex-1 w-full"></div>

      <div>
        <textarea
          className="bg-accent text-sm w-full min-h-12 rounded-2xl resize-none focus:outline-0 focus:ring-1 focus:ring-offset-4 focus:ring-border scroll-smooth scrollbar-thumb-foreground/10 scrollbar-track-foreground/0 scrollbar-thin px-4 pt-4"
          placeholder="Type something..."
        />
      </div>
    </div>
  );
};

export default MessageByUsernamePage;

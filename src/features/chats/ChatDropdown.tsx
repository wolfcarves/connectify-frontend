import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useClickOutside } from '@mantine/hooks';
import { TbMessageCircle, TbMessageCircleFilled } from 'react-icons/tb';
import Chats from './Chats';
import ChatBox from './ChatBox';

const ChatDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>();
  const [roomId, setRoomId] = useState<string>();
  const [isChatBoxOpen, setIsChatBoxOpen] = useState<boolean>(false);

  const popupRef = useClickOutside(() => setIsDropdownOpen(false));

  return (
    <div className="relative">
      <Button
        size="icon"
        variant={isDropdownOpen ? 'default' : 'secondary'}
        className="text-xs focus-visible:ring-0 focus-visible:ring-offset-0"
        icon={
          isDropdownOpen ? (
            <TbMessageCircleFilled size={20} />
          ) : (
            <TbMessageCircle size={20} />
          )
        }
        onClick={() => setIsDropdownOpen(true)}
      />

      <div
        ref={popupRef}
        className={`${!isDropdownOpen && 'hidden'} flex absolute right-0 top-12 w-[380px] h-[calc(100vh-15rem)] border bg-background-light rounded-xl overflow-hidden`}
      >
        <div
          className={`min-w-[380px] duration-200 ${isChatBoxOpen && '-translate-x-full'}`}
        >
          <Chats
            onMessageClick={(e, userId, roomId) => {
              setUserId(userId);
              setRoomId(roomId);
              setIsChatBoxOpen(true);
            }}
          />
        </div>

        <div
          className={`flex flex-col min-w-[380px] h-full duration-200 ${isChatBoxOpen && '-translate-x-full'}`}
        >
          <ChatBox
            userId={userId}
            roomId={roomId}
            onBackClick={() => setIsChatBoxOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatDropdown;

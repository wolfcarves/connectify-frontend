'use client';

import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';
import User from '@/components/modules/User/User';
import useDestroySession from '@/hooks/mutations/useDestroySession';
import Spinner from '@/components/ui/spinner';
import { CiSettings } from 'react-icons/ci';
import Typography from '@/components/ui/typography';
import { RxExit } from 'react-icons/rx';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { RiNotification2Line } from 'react-icons/ri';
import { LuBookmark } from 'react-icons/lu';

const HeaderMenu = () => {
  const { isPending } = useGetCurrentSession();

  return (
    <div className="flex items-center gap-x-4">
      {!isPending && (
        <div className="flex items-center gap-x-3">
          <Button
            variant="tertiary"
            icon={<RiNotification2Line size={18} />}
            size="icon"
          />
          <Button
            variant="tertiary"
            icon={<LuBookmark size={18} />}
            size="icon"
          />
        </div>
      )}

      <HeaderMenuProfileDropdown />
    </div>
  );
};

const HeaderMenuProfileDropdown = () => {
  const { data, isPending } = useGetCurrentSession();
  const { avatar, name, username } = data || {};

  const {
    mutateAsync: destroySessionMutate,
    isPending: isDestroySessionLoading,
  } = useDestroySession();

  const handleLogout = async () => {
    try {
      await destroySessionMutate();
    } catch (error) {}
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {!isPending ? (
          <button className="flex items-center gap-x-2 hover:opacity-80 focus-visible:outline-none">
            <User
              avatar={avatar}
              name={name}
              username={username}
              clickable={false}
            />
            <RiArrowDownSLine className="text-md mt-0.5" />
          </button>
        ) : (
          <div className="flex gap-x-5">
            <div className="flex items-center gap-x-2">
              <Skeleton className="w-10 h-10 rounded-md" />
              <Skeleton className="w-10 h-10 rounded-md" />
            </div>

            <div className="flex items-center gap-x-2">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="w-32 h-4 rounded-full" />
            </div>
          </div>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[250px] rounded-lg">
        <Link href={`/${username}`}>
          <DropdownMenuItem>
            <div>
              <User
                avatar={avatar}
                name={name}
                username={username}
                clickable={false}
              />
            </div>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <Link href="/account-settings">
          <DropdownMenuItem className="p-2.5">
            <div className="flex gap-x-2 items-center ">
              <CiSettings size={24} className="w-6" />
              <Typography.Span title="Settings" weight="medium" size="sm" />
            </div>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem className="p-2.5" onClick={handleLogout}>
          <div className="flex gap-x-2 items-center">
            {isDestroySessionLoading ? (
              <Spinner />
            ) : (
              <RxExit size={20} className="w-6" />
            )}
            Logout
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderMenu;

/*
 <div className="absolute right-0 w-[380px] h-[calc(100vh-15rem)] border bg-background-light rounded-xl">
        <div className="p-2">
          <Typography.Span
            title="Messages"
            color="muted"
            className="uppercase"
            weight="medium"
            size="sm"
          />
        </div>

        <button className="flex items-center gap-x-2 w-full hover:bg-muted/50 p-3">
          <Avatar src={avatar} size="lg" />
          <Typography.Span
            title="Rodel Crisosto likes your post"
            className="line-clamp-3"
          />
        </button>
      </div>  
*/

/*
  <Dropdown
          isOpen={isChatDropdownOpen}
          setIsOpen={setIsChatDropdownOpen}
          trigger={
            <Button
              size="icon"
              variant={isChatDropdownOpen ? 'primary' : 'secondary'}
              className="text-xs focus-visible:ring-0 focus-visible:ring-offset-0"
              icon={
                isChatDropdownOpen ? (
                  <TbMessageCircleFilled size={20} />
                ) : (
                  <TbMessageCircle size={20} />
                )
              }
              onClick={() => setIsChatDropdownOpen(true)}
            />
          }
        >
          <Dropdown.Content
            visible={!isConversationOpen}
            out="left"
            className="min-w-[380px]"
          >
            <Chats
              onChatClick={chatId => {
                setChatId(chatId);
                setIsConversationOpen(true);
              }}
            />
          </Dropdown.Content>

          <Dropdown.Content
            visible={isConversationOpen}
            className="min-w-[380px]"
          >
            <ChatMessages chatId={chatId} onBackClick={setIsConversationOpen} />
          </Dropdown.Content>
        </Dropdown>

*/

// const HeaderMenuNotificationsDropdown = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const popupRef = useClickOutside(() => setIsOpen(false));

//   return (
//     <div className="relative">
//       <Button
//         size="icon"
//         variant={isOpen ? 'default' : 'secondary'}
//         className="text-xs focus-visible:ring-0 focus-visible:ring-offset-0"
//         onClick={() => setIsOpen(true)}
//         icon={isOpen ? <PiBellFill size={20} /> : <PiBell size={20} />}
//       />

//       <div
//         ref={popupRef}
//         className={`${!isOpen && 'hidden'} absolute right-0 top-12 w-[380px] h-[calc(100vh-15rem)] border bg-background-light rounded-xl`}
//       >
//         <div className="p-2">
//           <Typography.Span
//             title="Notifications"
//             color="muted"
//             className="uppercase"
//             weight="medium"
//             size="sm"
//           />
//         </div>

//         <button className="flex items-center gap-x-2 w-full hover:bg-muted/50 p-3">
//           <Avatar src={avatar} size="lg" />
//           <Typography.Span
//             title="Rodel Crisosto likes your post"
//             className="line-clamp-3"
//           />
//         </button>
//       </div>
//     </div>
//   );
// };

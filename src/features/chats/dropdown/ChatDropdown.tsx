import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, Dispatch, ReactNode, SetStateAction } from 'react';
import { useClickOutside } from '@mantine/hooks';
import Chat from '@/components/modules/Chat/Chat/Chat';
import ChatContainer from '@/components/modules/Chat/Chat/ChatContainer';
import useGetChats from '@/hooks/queries/useGetChats';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from '@/components/common/Input';
import Typography from '@/components/ui/typography';
import useGetUsers from '@/hooks/queries/useGetUsers';
import _ from 'lodash';

interface ChatDropdownProps {
  trigger: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const schema = z.object({
  search: z.string(),
});

type ChatSearchInput = z.infer<typeof schema>;

const ChatDropdown = ({ trigger, isOpen, setIsOpen }: ChatDropdownProps) => {
  const [chatId, setChatId] = useState<number>();
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const popupRef = useClickOutside(() => setIsOpen(false));

  const { data: chats } = useGetChats();
  const {
    data: users,
    isLoading: isUsersLoading,
    isRefetching: isUsersRefetching,
  } = useGetUsers(searchValue);

  const methods = useForm<ChatSearchInput>();

  const { handleSubmit, control } = methods;

  const updateSearchValue = useMemo(
    () =>
      _.debounce((search: string) => {
        setSearchValue(search);
        setIsTyping(false);
      }, 1000),
    [],
  );

  useEffect(() => {
    return () => {
      updateSearchValue.cancel();
    };
  }, [updateSearchValue]);

  useEffect(() => {
    if (search) setIsTyping(true);
  }, [search]);

  const handleSearch = (data: ChatSearchInput) => {
    setSearchValue(data.search);
    updateSearchValue.cancel();
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    updateSearchValue(value);
  };

  const handleChatClick = (chatId: number) => {
    setChatId(chatId);
  };

  const hasResults =
    users && users?.data.length > 0 && !isUsersLoading && search;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleSearch)}>
        <div className="relative">
          {trigger}

          <div
            ref={popupRef}
            className={`${!isOpen && 'hidden'} absolute right-0 top-12 w-[380px] h-[calc(100vh-15rem)] border bg-background-light rounded-xl overflow-hidden`}
          >
            <ChatContainer
              className={`min-w-[380px] duration-200 ${chatId && '-translate-x-full'}`}
              isLoading={isUsersLoading || isUsersRefetching || isTyping}
            >
              <div className="p-2.5 space-y-2">
                <Typography.Span
                  title="Messages"
                  className="uppercase"
                  color="muted"
                  size="sm"
                  weight="medium"
                />

                <Input
                  type="text"
                  name="search"
                  control={control}
                  placeholder="Search friends or people"
                  autoComplete="off"
                  value={search}
                  onChange={handleSearchChange}
                />
              </div>

              {search && (
                <div className="px-2">
                  <Typography.Span
                    title={hasResults ? `Results for "${search}"` : 'No result'}
                    color="muted"
                    size="sm"
                  />
                </div>
              )}

              {search &&
                users?.data?.map(user => {
                  return (
                    <Chat
                      key={user?.id}
                      id={user.id}
                      avatar={user.avatar}
                      name={user.name}
                    />
                  );
                })}

              {!search &&
                chats?.data?.map(chat => {
                  return (
                    <Chat
                      key={chat?.id}
                      {...chat}
                      onClick={() => handleChatClick(chat?.id)}
                    />
                  );
                })}
            </ChatContainer>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default ChatDropdown;

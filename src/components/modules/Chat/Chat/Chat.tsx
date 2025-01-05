/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, {
  ChangeEvent,
  ComponentProps,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Chat as ChatType, User } from '@/services';
import Input from '@/components/common/Input';
import _ from 'lodash';
import useGetUsers from '@/hooks/queries/useGetUsers';
import Avatar from '@/components/common/Avatar/Avatar';
import Typography from '@/components/ui/typography';
import socket from '@/lib/socket';
import { parseDate } from '@/utils/parseDate';

const Chat = ({ ...props }: ComponentProps<'div'>) => {
  return <div {...props} />;
};

interface ChatUserProps
  extends Omit<ChatType, 'latest_message' | 'latest_message_at'> {
  latest_message?: string;
  latest_message_at?: string;
  onClick?: () => void;
}

const ChatUser = ({
  id,
  avatar,
  name,
  latest_message,
  latest_message_at,
  is_read,
  onClick,
}: ChatUserProps) => {
  const timestamp = useMemo(
    () => (latest_message_at ? parseDate(latest_message_at, false) : ''),
    [latest_message_at],
  );

  useEffect(() => {
    socket.emit('join_chat', String(id));

    return () => {
      socket.emit('leave_chat', String(id));
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className="relative w-full hover:bg-accent rounded-sm py-2 px-1"
        onClick={onClick}
      >
        <div className="flex w-full gap-x-2.5">
          <Avatar src={avatar} size="lg" />

          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col text-start w-full">
              <Typography.Span
                title={name}
                className="line-clamp-1 my-auto"
                weight="medium"
              />

              {latest_message && (
                <div className="flex justify-between">
                  <Typography.Span
                    title={latest_message}
                    color="muted"
                    size="sm"
                    className="line-clamp-1"
                    weight={is_read ? 'medium' : 'semibold'}
                  />

                  <Typography.Span
                    title={timestamp}
                    color="muted"
                    size="sm"
                    weight={is_read ? 'medium' : 'semibold'}
                    className="pe-2"
                  />
                </div>
              )}
            </div>

            {!is_read && (
              <div className="bg-blue-500 w-2 h-2 rounded-full me-1" />
            )}
          </div>
        </div>
      </button>
    </>
  );
};

const ChatHeader = ({ children }: { children: ReactNode }) => {
  return <div className="space-y-2 px-3">{children}</div>;
};

interface ChatSearchProps {
  typingStatus?: (status: boolean) => void;
  onResultChange?: (data: User[], isLoading: boolean) => void;
  onSearchTextChange?: (search: string) => void;
}

const ChatSearch = ({
  typingStatus,
  onResultChange,
  onSearchTextChange,
}: ChatSearchProps) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const {
    data: users,
    isLoading: isUsersLoading = true,
    isRefetching: isRefetchingUsers = true,
  } = useGetUsers(searchValue);

  const updateSearchValue = useMemo(
    () =>
      _.debounce((search: string) => {
        setSearchValue(search);
        typingStatus?.(false);
      }, 1000),
    [],
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearchTextChange?.(value);
    updateSearchValue(value);
  };

  useEffect(() => {
    if (search) onResultChange?.([], true);
    else onResultChange?.([], false);
  }, [search]);

  useEffect(() => {
    onResultChange?.(users?.data ?? [], isUsersLoading || isRefetchingUsers);
  }, [users, isUsersLoading, isRefetchingUsers]);

  return (
    <div className="pb-2">
      <Input
        type="text"
        placeholder="Search friends or people"
        autoComplete="off"
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );
};

Chat.Search = ChatSearch;
Chat.Header = ChatHeader;
Chat.User = ChatUser;

export default Chat;

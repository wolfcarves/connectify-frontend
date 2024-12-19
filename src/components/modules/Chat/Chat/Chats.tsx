import { useState } from 'react';
import Chat from '@/components/modules/Chat/Chat/Chat';
import ChatContainer from '@/components/modules/Chat/Chat/ChatContainer';
import useGetChats from '@/hooks/queries/useGetChats';
import Typography from '@/components/ui/typography';
import { User } from '@/services';
import ChatSkeleton from '@/components/modules/Chat/Chat/ChatSkeleton';
import useCreateChat from '@/hooks/mutations/useCreateChat';

interface ChatsProps {
  onChatClick?: (chatId: number) => void;
}

const Chats = ({ onChatClick }: ChatsProps) => {
  const [search, setSearch] = useState<string>('');
  const [searchResults, setSearchResults] = useState<User[] | undefined>([]);
  const [hasResults, setHasResults] = useState<boolean>(false);
  const [isResultsLoading, setIsResultLoading] = useState<boolean>(false);
  const [chatId, setChatId] = useState<number>();

  const { data: chats, isPending: isChatsLoading } = useGetChats();
  const { mutateAsync: createChat, isPending: isCreateChatLoading } =
    useCreateChat();

  const handleInitiateChat = async (recipientId: number) => {
    const chatId = await createChat(recipientId);
    setChatId(chatId);
    onChatClick?.(chatId);
  };

  const handleChatClick = (chatId: number) => {
    setChatId(chatId);
    onChatClick?.(chatId);
  };

  return (
    <ChatContainer>
      <Chat.Header>
        <Typography.Span
          title="Messages"
          className="uppercase"
          color="muted"
          size="sm"
          weight="medium"
        />
        <Chat.Search
          onResultChange={(data, isLoading) => {
            setHasResults(data?.length > 0);
            setSearchResults(data);
            setIsResultLoading(isLoading);
          }}
          onSearchTextChange={setSearch}
        />
      </Chat.Header>

      {search && !isResultsLoading && (
        <div className="px-2">
          <Typography.Span
            title={hasResults ? `Results for "${search}"` : 'No result'}
            color="muted"
            size="sm"
          />
        </div>
      )}

      {(isChatsLoading || isResultsLoading) && search && (
        <ChatSkeleton count={5} />
      )}

      {searchResults?.map(user => {
        return (
          <Chat.Item
            key={user?.id}
            id={user.id}
            avatar={user.avatar}
            name={user.name}
            onClick={() => handleInitiateChat(user?.id)}
          />
        );
      })}

      {!search &&
        chats?.data?.map(chat => {
          return (
            <Chat.Item
              key={chat?.id}
              {...chat}
              onClick={() => handleChatClick(chat?.id)}
            />
          );
        })}
    </ChatContainer>
  );
};

export default Chats;

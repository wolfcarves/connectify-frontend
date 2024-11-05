import User from '../User/User';
import { Button } from '@/components/ui/button';
import { UserPlus } from '@phosphor-icons/react';
import useSendFriendRequest from '@/hooks/mutations/useSendFriendRequest';
import useCancelFriendRequest from '@/hooks/mutations/useCancelFriendRequest';
import { toast } from '@/components/ui/use-toast';
import { Friend } from '@/services';

const FriendCard = ({
  id,
  avatar,
  name,
  username,
  is_friend,
  has_request,
  request_from,
}: Friend) => {
  const { mutateAsync: sendRequest, isPending: isSendFriendRequestLoading } =
    useSendFriendRequest();

  const {
    mutateAsync: cancelFriendRequest,
    isPending: isCancelFriendRequestLoading,
  } = useCancelFriendRequest();

  const handleSendRequest = async () => {
    try {
      const response = await sendRequest(id);
      toast({ title: response });
    } catch (error) {
      toast({ title: 'Something went wrong' });
    }
  };

  const handleCancelRequest = async () => {
    try {
      const response = await cancelFriendRequest(id);

      toast({ title: response });
    } catch (error) {
      toast({ title: 'Something went wrong' });
    }
  };

  return (
    <div
      key={id}
      className="flex gap-2 justify-between items-center bg-card border h-max rounded-2xl p-3"
    >
      <User avatar={avatar} name={name} username={username} />

      {has_request ? (
        <Button
          visible={!is_friend}
          variant="outline"
          size="xs"
          className="rounded-full"
          icon={<UserPlus size={16} />}
          isLoading={
            has_request
              ? isSendFriendRequestLoading
              : isCancelFriendRequestLoading
          }
          onClick={has_request ? handleSendRequest : handleCancelRequest}
        />
      ) : !is_friend ? (
        <Button
          variant="outline"
          size="xs"
          className="rounded-full"
          icon={<UserPlus size={16} />}
          isLoading={isSendFriendRequestLoading}
          onClick={handleSendRequest}
        />
      ) : null}
    </div>
  );
};

export default FriendCard;

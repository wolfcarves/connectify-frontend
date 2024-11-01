import React, { useMemo, useState } from 'react';
import Typography from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import useSendFriendRequest from '@/hooks/mutations/useSendFriendRequest';
import useCancelFriendRequest from '@/hooks/mutations/useCancelFriendRequest';
import Image from 'next/image';
import { User } from '@/services';
import getCloudinaryImageUrl from '@/utils/getCloudinaryImageUrl';
import useAcceptFriendRequest from '@/hooks/mutations/useAcceptFriendRequest';

interface FriendCardProps
  extends Pick<User, 'id' | 'avatar' | 'username' | 'name'> {
  type: 'suggestion' | 'request';
  status?: 'accepted' | 'pending';
}

const FriendCard = ({
  id,
  type,
  avatar,
  username,
  name,
  status,
}: FriendCardProps) => {
  const { toast } = useToast();

  const [isFriendAccepted, setIsFriendAccepted] = useState<boolean>(false);
  const [isFriendDeleted, setIsFriendDeleted] = useState<boolean>(false);

  const _avatar = useMemo(() => getCloudinaryImageUrl(avatar), [avatar]);

  const { mutateAsync: sendRequest, isPending: isSendFriendRequestLoading } =
    useSendFriendRequest();
  const {
    mutateAsync: acceptFriendRequest,
    isPending: isAcceptFriendRequestLoading,
  } = useAcceptFriendRequest();
  const {
    mutateAsync: cancelFriendRequest,
    isPending: isCancelFriendRequestLoading,
  } = useCancelFriendRequest();

  const handleSendRequest = async (userId: number) => {
    try {
      const response = await sendRequest(userId);
      toast({ title: response });
    } catch (error) {
      toast({ title: 'Something went wrong' });
    }
  };

  const handleAcceptRequest = async (userId: number) => {
    try {
      const response = await acceptFriendRequest(userId);
      setIsFriendAccepted(true);
      toast({ title: response.message });
    } catch (error) {
      toast({ title: 'Something went wrong' });
    }
  };

  const handleCancelRequest = async (
    userId: number,
    type: 'cancel_request' | 'delete_request',
  ) => {
    try {
      const response = await cancelFriendRequest(userId);
      if (type === 'delete_request') setIsFriendDeleted(true);

      toast({ title: response });
    } catch (error) {
      toast({ title: 'Something went wrong' });
    }
  };

  return (
    <>
      <div className="bg-accent/20 border rounded-2xl pt-2 px-3">
        <div className="w-full max-w-[13rem] mx-auto h-[7rem] p-3">
          <div className="relative h-full mx-auto aspect-square rounded-full overflow-hidden">
            {_avatar && (
              <Image
                alt="profile-image"
                src={_avatar}
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>

        <div className="flex flex-col text-center mx-auto">
          <Typography.Span title={name} weight="medium" />
          <Typography.Span title={`@${username}`} color="muted" />
        </div>

        <div className="flex flex-col items-center space-y-1 py-3">
          {type === 'suggestion' ? (
            <Button
              variant={status === 'pending' ? 'outline' : 'secondary'}
              size="sm"
              onClick={() =>
                status !== 'pending'
                  ? handleSendRequest(id)
                  : handleCancelRequest(id, 'cancel_request')
              }
              isLoading={
                isSendFriendRequestLoading || isCancelFriendRequestLoading
              }
              className="flex w-full"
            >
              <Typography.Span
                title={status === 'pending' ? 'Cancel' : 'Add friend'}
                weight="medium"
                size="sm"
              />
            </Button>
          ) : type === 'request' ? (
            <>
              <Button
                visible={!isFriendDeleted}
                variant={status === 'pending' ? 'outline' : 'secondary'}
                size="sm"
                onClick={() => status !== 'pending' && handleAcceptRequest(id)}
                isLoading={isAcceptFriendRequestLoading}
                className="flex w-full"
                disabled={isFriendAccepted}
              >
                <Typography.Span
                  title={isFriendAccepted ? 'Confirmed' : 'Confirm'}
                  weight="medium"
                  size="sm"
                />
              </Button>

              <Button
                visible={!isFriendAccepted}
                variant="outline"
                size="sm"
                onClick={() =>
                  status !== 'pending' &&
                  handleCancelRequest(id, 'delete_request')
                }
                isLoading={isAcceptFriendRequestLoading}
                className="flex w-full"
                disabled={isFriendDeleted}
              >
                <Typography.Span
                  title={isFriendDeleted ? 'Request Deleted' : 'Delete'}
                  weight="medium"
                  size="sm"
                />
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default FriendCard;

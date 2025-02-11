import React, { useMemo, useState } from 'react';
import Typography from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import useCancelFriendRequest from '@/hooks/mutations/useCancelFriendRequest';
import Image from 'next/image';
import { FriendRequest } from '@/services';
import getCloudinaryProfileImageUrl from '@/utils/getCloudinaryProfileImageUrl';
import useAcceptFriendRequest from '@/hooks/mutations/useAcceptFriendRequest';
import { useRouter } from 'next/navigation';

const FriendRequestCard = ({
  userId,
  avatar,
  username,
  name,
  status,
}: FriendRequest) => {
  const router = useRouter();
  const { toast } = useToast();

  const [isFriendAccepted, setIsFriendAccepted] = useState<boolean>(false);
  const [isFriendDeleted, setIsFriendDeleted] = useState<boolean>(false);

  const _avatar = useMemo(() => getCloudinaryProfileImageUrl(avatar), [avatar]);

  const {
    mutateAsync: acceptFriendRequest,
    isPending: isAcceptFriendRequestLoading,
  } = useAcceptFriendRequest();
  const {
    mutateAsync: cancelFriendRequest,
    isPending: isCancelFriendRequestLoading,
  } = useCancelFriendRequest();

  const handleAcceptRequest = async () => {
    try {
      const response = await acceptFriendRequest(userId);
      setIsFriendAccepted(true);
      toast({ title: response.message });
    } catch (error) {
      toast({ title: 'Something went wrong' });
    }
  };

  const handleCancelRequest = async () => {
    try {
      const response = await cancelFriendRequest(userId);
      setIsFriendDeleted(true);

      toast({ title: response });
    } catch (error) {
      toast({ title: 'Something went wrong' });
    }
  };

  return (
    <>
      <div
        className="bg-card border rounded-2xl pt-2 px-3 cursor-pointer hover:scale-[1.05] hover:shadow-sm duration-300"
        onClick={() => router.push(`/${username}`)}
      >
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
          <Typography.Span
            title={name}
            weight="medium"
            className="line-clamp-1"
          />
          <Typography.Span
            title={`@${username}`}
            color="muted"
            className="line-clamp-1"
          />
        </div>

        <div className="flex flex-col items-center space-y-1 py-3">
          <>
            <Button
              visible={!isFriendDeleted}
              variant={status === 'pending' ? 'secondary' : 'outline'}
              size="sm"
              onClick={e => {
                e.stopPropagation();
                handleAcceptRequest();
              }}
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
              onClick={e => {
                e.stopPropagation();
                handleCancelRequest();
              }}
              isLoading={isCancelFriendRequestLoading}
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
        </div>
      </div>
    </>
  );
};

export default FriendRequestCard;

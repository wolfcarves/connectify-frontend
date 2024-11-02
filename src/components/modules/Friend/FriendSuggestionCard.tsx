import React, { useMemo } from 'react';
import Typography from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import useSendFriendRequest from '@/hooks/mutations/useSendFriendRequest';
import useCancelFriendRequest from '@/hooks/mutations/useCancelFriendRequest';
import Image from 'next/image';
import { User } from '@/services';
import getCloudinaryImageUrl from '@/utils/getCloudinaryImageUrl';
import { useRouter } from 'next/navigation';

interface FriendSuggestionCardProps
  extends Pick<User, 'id' | 'avatar' | 'username' | 'name'> {
  status?: 'accepted' | 'pending';
}

const FriendSuggestionCard = ({
  id,
  avatar,
  username,
  name,
  status,
}: FriendSuggestionCardProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const _avatar = useMemo(() => getCloudinaryImageUrl(avatar), [avatar]);

  const { mutateAsync: sendRequest, isPending: isSendFriendRequestLoading } =
    useSendFriendRequest();

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

  const handleCancelRequest = async (userId: number) => {
    try {
      const response = await cancelFriendRequest(userId);

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
          <div className="relative h-full mx-auto aspect-square rounded-full overflow-hidden hover:opacity-80">
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
          <Button
            variant={status === 'pending' ? 'outline' : 'secondary'}
            size="sm"
            onClick={e => {
              e.stopPropagation();

              status !== 'pending'
                ? handleSendRequest(id)
                : handleCancelRequest(id);
            }}
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
        </div>
      </div>
    </>
  );
};

export default FriendSuggestionCard;

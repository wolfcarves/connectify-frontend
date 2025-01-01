'use client';

import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import {
  ChatCircle,
  Check,
  UserMinus,
  UserPlus,
  X,
} from '@phosphor-icons/react';
import useGetUserProfile, {
  GET_USER_PROFILE_KEY,
} from '@/hooks/queries/useGetUserProfile';
import useSendFriendRequest from '@/hooks/mutations/useSendFriendRequest';
import useAcceptFriendRequest from '@/hooks/mutations/useAcceptFriendRequest';
import useCancelFriendRequest from '@/hooks/mutations/useCancelFriendRequest';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import UserProfileActionSkeleton from './UserProfileActionSkeleton';
import useUnfriendUser from '@/hooks/mutations/useUnfriendUser';
import { useParams } from 'next/navigation';
import useGetCurrentSession from '@/hooks/queries/useGetCurrentSession';

const UserProfileAction = () => {
  const params = useParams<{ username: string }>();

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: session } = useGetCurrentSession();

  const { data: userProfile, isLoading: isUserProfileLoading } =
    useGetUserProfile({
      username: params.username,
    });

  const { mutateAsync: sendRequest, isPending: isSendRequestLoading } =
    useSendFriendRequest();

  const {
    mutateAsync: acceptFriendRequest,
    isPending: isAcceptFriendRequestLoading,
  } = useAcceptFriendRequest();

  const { mutateAsync: cancelRequest, isPending: isCancelRequestLoading } =
    useCancelFriendRequest();

  const { mutateAsync: unfriendUser, isPending: isUnfrieendUserLoading } =
    useUnfriendUser();

  const handleSendRequest = async () => {
    try {
      if (userProfile?.id) {
        const response = await sendRequest(userProfile?.id);
        await queryClient.invalidateQueries({
          queryKey: [GET_USER_PROFILE_KEY()],
        });

        toast({ title: response });
      }
    } catch (error) {
      toast({ title: 'Something went wrong' });
    }
  };

  const handleAcceptRequest = async () => {
    try {
      if (userProfile?.id) {
        const response = await acceptFriendRequest(userProfile?.id);
        await queryClient.invalidateQueries({
          queryKey: [GET_USER_PROFILE_KEY()],
        });
        toast({ title: response.message });
      }
    } catch (error) {
      toast({ title: 'Something went wrong' });
    }
  };

  const handleCancelRequest = async () => {
    try {
      if (userProfile?.id) {
        const response = await cancelRequest(userProfile?.id);
        await queryClient.invalidateQueries({
          queryKey: [GET_USER_PROFILE_KEY()],
        });
        toast({ title: response });
      }
    } catch (error) {
      toast({ title: 'Something went wrong' });
    }
  };

  const handleUnfriend = async () => {
    try {
      if (userProfile?.id) {
        const response = await unfriendUser(userProfile?.id);
        await queryClient.invalidateQueries({
          queryKey: [GET_USER_PROFILE_KEY()],
        });
        toast({ title: response });
      }
    } catch (error) {
      toast({ title: 'Something went wrong' });
    }
  };

  const handleCreateChat = async () => {};

  if (isUserProfileLoading) return <UserProfileActionSkeleton />;

  return (
    <div className="inline-flex ms-auto self-end place-self-end w-max">
      {session?.username !== params.username && (
        <div className="flex gap-2">
          <Button
            visible={!userProfile?.has_request && !userProfile?.is_friend}
            icon={<UserPlus size={18} />}
            size="sm"
            className="rounded-full"
            isLoading={isSendRequestLoading}
            onClick={() => {
              handleSendRequest();
            }}
          >
            Add Friend
          </Button>

          <Button
            visible={
              userProfile?.has_request &&
              userProfile.request_from === 'them' &&
              !userProfile?.is_friend
            }
            icon={<Check size={18} />}
            size="sm"
            className="rounded-full"
            isLoading={isAcceptFriendRequestLoading}
            onClick={() => {
              handleAcceptRequest();
            }}
          >
            Accept
          </Button>

          <Button
            visible={
              userProfile?.has_request &&
              userProfile.request_from === 'them' &&
              !userProfile?.is_friend
            }
            icon={<X size={18} />}
            variant="destructive"
            size="sm"
            className="rounded-full"
            isLoading={isCancelRequestLoading}
            onClick={() => {
              handleCancelRequest();
            }}
          >
            <Typography.Span title="Delete" weight="medium" size="sm" />
          </Button>

          <Button
            visible={
              userProfile?.has_request &&
              userProfile.request_from === 'us' &&
              !userProfile?.is_friend
            }
            icon={<X size={18} />}
            size="sm"
            className="rounded-full"
            isLoading={isCancelRequestLoading}
            onClick={() => {
              handleCancelRequest();
            }}
          >
            <Typography.Span
              title="Cancel Request"
              weight="medium"
              size="sm"
              color="background"
            />
          </Button>

          <Button
            variant="destructive"
            visible={userProfile?.is_friend}
            icon={<UserMinus size={18} />}
            size="sm"
            className="rounded-full"
            isLoading={isUnfrieendUserLoading}
            onClick={() => {
              handleUnfriend();
            }}
          >
            Unfriend
          </Button>

          <Button
            icon={<ChatCircle size={18} />}
            size="sm"
            className="rounded-full"
            onClick={handleCreateChat}
          >
            Message
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserProfileAction;

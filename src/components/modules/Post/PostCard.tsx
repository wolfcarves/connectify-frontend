import { useState, type ReactNode } from 'react';
import { convertUtil } from '@/utils/convertUtil';
import User from '@/components/modules/User/User';
import Typography from '@/components/ui/typography';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FaBookmark } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import useSaveUserPost from '@/hooks/mutations/useSaveUserPost';
import useUnSaveUserPost from '@/hooks/mutations/useUnSaveUserPost';
import { MdBookmarkRemove } from 'react-icons/md';
import Spinner from '@/components/ui/spinner';

const PostCard = ({ children }: { children?: ReactNode }) => {
  return (
    <article className="rounded-2xl space-y-5 my-5 bg-card border px-3 py-4">
      {children}
    </article>
  );
};

interface UserProps {
  avatar?: string;
  name?: string;
  username?: string;
  timestamp?: string;
  postId?: number;
  isPostSaved?: boolean;
}

const PostCardUser = ({ postId, isPostSaved, ...props }: UserProps) => {
  const [isSaved, setIsSaved] = useState<boolean | undefined>(isPostSaved);

  const { mutateAsync: savePost, isPending: isSavePostLoading } =
    useSaveUserPost();
  const { mutateAsync: unSavePost, isPending: isUnSavePostLoading } =
    useUnSaveUserPost();

  const handleSavePost = async () => {
    await savePost(postId!);
    setIsSaved(true);
  };

  const handleUnSavePost = async () => {
    await unSavePost(postId!);
    setIsSaved(false);
  };

  return (
    <div className="flex justify-between items-start gap-2.5">
      <div className="flex">
        <User quality={50} unoptimized {...props} />
        <div className="w-1" />
        <Typography.Span
          title={` • ${convertUtil(props.timestamp)}`}
          color="muted"
          className="mt-0.5 text-xxs"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="p-1.5 rounded-full hover:bg-muted">
          <BsThreeDots className="text-xl" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-max p-2" align="end">
          <DropdownMenuGroup>
            {!isSaved ? (
              <DropdownMenuItem className="space-x-2" onClick={handleSavePost}>
                {isSavePostLoading ? (
                  <Spinner />
                ) : (
                  <FaBookmark className="text-base w-5" />
                )}
                <Typography.Span title="Save" weight="medium" />
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                className="space-x-2"
                onClick={handleUnSavePost}
              >
                {isUnSavePostLoading ? (
                  <Spinner />
                ) : (
                  <MdBookmarkRemove className="text-xl w-5" />
                )}
                <Typography.Span title="Unsave" weight="medium" />
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const Content = ({ children }: { children?: ReactNode }) => {
  return <Typography.P>{children}</Typography.P>;
};

PostCard.User = PostCardUser;
PostCard.Content = Content;

export default PostCard;

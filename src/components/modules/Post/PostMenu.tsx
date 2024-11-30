import { useEffect, useState } from 'react';
import Typography from '@/components/ui/typography';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FaBookmark } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import useSaveUserPost from '@/hooks/mutations/useSaveUserPost';
import useUnSaveUserPost from '@/hooks/mutations/useUnSaveUserPost';
import { MdBookmarkRemove } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import Spinner from '@/components/ui/spinner';
import useSession from '@/hooks/useSession';
import useDeletePost from '@/hooks/mutations/useDeletePost';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface PostMenu {
  postId?: number;
  isPostSaved?: boolean;
  username?: string;
}

const PostMenu = ({ postId, isPostSaved, username }: PostMenu) => {
  const session = useSession();
  const isOwn = session.username === username;

  const [isSaved, setIsSaved] = useState<boolean | undefined>(isPostSaved);

  const { mutateAsync: savePost, isPending: isSavePostLoading } =
    useSaveUserPost();
  const { mutateAsync: unSavePost, isPending: isUnSavePostLoading } =
    useUnSaveUserPost();
  const { mutateAsync: deletePost, isPending: isDeletePostLoading } =
    useDeletePost();

  const handleSavePost = async () => {
    await savePost(postId!);
    setIsSaved(true);
  };

  const handleUnSavePost = async () => {
    await unSavePost(postId!);
    setIsSaved(false);
  };

  useEffect(() => {
    setIsSaved(isPostSaved);
  }, [isPostSaved]);

  const handleDeletePost = async () => {
    await deletePost(postId!);
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="p-1.5 rounded-full hover:bg-muted">
          <BsThreeDots className="text-xl" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[200px] p-1" align="end">
          <DropdownMenuItem
            className="space-x-2"
            onClick={isSaved ? handleUnSavePost : handleSavePost}
          >
            {isSavePostLoading || isUnSavePostLoading ? (
              <Spinner />
            ) : isSaved ? (
              <>
                <MdBookmarkRemove className="text-xl w-5" />
                <Typography.Span title="Unsave" weight="medium" />
              </>
            ) : (
              <>
                <FaBookmark className="text-base w-5" />
                <Typography.Span title="Save" weight="medium" />
              </>
            )}
          </DropdownMenuItem>

          {isOwn && (
            <>
              <DialogTrigger asChild>
                <DropdownMenuItem className="space-x-2">
                  <RiDeleteBin5Fill className="text-xl w-5" />
                  <Typography.Span title="Delete post" weight="medium" />
                </DropdownMenuItem>
              </DialogTrigger>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="sm:max-w-[425px] outline-none">
        <DialogHeader>
          <DialogTitle>Delete post.</DialogTitle>
          <DialogDescription>
            Are you sure to delete this post?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button size="sm" variant="ghost">
              <Typography.Span title="Cancel" size="sm" weight="medium" />
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              size="sm"
              onClick={handleDeletePost}
              isLoading={isDeletePostLoading}
            >
              <Typography.Span
                title="Confirm"
                size="sm"
                color="background"
                weight="medium"
              />
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostMenu;

import { useContext, useEffect, useState } from 'react';
import Typography from '@/components/ui/typography';
import {
  DropdownMenu,
  DropdownMenuContent,
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
import { IoPeople } from 'react-icons/io5';
import PostAudienceDialog from './PostAudienceModal';
import { Audience } from '@/services';
import useChangePostAudience from '@/hooks/mutations/useChangePostAudience';
import { PostContext } from './Post';
import PostDeleteDialog from './PostDeleteModal';

interface PostMenu {
  postId?: number;
  isPostSaved?: boolean;
  username?: string;
  audience?: Audience;
}

const PostMenu = ({
  postId,
  isPostSaved,
  username,
  audience: audienceFromProps,
}: PostMenu) => {
  const session = useSession();
  const postCtx = useContext(PostContext);

  const isOwn = session.username === username;

  const [isSaved, setIsSaved] = useState<boolean | undefined>(isPostSaved);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isAudienceDialogOpen, setIsAudienceDialogOpen] =
    useState<boolean>(false);

  const [audience, setAudience] = useState<{
    selected: Audience;
    value: Audience;
  }>({
    selected: audienceFromProps!,
    value: audienceFromProps!,
  });

  const { mutateAsync: savePost, isPending: isSavePostLoading } =
    useSaveUserPost();
  const { mutateAsync: unSavePost, isPending: isUnSavePostLoading } =
    useUnSaveUserPost();
  const { mutateAsync: deletePost, isPending: isDeletePostLoading } =
    useDeletePost();
  const { mutateAsync: changeAudience, isPending: isChangeAudienceLoading } =
    useChangePostAudience();

  const handleSavePost = async () => {
    try {
      await savePost(postId!);
      setIsSaved(true);
    } catch (error) {
      //
    }
  };

  const handleUnSavePost = async () => {
    try {
      await unSavePost(postId!);
      setIsSaved(false);
    } catch (error) {
      //
    }
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(postId!);
    } catch (error) {
      //
    }
  };

  const handleAudienceChange = async () => {
    try {
      await changeAudience({
        postId: postId!,
        audience: audience.selected,
      });

      postCtx?.setCtxValue({ audience: audience.selected });

      setAudience({
        selected: audience.selected,
        value: audience.selected,
      });
    } catch (error) {}
  };

  useEffect(() => {
    setIsSaved(isPostSaved);
  }, [isPostSaved]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="p-1.5 rounded-full hover:bg-muted">
          <BsThreeDots className="text-xl" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[200px] p-1" align="end">
          <button
            className="flex items-center w-full space-x-2  py-2 px-3 hover:bg-muted"
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
          </button>

          {/* {isOwn && (
            <button
              className="flex items-center w-full space-x-2  py-2 px-3 hover:bg-muted"
              onClick={handleDeletePost}
            >
              {isDeletePostLoading ? (
                <Spinner />
              ) : (
                <RiDeleteBin5Fill className="text-xl w-5" />
              )}
              <Typography.Span title="Delete post" weight="medium" />
            </button>
          )} */}

          {isOwn && (
            <>
              <PostDeleteDialog
                open={isDeleteDialogOpen}
                onOpenChange={status => {
                  setIsDeleteDialogOpen(status);
                }}
                trigger={
                  <button className="flex items-center w-full space-x-2  py-2 px-3 hover:bg-muted">
                    {isDeletePostLoading ? (
                      <Spinner />
                    ) : (
                      <RiDeleteBin5Fill className="text-xl w-5" />
                    )}
                    <Typography.Span title="Delete post" weight="medium" />
                  </button>
                }
                onSubmitClick={handleDeletePost}
                isLoading={isDeletePostLoading}
              />
            </>
          )}

          {isOwn && (
            <>
              <PostAudienceDialog
                open={isAudienceDialogOpen}
                onOpenChange={status => {
                  setIsAudienceDialogOpen(status);

                  if (!isAudienceDialogOpen) {
                    setAudience(prev => ({
                      selected: audience.value,
                      value: prev.value,
                    }));
                    postCtx?.setCtxValue({ audience: audience.value });
                  }
                }}
                trigger={
                  <button
                    className="flex items-center w-full space-x-2  py-2 px-3 hover:bg-muted"
                    onClick={() => setIsAudienceDialogOpen(true)}
                  >
                    <IoPeople className="text-xl w-5" />
                    <Typography.Span title="Change Audience" weight="medium" />
                  </button>
                }
                audience={audience}
                setAudience={setAudience}
                onApplyClick={handleAudienceChange}
                isApplyLoading={isChangeAudienceLoading}
              />
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default PostMenu;

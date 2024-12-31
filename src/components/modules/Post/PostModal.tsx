import { memo, ReactNode } from 'react';
import {
  DialogDescription,
  DialogTitle,
  type DialogProps,
} from '@radix-ui/react-dialog';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import Card from '@/components/common/Card/Card';
import PostView from '../../../features/post/PostView';
import Typography from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { IoCloseSharp } from 'react-icons/io5';
import useGetUserPost from '@/hooks/queries/useGetUserPost';
import { concatContraction } from '@/utils/concatContraction';

interface PostModal extends DialogProps {
  trigger: ReactNode;
  uuid: string;
}

const PostModal = ({ trigger, uuid, ...props }: PostModal) => {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogTitle />
      <DialogDescription />
      <DialogContent className="min-w-[720px] p-0 bg-card top-[67%] translate-y-[-67%] data-[state=closed]:slide-out-to-top-[65%] data-[state=open]:slide-in-from-top-[65%] overflow-hidden">
        <Card className="p-0 border-0">
          <PostModalHeader uuid={uuid} />
          <PostView uuid={uuid} modal={true} />
        </Card>
      </DialogContent>
    </Dialog>
  );
};

const PostModalHeader = ({ uuid }: { uuid: string }) => {
  const { data: postData, isPending: isPostPending } = useGetUserPost(uuid);

  return (
    <div className="flex justify-center items-center sticky top-0 bg-card border-b text-center h-12 z-50">
      {!isPostPending && (
        <Typography.H4
          title={`${concatContraction(postData?.user.name!)} Post`}
          weight="medium"
          className="text-center pb-1.5"
        />
      )}

      <DialogClose asChild>
        <Button
          size="icon"
          icon={<IoCloseSharp size={24} />}
          variant="ghost"
          className="absolute end-2 top-0 bottom-0 my-auto"
        />
      </DialogClose>
    </div>
  );
};

export default memo(PostModal);

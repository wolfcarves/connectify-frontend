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
      <DialogDescription />
      <DialogContent className="min-w-[720px] p-0 bg-card overflow-hidden">
        <DialogTitle />
        <Card className="border-0 py-0 pb-2">
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
    <div className="relative flex items-center border-b pb-3.5">
      {!isPostPending && (
        <div className="m-auto">
          <Typography.H4
            title={`${concatContraction(postData?.user.name!)} Post`}
            weight="medium"
          />
        </div>
      )}
      <DialogClose asChild>
        <Button
          size="icon"
          icon={<IoCloseSharp size={24} />}
          variant="ghost"
          className="absolute end-2 top-0 bottom-2 my-auto"
        />
      </DialogClose>
    </div>
  );
};

export default memo(PostModal);

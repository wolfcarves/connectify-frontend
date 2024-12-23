import { ReactNode } from 'react';
import { DialogClose, type DialogProps } from '@radix-ui/react-dialog';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Card from '@/components/common/Card/Card';
import PostView from './PostView';
import Typography from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { IoCloseSharp } from 'react-icons/io5';

interface PostModal extends DialogProps {
  trigger: ReactNode;
  uuid: string;
}

const PostModal = ({ trigger, uuid, ...props }: PostModal) => {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="p-0 bg-card overflow-hidden">
        <Card className="p-0 border-0">
          <PostModalHeader />
          <PostModalScrollContainer>
            <PostView uuid={uuid} modal={true} />
          </PostModalScrollContainer>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

const PostModalHeader = () => {
  return (
    <div className="sticky top-0 bg-card border-b text-center pb-3 pt-2 z-50">
      <Typography.H4 title="Rodel's Post" weight="medium" />
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

const PostModalScrollContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="sm:max-w-[620px] h-[80vh] max-h-[50rem] rounded-xl p-0 overflow-y-auto
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-300
                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
    >
      {children}
    </div>
  );
};

export default PostModal;

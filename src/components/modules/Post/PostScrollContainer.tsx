import { ReactNode } from 'react';

const PostScrollContainer = ({
  children,
  enableScroll,
}: {
  children: ReactNode;
  enableScroll: boolean;
}) => {
  return (
    <div
      className={
        enableScroll
          ? `sm:max-w-[620px] h-[80vh] max-h-[50rem] rounded-xl p-0 overflow-y-auto
              [&::-webkit-scrollbar]:w-2
              [&::-webkit-scrollbar-track]:rounded-full
              [&::-webkit-scrollbar-track]:hidden
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-muted
              dark:[&::-webkit-scrollbar-thumb]:bg-muted
              `
          : ''
      }
    >
      {children}
    </div>
  );
};

export default PostScrollContainer;

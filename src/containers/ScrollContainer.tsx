import {
  ComponentProps,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';

const ScrollContainer = forwardRef(
  (
    {
      children,
      enableScroll,
      className,
    }: {
      children: ReactNode;
      enableScroll: boolean;
      className?: ComponentProps<'div'>['className'];
    },
    ref,
  ) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => {
      const scrollContainer = scrollContainerRef.current;
      return {
        scrollToBottom: () => {
          scrollContainer?.scrollTo(0, scrollContainer.scrollHeight);
        },
      };
    });

    return (
      <div
        ref={scrollContainerRef}
        className={
          enableScroll
            ? `h-[80vh] max-h-[50rem] rounded-xl p-0 overflow-y-auto
              [&::-webkit-scrollbar]:w-2
              [&::-webkit-scrollbar-track]:rounded-full
              [&::-webkit-scrollbar-track]:hidden
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-muted
              dark:[&::-webkit-scrollbar-thumb]:bg-muted
              ${className}
              `
            : `${className}`
        }
      >
        {children}
      </div>
    );
  },
);

ScrollContainer.displayName = 'ScrollContainer';

export default ScrollContainer;

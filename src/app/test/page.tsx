'use client';

import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import useGetChatMessages from '@/hooks/queries/useGetChatMessages';

export default function TestPage() {
  const {
    data: chatMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetChatMessages({
    chatId: 49,
  });

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: 50,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    enabled: true,
  });

  const items = virtualizer.getVirtualItems();

  return (
    <div
      ref={parentRef}
      style={{
        height: 400,
        width: 400,
        overflowY: 'auto',
        contain: 'strict',
      }}
    >
      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: '100%',
          position: 'relative',
        }}
        className="flex flex-col-reverse"
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${items[0]?.start ?? 0}px)`,
          }}
        >
          {items.map(virtualRow => (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              className={virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'}
            >
              <div style={{ padding: '10px 0' }}>
                <div>Row {virtualRow.index}</div>
                <div>
                  {chatMessages?.pages?.flatMap((page, pageIdx) => {
                    return page.data?.[virtualRow.index]?.content;
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

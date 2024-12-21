/* eslint-disable no-unused-vars */

import React, {
  ReactNode,
  useRef,
  ComponentProps,
  CSSProperties,
  useCallback,
  useEffect,
} from 'react';
import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual';

export interface VirtualListProps<T> {
  className?: ComponentProps<'div'>['className'];
  style?: CSSProperties;
  itemClassName?: ComponentProps<'div'>['className'];
  itemStyle?: CSSProperties;
  items: T[];
  getItemKey: (item: T, index: number) => string | number;
  renderItem: (item: T, virtualItem: VirtualItem) => ReactNode;
  estimateSize: (index: number) => number;
  overscan?: number;
  listener?: () => ReactNode;
}

const VirtualList = <T,>({
  className,
  style,
  itemClassName,
  itemStyle,
  items,
  getItemKey,
  renderItem,
  estimateSize,
  overscan,
  listener,
}: VirtualListProps<T>) => {
  const scrollableRef = useRef<HTMLDivElement>(null);

  const getItemKeyCallback = useCallback(
    (index: number) => {
      return getItemKey(items[index]!, index);
    },
    [getItemKey, items],
  );

  const virtualizer = useVirtualizer({
    count: items.length,
    getItemKey: getItemKeyCallback,
    getScrollElement: () => scrollableRef.current,
    estimateSize,
    overscan,
    // debug: true,
  });

  useEffect(() => {
    virtualizer.scrollToIndex(items.length - 1);
  }, [items]);

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div className="flex flex-col-reverse">
      <div ref={scrollableRef} className="overflow-y-auto">
        <div
          className="relative w-full"
          style={{ height: virtualizer.getTotalSize() }}
        >
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
            }}
          >
            {listener?.()}

            {virtualItems.map(virtualItem => {
              const item = items[virtualItem.index];

              return (
                <div
                  key={virtualItem.key}
                  ref={virtualizer.measureElement}
                  data-index={virtualItem.index}
                  style={itemStyle}
                >
                  {renderItem(item, virtualItem)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualList;

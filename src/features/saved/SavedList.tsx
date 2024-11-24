'use client';

import Bookmark from '@/components/modules/Bookmark/Bookmark';
import useGetBookmarks from '@/hooks/queries/useGetBookmarks';

const SavedList = () => {
  const { data: bookmarks } = useGetBookmarks();

  return (
    <div className="space-y-2">
      {bookmarks?.map(bookmark => <Bookmark key={bookmark.id} {...bookmark} />)}
    </div>
  );
};

export default SavedList;

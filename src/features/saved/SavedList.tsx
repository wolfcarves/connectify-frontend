'use client';

import Bookmark from '@/components/modules/Bookmark/Bookmark';
import Typography from '@/components/ui/typography';
import useGetBookmarks from '@/hooks/queries/useGetBookmarks';

const SavedList = () => {
  const { data: bookmarks } = useGetBookmarks();

  return (
    <>
      <Typography.H6 title="Saved Posts (0)" weight="medium" />

      <div className="space-y-2">
        {bookmarks?.map(bookmark => (
          <Bookmark key={bookmark.id} {...bookmark} />
        ))}
      </div>
    </>
  );
};

export default SavedList;

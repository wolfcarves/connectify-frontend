import type { Bookmark } from '@/services';
import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import Image from 'next/image';
import getCloudinaryProfileImageUrl from '@/utils/getCloudinaryProfileImageUrl';
import Link from 'next/link';
import useUnSaveUserPost from '@/hooks/mutations/useUnSaveUserPost';
import { env } from '@/config/env';

const Bookmark = ({
  post_id,
  post_uuid,
  author_username,
  author_image,
  author_name,
  content,
}: Bookmark) => {
  const authorImage = getCloudinaryProfileImageUrl(author_image);

  const { mutateAsync: unSavePost, isPending: isUnSavePostLoading } =
    useUnSaveUserPost();

  const handleUnSavePost = async () => {
    await unSavePost(post_id!);
  };

  return (
    <article className="flex justify-between bg-card border h-24 rounded-lg p-4">
      <div className="flex gap-4">
        <Link href={`/post/${post_uuid}`} className="hover:opacity-80">
          <div className="relative min-w-16 min-h-16">
            <Image
              alt="bookmark-image"
              src={authorImage!}
              fill
              className="object-cover rounded-md bg-foreground/10"
            />
          </div>
        </Link>

        <div>
          <Link
            href={`/post/${post_uuid}`}
            className="line-clamp-1 hover:underline"
          >
            <Typography.H5 title={content} weight="semibold" />
          </Link>

          <div className="flex items-start gap-0.5">
            <Typography.Span title="Saved post from" size="sm" color="muted" />

            <Link
              href={`/${author_username}`}
              className="line-clamp-1 -translate-y-[3.2px] hover:underline"
            >
              <Typography.Span
                title={author_name}
                size="sm"
                weight="medium"
                color="muted"
              />
            </Link>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        size="xs"
        onClick={handleUnSavePost}
        isLoading={isUnSavePostLoading}
      >
        <Typography.Span
          title="Remove"
          weight="semibold"
          color="foreground"
          size="sm"
        />
      </Button>
    </article>
  );
};

export default Bookmark;

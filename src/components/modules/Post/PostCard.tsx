import { ReactNode } from 'react';

const PostCard = ({ children }: { children?: ReactNode }) => {
  return <article className="rounded-md space-y-4 my-2">{children}</article>;
};

export default PostCard;

// 'use client';

// import { ReactNode } from 'react';
// import User from '@/components/common/User';
// import Typography from '@/components/ui/typography';
// import { Post, User as UserDTO } from '@/services';
// import useGetUserProfileImage from '@/hooks/queries/useGetUserProfileImage';

// interface PostProps extends Post, UserDTO {
//   userId?: number;
// }

// const PostCard = ({
//   id,
//   userId,
//   audience,
//   content,
//   created_at,
//   name,
//   username,
// }: PostProps) => {
//   const { data: userImageData } = useGetUserProfileImage(userId);

//   return (
//     <div>
//       <article className="rounded-md space-y-4 my-2">
//         <User
//           avatar={userImageData?.avatar}
//           name={name}
//           timestamp={created_at}
//         />
//         <Typography.P title={content} />
//       </article>
//     </div>
//   );
// };

// export default PostCard;

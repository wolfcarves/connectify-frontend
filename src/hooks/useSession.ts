import useGetCurrentSession from './queries/useGetCurrentSession';

export default function useSession() {
  const { data: session } = useGetCurrentSession();

  return {
    userId: session!.id,
    isAuth: !!session?.id,
    email: session?.email,
    username: session?.username,
  };
}

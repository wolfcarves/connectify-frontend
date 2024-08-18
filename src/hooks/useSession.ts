import useGetCurrentSession from './queries/useGetCurrentSession';

export default function useSession() {
  const { data: session } = useGetCurrentSession();

  return {
    userId: session!.id,
    isAuth: !!session?.id,
    email: session?.email,
    name: session?.name,
    username: session?.username,
  };
}

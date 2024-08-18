import useGetCurrentSession from './queries/useGetCurrentSession';

export default function useSession() {
  const { data: session } = useGetCurrentSession();

  return {
    userId: session!.id,
    isAuth: !!session?.id,
    uuid: session?.uuid,
    email: session?.email,
    name: session?.name,
    username: session?.username,
  };
}

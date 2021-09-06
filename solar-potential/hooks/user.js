import useSWR from 'swr';
import fetcher from '@/lib/fetch';

/* react hook to get current user from backend and inject in application session */
export function useCurrentUser() {
  const { data, mutate } = useSWR('/api/user', fetcher);
  const user = data?.user;
  return [user, { mutate }];
}

/* Get the current logged in user details from the db based on the user id
params: user Id string */
export function useUser(id) {
  const { data } = useSWR(`/api/users/${id}`, fetcher, { revalidateOnFocus: false });
  return data?.user;
}

import { useMutation } from '@tanstack/react-query';
import { AuthenticationService, UserSignUpInput } from '@/services';
import getUserLocation from '@/utils/getUserLocation';

export default function useSignUpUser() {
  return useMutation({
    mutationKey: ['USER_SIGN_UP_KEY'],
    mutationFn: async (data: UserSignUpInput) => {
      const location = await getUserLocation();

      const response = await AuthenticationService.postSignUpUser({
        ...data,
        city: location?.city,
      });

      return response;
    },
  });
}

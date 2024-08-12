import { useMutation } from '@tanstack/react-query';
import { AuthenticationService, UserSignUpInput } from '@/services';

export default function useSignUpUserMutation() {
  return useMutation({
    mutationKey: ['USER_SIGN_UP'],
    mutationFn: async (data: UserSignUpInput) => {
      const response = await AuthenticationService.postSignUpUser(data);

      return response;
    },
  });
}

import { SignUpData } from '@/types/signup';
import { useMutation } from '@tanstack/react-query';
import { signUpUser } from './api';

export function useSignUpUser() {
	return useMutation({
		mutationFn: (data: SignUpData) => signUpUser(data),
	});
}

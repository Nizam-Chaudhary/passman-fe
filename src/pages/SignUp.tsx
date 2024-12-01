import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoadingSpinner from '@/components/ui/loadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { useSignUpUser } from '@/services/mutation';
import { SignUpData, signUpUserSchema } from '@/types/signup';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router';

import { z } from 'zod';

export default function SignUp() {
	const { toast } = useToast();
	const navigate = useNavigate();
	const mutateSignUpUser = useSignUpUser();

	const signUpForm = useForm<z.infer<typeof signUpUserSchema>>({
		resolver: zodResolver(signUpUserSchema),
		defaultValues: {
			userName: '',
			email: '',
			password: '',
		},
	});

	function onSubmit(data: SignUpData) {
		mutateSignUpUser.mutate(data, {
			onError: (error) => {
				toast({
					variant: 'destructive',
					title: 'Error Signing up!',
					description: error.message,
				});
			},
			onSuccess: () => {
				toast({
					title: 'Signed up successfully!',
				});
				navigate('/');
			},
		});
	}

	return (
		<>
			{/* <Card className="w-[30rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"> */}
			<Card className="m-auto min-w-96 w-2/6 my-32">
				<CardHeader className="text-center text-2xl">
					Create your account
				</CardHeader>
				<CardContent>
					<Form {...signUpForm}>
						<form
							onSubmit={signUpForm.handleSubmit(onSubmit)}
							className="space-y-8"
						>
							<FormField
								control={signUpForm.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="Email" type="email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={signUpForm.control}
								name="userName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input placeholder="Username" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={signUpForm.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												placeholder="Password"
												type="password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								className="text-center w-full"
								type="submit"
								disabled={
									!signUpForm.formState.isDirty || mutateSignUpUser.isPending
								}
							>
								{mutateSignUpUser.isPending ? <LoadingSpinner /> : 'Sign Up'}
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex justify-center">
					Already have an account?&nbsp;
					<NavLink to="/login" end>
						Login
					</NavLink>
				</CardFooter>
			</Card>
		</>
	);
}

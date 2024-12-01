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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router';

import { z } from 'zod';

const signUpSchema = z.object({
	userName: z.string().min(3, 'Please Enter user name'),
	email: z.string().email('Please enter valid email'),
	password: z.string().min(10, 'Must contain at least 10 characters'),
});

export default function SignUp() {
	const signUpForm = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			userName: '',
			email: '',
			password: '',
		},
	});

	function onSubmit(values: z.infer<typeof signUpSchema>) {
		console.log('Values: ', values);
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
								disabled={!signUpForm.formState.isDirty}
							>
								Sign Up
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

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

const loginSchema = z.object({
	email: z.string().email('Please enter valid email'),
	password: z.string().min(10, 'Must contain at least 10 characters'),
});

export default function Login() {
	const loginForm = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	function onSubmit(values: z.infer<typeof loginSchema>) {
		console.log('Values: ', values);
	}

	return (
		<>
			{/* <Card className="w-[30rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"> */}
			<Card className="m-auto min-w-96 w-2/6 my-32">
				<CardHeader className="text-center text-2xl">
					Login to your account
				</CardHeader>
				<CardContent>
					<Form {...loginForm}>
						<form
							onSubmit={loginForm.handleSubmit(onSubmit)}
							className="space-y-8"
						>
							<FormField
								control={loginForm.control}
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
								control={loginForm.control}
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
								disabled={!loginForm.formState.isDirty}
							>
								Login
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex justify-center">
					New to Passman?&nbsp;
					<NavLink to="/sign-up" end>
						Sign Up
					</NavLink>
				</CardFooter>
			</Card>
		</>
	);
}

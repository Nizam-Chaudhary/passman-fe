import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { useToast } from "@/hooks/use-toast";
import { getKeysFromIndexedDB, storeKeyInIndexedDB } from "@/lib/indexedDb";
import { SignUpUserFormData, signUpUserSchema } from "@/lib/types/signup";
import {
    deriveKey,
    encrypt,
    generateMasterKey,
    generateRecoveryKey,
    generateSalt,
} from "@/lib/encryption.helper";
import { useSignUpUser } from "@/services/mutation/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";

export default function SignUp() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const mutateSignUpUser = useSignUpUser();

    const signUpForm = useForm<SignUpUserFormData>({
        resolver: zodResolver(signUpUserSchema),
        defaultValues: {
            userName: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: SignUpUserFormData) {
        const userKey = await deriveKey(data.password, generateSalt());

        const masterKey = await encrypt(generateMasterKey(), userKey);

        const recoveryMasterKey = await encrypt(generateRecoveryKey(), userKey);

        const payload = { ...data, masterKey, recoveryMasterKey };

        mutateSignUpUser.mutate(payload, {
            onError: (error) => {
                toast({
                    variant: "destructive",
                    title: "Error Signing up!",
                    description: error.message,
                });
            },
            onSuccess: async () => {
                toast({
                    title: "Signed up successfully!",
                });
                await storeKeyInIndexedDB(userKey, "userKey");
                await navigate("/login");
            },
        });
    }

    return (
        <>
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
                                            <Input
                                                placeholder="Email"
                                                type="email"
                                                {...field}
                                            />
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
                                            <Input
                                                placeholder="Username"
                                                {...field}
                                            />
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
                                disabled={mutateSignUpUser.isPending}
                            >
                                {mutateSignUpUser.isPending ? (
                                    <LoadingSpinner />
                                ) : (
                                    "Sign Up"
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    Already have an account?&nbsp;
                    <NavLink to="/login" className="text-blue-700" end>
                        Login
                    </NavLink>
                </CardFooter>
            </Card>
        </>
    );
}

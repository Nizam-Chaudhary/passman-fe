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
import { jwtDecode } from "jwt-decode";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { useToast } from "@/hooks/use-toast";
import { deriveKey, generateSalt } from "@/lib/encryption.helper";
import { storeKeyInIndexedDB } from "@/lib/indexedDb";
import { loginSchema, LoginUserData } from "@/lib/types/login";
import { useLoginUser } from "@/services/mutation/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";

export default function Login() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const mutateLoginUser = useLoginUser();

    const loginForm = useForm<LoginUserData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(data: LoginUserData) {
        mutateLoginUser.mutate(data, {
            onError: (error) => {
                toast({
                    variant: "destructive",
                    title: error?.message,
                });
            },
            onSuccess: async (res) => {
                const token = res.data.data.token;
                const userData = jwtDecode(token);
                localStorage.setItem("token", token);
                localStorage.setItem("userData", JSON.stringify(userData));
                const userKey = await deriveKey(data.password, generateSalt());
                await storeKeyInIndexedDB(userKey, "userKey");
                toast({
                    title: "Logged in successfully!",
                });
                navigate("/");
            },
        });
    }

    return (
        <>
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
                                disabled={mutateLoginUser.isPending}
                            >
                                {mutateLoginUser.isPending ? (
                                    <LoadingSpinner />
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    New to Passman?&nbsp;
                    <NavLink to="/sign-up" className="text-blue-700" end>
                        Sign Up
                    </NavLink>
                </CardFooter>
            </Card>
        </>
    );
}

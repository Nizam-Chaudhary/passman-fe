import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { useLoginUser } from "@/services/mutation/user";
import { loginSchema, LoginUserData } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { PasswordInput } from "../components/ui/password-input";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { setRefreshToken, setToken } from "@/lib/auth";

export default function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const mutateLoginUser = useLoginUser();

  const { setUserEmail, setIsEmailVerified } = useStore(
    useShallow((state) => ({
      setIsEmailVerified: state.setIsEmailVerified,
      setUserEmail: state.setUserEmail,
    }))
  );

  const loginForm = useForm<LoginUserData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: LoginUserData) {
    mutateLoginUser.mutate(data, {
      onError: (error, variables) => {
        console.log("error", error);
        if (error.message == "Email not verified. Please verify first!") {
          setIsEmailVerified(false);
          setUserEmail(variables.email);
          navigate("/verify-account");
        } else {
          toast({
            className: "bg-red-700",
            title: error?.message,
          });
        }
      },
      onSuccess: async (data, variables) => {
        const response = data.data;
        setToken(response.data.token);
        setRefreshToken(response.data.refreshToken);
        setIsEmailVerified(response.data.isVerified);
        toast({
          className: "bg-green-700",
          title: "Logged in successfully!",
        });
        if (response.data.masterKey == null) {
          navigate("/create-master-password");
        } else if (response.data.isVerified) {
          navigate("/master-password");
        } else {
          setUserEmail(variables.email);
          navigate("/verify-account");
        }
      },
    });
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Email"
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
                      <PasswordInput placeholder="Enter Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-18"
                disabled={mutateLoginUser.isPending}
              >
                {mutateLoginUser.isPending ? <LoadingSpinner /> : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <NavLink to="/sign-up" className="text-blue-600" replace>
            Create a new account
          </NavLink>
        </CardFooter>
      </Card>
    </div>
  );
}

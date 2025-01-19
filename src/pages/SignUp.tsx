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
import { USER_KEY } from "@/lib/constants";
import {
  deriveKey,
  encrypt,
  generateMasterKey,
  generateRecoveryKey,
  generateSalt,
} from "@/lib/encryption.helper";
import { storeKeyInIndexedDB } from "@/lib/indexedDb";
import { useSignUpUser } from "@/services/mutation/user";
import { SignUpUserFormData, signUpUserSchema } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { PasswordInput } from "../components/ui/password-input";

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
          className: "bg-red-700",
          title: "Error Signing up!",
          description: error.message,
        });
      },
      onSuccess: async () => {
        toast({
          className: "bg-green-700",
          title: "Signed up successfully!",
        });
        await storeKeyInIndexedDB(userKey, USER_KEY);
        await navigate("/login");
      },
    });
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...signUpForm}>
            <form
              onSubmit={signUpForm.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={signUpForm.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signUpForm.control}
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
                control={signUpForm.control}
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
              <Button type="submit" disabled={mutateSignUpUser.isPending}>
                {mutateSignUpUser.isPending ? <LoadingSpinner /> : "Sign Up"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <NavLink to="/login" className="text-blue-600" replace>
            Already have an account? Login
          </NavLink>
        </CardFooter>
      </Card>
    </div>
  );
}

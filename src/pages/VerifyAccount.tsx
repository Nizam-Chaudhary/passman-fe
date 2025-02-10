import { InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { InputOTP, InputOTPGroup } from "@/components/ui/input-otp";
import { VerifyAccountFormData, verifyAccountFormSchema } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useResendOTP, useVerifyUserEmail } from "@/services/mutation/auth";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";
import { ROUTES } from "@/lib/constants";

export default function VerifyAccount() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof verifyAccountFormSchema>>({
    resolver: zodResolver(verifyAccountFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { email } = useStore(
    useShallow((state) => ({
      email: state.userEmail,
    }))
  );

  const resendOTPMutation = useResendOTP();

  const verifyUserEmailMutation = useVerifyUserEmail();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<VerifyAccountFormData> = (data) => {
    const payload = {
      email: email!,
      otp: data.otp,
    };
    verifyUserEmailMutation.mutate(payload, {
      onError: (error) => {
        toast({
          className: "bg-red-700 text-white",
          title: "Error verifying account!",
          description: error.message,
        });
      },
      onSuccess: () => {
        toast({
          className: "bg-green-700 text-white",
          title: "Email verified successfully!",
        });
        navigate(ROUTES.LOGIN);
      },
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verify Account</CardTitle>
          <CardDescription>
            Please enter the one-time password sent to your Email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>

              <input
                className="block"
                type={"button"}
                value="Resend OTP"
                onClick={() => {
                  resendOTPMutation.mutate(
                    { email: email! },
                    {
                      onSuccess: () => {
                        toast({
                          className: "bg-green-700 text-white",
                          title: "OTP sent successfully!",
                        });
                      },
                      onError: (error) => {
                        toast({
                          className: "bg-red-700 text-white",
                          title: error.message,
                        });
                      },
                    }
                  );
                }}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

import {
  VerifyMasterPasswordFormData,
  verifyMasterPasswordFormSchema,
} from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { decrypt, deriveKey, importKey } from "@/lib/encryption.helper";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "@/store/store";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useVerifyMasterPassword } from "@/services/mutation/auth";
import { PasswordInput } from "@/components/ui/password-input";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { ROUTES } from "@/lib/constants";

export default function VerifyMasterPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setIsMasterPasswordSet, setMasterkey } = useStore(
    useShallow((state) => ({
      setIsMasterPasswordSet: state.setIsMasterPasswordSet,
      setMasterkey: state.setMasterkey,
    }))
  );

  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(verifyMasterPasswordFormSchema),
    defaultValues: {
      masterPassword: "",
    },
  });

  const verifyMasterPasswordMutation = useVerifyMasterPassword();

  const onSubmit: SubmitHandler<VerifyMasterPasswordFormData> = async (
    data,
    event
  ) => {
    event?.preventDefault();
    setIsSubmitting(true);
    await verifyMasterPasswordMutation.mutateAsync(
      {
        masterPassword: data.masterPassword,
      },
      {
        onSuccess: async (result) => {
          const response = result.data;
          const userKey = await deriveKey(
            data.masterPassword,
            response.data.masterKey.salt
          );

          setIsSubmitting(false);
          const decryptedMasterKey = await decrypt(
            response.data.masterKey,
            userKey
          );
          const masterKey = await importKey(decryptedMasterKey);
          setMasterkey(masterKey);
          setIsMasterPasswordSet(true);
          navigate(ROUTES.HOME, { replace: true });
        },
        onError: (error) => {
          setIsSubmitting(false);
          toast({
            title: error.message,
            className: "bg-red-700",
          });
        },
      }
    );
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Master Password</CardTitle>
          <CardDescription>Enter existing Master password</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="masterPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Master Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Enter Master Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-20" disabled={isSubmitting}>
                {isSubmitting ? <LoadingSpinner /> : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

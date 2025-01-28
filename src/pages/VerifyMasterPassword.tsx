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
import { Input } from "../components/ui/input";
import { useLoggedInUserDetails } from "@/services/queries/user";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { decrypt, deriveKey, importKey } from "@/lib/encryption.helper";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "@/store/store";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

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

  const { data: response, isPending } = useLoggedInUserDetails();

  if (isPending) {
    return <LoadingSpinner />;
  }

  const onSubmit: SubmitHandler<VerifyMasterPasswordFormData> = async (
    data,
    event
  ) => {
    event?.preventDefault();
    const userDetails = response?.data.data;
    if (!data) return;
    if (!userDetails) return;
    setIsSubmitting(true);
    const userKey = await deriveKey(
      data.masterPassword,
      userDetails.masterKey.salt
    );

    try {
      const decryptedMasterKey = await decrypt(userDetails.masterKey, userKey);
      const masterKey = await importKey(decryptedMasterKey);

      setIsMasterPasswordSet(true);
      setMasterkey(masterKey);
      navigate("/", { replace: true });
    } catch {
      toast({
        title: "Incorrect Master Password",
        className: "bg-red-700",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                      <Input placeholder="Enter master password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Verifying..." : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

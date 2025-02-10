import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import LoadingSpinner from "./ui/loadingSpinner";
import { PasswordInput } from "./ui/password-input";
import {
  UserDetails,
  VerifyRecoveryMasterPasswordFormData,
  verifyRecoveryMasterPasswordFormSchema,
} from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLoggedInUserDetails } from "@/services/queries/user";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { useToast } from "@/hooks/use-toast";
import { deriveKey, decrypt } from "@/lib/encryption.helper";

const VerifyRecoveryMasterPassword = () => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(verifyRecoveryMasterPasswordFormSchema),
    defaultValues: {
      masterPassword: "",
    },
  });

  const { setMastersetMasterKeyForRecovery } = useStore(
    useShallow((state) => ({
      setMastersetMasterKeyForRecovery: state.setMasterKeyForUpdate,
    }))
  );

  const { data: userDetails, isPending, isError } = useLoggedInUserDetails();

  const verifyMasterPasswordMutation = useMutation({
    mutationFn: async (
      data: UserDetails & VerifyRecoveryMasterPasswordFormData
    ) => {
      const derivedUsedKey = await deriveKey(
        data.masterPassword,
        data.masterKey.salt
      );

      return await decrypt(data.masterKey, derivedUsedKey);
    },
    onSuccess: (masterKey) => {
      toast({
        className: "bg-green-700 text-white",
        title: "Master password verified successfully",
      });

      setMastersetMasterKeyForRecovery(masterKey);
    },
    onError: () => {
      setMastersetMasterKeyForRecovery(null);
      toast({
        className: "bg-red-700 text-white",
        title: "Invalid master password",
      });
    },
  });

  const onSubmit: SubmitHandler<VerifyRecoveryMasterPasswordFormData> = (
    data
  ) => {
    verifyMasterPasswordMutation.mutate({
      ...userDetails!,
      ...data,
    });
  };

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="masterPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Master Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter Existing Master Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-20"
          disabled={verifyMasterPasswordMutation.isPending}
        >
          {verifyMasterPasswordMutation.isPending ? (
            <LoadingSpinner />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default VerifyRecoveryMasterPassword;

import {
  CreateMasterPasswordFormData,
  createMasterPasswordFormSchema,
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
import RecoveryKeyDialog from "@/components/RecoverKeyDialog";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { useCreateMasterKey, useRefreshToken } from "@/services/mutation/user";
import {
  deriveKey,
  encrypt,
  generateMasterKey,
  generateRecoveryKey,
  generateSalt,
} from "@/lib/encryption.helper";

export default function CreateMasterPassword() {
  const { setOpenRecoveryKeyDialog, setRecoveryKey } = useStore(
    useShallow((state) => ({
      setOpenRecoveryKeyDialog: state.setOpenRecoveryKeyDialog,
      setRecoveryKey: state.setRecoveryKey,
    }))
  );

  const form = useForm({
    resolver: zodResolver(createMasterPasswordFormSchema),
    defaultValues: {
      masterPassword: "",
      confirmMasterPassword: "",
    },
  });

  const createMasterPasswordMutation = useCreateMasterKey();
  const refreshTokenMutation = useRefreshToken();

  const onSubmit: SubmitHandler<CreateMasterPasswordFormData> = async (
    data
  ) => {
    const masterKey = generateMasterKey();
    const recoveryKey = generateRecoveryKey();
    setRecoveryKey(recoveryKey);

    /* derive user key from master password and recover key using generated recovery key */
    const userKeySalt = generateSalt();
    const recoveryKeySalt = generateSalt();
    const derivedUserKeyPromise = deriveKey(data.masterPassword, userKeySalt);
    const derivedRecoveryKeyPromise = deriveKey(recoveryKey, recoveryKeySalt);
    const [derivedUserKey, derivedRecoveryKey] = await Promise.all([
      derivedUserKeyPromise,
      derivedRecoveryKeyPromise,
    ]);

    /* encrypt the master key with both user key and recovery key */
    const encryptedMasterKeyPromise = encrypt(masterKey, derivedUserKey);
    const encryptedRecoveryKeyPromise = encrypt(masterKey, derivedRecoveryKey);

    const [encryptedMasterKey, encryptedRecoveryKey] = await Promise.all([
      encryptedMasterKeyPromise,
      encryptedRecoveryKeyPromise,
    ]);

    await createMasterPasswordMutation.mutateAsync(
      {
        masterKey: { ...encryptedMasterKey, salt: userKeySalt },
        recoveryKey: { ...encryptedRecoveryKey, salt: recoveryKeySalt },
      },
      {
        onSuccess: async () => {
          await refreshTokenMutation.mutateAsync();
          setOpenRecoveryKeyDialog(true);
        },
      }
    );
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Master Password</CardTitle>
          <CardDescription>Create a master password</CardDescription>
        </CardHeader>
        <CardContent>
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
                      <Input placeholder="Enter master password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmMasterPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Master Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Re-Enter master password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <RecoveryKeyDialog />
    </div>
  );
}

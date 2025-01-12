import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import {
    Password,
    passwordPayloadSchema,
    passwordSchema,
} from "@/lib/types/password";
import { SubmitHandler, useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { encrypt } from "@/lib/encryption.helper";
import { getKeysFromIndexedDB } from "@/lib/indexedDb";
import { useToast } from "@/hooks/use-toast";
import { useAddPassword } from "@/services/mutation/password";
import { Input } from "./ui/input";
import { PasswordInput } from "./ui/password-input";
import { Textarea } from "./ui/textarea";

type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
};
export default function AddPassword({ open, setOpen }: Props) {
    const { toast } = useToast();
    const addPasswordMutation = useAddPassword();
    const form = useForm<Password>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            username: "",
            password: "",
            site: "",
            note: "",
        },
    });

    const onSubmit: SubmitHandler<Password> = async (data) => {
        const encryptionKey = await getKeysFromIndexedDB("userKey");
        if (!encryptionKey) {
            toast({
                className: "bg-red-700",
                title: "Error encrypting password!",
                description: "User key not found",
            });
            return;
        }
        const encryptedPassword = await encrypt(data.password, encryptionKey);
        const payload = passwordPayloadSchema.parse({
            ...data,
            password: encryptedPassword,
        });

        addPasswordMutation.mutate(payload, {
            onError: (error) => {
                toast({
                    className: "bg-red-500",
                    description: error.message,
                });
            },
            onSuccess: () => {
                toast({
                    title: "Password added successfully.",
                    className: "bg-green-700",
                });
                setOpen(false);
                form.reset();
            },
        });
    };

    const onOpenChange = (value: boolean) => {
        form.clearErrors();
        setOpen(value);
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Password</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        autoComplete="off"
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-2"
                    >
                        {/* Site Field */}
                        <FormField
                            control={form.control}
                            name="site"
                            render={({ field }) => (
                                <FormItem className="mt-2">
                                    <FormLabel>Site</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id="site"
                                            type="text"
                                            placeholder="Enter Site"
                                            className="mt-2"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Username Field */}
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="mt-2">
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id="username"
                                            type="text"
                                            placeholder="Enter Username"
                                            className="mt-2"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Password Field */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="mt-2">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            {...field}
                                            id="password"
                                            placeholder="Enter Password"
                                            className="mt-2"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Notes Field */}
                        <FormField
                            control={form.control}
                            name="note"
                            render={({ field }) => (
                                <FormItem className="mt-2">
                                    <FormLabel>Notes</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            id="note"
                                            rows={6}
                                            className="mt-2 max-h-[150px]"
                                            placeholder="Enter Note"
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button
                                type="button"
                                className="bg-red-600 text-white hover:bg-red-700"
                                onClick={() => {
                                    onOpenChange(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">Add</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

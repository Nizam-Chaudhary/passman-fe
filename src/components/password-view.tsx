import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { ClipboardCopyIcon, TrashIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import {
    Password,
    passwordPayloadSchema,
    passwordSchema,
} from "@/lib/types/password";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import CopyToClipboard from "react-copy-to-clipboard";
import { Input } from "./ui/input";
import { PasswordInput } from "./ui/password-input";
import { Textarea } from "./ui/textarea";
import { useSearchParams } from "react-router";
import { usePasswordById } from "@/services/queries/password";
import { useEffect, useState } from "react";
import Loading from "./ui/loading";
import {
    useDeletePassword,
    useUpdatePassword,
} from "@/services/mutation/password";
import { getKeysFromIndexedDB } from "@/lib/indexedDb";
import { decrypt, encrypt } from "@/lib/encryption.helper";
import ConfirmDialog from "./confirm-dialog";
import { useQuery } from "@tanstack/react-query";
import { USER_KEY } from "@/lib/constants";

export function PasswordView() {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const passwordId = searchParams.get("p");
    const { data, isPending, isError } = usePasswordById(passwordId);
    const editPasswordMutation = useUpdatePassword();
    const deletePasswordMutation = useDeletePassword();

    const { data: encryptionKey } = useQuery({
        queryKey: ["encryptionKey"],
        queryFn: async () => {
            return await getKeysFromIndexedDB(USER_KEY);
        },
    });

    const { data: password } = useQuery({
        queryKey: ["decryptPassword", { id: passwordId }],
        queryFn: async () => {
            const encryptionKey = await getKeysFromIndexedDB(USER_KEY);
            if (!encryptionKey || !data?.password) return null;
            return await decrypt(data?.password, encryptionKey);
        },
        enabled: !!data?.password && encryptionKey != null,
    });

    const editPasswordForm = useForm<Password>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            site: "",
            username: "",
            password: "",
            note: "",
        },
    });

    useEffect(() => {
        editPasswordForm.reset({
            site: data?.site || "",
            username: data?.username || "",
            password: password || "",
            note: data?.note || "",
        });
    }, [password, data, editPasswordForm]);

    if (!passwordId) {
        return (
            <Card className="h-[calc(100vh-5.5rem)]">
                <CardContent>
                    <div className="flex flex-col justify-center items-center h-[calc(100vh-10rem)] gap-8">
                        <img className="w-[30vh]" src="src/assets/select.svg" />
                        <p className="text-3xl mt-2">
                            Select password from list
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (isPending) {
        return (
            <Card className="h-[calc(100vh-5.5rem)]">
                <CardContent>
                    <div className="h-[calc(100vh-5.5rem)] flex items-center justify-center">
                        <Loading />
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (isError) {
        return (
            <Card className="h-[calc(100vh-5.5rem)]">
                <CardContent>
                    <div className="h-[calc(100vh-5.5rem)] flex items-center justify-center">
                        <div className="flex flex-col justify-center items-center mt-20 gap-8">
                            <img
                                className="w-[50%]"
                                src="src/assets/warning.svg"
                            />
                            <p className="text-3xl mt-2">Password not found</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const onEditSubmit: SubmitHandler<Password> = async (data) => {
        if (!encryptionKey) {
            toast({
                title: "Error encrypting password!",
                description: "User key not found",
                className: "bg-red-700",
            });
            return;
        }
        const encryptedPassword = await encrypt(data.password, encryptionKey);
        const updatedPassword = passwordPayloadSchema.parse({
            ...data,
            password: encryptedPassword,
        });

        editPasswordMutation.mutate(
            { id: passwordId, data: updatedPassword },
            {
                onError: (error) => {
                    toast({
                        className: "bg-red-700",
                        description: error.message,
                    });
                },
                onSuccess: () => {
                    toast({
                        title: "Password updated successfully.",
                        className: "bg-green-700",
                    });
                },
            }
        );
    };

    const onDeletePassword = () => {
        deletePasswordMutation.mutate(passwordId, {
            onError: (error) => {
                toast({
                    className: "bg-red-700",
                    description: error.message,
                });
            },
            onSuccess: () => {
                searchParams.delete("p");
                setSearchParams(searchParams);
                toast({
                    title: "Password deleted successfully.",
                    className: "bg-green-700",
                });
                setOpenDeleteDialog(false);
            },
        });
    };

    return (
        <>
            <Card className="h-[calc(100vh-5.5rem)]">
                <ScrollArea className="h-[calc(100vh-5.5rem)]">
                    <CardHeader>
                        <div>
                            <div className="flex justify-between items-center">
                                <Avatar className="size-8 rounded-lg">
                                    <AvatarImage src="src/assets/shadcn.jpg" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>

                                <Button
                                    variant="destructive"
                                    className="size-10 bg-red-600 hover:bg-red-700"
                                    onClick={() => setOpenDeleteDialog(true)}
                                >
                                    <TrashIcon />
                                </Button>
                            </div>
                            <Separator className="mt-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Form {...editPasswordForm}>
                            <form
                                autoComplete="off"
                                onSubmit={editPasswordForm.handleSubmit(
                                    onEditSubmit
                                )}
                                className="space-y-2"
                            >
                                <FormField
                                    control={editPasswordForm.control}
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
                                <FormField
                                    control={editPasswordForm.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem className="mt-2">
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        {...field}
                                                        id="username"
                                                        type="text"
                                                        placeholder="Enter Username"
                                                        className="mt-2"
                                                        autoComplete="new-password"
                                                        autoCorrect="off"
                                                        autoCapitalize="off"
                                                        spellCheck="false"
                                                        value={
                                                            field.value || ""
                                                        }
                                                    />
                                                    <CopyToClipboard
                                                        text={field.value ?? ""}
                                                    >
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="absolute top-0 right-0 cursor-pointer h-full hover:bg-transparent"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                toast({
                                                                    className:
                                                                        "bg-green-700",
                                                                    description:
                                                                        "Username copied to clipboard",
                                                                });
                                                            }}
                                                        >
                                                            <ClipboardCopyIcon />
                                                        </Button>
                                                    </CopyToClipboard>
                                                </div>
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={editPasswordForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="mt-2">
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <PasswordInput
                                                        {...field}
                                                        id="password"
                                                        placeholder="Enter Password"
                                                        autoComplete="new-password"
                                                        autoCorrect="off"
                                                        autoCapitalize="off"
                                                        spellCheck="false"
                                                        className="mt-2"
                                                    />

                                                    <CopyToClipboard
                                                        text={field.value}
                                                    >
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="absolute top-0 right-8 cursor-pointer h-full hover:bg-transparent"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                toast({
                                                                    className:
                                                                        "bg-green-700",
                                                                    description:
                                                                        "Password copied to clipboard",
                                                                });
                                                            }}
                                                        >
                                                            <ClipboardCopyIcon />
                                                        </Button>
                                                    </CopyToClipboard>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={editPasswordForm.control}
                                    name="note"
                                    render={({ field }) => (
                                        <FormItem className="mt-2">
                                            <FormLabel>Note</FormLabel>
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
                                <Button
                                    className="text-center w-full bg-blue-700 hover:bg-blue-600 text-white"
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </ScrollArea>
            </Card>

            <ConfirmDialog
                open={openDeleteDialog}
                setOpen={setOpenDeleteDialog}
                title="Delete Password"
                description="Are you sure you want to delete the password?"
                variant="destructive"
                onClick={onDeletePassword}
            />
        </>
    );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ClipboardCopyIcon, TrashIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { PasswordInput } from "./ui/password-input";
import { Textarea } from "./ui/textarea";
import { EditPassword, editPasswordSchema } from "@/lib/types/password";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { useToast } from "@/hooks/use-toast";

export function PasswordView() {
    const { toast } = useToast();
    const editPasswordForm = useForm<EditPassword>({
        resolver: zodResolver(editPasswordSchema),
        defaultValues: {
            appName: "",
            baseUrl: "",
            email: "",
            faviconUrl: "",
            notes: "",
            password: "",
            username: "",
            specificUrl: "",
        },
    });

    const onEditSubmit: SubmitHandler<EditPassword> = (data) => {
        console.log("data", data);
    };
    return (
        <>
            <Card className="h-[calc(100vh-2rem)]">
                <CardHeader>
                    <div>
                        <div className="flex justify-between items-center">
                            <Avatar className="size-8 rounded-lg">
                                <AvatarImage src="src/assets/shadcn.jpg" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

                            <Button variant="destructive" className="size-10">
                                <TrashIcon />
                            </Button>
                        </div>
                        <Separator className="mt-4" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Form {...editPasswordForm}>
                        <form
                            onSubmit={editPasswordForm.handleSubmit(
                                onEditSubmit
                            )}
                            className="space-y-2"
                        >
                            <FormField
                                control={editPasswordForm.control}
                                name="appName"
                                render={({ field }) => (
                                    <FormItem className="mt-2">
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                id="appName"
                                                type="text"
                                                placeholder="Enter Title"
                                                className="mt-2"
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={editPasswordForm.control}
                                name="baseUrl"
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
                                                value={field.value || ""}
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
                                        <FormLabel>Username / Email</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    {...field}
                                                    id="username"
                                                    type="text"
                                                    placeholder="Enter Username / Email"
                                                    className="mt-2"
                                                    value={field.value || ""}
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
                                                    className="mt-2"
                                                />

                                                <CopyToClipboard
                                                    text={field.value}
                                                >
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="absolute top-0 right-0 cursor-pointer h-full hover:bg-transparent"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            toast({
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
                                name="notes"
                                render={({ field }) => (
                                    <FormItem className="mt-2">
                                        <FormLabel>Notes</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                id="notes"
                                                rows={6}
                                                className="mt-2 max-h-[150px]"
                                                placeholder="Enter Notes"
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
            </Card>
        </>
    );
}

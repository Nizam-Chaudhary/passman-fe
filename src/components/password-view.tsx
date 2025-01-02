import { EditPassword, editPasswordSchema } from "@/lib/types/password";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SidebarMenuButton } from "./ui/sidebar";
import { DeleteIcon, TrashIcon } from "lucide-react";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { PasswordInput } from "./ui/password-input";
import { Textarea } from "./ui/textarea";

export function PasswordView() {
    const editPasswordForm = useForm<EditPassword>({
        resolver: zodResolver(editPasswordSchema),
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
                    <div>
                        <div className="">
                            <Label htmlFor="title" className="text-base">
                                Title
                            </Label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Enter Title"
                                className="mt-2"
                                defaultValue="Google"
                            />
                        </div>
                        <div>
                            <div className="mt-4">
                                <Label htmlFor="site" className="text-base">
                                    Site
                                </Label>
                                <Input
                                    id="site"
                                    type="text"
                                    placeholder="Enter Site"
                                    defaultValue="www.google.com"
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <Label htmlFor="username" className="text-base">
                                    Username / Email
                                </Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Enter Username / Email"
                                    defaultValue="Nizam1909"
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <Label htmlFor="password" className="text-base">
                                    Password
                                </Label>
                                <div className="mt-2">
                                    <PasswordInput
                                        id="password"
                                        defaultValue="password"
                                        placeholder="Enter Password"
                                    />
                                </div>
                            </div>
                            <div className="mt-4 me-2">
                                <Label htmlFor="notes" className="m">
                                    Notes
                                </Label>
                                <Textarea
                                    id="notes"
                                    className="mt-2 max-h-[150px]"
                                    rows={6}
                                ></Textarea>
                            </div>
                            <div>
                                <Button
                                    className="text-center w-full bg-blue-700 hover:bg-blue-600 text-white mt-4"
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

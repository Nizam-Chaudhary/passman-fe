import { useStore } from "@/store/store";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { useShallow } from "zustand/react/shallow";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addVaultSchema } from "@/lib/types/vault";
import { Button } from "./ui/button";
import { useAddVault } from "@/services/mutation/vault";
import { useToast } from "@/hooks/use-toast";

export default function AddVault() {
    const { open, setOpen } = useStore(
        useShallow((state) => ({
            open: state.openAddVaultDialog,
            setOpen: state.setOpenAddVaultDialog,
        }))
    );

    const { toast } = useToast();

    const form = useForm<{ name: string }>({
        resolver: zodResolver(addVaultSchema),
        defaultValues: {
            name: "",
        },
    });

    const addVaultMutation = useAddVault();

    const onSubmit: SubmitHandler<{ name: string }> = (data) => {
        addVaultMutation.mutate(data, {
            onError: (error) => {
                toast({
                    title: error.message,
                    className: "bg-red-700",
                });
            },
            onSuccess: () => {
                toast({
                    title: "Vault added successfully.",
                    className: "bg-green-700",
                });
                setOpen(false);
                form.reset();
            },
        });
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Vault</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        autoComplete="off"
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="mt-2">
                                    <FormLabel>Vault Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id="name"
                                            type="text"
                                            placeholder="Enter Vault name"
                                            className="mt-2"
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
                                    setOpen(false);
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

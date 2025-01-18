import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";

type Props = {
    title: string;
    description: string;
    variant:
        | "link"
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost";
    onClick: () => void;
};

export default function ConfirmDialog(props: Props) {
    const { title, description, variant, onClick } = props;
    const { open, setOpen } = useStore(
        useShallow((state) => ({
            open: state.openDeletePasswordDialog,
            setOpen: state.setOpenDeletePasswordDialog,
        }))
    );
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        type="button"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" variant={variant} onClick={onClick}>
                        Yes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

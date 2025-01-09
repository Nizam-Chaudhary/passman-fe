import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";

type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
};
export default function AddPassword({ open, setOpen }: Props) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Password</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <div>Hello, World!</div>
                <DialogFooter>
                    <Button
                        className="bg-red-600 text-white hover:bg-red-700"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button>Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

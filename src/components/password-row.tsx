import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

// type Props = {
//     key: string | number;
//     site?: string;
//     title?: string;
// };

export function PasswordRow() {
    return (
        <div>
            <div className="flex ml-1 items-center justify-center p-2 cursor-pointer">
                <div className="flex items-center justify-center w-8 cursor-pointer">
                    <Avatar className="w-8 h-8 rounded-lg">
                        <AvatarImage src="src/assets/shadcn.jpg" alt="logo" />
                        <AvatarFallback className="rounded-sm">
                            logo
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex flex-1 ml-2 justify-center flex-col cursor-pointer">
                    <Label className="block text-base text-nowrap font-bold cursor-pointer">
                        Site name
                    </Label>
                    <Label className="block text-sm text-nowrap text-gray-400 cursor-pointer">
                        Username
                    </Label>
                </div>
            </div>
            <div className="mx-2 my-1">
                <Separator />
            </div>
        </div>
    );
}

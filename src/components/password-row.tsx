import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Label } from "./ui/label";

// type Props = {
//   key: string | number;
//   site?: string;
//   title?: string;
// };

export function PasswordRow() {
    return (
        <>
            <div className="flex ml-1 items-center justify-center p-2">
                <div className="flex items-center justify-center w-8">
                    <Avatar className="w-8 h-8 rounded-lg">
                        <AvatarImage src="src/assets/shadcn.jpg" alt="logo" />
                        <AvatarFallback className="rounded-sm">
                            logo
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex flex-1 ml-2 justify-center flex-col">
                    <Label className="block text-base text-nowrap font-bold">
                        Site name
                    </Label>
                    <Label className="block text-sm text-nowrap text-gray-400">
                        Username
                    </Label>
                </div>
            </div>
        </>
    );
}

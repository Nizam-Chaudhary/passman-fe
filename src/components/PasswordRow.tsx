import { useSearchParams } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import LoadingSpinner from "./ui/loadingSpinner";

type Props = {
  id: string;
  site: string;
  username: string;
  faviconUrl?: string;
};

export function PasswordRow({ id, site, username, faviconUrl }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div
      onClick={() => {
        searchParams.set("p", id);
        setSearchParams(searchParams);
      }}
    >
      <div className="flex ml-1 items-center justify-center p-2 cursor-pointer">
        <div className="flex items-center justify-center w-8 cursor-pointer">
          <Avatar className="w-10 h-10 rounded-lg">
            <AvatarImage loading="lazy" src={faviconUrl || "/assets/shadcn.jpg"} alt="Icon" />
            <AvatarFallback><LoadingSpinner /></AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-1 ml-4 justify-center flex-col cursor-pointer">
          <Label className="block text-base text-nowrap font-bold cursor-pointer">
            {site}
          </Label>
          <Label className="block text-sm text-nowrap text-gray-400 cursor-pointer">
            {username}
          </Label>
        </div>
      </div>
      <div className="mx-2 my-1">
        <Separator />
      </div>
    </div>
  );
}

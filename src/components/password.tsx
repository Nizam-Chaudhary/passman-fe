import {
  ArrowRight,
  Eye,
  EyeOff,
  LucideEye,
  LucideScanEye,
  PiIcon,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Label } from './ui/label';

type Props = {
  key: string | number;
  site: string;
  email: string;
};

export function Password({ key, site, email }: Props) {
  return (
    <>
      <div key={key} className="flex w-1/2 mt-4 mb-4 items-center">
        <Avatar className="h-12 w-12 rounded-sm">
          <AvatarImage src="src/assets/shadcn.jpg" alt="logo" />
          <AvatarFallback className="rounded-sm">logo</AvatarFallback>
        </Avatar>
        <div className="flex flex-col ml-2">
          <Label className="block text-xl">Site name</Label>
          <Label className="block opacity-90">Username</Label>
        </div>
      </div>
    </>
  );
}

// passman-fe/src/pages/Settings.tsx
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  UserIcon,
  FolderIcon,
  ShieldIcon,
  FileDownIcon,
  FileUpIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Profile from "@/components/settings/Profile";
import Import from "@/components/settings/Import";
import Export from "@/components/settings/Export";
import Vault from "@/components/settings/Vault";
import Security from "@/components/settings/Security";

const settingsNavItems = [
  {
    title: "Profile",
    subTitle: "Manage your account",
    icon: UserIcon,
    component: Profile,
  },
  {
    title: "Import",
    subTitle: "Import passwords from listed providers",
    icon: FileDownIcon,
    component: Import,
  },
  {
    title: "Export",
    subTitle: "Export your passwords",
    icon: FileUpIcon,
    component: Export,
  },
  {
    title: "Vaults",
    subTitle: "Manage your Vaults",
    icon: FolderIcon,
    component: Vault,
  },
  {
    title: "Security",
    subTitle: "Manage account security",
    icon: ShieldIcon,
    component: Security,
  },
];

const Settings = () => {
  const [selectedItem, setSelectedItem] = useState(settingsNavItems[0]);

  return (
    <div className="container mx-auto py-6 pl-2 mt-10">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
        {/* Sidebar Navigation */}
        <aside className="lg:w-1/5">
          <nav className="flex space-x-1 lg:flex-col lg:space-x-0 lg:space-y-1">
            {settingsNavItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedItem(item)}
                className={cn(
                  "flex items-center justify-start rounded-lg px-2 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  selectedItem.title === item.title
                    ? "bg-accent"
                    : "transparent"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </button>
            ))}
          </nav>
        </aside>
        <Separator orientation="vertical" className="hidden lg:block" />
        {/* Main Content */}
        <div className="flex-1">
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {selectedItem.title}
                </h2>
                <p className="text-muted-foreground">{selectedItem.subTitle}</p>
              </div>
              <Separator />
              <selectedItem.component />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Settings;

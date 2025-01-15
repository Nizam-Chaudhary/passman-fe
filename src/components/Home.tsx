import { AppSidebar } from "@/components/app-sidebar";
import { PasswordList } from "@/components/password-list";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PasswordView } from "./password-view";
import { LockIcon, KeyRound, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { VaultComboBox } from "./vault-combo-box";
import AddPassword from "./add-password";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import debounce from "lodash/debounce";

export default function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [openAddPasswordDialog, setOpenAddPasswordDialog] = useState(false);

    const debouncedSearch = useMemo(
        () =>
            debounce((searchTerm: string) => {
                if (searchTerm === "") {
                    searchParams.delete("q");
                } else {
                    searchParams.set("q", searchTerm);
                }
                setSearchParams(searchParams);
            }, 500),
        [searchParams, setSearchParams]
    );

    // Cleanup the debounced function on unmount
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    return (
        <div>
            <SidebarProvider>
                <AppSidebar />
                <div className="w-[100%]">
                    <div className="flex items-center justify-between pt-4 px-2">
                        <SidebarTrigger className="align-middle size-6 ms-2 mr-4" />
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <VaultComboBox />
                                <LockIcon className="size-4 opacity-60 ml-3" />
                            </div>
                        </div>
                        <div className="flex items-center flex-1 justify-end">
                            <div className="flex flex-[0.5] items-center relative">
                                <Input
                                    className="pr-10"
                                    placeholder="Search"
                                    onChange={(e) => {
                                        const searchTerm = e.target.value;
                                        debouncedSearch(searchTerm);
                                    }}
                                    defaultValue={searchParams.get("q") || ""}
                                />
                                <Search className="absolute right-3 w-5 h-5 text-gray-500 pointer-events-none" />
                            </div>
                            <Button
                                variant="default"
                                className="ms-2 flex justify-between items-center"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenAddPasswordDialog(true);
                                }}
                            >
                                Add Password
                                <KeyRound />
                            </Button>
                        </div>
                    </div>
                    <main className="p-4">
                        <AddPassword
                            open={openAddPasswordDialog}
                            setOpen={setOpenAddPasswordDialog}
                        />
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <PasswordList />
                            </div>
                            <div className="flex-[1.5]">
                                <PasswordView />
                            </div>
                        </div>
                    </main>
                </div>
            </SidebarProvider>
        </div>
    );
}

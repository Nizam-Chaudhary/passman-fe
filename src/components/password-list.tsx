import { usePasswords } from "@/services/queries/password";
import { PasswordRow } from "./password-row";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { useSearchParams } from "react-router";

export function PasswordList() {
    const [searchParams] = useSearchParams();
    const {
        data: passwords,
        isPending,
        isError,
        isSuccess,
    } = usePasswords(searchParams.get("q"));
    return (
        <>
            <Card className="h-[calc(100vh-5.5rem)]">
                <CardContent className="p-0">
                    <ScrollArea className="h-[calc(100vh-5.5rem)]">
                        {isPending ? "Pending" : null}
                        {isError ? "Error" : null}
                        {isSuccess && passwords.data.length > 0 ? (
                            passwords.data.map((password, index) => (
                                <PasswordRow
                                    key={index}
                                    id={password.id.toString()}
                                    site={password.site}
                                    username={password.username}
                                />
                            ))
                        ) : (
                            <div className="flex h-[calc(100vh-10rem)] flex-col justify-center items-center gap-8">
                                <img
                                    className="w-[50%]"
                                    src="src/assets/no_data.svg"
                                />
                                <p className="text-3xl">No Passwords Found!</p>
                            </div>
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>
        </>
    );
}

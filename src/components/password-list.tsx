import { usePasswords } from "@/services/queries/password";
import { PasswordRow } from "./password-row";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

export function PasswordList() {
    const { data: passwords, isPending, isError, isSuccess } = usePasswords();
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
                                    site={
                                        password?.appName ?? password?.baseUrl
                                    }
                                    title={
                                        password?.username || password?.email
                                    }
                                />
                            ))
                        ) : (
                            <div className="flex flex-col justify-center items-center mt-20 gap-8">
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

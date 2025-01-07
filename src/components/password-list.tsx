import { usePasswords } from "@/services/queries/password";
import { PasswordRow } from "./password-row";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

export function PasswordList() {
    const { data: passwords, isPending, isError, isSuccess } = usePasswords();
    return (
        <>
            <Card className="h-[calc(100vh-2rem)]">
                <CardContent className="p-0">
                    <ScrollArea className="h-[calc(100vh-2rem)]">
                        {isPending ? "Pending" : null}
                        {isError ? "Error" : null}
                        {isSuccess
                            ? passwords.data.map((password, index) => (
                                  <PasswordRow
                                      key={index}
                                      url={
                                          password?.appName || password?.baseUrl
                                      }
                                      title={
                                          password?.username || password?.email
                                      }
                                  />
                              ))
                            : null}
                    </ScrollArea>
                </CardContent>
            </Card>
        </>
    );
}

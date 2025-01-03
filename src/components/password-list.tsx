import { PasswordRow } from "./password-row";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

const passwords: number[] = [];
for (let i = 0; i < 100; i++) {
    passwords[i] = i;
}

export function PasswordList() {
    return (
        <>
            <Card className="h-[calc(100vh-2rem)]">
                <CardContent className="p-0">
                    <ScrollArea className="h-[calc(100vh-2rem)]">
                        {passwords.map((value, index) => (
                            <PasswordRow
                                key={index}
                                // site={value.toString()}
                                // title={value.toString()}
                            />
                        ))}
                    </ScrollArea>
                </CardContent>
            </Card>
        </>
    );
}

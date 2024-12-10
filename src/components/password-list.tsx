import { Password } from './password';
import { ScrollArea } from './ui/scroll-area';

const passwords: number[] = [];
for (let i = 0; i < 100; i++) {
  passwords[i] = i;
}

export function PasswordList() {
  return (
    <>
      <ScrollArea className="h-[88svh] w-1/2 rounded-md border">
        {passwords.map((value, index) => (
          <Password
            key={index}
            site={value.toString()}
            email={value.toString()}
          />
        ))}
      </ScrollArea>
    </>
  );
}

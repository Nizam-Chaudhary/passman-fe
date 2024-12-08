import { Avatar } from './ui/avatar';
import { Card, CardContent } from './ui/card';

const passwords: number[] = [];
for (let i = 0; i < 100; i++) {
  passwords[i] = i;
}

export function PasswordView() {
  return (
    <>
      <Card className="w-1/2 ms-2 me-2">
        <CardContent>
          {passwords.map((value, index) => (
            <div key={index} className="m-2 inline-flex w-full">
              <Avatar></Avatar>
              Password{value}
              <br />
              email@g{value}.com
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}

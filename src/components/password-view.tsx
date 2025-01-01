import { Card, CardContent } from './ui/card';
import { Label } from './ui/label';

const passwords: number[] = [];
for (let i = 0; i < 100; i++) {
  passwords[i] = i;
}

export function PasswordView() {
  return (
    <>
      <Card>
        <CardContent>
          <Label>Site</Label>
        </CardContent>
      </Card>
    </>
  );
}

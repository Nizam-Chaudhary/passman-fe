import { Avatar } from './ui/avatar';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card';

const passwords: number[] = [];
for (let i = 0; i < 100; i++) {
	passwords[i] = i;
}

export function PasswordList() {
	return (
		<>
			<Card className="w-[500px] mt-2 ms-6">
				<CardHeader>
					<CardTitle>Vault Name:</CardTitle>
					<CardDescription>Vault description</CardDescription>
				</CardHeader>
				<CardContent>
					{passwords.map((_value, index) => (
						<div key={index} className="m-2 inline-flex w-full">
							<Avatar></Avatar>
							Password1
							<br />
							email@g.com
						</div>
					))}
				</CardContent>
			</Card>
		</>
	);
}

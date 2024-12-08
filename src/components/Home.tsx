import { AppSidebar } from '@/components/app-sidebar';
import { PasswordList } from '@/components/password-list';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function HomePage() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main>
				<SidebarTrigger />
				<PasswordList />
			</main>
		</SidebarProvider>
	);
}

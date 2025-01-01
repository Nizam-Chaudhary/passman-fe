import { AppSidebar } from '@/components/app-sidebar';
import { PasswordList } from '@/components/password-list';
import { SidebarProvider } from '@/components/ui/sidebar';
// import { KeyRound, LockIcon, Search } from 'lucide-react';
// import { useNavigate } from 'react-router';
import { PasswordView } from './password-view';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { VaultComboBox } from './vault-combo-box';

export default function Home() {
  // const navigate = useNavigate();
  return (
    <div className="">
      <SidebarProvider>
        <AppSidebar />
        {/* <div className="flex items-center  justify-between mt-2 mb-2">
            <div className="flex items-center w-1/2 me-5 justify-between gap-1">

              <div className="flex items-center gap-1  me-1">
                <LockIcon className="size-4 opacity-60" />
                <VaultComboBox />
                <Button
                  variant="default"
                  className="ms-2 flex justify-between items-center"
                  onClick={() => navigate('/login')}
                >
                  Add Password
                  <KeyRound />
                </Button>
              </div>
            </div>
            <div className="relative w-[47.9%] flex items-center me-4">
              <Input className="pr-10" placeholder="Search password" />
              <Search className="absolute inset-y-2 right-3 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>
          </div> */}
        <main className="flex-1  p-4">
          {/* <SidebarTrigger className="align-middle size-6 ms-2" /> */}
          <div className="h-full flex gap-4">
            <div className="flex-1">
              <PasswordList />
            </div>
            <div className="flex-[1.75]">
              <PasswordView />
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}

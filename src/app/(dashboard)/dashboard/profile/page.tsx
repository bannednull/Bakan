import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@dashboard/_components/header';
import ChangePassword from '@dashboard/profile/_components/change-password';

function ProfilePage() {
  return (
    <div className="flex h-screen flex-col">
      <Header title="Profile" />

      <ScrollArea className="flex-1">
        <div className="flex h-full flex-col">
          <Tabs defaultValue="account" orientation="vertical" className="flex h-full">
            <TabsList className="flex h-full w-[230px] flex-col justify-start gap-1 rounded-none border-r bg-transparent p-4">
              <TabsTrigger
                value="account"
                className="w-full justify-start data-[state=active]:bg-accent"
              >
                Account
              </TabsTrigger>
              <TabsTrigger
                value="billing"
                className="w-full justify-start data-[state=active]:bg-accent"
              >
                Billing
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="w-full justify-start data-[state=active]:bg-accent"
              >
                Change password
              </TabsTrigger>
            </TabsList>
            <div className="flex-1 px-6 py-2">
              <TabsContent value="account" className="h-full">
                <h1>Account</h1>
              </TabsContent>
              <TabsContent value="billing" className="h-full">
                <h1>Billing</h1>
              </TabsContent>
              <TabsContent value="password" className="h-full">
                <h1 className="mb-4 text-xl font-bold">Change password</h1>
                <ChangePassword />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}

export default ProfilePage;

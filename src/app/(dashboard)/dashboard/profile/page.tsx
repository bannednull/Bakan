import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '../../_components/header';

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
              <TabsContent value="password" className="h-full">
                <h1>Change password</h1>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}

export default ProfilePage;

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  ArrowDownUp,
  Bell,
  CreditCard,
  DollarSign,
  Home,
  LineChart,
  Menu,
  PieChart,
  Settings,
  Sun,
  User,
  Wallet,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AccountsOverview } from '@/components/dashboard/AccountsOverview';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { SpendingChart } from '@/components/dashboard/SpendingChart';
import { MobileNav } from '@/components/dashboard/MobileNav';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className='flex min-h-screen flex-col'>
      <header className='sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
        <Button
          variant='ghost'
          size='icon'
          className='md:hidden'
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle Menu</span>
        </Button>
        <div className='flex items-center gap-2'>
          <Wallet className='h-6 w-6' />
          <span className='text-lg font-semibold'>FinTrack</span>
        </div>
        <div className='ml-auto flex items-center gap-4'>
          <Button variant='ghost' size='icon'>
            <Bell className='h-5 w-5' />
            <span className='sr-only'>Notifications</span>
          </Button>
          <Button variant='ghost' size='icon'>
            <Sun className='h-5 w-5' />
            <span className='sr-only'>Toggle theme</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon' className='rounded-full'>
                <Avatar className='h-8 w-8'>
                  <AvatarImage src='/placeholder.svg' alt='User' />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className='mr-2 h-4 w-4' />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className='mr-2 h-4 w-4' />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className='flex flex-1'>
        <MobileNav isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <aside className={`hidden w-64 flex-col border-r bg-muted/40 md:flex`}>
          <ScrollArea className='flex-1'>
            <div className='flex flex-col gap-2 p-4'>
              <Button variant='ghost' className='justify-start gap-2'>
                <Home className='h-4 w-4' />
                Dashboard
              </Button>
              <Button variant='ghost' className='justify-start gap-2'>
                <CreditCard className='h-4 w-4' />
                Accounts
              </Button>
              <Button variant='ghost' className='justify-start gap-2'>
                <ArrowDownUp className='h-4 w-4' />
                Transactions
              </Button>
              <Button variant='ghost' className='justify-start gap-2'>
                <LineChart className='h-4 w-4' />
                Analytics
              </Button>
              <Button variant='ghost' className='justify-start gap-2'>
                <PieChart className='h-4 w-4' />
                Budgets
              </Button>
              <Separator className='my-2' />
              <Button variant='ghost' className='justify-start gap-2'>
                <Settings className='h-4 w-4' />
                Settings
              </Button>
            </div>
          </ScrollArea>
        </aside>
        <main className='flex-1'>
          <div className='grid gap-6 p-6 md:gap-8 lg:grid-cols-2 xl:grid-cols-3'>
            <div className='space-y-6 xl:col-span-2'>
              <div className='flex flex-col gap-2'>
                <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
                <p className='text-muted-foreground'>
                  Welcome back, John! Here&apos;s an overview of your finances.
                </p>
              </div>
              <Tabs defaultValue='overview'>
                <TabsList className='grid w-full grid-cols-3'>
                  <TabsTrigger value='overview'>Overview</TabsTrigger>
                  <TabsTrigger value='accounts'>Accounts</TabsTrigger>
                  <TabsTrigger value='transactions'>Transactions</TabsTrigger>
                </TabsList>
                <TabsContent value='overview' className='space-y-6'>
                  <AccountsOverview />
                  <Card>
                    <CardHeader>
                      <CardTitle>Spending by Category</CardTitle>
                      <CardDescription>
                        Your spending patterns for the last 30 days
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <SpendingChart />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value='accounts' className='space-y-6'>
                  <AccountsOverview />
                </TabsContent>
                <TabsContent value='transactions' className='space-y-6'>
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Transactions</CardTitle>
                      <CardDescription>
                        Your recent transactions across all accounts
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentTransactions />
                    </CardContent>
                    <CardFooter>
                      <Button variant='outline' className='w-full'>
                        View All Transactions
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            <div className='space-y-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Total Balance</CardTitle>
                  <CardDescription>Across all accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='text-3xl font-bold'>$24,563.55</div>
                  <div className='mt-2 flex items-center text-sm text-green-500'>
                    <Badge
                      variant='outline'
                      className='bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400'
                    >
                      +2.5%
                    </Badge>
                    <span className='ml-2'>from last month</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your latest activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentTransactions limit={5} />
                </CardContent>
                <CardFooter>
                  <Button variant='outline' className='w-full'>
                    View All
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className='grid grid-cols-2 gap-4'>
                  <Button className='h-auto flex-col gap-2 py-4'>
                    <DollarSign className='h-5 w-5' />
                    <span>Transfer</span>
                  </Button>
                  <Button className='h-auto flex-col gap-2 py-4'>
                    <CreditCard className='h-5 w-5' />
                    <span>Pay Bills</span>
                  </Button>
                  <Button
                    className='h-auto flex-col gap-2 py-4'
                    variant='outline'
                  >
                    <Wallet className='h-5 w-5' />
                    <span>Add Account</span>
                  </Button>
                  <Button
                    className='h-auto flex-col gap-2 py-4'
                    variant='outline'
                  >
                    <LineChart className='h-5 w-5' />
                    <span>Insights</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;

'use client';
import { CreditCard, DollarSign, Landmark, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const accounts = [
  {
    id: 1,
    name: 'Chase Checking',
    type: 'Checking',
    balance: 5432.21,
    icon: <Landmark className='h-5 w-5' />,
    color: 'bg-blue-100 dark:bg-blue-950',
    textColor: 'text-blue-700 dark:text-blue-400',
  },
  {
    id: 2,
    name: 'Bank of America Savings',
    type: 'Savings',
    balance: 12450.84,
    icon: <DollarSign className='h-5 w-5' />,
    color: 'bg-green-100 dark:bg-green-950',
    textColor: 'text-green-700 dark:text-green-400',
  },
  {
    id: 3,
    name: 'Citi Credit Card',
    type: 'Credit Card',
    balance: -1320.5,
    icon: <CreditCard className='h-5 w-5' />,
    color: 'bg-purple-100 dark:bg-purple-950',
    textColor: 'text-purple-700 dark:text-purple-400',
  },
];

export function AccountsOverview() {
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-semibold'>Connected Accounts</h2>
        <Button size='sm'>
          <Plus className='mr-2 h-4 w-4' />
          Add Account
        </Button>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {accounts.map((account) => (
          <Card key={account.id}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-base font-medium'>
                {account.name}
              </CardTitle>
              <div className={`rounded-full p-2 ${account.color}`}>
                {account.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {account.balance < 0 ? '-' : ''}$
                {Math.abs(account.balance).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <p className={`text-xs ${account.textColor}`}>{account.type}</p>
            </CardContent>
            <CardFooter>
              <Button variant='ghost' size='sm' className='w-full'>
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
        <Card className='flex flex-col items-center justify-center border-dashed p-6'>
          <div className='mb-4 rounded-full bg-muted p-3'>
            <Plus className='h-6 w-6' />
          </div>
          <CardTitle className='text-base font-medium'>
            Connect a New Account
          </CardTitle>
          <CardDescription className='text-center text-xs'>
            Link your bank accounts, credit cards, and more
          </CardDescription>
          <Button className='mt-4' variant='outline' size='sm'>
            Connect
          </Button>
        </Card>
      </div>
    </div>
  );
}

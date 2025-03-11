'use client';

import {
  Coffee,
  CreditCard,
  HomeIcon,
  Plane,
  ShoppingBag,
  Utensils,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const categories = {
  shopping: {
    icon: <ShoppingBag className='h-4 w-4' />,
    color:
      'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
  },
  food: {
    icon: <Utensils className='h-4 w-4' />,
    color:
      'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400',
  },
  coffee: {
    icon: <Coffee className='h-4 w-4' />,
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  },
  travel: {
    icon: <Plane className='h-4 w-4' />,
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  },
  housing: {
    icon: <HomeIcon className='h-4 w-4' />,
    color: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400',
  },
  bills: {
    icon: <CreditCard className='h-4 w-4' />,
    color: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400',
  },
};

const transactions = [
  {
    id: 1,
    merchant: 'Amazon',
    amount: -84.29,
    date: 'Today',
    category: 'shopping',
    account: 'Chase Checking',
  },
  {
    id: 2,
    merchant: 'Starbucks',
    amount: -5.75,
    date: 'Today',
    category: 'coffee',
    account: 'Citi Credit Card',
  },
  {
    id: 3,
    merchant: 'Uber',
    amount: -24.5,
    date: 'Yesterday',
    category: 'travel',
    account: 'Chase Checking',
  },
  {
    id: 4,
    merchant: 'Whole Foods',
    amount: -65.32,
    date: 'Yesterday',
    category: 'food',
    account: 'Bank of America Savings',
  },
  {
    id: 5,
    merchant: 'Netflix',
    amount: -14.99,
    date: 'Mar 15',
    category: 'bills',
    account: 'Citi Credit Card',
  },
  {
    id: 6,
    merchant: 'Rent Payment',
    amount: -1500.0,
    date: 'Mar 1',
    category: 'housing',
    account: 'Chase Checking',
  },
  {
    id: 7,
    merchant: "Trader Joe's",
    amount: -42.18,
    date: 'Feb 28',
    category: 'food',
    account: 'Citi Credit Card',
  },
  {
    id: 8,
    merchant: 'Salary Deposit',
    amount: 3200.0,
    date: 'Feb 28',
    category: 'income',
    account: 'Chase Checking',
  },
];

interface RecentTransactionsProps {
  limit?: number;
}

export function RecentTransactions({ limit }: RecentTransactionsProps) {
  const displayTransactions = limit
    ? transactions.slice(0, limit)
    : transactions;

  return (
    <ScrollArea className='h-[400px] pr-4'>
      <div className='space-y-4'>
        {displayTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className='flex items-center justify-between'
          >
            <div className='flex items-center gap-4'>
              {transaction.category in categories ? (
                <div
                  className={`rounded-full p-2 ${
                    categories[transaction.category as keyof typeof categories]
                      .color
                  }`}
                >
                  {
                    categories[transaction.category as keyof typeof categories]
                      .icon
                  }
                </div>
              ) : (
                <div className='rounded-full bg-gray-100 p-2 text-gray-700 dark:bg-gray-800 dark:text-gray-300'>
                  <CreditCard className='h-4 w-4' />
                </div>
              )}
              <div>
                <div className='font-medium'>{transaction.merchant}</div>
                <div className='text-xs text-muted-foreground'>
                  {transaction.date} • {transaction.account}
                </div>
              </div>
            </div>
            <div
              className={`text-right font-medium ${
                transaction.amount > 0
                  ? 'text-green-600 dark:text-green-400'
                  : ''
              }`}
            >
              {transaction.amount > 0 ? '+' : ''}$
              {Math.abs(transaction.amount).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

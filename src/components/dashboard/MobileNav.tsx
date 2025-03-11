'use client';

import {
  ArrowDownUp,
  CreditCard,
  Home,
  LineChart,
  PieChart,
  Settings,
  X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent } from '@/components/ui/sheet';

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function MobileNav({ isOpen, setIsOpen }: MobileNavProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side='left' className='p-0'>
        <div className='flex h-16 items-center border-b px-4'>
          <div className='flex items-center gap-2 font-semibold'>FinTrack</div>
          <Button
            variant='ghost'
            size='icon'
            className='ml-auto'
            onClick={() => setIsOpen(false)}
          >
            <X className='h-5 w-5' />
            <span className='sr-only'>Close</span>
          </Button>
        </div>
        <ScrollArea className='h-[calc(100vh-4rem)]'>
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
      </SheetContent>
    </Sheet>
  );
}

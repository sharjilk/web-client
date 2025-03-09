import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { fetchTransactions } from '../api/bank.api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const transactionFilterSchema = z.object({
  category: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

type TransactionFilter = z.infer<typeof transactionFilterSchema>;

interface Transaction {
  bankName: string;
  date: string;
  amount: number;
  currency: string;
  category: string;
  description: string;
}

const Transactions = () => {
  const { register, handleSubmit } = useForm<TransactionFilter>({
    resolver: zodResolver(transactionFilterSchema),
  });

  const [filters, setFilters] = React.useState<TransactionFilter>({});

  const { data, isLoading, refetch } = useQuery<Transaction[], Error>({
    queryKey: ['transactions', filters],
    queryFn: () => fetchTransactions(filters),
    enabled: false, // start disabled; will refetch on filter submit
  });

  const onSubmit = (data: TransactionFilter) => {
    setFilters(data);
    refetch();
  };

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Transactions</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 mb-4'>
        <div>
          <label className='block mb-1'>Category</label>
          <Input placeholder='Category' {...register('category')} />
        </div>
        <div>
          <label className='block mb-1'>Start Date</label>
          <Input type='date' {...register('startDate')} />
        </div>
        <div>
          <label className='block mb-1'>End Date</label>
          <Input type='date' {...register('endDate')} />
        </div>
        <Button type='submit'>Filter Transactions</Button>
      </form>
      {isLoading ? (
        <p>Loading transactions...</p>
      ) : (
        <div>
          {data &&
            data.map((tx: Transaction, index: number) => (
              <div key={index} className='p-4 border rounded-md mb-2'>
                <p className='font-bold'>{tx.bankName}</p>
                <p>Date: {new Date(tx.date).toLocaleDateString()}</p>
                <p>
                  Amount: {tx.amount} {tx.currency}
                </p>
                <p>Category: {tx.category}</p>
                <p>Description: {tx.description}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Transactions;

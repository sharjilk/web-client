import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchBalances, disconnectBankAccount } from '../api/bank.api';
import { Button } from '@/components/ui/button';

interface Balance {
  accountId: string;
  bankName: string;
  balance: number;
  currency: string;
}

const BankAccounts = () => {
  const queryClient = useQueryClient();
  const { data: balances, isLoading } = useQuery({
    queryKey: ['balances'],
    queryFn: fetchBalances,
  });

  const disconnectMutation = useMutation({
    mutationFn: disconnectBankAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['balances'] });
    },
  });

  const handleDisconnect = (accountId: string) => {
    disconnectMutation.mutate({ accountId });
  };

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Your Connected Bank Accounts</h2>
      {isLoading ? (
        <p>Loading bank accounts...</p>
      ) : (
        <div className='space-y-4'>
          {balances &&
            balances.map((account: Balance) => (
              <div key={account.accountId} className='p-4 border rounded-md'>
                <p className='font-bold'>{account.bankName}</p>
                <p>Account ID: {account.accountId}</p>
                <p>
                  Balance: {account.balance} {account.currency}
                </p>
                <Button
                  variant='destructive'
                  onClick={() => handleDisconnect(account.accountId)}
                >
                  Disconnect
                </Button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default BankAccounts;

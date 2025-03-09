import { useQuery } from '@tanstack/react-query';
import { fetchBalances } from '../api/bank.api';

interface Balance {
  accountId: string;
  bankName: string;
  balance: number;
  currency: string;
}

const Balances = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['balances'],
    queryFn: fetchBalances,
  });

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Account Balances</h2>
      {isLoading ? (
        <p>Loading balances...</p>
      ) : (
        <div>
          {data &&
            data.map((balance: Balance) => (
              <div
                key={balance.accountId}
                className='p-4 border rounded-md mb-2'
              >
                <p className='font-bold'>{balance.bankName}</p>
                <p>Account ID: {balance.accountId}</p>
                <p>
                  Balance: {balance.balance} {balance.currency}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Balances;

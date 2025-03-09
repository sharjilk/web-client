import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchBanks, connectBankAccount } from '../api/bank.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';

const connectBankSchema = z.object({
  bankName: z.string().min(1, 'Bank selection is required'),
  connectionPayload: z.string().min(1, 'Connection payload is required'),
});

type ConnectBankFormData = z.infer<typeof connectBankSchema>;

interface Banks {
  name: string;
}

const ConnectBank = () => {
  const navigate = useNavigate();

  const { data: banks, isLoading: banksLoading } = useQuery<Banks[], Error>({
    queryKey: ['banks'],
    queryFn: fetchBanks,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ConnectBankFormData>({
    resolver: zodResolver(connectBankSchema),
  });

  // Since our custom Select component doesn’t integrate directly with react-hook-form,
  // we watch the bankName field and update it manually.
  const selectedBank = watch('bankName') || '';

  const mutation = useMutation({
    mutationFn: connectBankAccount,
    onSuccess: () => {
      navigate('/bank-accounts');
    },
  });

  const onSubmit = (data: ConnectBankFormData) => {
    try {
      // Assuming connectionPayload is entered as a JSON string by the user.
      const payload = JSON.parse(data.connectionPayload);
      mutation.mutate({
        bankName: data.bankName,
        connectionPayload: payload,
      });
    } catch (error) {
      console.error('Invalid JSON payload', error);
    }
  };

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Connect Bank Account</h2>
      {banksLoading ? (
        <p>Loading banks...</p>
      ) : (
        <>
          <div className='mb-4'>
            <Label className='block mb-1'>Select Bank</Label>
            <div className='flex flex-wrap gap-2'>
              {banks?.map((bank) => (
                <Button
                  key={bank.name}
                  variant={
                    selectedBank === bank.name ? 'destructive' : 'default'
                  }
                  onClick={() => setValue('bankName', bank.name)}
                >
                  {bank.name}
                </Button>
              ))}
            </div>
            {errors.bankName && (
              <p className='text-red-500 text-sm'>{errors.bankName.message}</p>
            )}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <Label className='block mb-1'>Connection Payload (JSON)</Label>
              <Input
                placeholder='{"username": "user", "password": "pass"}'
                {...register('connectionPayload')}
              />
              {errors.connectionPayload && (
                <p className='text-red-500 text-sm'>
                  {errors.connectionPayload.message}
                </p>
              )}
            </div>
            <Button type='submit' disabled={mutation.isPending}>
              {mutation.isPending ? 'Connecting...' : 'Connect Bank Account'}
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default ConnectBank;

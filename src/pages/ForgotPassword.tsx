import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '../schema/auth.schema';
import { forgotPassword } from '../api/auth.api';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

type ForgotPasswordForm = { email: string };

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success('Password reset link sent', {
        description: 'Please check your email',
      });
      navigate('/signin');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: ForgotPasswordForm) => {
    mutation.mutate(data);
  };

  return (
    <Card className='max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>Enter your email</CardTitle>
        <CardDescription>We will send reset link to your email</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid w-full items-center gap-4'
        >
          <div className='flex flex-col space-y-1.5'>
            <Input placeholder='Email' {...register('email')} />
            {errors.email && (
              <p className='text-red-500 mt-1'>{errors.email.message}</p>
            )}
          </div>
          <Button
            type='submit'
            disabled={mutation.isPending}
            className='w-full cursor-pointer'
          >
            {mutation.isPending ? (
              <Loader2 className='animate-spin' />
            ) : (
              'Send reset link'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ForgotPassword;

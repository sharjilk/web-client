import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '../schema/auth.schema';
import { resetPassword } from '../api/auth.api';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type ResetPasswordForm = { newPassword: string };

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get('token') || '';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema.omit({ resetToken: true })),
  });
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (data: ResetPasswordForm) =>
      resetPassword({ resetToken, newPassword: data.newPassword }),
    onSuccess: () => {
      toast.success('Password reset successful. Please sign in.');
      navigate('/signin');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: ResetPasswordForm) => {
    mutation.mutate(data);
  };

  return (
    <Card className='max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>Enter your new password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <Input
              type='password'
              className='input input-bordered w-full'
              placeholder='New Password'
              {...register('newPassword')}
            />
            {errors.newPassword && (
              <p className='text-red-500 mt-1'>{errors.newPassword.message}</p>
            )}
          </div>
          <Button
            type='submit'
            className='w-full cursor-pointer'
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <Loader2 className='animate-spin' />
            ) : (
              'Reset Password'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPassword;

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '../schema/auth.schema';
import { resetPassword } from '../api/auth.api';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      alert('Password reset successful. Please sign in.');
      navigate('/signin');
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  const onSubmit = (data: ResetPasswordForm) => {
    mutation.mutate(data);
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Reset Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4'>
          <input
            className='input input-bordered w-full'
            placeholder='Reset Token'
            {...register('resetToken')}
          />
          {errors.resetToken && (
            <p className='text-red-500 mt-1'>{errors.resetToken.message}</p>
          )}
        </div>
        <div className='mb-4'>
          <input
            type='password'
            className='input input-bordered w-full'
            placeholder='New Password'
            {...register('newPassword')}
          />
          {errors.newPassword && (
            <p className='text-red-500 mt-1'>{errors.newPassword.message}</p>
          )}
        </div>
        <button type='submit' className='btn btn-primary w-full'>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;

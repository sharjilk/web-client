import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '../schema/auth.schema';
import { forgotPassword } from '../api/auth.api';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
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
      alert('Password reset link sent. Please check your email.');
      navigate('/signin');
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  const onSubmit = (data: ForgotPasswordForm) => {
    mutation.mutate(data);
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Forgot Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4'>
          <input
            className='input input-bordered w-full'
            placeholder='Email'
            {...register('email')}
          />
          {errors.email && (
            <p className='text-red-500 mt-1'>{errors.email.message}</p>
          )}
        </div>
        <button type='submit' className='btn btn-primary w-full'>
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;

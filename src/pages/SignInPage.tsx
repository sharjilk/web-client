import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '../schema/auth.schema';
import { signIn } from '../api/auth.api';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

type SignInForm = z.infer<typeof signInSchema>;

const SignInPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  });

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      navigate('/dashboard');
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  const onSubmit = (data: SignInForm) => {
    mutation.mutate(data);
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Sign In</h2>
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
        <div className='mb-4'>
          <input
            type='password'
            className='input input-bordered w-full'
            placeholder='Password'
            {...register('password')}
          />
          {errors.password && (
            <p className='text-red-500 mt-1'>{errors.password.message}</p>
          )}
        </div>
        <button type='submit' className='btn btn-primary w-full'>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInPage;

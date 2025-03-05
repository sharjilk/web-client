import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '../schema/auth.schema';
import { signUp } from '../api/auth.api';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type SignUpForm = z.infer<typeof signUpSchema>;

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  const mutation = useMutation({
    mutationFn: signUp,
    // onSuccess: () => {
    //   localStorage.setItem('registrationData', JSON.stringify(getValues()));
    //   navigate('/verify-otp');
    // },
    // onError: (error: Error) => {
    //   alert(error.message);
    // },
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      const data = getValues();
      localStorage.setItem('registrationData', JSON.stringify(data));
      navigate('/verify-otp');
    }
  }, [mutation.isSuccess, getValues, navigate]);

  useEffect(() => {
    if (mutation.isError && mutation.error) {
      alert((mutation.error as Error).message);
    }
  }, [mutation.isError, mutation.error]);

  const onSubmit = (data: SignUpForm) => {
    mutation.mutate(data);
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4'>
          <input
            className='input input-bordered w-full'
            placeholder='Full Name'
            {...register('name')}
          />
          {errors.name && (
            <p className='text-red-500 mt-1'>{errors.name.message}</p>
          )}
        </div>
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
          Request OTP
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;

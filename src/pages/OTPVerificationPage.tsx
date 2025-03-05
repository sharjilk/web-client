import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { otpVerifySchema } from '../schema/auth.schema';
import { verifyOTP } from '../api/auth.api';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

type OTPForm = { otp: string };

const OTPVerificationPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPForm>({
    resolver: zodResolver(otpVerifySchema.pick({ otp: true })),
  });

  // Retrieve registration data from localStorage
  const [registrationData, setRegistrationData] = useState<{
    name: string;
    email: string;
    password: string;
  } | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('registrationData');
    if (data) {
      setRegistrationData(JSON.parse(data));
    } else {
      navigate('/signup');
    }
  }, [navigate]);

  const mutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: () => {
      localStorage.removeItem('registrationData');
      navigate('/dashboard');
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  const onSubmit = (data: OTPForm) => {
    if (!registrationData) return;
    const payload = {
      email: registrationData.email,
      otp: data.otp,
      name: registrationData.name,
      password: registrationData.password,
    };
    mutation.mutate(payload);
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-4 text-center'>OTP Verification</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4'>
          <input
            className='input input-bordered w-full'
            placeholder='Enter OTP'
            {...register('otp')}
          />
          {errors.otp && (
            <p className='text-red-500 mt-1'>{errors.otp.message}</p>
          )}
        </div>
        <button type='submit' className='btn btn-primary w-full'>
          Verify OTP & Register
        </button>
      </form>
    </div>
  );
};

export default OTPVerificationPage;

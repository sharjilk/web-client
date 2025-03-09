import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { otpVerifySchema } from '../schema/auth.schema';
import { verifyOTP } from '../api/auth.api';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type OTPForm = { otp: string };

const OTPVerification = () => {
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
      toast.success('User account created', {
        description: 'Logged in successfully',
      });
      navigate('/dashboard');
    },
    onError: (error: Error) => {
      toast.error(JSON.parse(error.message).error, {
        description: 'Re-enter verification code',
      });
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
    <Card className='max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>Enter Verification code</CardTitle>
        <CardDescription>
          We have sent a 6 digit verification code on your email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid w-full items-center gap-4'
        >
          <div className='flex flex-col space-y-1.5'>
            <Input
              className='input input-bordered w-full'
              placeholder='Enter code'
              {...register('otp')}
            />
            {errors.otp && (
              <p className='text-red-500 mt-1'>{errors.otp.message}</p>
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
              'Verify Code & Register'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default OTPVerification;

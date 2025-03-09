import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '../schema/auth.schema';
import { signUp } from '../api/auth.api';
import { useMutation } from '@tanstack/react-query';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

type SignUpForm = z.infer<typeof signUpSchema>;

const SignUp = () => {
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
  });

  useEffect(() => {
    if (mutation.status === 'success' && !mutation.data.success) {
      toast.error(mutation.data.message, {
        description: 'Try Signing in',
      });
    }
    if (mutation.status === 'success' && mutation.data.success) {
      toast.success('Verification code sent', {
        description: 'Code has been sent to the email',
      });
    }
  }, [mutation.status, mutation.data]);

  useEffect(() => {
    if (mutation.status === 'error') {
      toast.error(mutation.error.message, {
        description: 'Try again',
      });
    }
  }, [mutation.status]);

  if (mutation.status === 'success' && mutation.data.success) {
    // if (!localStorage.getItem('registrationData')) {
    localStorage.setItem('registrationData', JSON.stringify(getValues()));
    // }
    return <Navigate to='/verify-otp' replace />;
  }

  const onSubmit = (data: SignUpForm) => {
    mutation.mutate(data);
  };

  return (
    <Card className='max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Sign up to Mizan</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid w-full items-center gap-4'
        >
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>Full name</Label>
            <Input
              className='input input-bordered w-full'
              placeholder='Full Name'
              {...register('name')}
            />
            {errors.name && (
              <p className='text-red-500 mt-1'>{errors.name.message}</p>
            )}
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='email'>Email</Label>
            <Input
              className='input input-bordered w-full'
              placeholder='Email'
              {...register('email')}
            />
            {errors.email && (
              <p className='text-red-500 mt-1'>{errors.email.message}</p>
            )}
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='password'>Password</Label>
            <Input
              type='password'
              className='input input-bordered w-full'
              placeholder='Password'
              {...register('password')}
            />
            {errors.password && (
              <p className='text-red-500 mt-1'>{errors.password.message}</p>
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
              'Create an Account'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <p>Already have an account?</p>
        <Link to={'/signin'}>
          <Button variant='link' className='cursor-pointer'>
            Sign In
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignUp;

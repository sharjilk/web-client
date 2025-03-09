import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '../schema/auth.schema';
import { signIn } from '../api/auth.api';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

type SignInForm = z.infer<typeof signInSchema>;

const SignIn = () => {
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
      toast.success('LoggedIn successfully');
    },
    onError: (error: Error) => {
      toast.error(JSON.parse(error.message).error, {
        description: 'Try logging in again',
      });
    },
  });

  const onSubmit = (data: SignInForm) => {
    mutation.mutate(data);
  };

  return (
    <Card className='max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid w-full items-center gap-4'
        >
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
              'Sign In'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className='flex flex-col justify-between'>
        <div className='flex items-center'>
          <p>Don't have an account?</p>
          <Link to={'/signup'}>
            <Button variant='link' className='cursor-pointer'>
              Sign up
            </Button>
          </Link>
        </div>
        <Link to={'/forgot-password'} className='mt-4'>
          <Button variant='outline'>Reset Password</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
export default SignIn;

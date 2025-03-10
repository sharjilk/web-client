import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '../schema/auth.schema';
import { signUp } from '../api/auth.api';
import { useMutation } from '@tanstack/react-query';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

type SignUpForm = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  const password = watch('password');

  useEffect(() => {
    const pwd = password || '';
    // Check password requirements
    const requirements = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };

    setPasswordRequirements(requirements);

    // Calculate password strength (0-100)
    const metRequirements = Object.values(requirements).filter(Boolean).length;
    setPasswordStrength(metRequirements * 20); // 20% for each requirement
  }, [password]);

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
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col items-center gap-1 text-center'>
        <h1 className='text-xl font-bold'>Create an account</h1>
        <p className='text-balance text-xs text-muted-foreground'>
          Enter your details below to create your account
        </p>
      </div>
      <div className='grid gap-3'>
        <div className='grid grid-cols-2 gap-2'>
          <div className='grid gap-2'>
            <Label htmlFor='firstName'>First name</Label>
            <Input
              id='firstName'
              type='text'
              {...register('firstname')}
              aria-invalid={!!errors.firstname}
              aria-describedby={
                errors.firstname ? 'firstname-error' : undefined
              }
              className={errors.firstname ? 'border-destructive' : ''}
            />
            {errors.firstname && (
              <p
                id='firstname-error'
                className='text-sm font-medium text-destructive'
              >
                {errors.firstname.message}
              </p>
            )}
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='lastName'>Last name</Label>
            <Input
              id='lastName'
              type='text'
              {...register('lastname')}
              aria-invalid={!!errors.lastname}
              aria-describedby={errors.lastname ? 'lastname-error' : undefined}
              className={errors.lastname ? 'border-destructive' : ''}
            />
            {errors.lastname && (
              <p
                id='lastname-error'
                className='text-sm font-medium text-destructive'
              >
                {errors.lastname.message}
              </p>
            )}
          </div>
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            {...register('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <p
              id='email-error'
              className='text-sm font-medium text-destructive'
            >
              {errors.email.message}
            </p>
          )}
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='password'>Password</Label>
          <div className='relative'>
            <Input
              id='password'
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              className={errors.password ? 'border-destructive' : ''}
            />
            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className='h-4 w-4 text-muted-foreground' />
              ) : (
                <Eye className='h-4 w-4 text-muted-foreground' />
              )}
              <span className='sr-only'>
                {showPassword ? 'Hide password' : 'Show password'}
              </span>
            </Button>
          </div>
          {errors.password && (
            <p
              id='password-error'
              className='text-sm font-medium text-destructive'
            >
              {errors.password.message}
            </p>
          )}
          <div className='space-y-1'>
            <Progress value={passwordStrength} className='h-1' />
            <div className='grid grid-cols-2 gap-x-2 gap-y-0.5 text-xs text-muted-foreground'>
              <div
                className={passwordRequirements.length ? 'text-green-500' : ''}
              >
                ✓ Min. 8 characters
              </div>
              <div
                className={
                  passwordRequirements.uppercase ? 'text-green-500' : ''
                }
              >
                ✓ Uppercase letter
              </div>
              <div
                className={
                  passwordRequirements.lowercase ? 'text-green-500' : ''
                }
              >
                ✓ Lowercase letter
              </div>
              <div
                className={passwordRequirements.number ? 'text-green-500' : ''}
              >
                ✓ Number
              </div>
              <div
                className={passwordRequirements.special ? 'text-green-500' : ''}
              >
                ✓ Special character
              </div>
            </div>
          </div>
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='confirmPassword'>Confirm Password</Label>
          <div className='relative'>
            <Input
              id='confirmPassword'
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={
                errors.confirmPassword ? 'confirmPassword-error' : undefined
              }
              className={errors.confirmPassword ? 'border-destructive' : ''}
            />
            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <EyeOff className='h-4 w-4 text-muted-foreground' />
              ) : (
                <Eye className='h-4 w-4 text-muted-foreground' />
              )}
              <span className='sr-only'>
                {showConfirmPassword
                  ? 'Hide confirm password'
                  : 'Show confirm password'}
              </span>
            </Button>
          </div>
          {errors.confirmPassword && (
            <p
              id='confirmPassword-error'
              className='text-sm font-medium text-destructive'
            >
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button type='submit' className='w-full' disabled={mutation.isPending}>
          {mutation.isPending ? (
            <Loader2 className='animate-spin' />
          ) : (
            'Create an Account'
          )}
        </Button>
        <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
          <span className='relative z-10 bg-background px-2 text-muted-foreground'>
            Or continue with
          </span>
        </div>
        <Button variant='outline' className='w-full'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            className='h-5 w-5 mr-2'
          >
            <path
              d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
              fill='#4285F4'
            />
            <path
              d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
              fill='#34A853'
            />
            <path
              d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
              fill='#FBBC05'
            />
            <path
              d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
              fill='#EA4335'
            />
            <path d='M1 1h22v22H1z' fill='none' />
          </svg>
          Sign up with Google
        </Button>
      </div>
      <div className='text-center text-sm'>
        Already have an account?{' '}
        <Link to={'/login'} className='underline underline-offset-4'>
          Sign in
        </Link>
      </div>
    </form>
  );
};

export default SignUp;

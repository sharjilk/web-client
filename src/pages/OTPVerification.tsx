import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { verifyOTP } from '../api/auth.api';

const OTPVerification = () => {
  const navigate = useNavigate();

  // Retrieve registration data from localStorage
  const [registrationData, setRegistrationData] = useState<{
    firstname: string;
    lastname: string;
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

  // Create mutation for verifying OTP
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
      // Parse error message if necessary
      toast.error(JSON.parse(error.message).error, {
        description: 'Re-enter verification code',
      });
    },
  });

  // OTP code state (6 digits)
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes countdown in seconds
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown logic
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Format seconds as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  // Update OTP code when a digit changes
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // only allow numbers
    const newCode = [...code];
    newCode[index] = value.slice(0, 1); // keep only one digit
    setCode(newCode);
    // Auto-focus next input if available
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace to move focus to previous field when empty
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Allow pasting a 6-digit code into the first field
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setCode(digits);
      inputRefs.current[5]?.focus();
    }
  };

  // Handle resend of verification code
  const handleResend = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!canResend) return;
    setTimeLeft(180);
    setCanResend(false);
    console.log('Resending verification code...');
    // Implement your actual resend logic here if needed
  };

  // Form submission: join OTP digits and trigger mutation
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otp = code.join('');
    if (otp.length !== 6) {
      toast.error('Please enter a 6-digit code');
      return;
    }
    if (!registrationData) return;

    const payload = {
      email: registrationData.email,
      otp,
      firstname: registrationData.firstname,
      lastname: registrationData.lastname,
      password: registrationData.password,
    };

    mutation.mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='text-2xl font-bold'>Verify your email</h1>
        <p className='text-balance text-sm text-muted-foreground'>
          We've sent a 6-digit verification code to your email. Enter the code
          below to confirm your email address.
        </p>
      </div>
      <div className='grid gap-6'>
        <div className='flex justify-center gap-2'>
          {Array.from({ length: 6 }).map((_, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type='text'
              inputMode='numeric'
              maxLength={1}
              value={code[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className='h-12 w-12 text-center text-lg'
              aria-label={`Digit ${index + 1}`}
            />
          ))}
        </div>
        <Button type='submit' className='w-full' disabled={mutation.isPending}>
          {mutation.isPending ? (
            <Loader2 className='animate-spin' />
          ) : (
            'Verify Email'
          )}
        </Button>
        <div className='text-center text-sm'>
          Didn't receive the code?{' '}
          <Button
            variant='link'
            onClick={handleResend}
            className={
              canResend
                ? 'underline cursor-pointer'
                : 'text-muted-foreground cursor-not-allowed'
            }
          >
            {canResend
              ? 'Resend code'
              : `Resend code in ${formatTime(timeLeft)}`}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default OTPVerification;

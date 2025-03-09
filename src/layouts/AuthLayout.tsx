import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';

const AuthLayout = () => {
  return (
    <div className='min-h-screen flex'>
      {/* Left Column: Static content (illustration or welcome message), hidden on small screens */}
      <div className='hidden md:flex w-1/2 bg-primary items-center justify-center'>
        <div className='text-center text-white p-8'>
          <h1 className='text-5xl font-bold'>Welcome to MyApp</h1>
          <p className='mt-4 text-xl'>Simplify your financial management.</p>
        </div>
      </div>
      {/* Right Column: Render the public authentication pages */}
      <div className='flex w-full md:w-1/2 items-center justify-center'>
        <div className='w-full max-w-md p-6'>
          <Outlet />
        </div>
      </div>
      <Toaster richColors />
    </div>
  );
};

export default AuthLayout;

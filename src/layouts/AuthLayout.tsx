import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { GalleryVerticalEnd } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className='grid min-h-screen lg:grid-cols-2'>
      <div className='flex flex-col min-h-screen gap-3 p-4 md:p-6'>
        <div className='flex justify-center gap-2 md:justify-start'>
          <a href='#' className='flex items-center gap-2 font-medium'>
            <div className='flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground'>
              <GalleryVerticalEnd className='size-4' />
            </div>
            Mizan Inc.
          </a>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
            <Outlet />
          </div>
        </div>
      </div>
      <div className='relative hidden bg-muted lg:block'>
        <img
          src='/placeholder.svg'
          alt='Image'
          className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>
      <Toaster richColors />
    </div>
  );
};

export default AuthLayout;

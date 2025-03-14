import { Lock, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  return (
    <div className='flex justify-center items-center h-screen max-w-full'>
      <form className='flex flex-col gap-3 border border-black p-8 max-w-md rounded mx-4'>
        <div className='flex flex-col justify-center items-center'>
          <Lock></Lock>
          <h1 className='py-2 font-extrabold text-2xl'>
            Trouble with logging in?
          </h1>
          <h3 className='mb-2 '>
            Enter your email address to help us reset your password
          </h3>
        </div>
        <div className='relative'>
          <Input
            className='text-center w-full focus-visible:ring-1 focus-visible:ring-black'
            placeholder='Email address'
          ></Input>
          <Mail className='absolute inset-y-1.5 left-3 text-gray-600 pointer-events-none' />
        </div>
        <Button className='bg-button hover:bg-hoverButtonColor'>
          Send Reset Link
        </Button>
        <Separator></Separator>
        <div className='my-0'>
          <Link to='/signin' className='font-bold text-sm hover:text-gray-600'>
            Remembered your password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;

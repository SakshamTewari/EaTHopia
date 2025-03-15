import { Lock, LockKeyhole, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState<string>('');
  return (
    <div className='flex justify-center items-center h-screen max-w-full'>
      <form className='flex flex-col gap-3 border border-black p-8 max-w-md rounded mx-4'>
        <div className='flex flex-col justify-center items-center'>
          <Shield></Shield>
          <h1 className='py-2 font-extrabold text-2xl'>
            Create a new password
          </h1>
          <h3 className='mb-2 '>
            Enter your new password below to complete the password reset
          </h3>
        </div>
        <div className='relative'>
          <Input
            name='email'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className='text-center w-full focus-visible:ring-1 focus-visible:ring-black'
            placeholder='Enter New Password'
          ></Input>
          <LockKeyhole className='absolute inset-y-1.5 left-2 text-gray-600 pointer-events-none' />
        </div>
        <Button className='bg-button hover:bg-hoverButtonColor'>
          Reset Password
        </Button>
        <Separator></Separator>
      </form>
    </div>
  );
};

export default ResetPassword;

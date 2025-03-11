import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@radix-ui/react-separator';
import { LockKeyhole, Mail } from 'lucide-react';

const Signin = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <form className='md:p-8 w-full max-w-md md:border border-black rounded-lg bg-gray-100'>
        <div className='mb-4 relative'>
          <Label className='mb-1'>Email</Label>
          <Input
            type='email'
            placeholder='Email (e.g. sakshamtewari3@gmail.com)'
            className='pl-10 focus-visible:ring-1 focus-visible:ring-black'
          />
          <Mail className='absolute inset-y-6 left-2 text-gray-600 pointer-events-none' />
        </div>
        <div className='mb-4 relative'>
          <Label className='mb-1'>Password</Label>
          <Input
            type='password'
            placeholder='Password (min. 6 digits)'
            className='pl-10 focus-visible:ring-1 focus-visible:ring-black'
          />
          <LockKeyhole className='absolute inset-y-6 left-2 text-gray-600 pointer-events-none' />
        </div>
        <div>
          <Button className='w-full bg-button hover:bg-hoverButtonColor'>
            Login
          </Button>
        </div>
        <Separator />
        <div>
          <p>Don't have an account? </p>
        </div>
      </form>
    </div>
  );
};

export default Signin;

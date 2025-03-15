import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { KeyRound } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const inputRef = useRef<any>([]);
  // const navigate = useNavigate();

  // we are allowing only numbers and alphabets and no special characters
  const handleInputChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
    // to auto focus to the next input if character is entered
    if (value !== '' && index !== otp.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  // to handle backspace
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index !== 0) {
      inputRef.current[index - 1].focus();
    }
  };

  return (
    <div className='flex justify-center items-center h-screen w-full'>
      <div className='flex flex-col gap-3 border border-black p-8 max-w-md rounded mx-4'>
        <div className='flex flex-col  items-center'>
          <KeyRound></KeyRound>
          <h1 className='py-2 font-extrabold text-2xl'>Verify your Email</h1>
          <p>Enter the 6-digit verification code we've sent to your email</p>
        </div>

        <form>
          <div className='flex justify-between '>
            {otp.map((letter: string, index: number) => (
              <Input
                key={index}
                ref={(element) => (inputRef.current[index] = element)}
                type='text'
                value={letter}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(index, e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(index, e)
                }
                className='md:h-12 md:w-12 h-8 w-8 text-center text-sm md:text-2xl font-normal md:font-bold rounded-lg focus:outline focus-visible:ring-black'
              />
            ))}
          </div>
        </form>
        <Button className='my-2 w-full bg-button hover:bg-hoverButtonColor'>
          Verify
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmail;

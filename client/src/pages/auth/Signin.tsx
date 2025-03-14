import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SignInInputState, userSignInSchema } from '@/schema/user-schema';
import { Separator } from '@/components/ui/separator';
import { LockKeyhole, Mail } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

// interface SigninProps {
//   email: string;
//   password: string;
// }

const Signin = () => {
  const [input, setInput] = useState<SignInInputState>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<SignInInputState>>({});

  // Email, Password change handler
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Destructuring the 'input' (either email or password)
    setInput({ ...input, [name]: value }); // Spreading and updating the 'input' element that got changed
  };

  // Login button handler
  const signinSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const result = userSignInSchema.safeParse(input);
    if (!result.success) {
      setErrors(
        result.error?.formErrors.fieldErrors as Partial<SignInInputState>,
      );
      return;
    }
    console.log(input);
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <form
        onSubmit={signinSubmitHandler}
        className='p-8 w-full max-w-md border border-black rounded-lg bg-gray-100'
      >
        <div className='my-4 relative'>
          <Label className='mb-1'>Email</Label>
          <Input
            type='email'
            name='email'
            placeholder='Email (e.g. sakshamtewari3@gmail.com)'
            className='pl-10 focus-visible:ring-1 focus-visible:ring-black'
            value={input.email}
            onChange={changeEventHandler}
          />
          <Mail className='absolute inset-y-6 left-2 text-gray-600 pointer-events-none' />
          <span className='text-xs text-red-900'>{errors.email}</span>
        </div>
        <div className='mb-4 relative'>
          <Label className='mb-1'>Password</Label>
          <Input
            type='password'
            name='password'
            placeholder='Password (min. 6 digits)'
            className='pl-10 focus-visible:ring-1 focus-visible:ring-black'
            value={input.password}
            onChange={changeEventHandler}
          />
          <LockKeyhole className='absolute inset-y-6 left-2 text-gray-600 pointer-events-none' />
          <span className='text-xs text-red-900'>{errors.password}</span>
        </div>
        <div>
          <Button
            type='submit'
            className='w-full bg-button hover:bg-hoverButtonColor'
          >
            Sign In
          </Button>
        </div>

        <div className='my-1'>
          <p>
            <Link
              to='/passwordrecovery'
              className='mx-1 font-bold text-sm hover:text-gray-600'
            >
              Forgotten your Password?
            </Link>
          </p>
        </div>
        <Separator></Separator>

        <div className='my-1'>
          <p>
            Don't have an account?
            <Link to='/signup' className='mx-1 font-bold hover:text-gray-600'>
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signin;

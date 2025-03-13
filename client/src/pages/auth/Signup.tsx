import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SignUpInputState, userSignUpSchema } from '@/schema/user-schema';
import { Separator } from '@radix-ui/react-separator';
import { error } from 'console';
import { LockKeyhole, Mail, PersonStanding, Phone } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

// interface SignupProps {
//   fullname: string;
//   email: string;
//   password: string;
//   contact: string;
// }

// (Getting input validation from zod schema)

const Signup = () => {
  const [input, setInput] = useState<SignUpInputState>({
    fullname: '',
    email: '',
    password: '',
    contact: '',
  });

  const [errors, setErrors] = useState<Partial<SignUpInputState>>({});

  // Email, Password change handler
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Destructuring the 'input' (either email or password)
    setInput({ ...input, [name]: value }); // Spreading and updating the 'input' element that got changed
  };

  // Sign Up button handler
  const signupSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    // Validation
    const result = userSignUpSchema.safeParse(input); //safeParse is used to avoid runtime errors : method provided by zod
    if (!result.success) {
      setErrors(
        result.error?.formErrors.fieldErrors as Partial<SignUpInputState>,
      );
      return;
    }
    // console.log('Errors:', errors);
    // console.log('Format:', result.error?.formErrors.fieldErrors);
    // console.log(input);

    // API implementation..
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <form
        onSubmit={signupSubmitHandler}
        className='p-8 w-full max-w-md border border-black rounded-lg bg-gray-100'
      >
        <div className='my-4 relative'>
          <Label className='mb-1'>Full Name</Label>
          <Input
            type='text'
            name='fullname'
            placeholder='Full Name (e.g. Saksham Tewari)'
            className='pl-10 focus-visible:ring-1 focus-visible:ring-black'
            value={input.fullname}
            onChange={changeEventHandler}
          />
          <PersonStanding className='absolute inset-y-6 left-2 text-gray-600 pointer-events-none' />
          {errors && (
            <span className='text-xs text-red-900'>{errors.fullname}</span>
          )}
        </div>
        <div className='mb-4 relative'>
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
          {errors && (
            <span className='text-xs text-red-900'>{errors.email}</span>
          )}
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
          {errors && (
            <span className='text-xs text-red-900'>{errors.password}</span>
          )}
        </div>
        <div className='mb-4 relative'>
          <Label className='mb-1'>Contact</Label>
          <Input
            type='text'
            name='contact'
            placeholder='Contact (e.g. 1234567890)'
            className='pl-10 focus-visible:ring-1 focus-visible:ring-black'
            value={input.contact}
            onChange={changeEventHandler}
          />
          <Phone className='absolute inset-y-6 left-2 text-gray-600 pointer-events-none' />
          {errors && (
            <span className='text-xs text-red-900'>{errors.contact}</span>
          )}
        </div>
        <div>
          <Button
            type='submit'
            className='w-full bg-button hover:bg-hoverButtonColor'
          >
            Sign Up
          </Button>
        </div>
        <Separator />
        <div className='my-1'>
          <p>
            Already have an account?
            <Link to='/signin' className='mx-1 font-bold'>
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;

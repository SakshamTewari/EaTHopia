import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from './ui/sheet';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

const MobileNavbar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button
          size={'icon'}
          className='rounded-full bg-button text-white hover:bg-hoverButtonColor'
          variant='outline'
        >
          <Menu size={'18'} />
        </Button>
      </SheetTrigger>
      <SheetContent className='flex flex-col'>
        <SheetHeader className='flex flex-row items-center justify-between m'>
          <SheetTitle>EaTHopia</SheetTitle>
        </SheetHeader>
        <Separator />
        <SheetFooter>
          <Button className='w-full bg-button hover:bg-hoverButtonColor'>
            Logout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;

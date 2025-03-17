import { Link } from 'react-router-dom';
import { ModeToggle } from './ui/mode-toggle';
import {
  Menubar,
  MenubarContent,
  MenubarTrigger,
  MenubarMenu,
  MenubarItem,
} from './ui/menubar';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const admin = true; //TODO: change using logic
  return (
    <div className='msx-w-7xl mx-auto '>
      <div className='flex justify-between items-center h-14'>
        <Link to='/'>
          <h1 className='font-bold md:font-extrabold text-2xl'>EaTHopia</h1>
        </Link>
        <div className='hidden md:flex items-center gap-10 '>
          <div className='hidden md:flex items-center gap-7'>
            <Link to='/'>Home</Link>
            <Link to='/order/status'>Order</Link>
            <Link to='/profile'>Profile</Link>
          </div>
          {admin && (
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Dashboard</MenubarTrigger>
                <MenubarContent>
                  <Link to='/admin/restaurant'>
                    <MenubarItem>Restaurant</MenubarItem>{' '}
                  </Link>
                  <Link to='/admin/menu'>
                    <MenubarItem>Menu</MenubarItem>{' '}
                  </Link>
                  <Link to='/admin/orders'>
                    <MenubarItem>Orders</MenubarItem>{' '}
                  </Link>
                  <Link to='/admin/users'>
                    <MenubarItem>Users</MenubarItem>
                  </Link>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          )}
          <ModeToggle></ModeToggle>
          <Link to='/cart'>
            <ShoppingCart />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

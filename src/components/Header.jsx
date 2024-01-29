import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link'
import Nav from './Nav';
import NavUser from './NavUser';

async function Header() {
  const session = await getServerSession(authOptions);

  return ( 
    <header className='flex justify-between items-center px-8 py-4 sticky top-0 bg-slate-50'>
      <div>
        <Link href="/"><h1 className='font-black'>LinkFeed</h1></Link>
      </div>
      <div>
        {
          !session?.user ?
            <Nav></Nav>
          :
            <NavUser></NavUser>
        }
      </div>
    </header>
  );
}

export default Header;
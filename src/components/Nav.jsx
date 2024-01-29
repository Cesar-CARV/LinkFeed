import Link from 'next/link'

function Nav() {
  return ( 
    <nav>
      <ul className='flex gap-2'>
        <li className='inline-block'>
          <Link href='/auth/login' className='p-2 rounded-lg hover:bg-slate-200'>Log in</Link>
        </li>
        <li className='inline-block'>
          <Link href='/auth/register' className='p-2 rounded-lg hover:bg-slate-200'>Register</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
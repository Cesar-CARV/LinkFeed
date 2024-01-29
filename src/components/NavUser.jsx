import Link from 'next/link'

function NavUser() {
  return ( 
    <nav>
      <ul className='flex gap-2'>
        <li className='inline-block'>
          <Link href='/dashboard' className='p-2 rounded-lg hover:bg-slate-200'>Dashboard</Link>
        </li>
        <li className='inline-block'>
          <Link href='/dashboard/profile' className='p-2 rounded-lg hover:bg-slate-200'>Profile</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavUser;
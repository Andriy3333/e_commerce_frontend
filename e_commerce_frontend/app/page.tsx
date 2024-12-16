import NavMenu from '@/components/NavMenu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <NavMenu />

      <div className='flex flex-col justify-center items-center h-screen mt-50'>
        <h1
          className='text-white text-4xl font-bold text-center p-12'
          style={{
            position: 'absolute',
            top: '20%',
            lineHeight: '1.7',
          }}
        >
          Adventure
          <br />
          Gamer Gear
        </h1>
        <Link href='/catalog'>
          <Button
            variant='outline'
            className='text-lg font-bold py-3 px-6  cursor-pointer'
          >
            Explore Our Catalog
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-arrow-right-short'
              viewBox='0 0 16 16'
            >
              <path
                fillRule='evenodd'
                d='M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8'
              />
            </svg>
          </Button>
        </Link>
      </div>
    </div>
  );
}

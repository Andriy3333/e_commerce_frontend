import { Item, columns } from './columns';
import { DataTable } from './data_table';
import { getAllItems } from '../../services/item_api';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import NavMenu from '@/components/NavMenu';

async function getData(): Promise<Item[]> {
  return await getAllItems();
}

export default async function ItemTable() {
  const data = await getData(); // Call getData to fetch items

  return (
    <div className='flex flex-col items-center min-h-screen'>
      {/* Reduced margin */}
      {/* Catalog Table */}
      {<NavMenu />}
      <div className='container mx-auto py-10'>
        <DataTable
          columns={columns}
          data={data} // Pass the fetched data to the DataTable
        />
      </div>
      {/* View Shopping Cart Button */} {/* Increased bottom margin here */}
      <Link href='/cart'>
        <Button variant='outline' className='text-lg font-bold py-3 px-6  cursor-pointer'>
          View Your Shopping Cart
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
  );
}

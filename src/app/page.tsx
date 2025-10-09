import Header from './components/Header';
import ListItems from './components/ListItems'
import Table from './components/Table'

export default function Home() {
  return (
    <div>
      <Header />
    <div className='w-ful lg:py-20 max-lg:py-10'>
     <h1 className='font-black lg:text-[40px] md:text-3xl text-xl  flex justify-center items-center'>لیست قیمت لحظه‌ای ارزهای دیجیتال‌</h1>
    </div>
    <ListItems></ListItems>
    <Table></Table>
    </div>
  );
}
import React from 'react';
import Image from 'next/image';

interface OtherCoinChildProps {
  coin: {
    id: number;
    currency_code: string;
    fa_name: string;
    daily_change_percent?: number;
 } | null;
}

const StartNow: React.FC<OtherCoinChildProps> = ({ coin }) => {
  if (!coin) return null;

  return (
    <div className="xl:w-8/12 lg:w-9/12 w-10/12 mx-auto lg:px-10 p-4 max-sm:py-8 bg-[#F8F9FA] flex max-sm:flex-col-reverse max-sm:items-center gap-4 rounded-3xl mb-16">
        <div className='sm:w-1/2  flex justify-end md:pl-10'>
            <Image
                 src="/images/man-with-money.svg"
                 alt="اطلاعات کلی در مورد رمزارزها - سایز موبایل"
                 width={337}
                height={337} 
                className="max-lg:w-68 max-sm:w-60 "
                priority={false}
                    />
        </div>  
        <div className='flex flex-col justify-evenly max-sm:items-center gap-6 '>
            <p className='font-black lg:text-2xl sm:text-xl text-base '>
                علاقه مند به خرید
                <span className='px-1'>{coin.fa_name}</span>
                هستید؟</p>
                <p className='lg:text-2xl sm:text-base text-xs w-10/12 max-sm:text-center'>ما اینجا هستیم تا شما تجربه ای متفاوت از خرید و فروش بیت کوین داشته باشید.</p>
                <div className=''>
                <button className='bg-[#1652F0] rounded-full text-white py-3 px-8 cursor-pointer '>اکنون شروع کنید</button>
                </div>
        </div>
    </div>
  );
};

export default StartNow;
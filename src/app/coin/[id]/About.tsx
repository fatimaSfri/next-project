import React from 'react';
import Image from 'next/image';

interface OtherCoinChildProps {
  coin: {
    id: number;
    currency_code: string;
    fa_name: string;
    daily_change_percent?: number;
    about:string;
  } | null;
}

const About: React.FC<OtherCoinChildProps> = ({ coin }) => {
  if (!coin) return null;

  return (
 <div className=" lg:w-10/12 sm:w-11/12 w-full max-sm:p-4 flex flex-col mx-auto lg:mb-24 mb-20">
     <div className='flex gap-2 max-lg:justify-center'>
        <p className='font-black sm:text-3xl text-xl '>درباره</p>
        <p className='font-black sm:text-3xl text-xl text-[#0D1A8E]'>{coin.fa_name}</p>
     </div>
  <div className='flex flex-col-reverse lg:flex-row  items-center justify-center  gap-10 leading-relaxed text-justify '>
        <div className='lg:max-w-1/2 leading-relaxed text-justify lg:py-6 lg:text-base sm:text-sm text-xs '>{coin.about}</div>
        
     <div>
        <Image
             src="/images/bitcoin-img.png"
             alt="اطلاعات کلی در مورد رمزارزها - سایز موبایل"
             width={555}
             height={321} 
             className=" rounded-3xl max-lg:py-5"
             priority={false}
            />
       </div>
     </div>
    </div>
  );
};

export default About;
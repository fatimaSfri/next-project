import React from "react";

interface OtherCoinChildProps {
  coin: {
    id: number;
    currency_code: string;
    fa_name: string;
    daily_change_percent?: number;
    about: string;
  } | null;
}

const OtherCoinChild: React.FC<OtherCoinChildProps> = ({ coin }) => {
  if (!coin) return null;

  return (
    <div className=" lg:w-10/12 sm:w-11/12 w-full max-sm:p-4 flex flex-col mx-auto mb-10">
      <div className="flex gap-2 max-lg:justify-center font-black sm:text-3xl text-xl">
          <span>توضیحات بیشتر درباره</span>
        {coin.fa_name}
      </div>
        <div className=" leading-relaxed text-justify py-10 lg:text-base sm:text-sm text-xs ">
         <p > {coin.about}</p>
         <p> {coin.about}</p>
        </div> 

    </div>

  );
};

export default OtherCoinChild;

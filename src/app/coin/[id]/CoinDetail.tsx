// ۳. فایل child: src/app/coin/[id]/CoinDetail.tsx (دقیقاً کپی کن)
import React from 'react';

interface CoinDetailProps {
  coin: {
    id: number;
    currency_code: string;
    fa_name: string;
    en_name?: string;
    icon?: string;
    price?: number;
    daily_change_percent?: number;
    buy_irt_price?: number | string;
    sell_irt_price?: number | string;
  } | null;
}

const CoinDetail: React.FC<CoinDetailProps> = ({ coin }) => {
  const formatNumber = (num: number | string, locale: 'fa' | 'en' = 'fa') => {
    if (!num) return '0';
    const number = typeof num === 'string' ? parseFloat(num) : num;
    return number.toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US');
  };

  if (!coin) {
    return <p className="text-red-500">داده کوین یافت نشد!</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-right">
      <div className="flex items-center gap-4 mb-6">
        {coin.icon && (
          <img
            src={coin.icon}
            alt={coin.en_name || coin.fa_name}
            width={60}
            height={60}
            className="rounded-full"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{coin.fa_name}</h1>
          <p className="text-sm text-gray-500">{coin.currency_code}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border border-gray-200 rounded-md">
          <h3 className="font-medium text-gray-700 mb-2">ارزش دلاری</h3>
          <p className="text-xl font-bold text-gray-800">${formatNumber(coin.price)}</p>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-md">
          <h3 className="font-medium text-gray-700 mb-2">تغییر روزانه</h3>
          <p className={`text-xl font-bold ${coin.daily_change_percent && coin.daily_change_percent >= 0 ? 'text-green-600' : 'text-red-600'}`} dir="ltr">
            {formatNumber(coin.daily_change_percent)}%
          </p>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-md">
          <h3 className="font-medium text-gray-700 mb-2">خرید از والت</h3>
          <p className="text-xl font-bold text-gray-800">{formatNumber(coin.buy_irt_price)} تومان</p>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-md">
          <h3 className="font-medium text-gray-700 mb-2">فروش به والت</h3>
          <p className="text-xl font-bold text-gray-800">{formatNumber(coin.sell_irt_price)} تومان</p>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <button className="bg-[#1652F0] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#1238B0] transition-colors">
          معامله
        </button>
      </div>
    </div>
  );
};

export default CoinDetail;
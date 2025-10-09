import React from 'react';

interface OtherCoinChildProps {
  coin: {
    id: number;
    currency_code: string;
    fa_name: string;
    daily_change_percent?: number;
    // فیلدهای دیگه اگر نیاز داری
  } | null;
}

const OtherCoinChild: React.FC<OtherCoinChildProps> = ({ coin }) => {
  if (!coin) return null;

  return (
    <div className="mt-6 bg-gray-50 rounded-lg p-4 text-right">
      <h2 className="text-lg font-semibold mb-2">آمار اضافی</h2>
      <p>کد: {coin.currency_code}</p>
      <p>تغییر: {coin.daily_change_percent}%</p>
      {/* اینجا هر چی می‌خوای اضافه کن – از props استفاده کن */}
    </div>
  );
};

export default OtherCoinChild;
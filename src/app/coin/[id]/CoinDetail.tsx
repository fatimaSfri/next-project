// // ۳. فایل child: src/app/coin/[id]/CoinDetail.tsx (دقیقاً کپی کن)
// import React from 'react';

// interface CoinDetailProps {
//   coin: {
//     id: number;
//     currency_code: string;
//     fa_name: string;
//     en_name?: string;
//     icon?: string;
//     price?: number;
//     daily_change_percent?: number;
//     buy_irt_price?: number | string;
//     sell_irt_price?: number | string;
//   } | null;
// }

// const CoinDetail: React.FC<CoinDetailProps> = ({ coin }) => {
//   const formatNumber = (num: number | string, locale: 'fa' | 'en' = 'fa') => {
//     if (!num) return '0';
//     const number = typeof num === 'string' ? parseFloat(num) : num;
//     return number.toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US');
//   };

//   if (!coin) {
//     return <p className="text-red-500">داده کوین یافت نشد!</p>;
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 text-right">
//       <div className="flex items-center gap-4 mb-6">
//         {coin.icon && (
//           <img
//             src={coin.icon}
//             alt={coin.en_name || coin.fa_name}
//             width={60}
//             height={60}
//             className="rounded-full"
//           />
//         )}
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">{coin.fa_name}</h1>
//           <p className="text-sm text-gray-500">{coin.currency_code}</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="p-4 border border-gray-200 rounded-md">
//           <h3 className="font-medium text-gray-700 mb-2">ارزش دلاری</h3>
//           <p className="text-xl font-bold text-gray-800">${formatNumber(coin.price)}</p>
//         </div>

//         <div className="p-4 border border-gray-200 rounded-md">
//           <h3 className="font-medium text-gray-700 mb-2">تغییر روزانه</h3>
//           <p className={`text-xl font-bold ${coin.daily_change_percent && coin.daily_change_percent >= 0 ? 'text-green-600' : 'text-red-600'}`} dir="ltr">
//             {formatNumber(coin.daily_change_percent)}%
//           </p>
//         </div>

//         <div className="p-4 border border-gray-200 rounded-md">
//           <h3 className="font-medium text-gray-700 mb-2">خرید از والت</h3>
//           <p className="text-xl font-bold text-gray-800">{formatNumber(coin.buy_irt_price)} تومان</p>
//         </div>

//         <div className="p-4 border border-gray-200 rounded-md">
//           <h3 className="font-medium text-gray-700 mb-2">فروش به والت</h3>
//           <p className="text-xl font-bold text-gray-800">{formatNumber(coin.sell_irt_price)} تومان</p>
//         </div>
//       </div>

//       <div className="mt-6 text-center">
//         <button className="bg-[#1652F0] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#1238B0] transition-colors">
//           معامله
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CoinDetail;

'use client';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

type Locale = 'fa' | 'en';

interface CurrencyOption {
  label: string;      // نمایش (مثلاً "تومان")
  value: string;      // کد (مثلاً "IRT")
  rateToUSD: number;  // نرخ فرضی برای مثال (هر واحد ارز چند دلار است)
  icon: string
}

interface CoinDetailProps {
  coin: {
    id: number;
    currency_code: string;
    fa_name: string;
    en_name?: string;
    icon?: string;
    price: number;
    irt_price: number;
    daily_change_percent?: number;
    buy_irt_price?: number | string;
    sell_irt_price?: number | string;
  } | null;
}

const currencyOptions: CurrencyOption[] = [
  { label: 'تومان', value: 'IRT', rateToUSD: 0.000024, icon: '/images/irt.png' },
  { label: 'بیت‌کوین', value: 'BTC', rateToUSD: 61000, icon: '/images/bitcoin.png' },
  { label: 'دلار', value: 'USD', rateToUSD: 1, icon: '/images/usd.svg' },
  { label: 'یورو', value: 'EUR', rateToUSD: 1.07, icon: '/images/eur.svg' },
];

/** ====== Helpers ====== **/
const persianToLatinDigits = (s: string) =>
  s
    .replace(/[\u06F0-\u06F9]/g, (d) => String(d.charCodeAt(0) - 0x06F0)) // Persian digits
    .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660)); // Arabic-Indic digits

const normalizeNumberString = (s: string) => {
  if (!s) return '';
  let t = s.trim();
  t = persianToLatinDigits(t);
  // حذف فاصله‌ها و کاماها و علامت‌های هزارگان (همچون '٬' و '،')
  t = t.replace(/[,٬\s\u060C]/g, '');
  // اجازه دهید فقط ارقام، نقطه و منفی داشته باشیم
  t = t.replace(/[^0-9.\-]/g, '');
  // اگر بیش از یک نقطه بود، فقط اولین نقطه را نگه‌دار
  const parts = t.split('.');
  if (parts.length > 2) t = parts.shift() + '.' + parts.join('');
  return t;
};

const parseNumber = (s: string) => {
  const n = Number(normalizeNumberString(s));
  return Number.isFinite(n) ? n : NaN;
};

const toFixedTrim = (n: number, decimals = 6) => {
  // گرد کردن و حذف صفرهای انتهایی
  const fixed = n.toFixed(decimals);
  return fixed.replace(/\.?0+$/, '');
};

const formatNumberDisplay = (n: number, locale: Locale = 'fa', maxFraction = 6) => {
  if (!Number.isFinite(n)) return '';
  // برای نمایش (مثلاً در فیلد مقصد) از locale استفاده می‌کنیم
  return n.toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US', {
    maximumFractionDigits: maxFraction,
  });
};

/** ====== Component ====== **/
const CoinDetail: React.FC<CoinDetailProps> = ({ coin }) => {
  const formatNumber = (num: number | string, locale: 'fa' | 'en' = 'fa') => {
    if (!num) return '0';
    const number = typeof num === 'string' ? parseFloat(num) : num;
    return number.toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US');
  };

  const [fromCurrency, setFromCurrency] = useState<CurrencyOption>(currencyOptions[0]);
  const [toCurrency, setToCurrency] = useState<CurrencyOption>(currencyOptions[1]);

  // fromAmount => متنِ فیلدِ مبدأ (قابل ویرایش). به صورت رشته نگه‌داشته می‌شه تا خالی بودن حفظ شه.
  const [fromAmount, setFromAmount] = useState<string>('');
  // toAmount => مقدار محاسبه‌شده (رشته عددی; ذخیره‌شده به صورت لاتین). برای نمایش قالب‌بندی‌شده استفاده می‌کنیم.
  const [toAmount, setToAmount] = useState<string>('');

  const MAX_DECIMALS = 6;

  // تبدیل کلی (عدد -> عدد) با گرد کردن معقول
  const convertNumber = (valueStr: string, from: CurrencyOption, to: CurrencyOption) => {
    const valueNum = parseNumber(valueStr);
    if (Number.isNaN(valueNum)) return '';
    const rawResult = (valueNum * from.rateToUSD) / to.rateToUSD;
    // گرد کن و تبدیل به رشته بدون صفرهای انتهایی
    return toFixedTrim(rawResult, MAX_DECIMALS);
  };

  // هر بار مقدار مبدأ یا ارزها عوض شد، مقصد را به‌روز کن (رفتار خودکار مانند گوگل-ترنسلیت)
  useEffect(() => {
    if (!fromAmount) {
      setToAmount('');
      return;
    }
    const result = convertNumber(fromAmount, fromCurrency, toCurrency);
    setToAmount(result);
  }, [fromAmount, fromCurrency, toCurrency]);

  // وقتی کاربر روی دکمه "تبدیل" کلیک کنه — صریحاً تبدیل را اجرا کن (برای دسترسی)
  const handleConvertClick = () => {
    if (!fromAmount) return;
    const result = convertNumber(fromAmount, fromCurrency, toCurrency);
    setToAmount(result);
  };

  // رفتار swap مثل گوگل-ترنسلیت:
  // اگر فیلد مقصد مقدار داشته باشه، اون مقدار به مبدأ منتقل میشه و دوباره تبدیل انجام میشه.
  // اگر مقصد خالی باشه، فقط ارزها سواپ می‌شن و اگر مبدأ مقدار داشت، مجدداً تبدیل انجام میشه.
  const handleSwap = () => {
    const nextFrom = toCurrency;
    const nextTo = fromCurrency;

    // اگر مقصد قبلی مقدار داشت => اون مقدار تبدیل‌شده رو به مبدأ جدید می‌دیم (مثل Google Translate)
    const nextFromAmountCandidate = toAmount !== '' ? toAmount : fromAmount;

    // محاسبهٔ مقصد جدید بر اساس مقادیر بعد از سواپ
    const nextToAmount = nextFromAmountCandidate
      ? convertNumber(nextFromAmountCandidate, nextFrom, nextTo)
      : '';

    setFromCurrency(nextFrom);
    setToCurrency(nextTo);
    setFromAmount(nextFromAmountCandidate);
    setToAmount(nextToAmount);
  };

  // هنگام تایپ در فیلد مبدأ: مقدار ورودی را نرمالیزه و ذخیره کن (این نسخه ارقام فارسی را به لاتین تبدیل می‌کند)
  const handleFromInputChange = (value: string) => {
    // اجازه می‌دیم کاربر نقطه و ارقام و منفی وارد کنه؛ بقیه حروف حذف می‌شن.
    const normalized = normalizeNumberString(value);
    setFromAmount(normalized);
  };

  // نمایشِ مقادیر قالب‌بندی‌شده برای فیلد مقصد
  const toAmountDisplay = toAmount ? formatNumberDisplay(Number(toAmount)) : '';
  if (!coin) {
    return <p className="text-red-500">داده کوین یافت نشد!</p>;
  }

  return (
    <div className="  w-full max-sm:px-4 flex items-center justify-center md:py-20 py-10">
      <div className='lg:w-10/12 sm:w-11/12 w-full flex flex-col sm:flex-row bg-white rounded-2xl shadow-[0px_4px_103px_0px_rgba(13,26,142,0.08)] '>
        <div className="flex flex-col gap-6 sm:w-1/2 sm:border-l max-sm:border-b border-gray-200 
        lg:p-8 p-4">
          <p className='font-bold lg:text-base text-sm '>قیمت لحظه ای :</p>
          <div className='flex justify-between border-b border-b-gray-300 '>
            <div className="flex items-center gap-4 mb-6">
              {coin.icon && (
                <img
                  src={coin.icon}
                  alt={coin.en_name || coin.fa_name}
                  width={73}
                  height={73}
                  className="rounded-full lg:w-18 sm:w-14 max-sm:w-10 "
                />
              )}
              <div className='flex flex-col gap-2'>
                <h1 className="font-bold lg:text-lg text-sm">{coin.fa_name}</h1>
                <p className="lg:text-lg text-sm text-[#696464]">{coin.currency_code}</p>
              </div>
            </div>
            <div className='flex flex-col items-end gap-2  '>
              <p className='font-bold lg:text-lg text-sm'>{formatNumber(coin.irt_price)}  تومان</p>
              <p className="lg:text-lg text-sm text-[#696464]">{formatNumber(coin.price)} $</p>
            </div>
          </div>

          <div className='flex justify-between items-center py-1' >
            <p className='lg:text-base text-xs'>تغییر قیمت امروز :</p>
            <div className={clsx(
              'lg:text-base text-xs',
              {
                'text-red-500': coin.daily_change_percent < 0, // منفی: قرمز
                'text-green-500': coin.daily_change_percent >= 0, // مثبت یا صفر: سبز
              }
            )} dir='ltr'>{formatNumber(coin.daily_change_percent)}%</div>
          </div>

          <div className='flex justify-between items-center py-1' >
            <p className='lg:text-base text-xs'>خرید بیت کوین :</p>
            <div className="lg:text-base text-xs flex items-center gap-1">
              <span className='text-green-500'>{formatNumber(coin.buy_irt_price)}</span>
              <span className="ms-1">تومان</span>
            </div>
          </div>

          <div className='flex justify-between items-center py-1' >
            <p className='lg:text-base text-xs'> فروش بیت کوین :</p>
            <div className="lg:text-base text-xs flex items-center gap-1">
              <span className='text-red-500'>{formatNumber(coin.sell_irt_price)}</span>
              <span className="ms-1">تومان</span>
            </div>
          </div>


          <div className='flex justify-between items-center py-1'>
            <p className='lg:text-base text-xs'>بالا ترین قیمت 24 ساعته  :</p>
            <div className="lg:text-base text-xs flex items-center gap-1">
              <span className='text-green-500'>{formatNumber(1000000000)}</span>
              <span className="ms-1">تومان</span>
            </div>
          </div>


          <div className='flex justify-between items-center py-1'>
            <p className='lg:text-base text-xs'> پایین ترین قیمت 24 ساعته : </p>
            <div className="lg:text-base text-xs flex items-center gap-1">
              <span className='text-red-500'>{formatNumber(1000000000)}</span>
              <span className="ms-1">تومان</span>
            </div>
          </div>


        </div>
        <div className="flex flex-col gap-2 sm:w-1/2 lg:p-8 p-4">
          <div className="flex flex-col  gap-4" dir="rtl">
            <label className="lg:text-base text-xs font-bold">ارسال می‌کنید:</label>
            <div className="flex items-center lg:rounded-full max-lg:rounded-lg overflow-hidden bg-[#F6F4F4]">
              <input
                inputMode="decimal"
                type="text"
                placeholder="مقدار را وارد کنید"
                value={fromAmount}
                onChange={(e) => handleFromInputChange(e.target.value)}
                className="w-1/2 py-3 pr-6 h-full text-gray-800 focus:outline-none bg-[#F6F4F4] placeholder:text-[#696464] lg:placeholder:text-sm placeholder:text-xs"
                aria-label="مقدار ارسالی"
              />
              <div className="w-[2px] bg-gray-400 h-4/6"></div>
              <div className=" w-1/2 flex items-center justify-between px-3 relative">
                <select
                  value={fromCurrency.value}
                  onChange={(e) =>
                    setFromCurrency(currencyOptions.find((c) => c.value === e.target.value)!)
                  }
                  className="appearance-none bg-[#F6F4F4] py-2 focus:outline-none w-full text-[#696464] lg:text-sm text-xs mr-8"
                  aria-label="واحد ارز ارسالی"
                >
                  {currencyOptions.map((c) => (

                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}

                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                  <img
                    src={currencyOptions.find((c) => c.value === fromCurrency.value)?.icon}
                    alt={`${fromCurrency.label} icon`}
                    className="h-5 w-5"
                    aria-hidden="true"
                  /></div>
                <img
                  src="/images/arrow.svg"
                  alt="آیکون دراپ‌داون"
                  className=" text-black pl-3"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* دکمه‌ی swap */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSwap}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-full transition-all duration-200"
              aria-label="جابه‌جایی جهت تبدیل"
              title="تبدیل جهت (مانند Google Translate)"
            >
              <img src="/images/noun-back-and-forth.svg" alt="" /> 
            </button>
          </div>

          {/* دریافت می‌کنید */}
          <div className="flex flex-col gap-4" dir="rtl">
            <label className="lg:text-base text-xs font-bold">دریافت می‌کنید:</label>
            <div className="flex items-center lg:rounded-full max-lg:rounded-lg overflow-hidden bg-[#F6F4F4]">
              <input
                type="text"
                readOnly
                value={toAmountDisplay}
                placeholder="مقدار محاسبه می‌شود..."
                className="w-1/2 py-3 pr-6 h-full text-gray-800 focus:outline-none bg-[#F6F4F4] placeholder:text-[#696464] lg:placeholder:text-sm placeholder:text-xs"
                aria-label="مقدار دریافتی (محاسبه‌شده)"
              />
              <div className="w-[2px] bg-gray-400 h-4/6"></div>
              <div className=" w-1/2 flex items-center justify-between px-3 relative">
              <select
                value={toCurrency.value}
                onChange={(e) =>
                  setToCurrency(currencyOptions.find((c) => c.value === e.target.value)!)
                }
                className="appearance-none bg-[#F6F4F4] py-2 focus:outline-none w-full text-[#696464] lg:text-sm text-xs mr-8"
                aria-label="واحد ارز دریافتی"
              >
                {currencyOptions.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                  <img
                    src={currencyOptions.find((c) => c.value === toCurrency.value)?.icon}
                    alt={`${toCurrency.label} icon`}
                    className="h-5 w-5"
                    aria-hidden="true"
                  /></div>
                <img
                  src="/images/arrow.svg"
                  alt="آیکون دراپ‌داون"
                  className=" text-black pl-3"
                  aria-hidden="true"
                />
            </div>
            </div>
          </div>

          {/* نرخ‌ها */}
         <div className="  flex flex-col gap-4 py-4 font-bold lg:text-base text-sm">
          <div className='flex justify-between items-center '>
           <p className=''>نرخ ارز یک</p>
            <p>
              {formatNumberDisplay(
                Number(toFixedTrim(fromCurrency.rateToUSD / toCurrency.rateToUSD, MAX_DECIMALS)),
                'fa',
                6
              )}{' '}
              {toCurrency.label}
            </p>
            </div>
            <div className='flex justify-between items-center '>
           <p>نرخ ارز دو</p>
            <p>
              {formatNumberDisplay(
                Number(toFixedTrim(toCurrency.rateToUSD / fromCurrency.rateToUSD, MAX_DECIMALS)),
                'fa',
                6
              )}{' '}
              {fromCurrency.label}
            </p>
          </div>
          </div>

          {/* دکمه ادامه خرید / تبدیل */}
          <div className="mt-2 text-center">
            <button
              onClick={handleConvertClick}
                className=" border border-[#0D1A8E] w-full py-3 rounded-full transition-colors duration-200 text-[#0D1A8E] font-bold lg:text-base text-sm cursor-pointer max-lg:hidden"
            >
              ادامه خرید
            </button>
            <button
              onClick={handleConvertClick}
                className=" bg-[#1652F0] w-[97%] py-4 rounded-xl transition-colors duration-200 text-white font-bold lg:text-base text-sm cursor-pointer lg:hidden"
            >
              ثبت سفارش خرید
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetail;

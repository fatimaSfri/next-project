// 'use client'; // چون Next.js 13+ و useState استفاده می‌کنیم

// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link'; // برای navigation
// import { useQuery } from '@tanstack/react-query';
// import clsx from 'clsx';
// // در _app.js یا layout


// // نوع داده برای هر ردیف جدول (TypeScript) – بر اساس response API
// interface RowData {
//   id: number;
//   currency_code: string; // نماد کوین مثل BTC
//   fa_name: string;
//   // فرض فیلدهای عددی از API (price, volume, change, market_cap – اگه فرق داره، تنظیم کن)
//   price?: number; // ستون 2
//   volume?: number; // ستون 3
//   change?: number; // ستون 4
//   market_cap?: number; // ستون 5
//   // فیلدهای دیگه از API
//   [key: string]: any;
//   daily_change_percent?: number;
//   buy_irt_price?: number | string;
//   sell_irt_price?: number | string;
//   icon?: string;
//   en_name?: string;
// }

// const DataTableWithPagination: React.FC = () => {
//   const [currentPage, setCurrentPage] = useState<number>(1); // صفحه فعلی
//   const [searchTerm, setSearchTerm] = useState<string>(''); // برای جستجو
//   const [expandedRow, setExpandedRow] = useState<number | null>(null); // برای expand ردیف
//   const itemsPerPage = 5; // تعداد آیتم در هر صفحه (limit=5 ثابت)
//   const [hasRun, setHasRun] = useState(false);

//   const { data: apiDataRaw, isLoading, error } = useQuery<any>({
//     queryKey: ['coins', currentPage, searchTerm], // refetch وقتی page/search تغییر کنه
//     queryFn: async () => {
//       const myHeaders = new Headers();
//       myHeaders.append("Content-Type", "application/json");

//       const raw = JSON.stringify({
//         "page": currentPage,
//         "limit": itemsPerPage, // limit=5 ثابت
//         "search": searchTerm
//       });

//       const requestOptions = {
//         method: "post",
//         headers: myHeaders,
//         body: raw,
//         redirect: "follow"
//       };

//       const response = await fetch("https://b.wallet.ir/coinlist/list", requestOptions);
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`خطا در fetch: ${response.status} - ${errorText}`);
//       }
//       const result = await response.json(); // به جای text()، json() برای parse

//       console.log('API Response Full:', result); // دیباگ کامل: کل object رو ببین

//       return result; // کل result رو برگردون

//     },
//     staleTime: 5 * 60 * 1000, // 5 دقیقه cache
//   });

//   // ایمن‌سازی apiData: از items استفاده کن (از logت)
//   const apiData: RowData[] = apiDataRaw?.items || [];
//   const totalCount = apiDataRaw?.total || apiDataRaw?.total_count || apiDataRaw?.count || 0; // تعداد کل از API
//   console.log('Processed apiData Length:', apiData.length); // دیباگ: طول آرایه رو ببین
//   console.log('Total Count from API:', totalCount); // دیباگ: تعداد کل – این مهمه!
//   console.log('First Item (if any):', apiData[0]); // دیباگ: اولین آیتم رو ببین

//   // چون server-side، فیلتر server-side هست (search در API فرستاده می‌شه) – currentData = apiData
//   const currentData = apiData;

//   // محاسبه صفحات کل از API (server-side) – حالا درست!
//   const totalPages = Math.ceil(totalCount / itemsPerPage);

//   // تابع تغییر صفحه
//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   // تولید اعداد صفحات پویا بر اساس صفحه فعلی
//   const getPageNumbers = (current: number, total: number): (number | string)[] => {
//     const pages: (number | string)[] = [];
//     if (total <= 4) {
//       for (let i = 1; i <= total; i++) {
//         pages.push(i);
//       }
//     } else {
//       // همیشه صفحه اول
//       pages.push(1);

//       // اگر فاصله از اول باشه، ...
//       if (current > 3) {
//         pages.push('...');
//       }

//       // صفحات اطراف صفحه فعلی (حداکثر 3 تا)
//       const start = Math.max(2, current - 1);
//       const end = Math.min(total - 1, current + 1);
//       for (let i = start; i <= end; i++) {
//         pages.push(i);
//       }

//       // اگر فاصله از آخر باشه، ...
//       if (current < total - 2) {
//         pages.push('...');
//       }

//       // همیشه صفحه آخر
//       if (pages[pages.length - 1] !== total) {
//         pages.push(total);
//       }
//     }
//     return pages;
//   };

//   const pageNumbers = getPageNumbers(currentPage, totalPages);

//   // باز کردن اولین ردیف به طور دیفالت – ایمن‌سازی
//   // useEffect(() => {
//   //   if (currentData.length > 0 && expandedRow === null) {
//   //     setExpandedRow(currentData[0].id);
//   //   }
//   // }, []);



// useEffect(() => {
//   if (!hasRun && currentData.length > 0 && expandedRow === null) {
//     setExpandedRow(currentData[0].id);
//     setHasRun(true); // جلوگیری از اجرای دوباره
//   }
// }, [currentData, expandedRow, hasRun]);

//   const formatNumber = (num: number | string, locale: 'fa' | 'en' = 'fa') => {
//     if (!num) return '0';
//     const number = typeof num === 'string' ? parseFloat(num) : num;
//     return number.toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US');
//   };

//   return (
//     <div className="w-full max-w-7xl mx-auto p-4">
//       {/* جدول */}
//       <div className="overflow-x-auto shadow-md">
//   {/* Wrapper اصلی برای جدول */}
//   <div className=" overflow-hidden">

//     {/* هدر جدول - با گردی بالا و border پایین */}
//     <div className="bg-[#E3E7EC] rounded-lg border-b border-gray-200 overflow-hidden">
//       <table className="min-w-full text-right table-fixed ">
//         <thead>
//           <tr className="border-b-0"> {/* حذف border اضافی */}
//             <th className="p-4 text-center font-normal not-italic text-base leading-none tracking-normal uppercase w-[16%] align-middle">
//               نام رمز ارز
//             </th>
//             <th className="p-4 text-center font-normal not-italic text-base leading-none tracking-normal uppercase w-[16.66%] align-middle">
//               ارزش دلاری
//             </th>
//             <th className="p-4 text-center font-normal not-italic text-base leading-none tracking-normal uppercase w-[16.66%] align-middle">
//               تغییر روزانه
//             </th>
//             <th className="p-4 text-center font-normal not-italic text-base leading-none tracking-normal uppercase w-[16.66%] align-middle hidden md:table-cell">
//               خرید از والت
//             </th>
//             <th className="p-4 text-center font-normal not-italic text-base leading-none tracking-normal uppercase w-[16.66%] align-middle hidden md:table-cell">
//               فروش به والت
//             </th>
//             <th className="p-2 text-center font-normal not-italic text-base leading-none tracking-normal uppercase w-[17.5%] align-middle hidden md:table-cell ">
//               <div className=' flex gap-1 p-3 bg-white rounded-lg focus-within:ring-2 focus-within:ring-[#1652F0] focus-within:border-[#1652F0]'>
//               <img src="./images/search.svg" alt=""  className='  '/>
//               <input
//                 type="text"
//                 placeholder="جستجو ..."
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="w-full  rounded-md  mx-auto block focus:outline-none p-1  " 
//               />

//               </div>
//             </th>
//           </tr>
//         </thead>
//       </table>
//     </div>

//     {/* بدنه جدول - با گردی پایین */}
//     <div className="rounded-lg overflow-hidden table-zebra">
//       <table className="min-w-full text-right table-fixed">
//         <tbody className="bg-white divide-y divide-gray-200">
//           {currentData.length === 0 ? (
//             <tr>
//               <td colSpan={6} className="p-4 text-center text-gray-500 align-middle">
//                 داده‌ای یافت نشد
//               </td>
//             </tr>
//           ) : (
//             currentData.map((row) => (
//               <React.Fragment key={row.id}>
//                 <tr
//                   className={[
//                     ' border-b border-gray-200 hover:bg-gray-50 cursor-pointer',
//                     row.id % 2 === 0 ? '' : '',
//                   ].join(' ')}
//                   onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}
//                 > 
//                   <td className="p-4 w-[16.66%]">
//                     <div className="flex items-center lg:pr-4 gap-3 ">
//                       <img
//                         src={row.icon}
//                         alt={row.en_name}
//                         width={40}
//                         height={40}
//                         className="rounded-full"
//                       />
//                       <div className="text-right">
//                         <p className="text-sm font-medium text-gray-800">{row.fa_name}</p>
//                         <p className="text-xs text-gray-500">{row.currency_code}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-4 text-sm text-gray-800 text-center align-middle w-[16.66%]">
//                     ${formatNumber(row.price)}
//                   </td>
//                   <td className="p-4 text-sm text-gray-800 text-center align-middle w-[16.66%]" dir='ltr'>
//                     {formatNumber(row.daily_change_percent)}%
//                   </td>
//                   <td className="p-4 text-sm text-gray-800 text-center align-middle w-[16.66%] hidden md:table-cell">
//                     {formatNumber(row.buy_irt_price)} تومان
//                   </td>
//                   <td className="p-4 text-sm text-gray-800 text-center align-middle w-[16.66%] hidden md:table-cell">
//                     {formatNumber(row.sell_irt_price)} تومان
//                   </td>
//                   <td className="p-4 align-middle w-[16.66%] hidden md:table-cell text-center">
//                     <Link
//                       href={`/coin/${row.id}?code=${encodeURIComponent(row.currency_code)}&name=${encodeURIComponent(row.fa_name)}`}
//                       className="bg-[#1652F0] text-white min-w-20 lg:w-32 py-3 rounded-md text-sm font-medium hover:bg-[#1238B0] transition-colors inline-block mx-auto"
//                     >
//                       معامله
//                     </Link>
//                   </td>
//                 </tr>
//                 {expandedRow === row.id && (
//                   <tr className="md:hidden bg-gray-50">
//                     <td colSpan={3} className="p-4 align-middle">
//                       <div className="flex flex-col gap-2">
//                         <div className="flex justify-between">
//                           <span className="text-sm font-medium text-gray-700">ستون ۴:</span>
//                           <span className="text-sm text-gray-800">{row.change || row.column4 || row.id}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-sm font-medium text-gray-700">ستون ۵:</span>
//                           <span className="text-sm text-gray-800">{row.market_cap || row.column5 || row.id}</span>
//                         </div>
//                         <div className="w-full text-center">
//                           <Link
//                             href={`/coin/${row.id}?code=${encodeURIComponent(row.currency_code)}&name=${encodeURIComponent(row.fa_name)}`}
//                             className="w-full bg-[#1652F0] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1238B0] transition-colors block mx-auto"
//                           >
//                             معامله
//                           </Link>
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   </div>
// </div>

//       {/* Pagination زیر جدول – همیشه نشون بده */}
//       {totalPages > 0 && (
//         <div className="flex justify-center mt-4">
//           {/* اعداد صفحات */}
//           <div className="flex space-x-1 items-center">
//             {pageNumbers.map((page, index) => (
//               <React.Fragment key={index}>
//                 {typeof page === 'number' ? (
//                   <button
//                     onClick={() => handlePageChange(page as number)}
//                     className={`px-3 py-2 text-sm font-medium rounded-md ${
//                       currentPage === page
//                         ? 'bg-blue-500 text-white'
//                         : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
//                     }`}
//                   >
//                     {page}
//                   </button>
//                 ) : (
//                   <span className="px-3 py-2 text-sm text-gray-400">...</span>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DataTableWithPagination;





'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

// نوع داده برای هر ردیف جدول
interface RowData {
  id: number;
  currency_code: string;
  fa_name: string;
  price?: number;
  volume?: number;
  change?: number;
  market_cap?: number;
  daily_change_percent?: number;
  buy_irt_price?: number | string;
  sell_irt_price?: number | string;
  icon?: string;
  en_name?: string;
  [key: string]: any;
}

const DataTableWithPagination: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [hasRun, setHasRun] = useState(false);
  const itemsPerPage = 5;

  const { data: apiDataRaw, isLoading, error } = useQuery<any>({
    queryKey: ['coins', currentPage, searchTerm],
    queryFn: async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm
      });

      const requestOptions = {
        method: "post",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      const response = await fetch("https://b.wallet.ir/coinlist/list", requestOptions);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`خطا در fetch: ${response.status} - ${errorText}`);
      }
      const result = await response.json();

      console.log('API Response Full:', result);
      return result;
    },
    staleTime: 5 * 60 * 1000,
  });

  const apiData: RowData[] = apiDataRaw?.items || [];
  const totalCount = apiDataRaw?.total || apiDataRaw?.total_count || apiDataRaw?.count || 0;
  console.log('Processed apiData Length:', apiData.length);
  console.log('Total Count from API:', totalCount);
  console.log('First Item (if any):', apiData[0]);

  const currentData = apiData;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = (current: number, total: number): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (total <= 4) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (current > 3) {
        pages.push('...');
      }
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (current < total - 2) {
        pages.push('...');
      }
      if (pages[pages.length - 1] !== total) {
        pages.push(total);
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  useEffect(() => {
    if (!hasRun && currentData.length > 0 && expandedRow === null) {
      setExpandedRow(currentData[0].id);
      setHasRun(true);
    }
  }, [currentData, expandedRow, hasRun]);

  const formatNumber = (num: number | string, locale: 'fa' | 'en' = 'fa') => {
    if (!num) return '0';
    const number = typeof num === 'string' ? parseFloat(num) : num;
    return number.toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US');
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* جدول */}
      <div className="overflow-x-auto shadow-md">
        <div className="overflow-hidden">
          {/* هدر جدول */}
          <div className="bg-[#E3E7EC] rounded-lg border-b border-gray-200 overflow-hidden">
            <table className="min-w-full text-right table-fixed">
              <thead>
                <tr className="border-b-0">
                  <th className="p-4 text-center font-normal not-italic text-base leading-none tracking-normal uppercase w-[16%] align-middle">
                    نام رمز ارز
                  </th>
                  <th className="p-4 text-center font-normal not-italic text-base leading-none tracking-normal uppercase w-[16.66%] align-middle">
                    ارزش دلاری
                  </th>
                  <th className="p-4 text-center font-normal not-italic text-base leading-none tracking-normal uppercase w-[16.66%] align-middle">
                    تغییر روزانه
                  </th>
                  <th className="p-4 text-center font-normal not-italic text-basleae ding-none tracking-normal uppercase w-[16.66%] align-middle hidden md:table-cell">
                    خرید از والت
                  </th>
                  <th className="p-4 text-center font-normal not-italic text-base leading-none tracking-normal uppercase w-[16.66%] align-middle hidden md:table-cell">
                    فروش به والت
                  </th>
                  <th className="p-2 text-center font-normal not-italic text-base leading-none tracking-normal uppercase w-[17.5%] align-middle hidden md:table-cell">
                    <div className="flex gap-1 p-2 bg-white rounded-lg focus-within:ring-2 focus-within:ring-[#1652F0] focus-within:border-[#1652F0]">
                      <img src="/images/search.svg" alt="جستجو" className="" />
                      <input
                        type="text"
                        placeholder="جستجو ..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="w-full rounded-md mx-auto block focus:outline-none p-1"
                      />
                    </div>
                  </th>
                </tr>
              </thead>
            </table>
          </div>

          {/* بدنه جدول */}
          <div className="rounded-lg overflow-hidden">
            <table className="min-w-full text-right table-fixed">
              <tbody className="">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-gray-500 align-middle">
                      در حال بارگذاری...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-red-500 align-middle">
                      خطا در بارگذاری داده‌ها
                    </td>
                  </tr>
                ) : currentData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-gray-500 align-middle">
                      داده‌ای یافت نشد
                    </td>
                  </tr>
                ) : (
                  currentData.map((row, index) => (
                    <React.Fragment key={row.id}>
                      <tr
                        className={clsx(
                          ' hover:bg-gray-100 cursor-pointer',
                          {
                            'bg-[#F7F7F7]': index % 2 === 0, // ردیف‌های زوج (اندیس 0, 2, 4, ...)
                            'bg-white mx-4': index % 2 !== 0, // ردیف‌های فرد (اندیس 1, 3, 5, ...)
                          }
                        )}
                        onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}
                      >
                        <td className="p-4 w-[16.66%]">
                          <div className="flex items-center lg:pr-4 gap-3">
                            <img
                              src={row.icon}
                              alt={row.en_name}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-800">{row.fa_name}</p>
                              <p className="text-xs text-gray-500">{row.currency_code}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-800 text-center align-middle w-[16.66%]">
                          ${formatNumber(row.price)}
                        </td>
                        <td className={clsx(
                          'p-4 text-sm text-center align-middle w-[16.66%]',
                          {
                            'text-red-500': row.daily_change_percent < 0, // منفی: قرمز
                            'text-green-500': row.daily_change_percent >= 0, // مثبت یا صفر: سبز
                          }
                        )} dir="ltr">
                          {formatNumber(row.daily_change_percent)}%
                        </td>
                        <td className="p-4 text-sm text-gray-800 text-center align-middle w-[16.66%] hidden md:table-cell">
                          {formatNumber(row.buy_irt_price)} تومان
                        </td>
                        <td className="p-4 text-sm text-gray-800 text-center align-middle w-[16.66%] hidden md:table-cell">
                          {formatNumber(row.sell_irt_price)} تومان
                        </td>
                        <td className="p-4 align-middle w-[16.66%] hidden md:table-cell text-center">
                          <Link
                            href={`/coin/${row.id}?code=${encodeURIComponent(row.currency_code)}&name=${encodeURIComponent(row.fa_name)}`}
                            className="bg-[#1652F0] text-white min-w-20 lg:w-32 py-3 rounded-md text-sm font-medium hover:bg-[#1238B0] transition-colors inline-block mx-auto"
                          >
                            معامله
                          </Link>
                        </td>
                      </tr>
                      {expandedRow === row.id && (
                        <tr className={clsx(
                          ' md:hidden cursor-pointer',
                          {
                            'bg-[#F7F7F7]': index % 2 === 0, 
                            'bg-white mx-4': index % 2 !== 0, 
                          }
                        )}>
                          <td colSpan={3} className="p-4 align-middle">
                            <div className="flex flex-col gap-2">
                              <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-700"> فروش به والت :</span>
                                <span className="text-sm text-gray-800">{formatNumber(row.sell_irt_price)} تومان</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-700">خرید از والت :</span>
                                <span className="text-sm text-gray-800">
                                  {formatNumber(row.buy_irt_price)} تومان 
                                </span>
                              </div>
                              <div className="w-full text-center">
                                <Link
                                  href={`/coin/${row.id}?code=${encodeURIComponent(row.currency_code)}&name=${encodeURIComponent(row.fa_name)}`}
                                  className="w-full bg-[#1652F0] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1238B0] transition-colors block mx-auto"
                                >
                                  معامله
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex  justify-center mt-4">
          <div className="flex flex-row-reverse space-x-2 items-center">
            {pageNumbers.map((page, index) => (
              <React.Fragment key={index}>
                {typeof page === 'number' ? (
                  <button
                    onClick={() => handlePageChange(page as number)}
                    className={`w-8 text-sm  text-center align-middle rounded-full aspect-square cursor-pointer ${currentPage === page
                      ? 'bg-blue-500 text-white'
                      : ' bg-[#EEF2F5]  hover:bg-gray-200'
                      }`}
                  >
                    {formatNumber(page)}
                  </button>
                ) : (
                  <span className="px-3 py-2 text-sm  ">...</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTableWithPagination;
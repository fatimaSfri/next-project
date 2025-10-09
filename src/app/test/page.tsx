// // // // // 'use client';

// // // // // import React, { useState } from 'react';
// // // // // import Image from 'next/image';
// // // // // import { useQuery } from '@tanstack/react-query';

// // // // // // تابع نمونه برای دریافت داده‌ها از API
// // // // // const fetchTableData = async (page = 1) => {
// // // // //   const mockData = Array.from({ length: 9 }, (_, index) => ({
// // // // //     id: index + 1 + (page - 1) * 9,
// // // // //     avatar: '/avatar.png',
// // // // //     name: `کاربر ${index + 1}`,
// // // // //     role: `نقش ${index + 1}`,
// // // // //     column2: (Math.random() * 100).toFixed(2),
// // // // //     column3: (Math.random() * 1000).toFixed(0),
// // // // //     column4: (Math.random() * 50).toFixed(1),
// // // // //     column5: (Math.random() * 200).toFixed(0),
// // // // //   }));
// // // // //   return { data: mockData, totalPages: 10 }; // فرض: API تعداد کل صفحات رو برمی‌گردونه
// // // // // };

// // // // // export default function DataTable() {
// // // // //   const [page, setPage] = useState(1);
// // // // //   const [expandedRow, setExpandedRow] = useState(null);
// // // // //   const [searchTerm, setSearchTerm] = useState('');

// // // // //   // دریافت داده‌ها با React Query
// // // // //   const { data, isLoading, error } = useQuery({
// // // // //     queryKey: ['tableData', page],
// // // // //     queryFn: () => fetchTableData(page),
// // // // //   });

// // // // //   // تعداد کل صفحات از API یا مقدار ثابت
// // // // //   const totalPages = data?.totalPages || 10;

// // // // //   // فیلتر کردن داده‌ها بر اساس جستجو
// // // // //   const filteredData = data?.data?.filter((row) =>
// // // // //     row.name.toLowerCase().includes(searchTerm.toLowerCase())
// // // // //   ) || [];

// // // // //   // محاسبه اعداد صفحه‌بندی با ساختار ثابت اول + ellipsis + اعداد وسط + ellipsis + آخر
// // // // //   const getPaginationNumbers = () => {
// // // // //     const pages = [1]; // همیشه 1 رو نشون بده

// // // // //     if (totalPages <= 4) {
// // // // //       // اگر تعداد صفحات کم باشه، همه رو نشون بده
// // // // //       for (let i = 2; i <= totalPages; i++) {
// // // // //         pages.push(i);
// // // // //       }
// // // // //     } else {
// // // // //       // ساختار: 1 + ellipsis + (اعداد اطراف فعلی اگر لازم) + ellipsis + totalPages
// // // // //       if (page > 3) {
// // // // //         pages.push("...");
// // // // //       }

// // // // //       // اضافه کردن اعداد اطراف صفحه فعلی (حداکثر 2-3 عدد وسط)
// // // // //       if (page > 2 && page < totalPages - 1) {
// // // // //         if (page - 1 > 1) {
// // // // //           pages.push(page - 1);
// // // // //         }
// // // // //         pages.push(page);
// // // // //         if (page + 1 < totalPages) {
// // // // //           pages.push(page + 1);
// // // // //         }
// // // // //       } else if (page <= 2) {
// // // // //         pages.push(2);
// // // // //         if (page >= 2) pages.push(3);
// // // // //       } else if (page >= totalPages - 1) {
// // // // //         if (page <= totalPages - 1) pages.push(totalPages - 2);
// // // // //         pages.push(totalPages - 1);
// // // // //       }

// // // // //       if (page < totalPages - 2) {
// // // // //         pages.push('...');
// // // // //       }

// // // // //       // همیشه عدد آخر رو اضافه کن اگه هنوز اضافه نشده
// // // // //       if (pages[pages.length - 1] !== totalPages) {
// // // // //         pages.push(totalPages);
// // // // //       }
// // // // //     }

// // // // //     return pages;
// // // // //   };

// // // // //   return (
// // // // //     <div className="w-full max-w-7xl mx-auto p-4">
// // // // //       {/* جدول */}
// // // // //       <div className="overflow-x-auto">
// // // // //         <table className="w-full border-collapse text-right">
// // // // //           <thead>
// // // // //             <tr className="bg-gray-100">
// // // // //               <th className="p-4 text-sm font-medium text-gray-700">کاربر</th>
// // // // //               <th className="p-4 text-sm font-medium text-gray-700">ستون ۲</th>
// // // // //               <th className="p-4 text-sm font-medium text-gray-700">ستون ۳</th>
// // // // //               <th className="p-4 text-sm font-medium text-gray-700">ستون ۴</th>
// // // // //               <th className="p-4 text-sm font-medium text-gray-700">ستون ۵</th>
// // // // //               <th className="p-4 text-sm font-medium text-gray-700">
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   placeholder="جستجو..."
// // // // //                   value={searchTerm}
// // // // //                   onChange={(e) => setSearchTerm(e.target.value)}
// // // // //                   className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1652F0] text-sm"
// // // // //                 />
// // // // //               </th>
// // // // //             </tr>
// // // // //           </thead>
// // // // //           <tbody>
// // // // //             {isLoading ? (
// // // // //               <tr>
// // // // //                 <td colSpan={6} className="p-4 text-center text-gray-500">
// // // // //                   در حال بارگذاری...
// // // // //                 </td>
// // // // //               </tr>
// // // // //             ) : error ? (
// // // // //               <tr>
// // // // //                 <td colSpan={6} className="p-4 text-center text-red-500">
// // // // //                   خطا در بارگذاری داده‌ها
// // // // //                 </td>
// // // // //               </tr>
// // // // //             ) : filteredData.length === 0 ? (
// // // // //               <tr>
// // // // //                 <td colSpan={6} className="p-4 text-center text-gray-500">
// // // // //                   داده‌ای یافت نشد
// // // // //                 </td>
// // // // //               </tr>
// // // // //             ) : (
// // // // //               filteredData.map((row) => (
// // // // //                 <React.Fragment key={row.id}>
// // // // //                   <tr
// // // // //                     className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
// // // // //                     onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}
// // // // //                   >
// // // // //                     <td className="p-4 flex items-center gap-3">
// // // // //                       <Image
// // // // //                         src={row.avatar}
// // // // //                         alt={row.name}
// // // // //                         width={40}
// // // // //                         height={40}
// // // // //                         className="rounded-full"
// // // // //                       />
// // // // //                       <div>
// // // // //                         <p className="text-sm font-medium text-gray-800">{row.name}</p>
// // // // //                         <p className="text-xs text-gray-500">{row.role}</p>
// // // // //                       </div>
// // // // //                     </td>
// // // // //                     <td className="p-4 text-sm text-gray-800">{row.column2}</td>
// // // // //                     <td className="p-4 text-sm text-gray-800">{row.column3}</td>
// // // // //                     <td className="p-4 text-sm text-gray-800 hidden md:table-cell">{row.column4}</td>
// // // // //                     <td className="p-4 text-sm text-gray-800 hidden md:table-cell">{row.column5}</td>
// // // // //                     <td className="p-4">
// // // // //                       <button
// // // // //                         className="w-full md:w-auto bg-[#1652F0] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1238B0] transition-colors"
// // // // //                       >
// // // // //                         معامله
// // // // //                       </button>
// // // // //                     </td>
// // // // //                   </tr>
// // // // //                   {expandedRow === row.id && (
// // // // //                     <tr className="md:hidden bg-gray-50">
// // // // //                       <td colSpan={6} className="p-4">
// // // // //                         <div className="flex flex-col gap-2">
// // // // //                           <div className="flex justify-between">
// // // // //                             <span className="text-sm font-medium text-gray-700">ستون ۴:</span>
// // // // //                             <span className="text-sm text-gray-800">{row.column4}</span>
// // // // //                           </div>
// // // // //                           <div className="flex justify-between">
// // // // //                             <span className="text-sm font-medium text-gray-700">ستون ۵:</span>
// // // // //                             <span className="text-sm text-gray-800">{row.column5}</span>
// // // // //                           </div>
// // // // //                         </div>
// // // // //                       </td>
// // // // //                     </tr>
// // // // //                   )}
// // // // //                 </React.Fragment>
// // // // //               ))
// // // // //             )}
// // // // //           </tbody>
// // // // //         </table>
// // // // //       </div>

// // // // //       {/* صفحه‌بندی */}
// // // // //       <div className="flex justify-center items-center gap-2 mt-4">
// // // // //         {getPaginationNumbers().map((num, index) => (
// // // // //           <button
// // // // //             key={index}
// // // // //             onClick={() => typeof num === 'number'  && setPage(num)}
// // // // //             className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
// // // // //               num === page
// // // // //                 ? 'bg-[#1652F0] text-white'
// // // // //                 : typeof num === 'number'
// // // // //                 ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
// // // // //                 : 'bg-transparent text-gray-700 cursor-default'
// // // // //             }`}
// // // // //             disabled={typeof num !== 'number'}
// // // // //           >
// // // // //             {num}
// // // // //           </button>
// // // // //         ))}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // 'use client'; // چون Next.js 13+ و useState/useQuery استفاده می‌کنیم

// // // // import React, { useState } from 'react';
// // // // import { useQuery } from '@tanstack/react-query';

// // // // // نوع داده برای هر ردیف جدول (TypeScript)
// // // // interface User {
// // // //   id: number;
// // // //   name: string;
// // // //   email: string;
// // // // }

// // // // const DataTableWithPagination: React.FC = () => {
// // // //   const [currentPage, setCurrentPage] = useState<number>(1); // صفحه فعلی
// // // //   const itemsPerPage = 9; // تعداد آیتم در هر صفحه
// // // //   const [expandedRow, setExpandedRow] = useState(null);
// // // //   // const [searchTerm, setSearchTerm] = useState('');
// // // // // فیلتر کردن داده‌ها بر اساس جستجو
// // // //   const filteredData : Array<string> = [];
// // // //   //  data?.data?.filter((row) =>
// // // //   //   row.name.toLowerCase().includes(searchTerm.toLowerCase())
// // // //   // ) || 



// // // //   // Fetch داده‌ها از API رایگان (JSONPlaceholder)
// // // //   const { data: allData = [], isLoading, error } = useQuery<User[]>({
// // // //     queryKey: ['posts'],
// // // //     queryFn: async () => {
// // // //       const response = await fetch('https://jsonplaceholder.typicode.com/posts');
// // // //       if (!response.ok) {
// // // //         throw new Error('خطا در fetch داده‌ها');
// // // //       }
// // // //       return response.json();
// // // //     },
// // // //   });

// // // //   // محاسبه صفحات کل
// // // //   const totalPages = Math.ceil(allData.length / itemsPerPage);

// // // //   // داده‌های صفحه فعلی
// // // //   const startIndex = (currentPage - 1) * itemsPerPage;
// // // //   const currentData = allData.slice(startIndex, startIndex + itemsPerPage);

// // // //   // تابع تغییر صفحه
// // // //   const handlePageChange = (page: number) => {
// // // //     if (page >= 1 && page <= totalPages) {
// // // //       setCurrentPage(page);
// // // //     }
// // // //   };

// // // //   // تولید اعداد صفحات پویا بر اساس صفحه فعلی
// // // //   const getPageNumbers = (current: number, total: number): (number | string)[] => {
// // // //     const pages: (number | string)[] = [];
// // // //     if (total <= 4) {
// // // //       for (let i = 1; i <= total; i++) {
// // // //         pages.push(i);
// // // //       }
// // // //     } else {
// // // //       // همیشه صفحه اول
// // // //       pages.push(1);


// // // //       // اگر فاصله از اول باشه، ...
// // // //       if (current > 3) {
// // // //         pages.push('...');
// // // //       }

// // // //       // صفحات اطراف صفحه فعلی (حداکثر 3 تا)
// // // //       const start = Math.max(2, current - 1);
// // // //       const end = Math.min(total - 1, current + 1);
// // // //       for (let i = start; i <= end; i++) {
// // // //         pages.push(i);
// // // //       }
// // // //       if(current === 1){
// // // //         pages[3]=3
// // // //       }
// // // //       // اگر فاصله از آخر باشه، ...
// // // //       if (current < total - 2) {
// // // //         pages.push('...');
// // // //       }

// // // //       // همیشه صفحه آخر
// // // //       if (pages[pages.length - 1] !== total) {
// // // //         pages.push(total);
// // // //       }
// // // //     }
// // // //     return pages;
// // // //   };

// // // //   const pageNumbers = getPageNumbers(currentPage, totalPages);

// // // //   // Loading و Error
// // // //   if (isLoading) {
// // // //     return <div className="container mx-auto p-6">در حال بارگذاری...</div>;
// // // //   }

// // // //   if (error) {
// // // //     return <div className="container mx-auto p-6 text-red-500">خطا: {error.message}</div>;
// // // //   }

// // // //   return (
// // // //     <div className="container mx-auto p-6">
// // // //       {/* جدول */}
// // // //       {/* <div className="overflow-x-auto shadow-md rounded-lg">
// // // //         <table className="min-w-full bg-white border border-gray-200">
// // // //           <thead className="bg-gray-50">
// // // //             <tr>
// // // //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
// // // //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">نام</th>
// // // //               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ایمیل</th>
// // // //             </tr>
// // // //           </thead>
// // // //           <tbody className="bg-white divide-y divide-gray-200">
// // // //             {currentData.map((user) => (
// // // //               <tr key={user.id} className="hover:bg-gray-50">
// // // //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
// // // //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
// // // //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{user.email}</td>
// // // //               </tr>
// // // //             ))}
// // // //           </tbody>
// // // //         </table>
// // // //       </div> */}



// // // // <div className="overflow-x-auto">
// // // //         <table className="w-full border-collapse text-right">
// // // //            <thead>
// // // //             <tr className="bg-gray-100">
// // // //               <th className="p-4 text-sm font-medium text-gray-700">کاربر</th>
// // // //               <th className="p-4 text-sm font-medium text-gray-700">ستون ۲</th>
// // // //               <th className="p-4 text-sm font-medium text-gray-700">ستون ۳</th>
// // // //                <th className="p-4 text-sm font-medium text-gray-700">ستون ۴</th>
// // // //               <th className="p-4 text-sm font-medium text-gray-700">ستون ۵</th>
// // // //                <th className="p-4 text-sm font-medium text-gray-700">
// // // //                 <input
// // // //                   type="text"
// // // //                   placeholder="جستجو..."


// // // //                   className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1652F0] text-sm"
// // // //                 />
// // // //               </th>
// // // //             </tr>
// // // //           </thead>
// // // //           <tbody>
// // // //             {isLoading ? (
// // // //               <tr>
// // // //                 <td colSpan={6} className="p-4 text-center text-gray-500">
// // // //                   در حال بارگذاری...
// // // //                 </td>
// // // //               </tr>
// // // //             ) : error ? (
// // // //               <tr>
// // // //                 <td colSpan={6} className="p-4 text-center text-red-500">
// // // //                   خطا در بارگذاری داده‌ها
// // // //                 </td>
// // // //               </tr>
// // // //             ) : filteredData.length === 0 ? (
// // // //               <tr>
// // // //                 <td colSpan={6} className="p-4 text-center text-gray-500">
// // // //                   داده‌ای یافت نشد
// // // //                 </td>
// // // //               </tr>
// // // //             ) : (
// // // //               filteredData.map((row) => (
// // // //                 <React.Fragment key={row}>
// // // //                   <tr
// // // //                     className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"

// // // //                   >
// // // //                     <td className="p-4 flex items-center gap-3">
// // // //                       {/* <Image
// // // //                         src={row.avatar}
// // // //                         alt={row.name}
// // // //                         width={40}
// // // //                         height={40}
// // // //                         className="rounded-full"
// // // //                       /> */}
// // // //                       <div>
// // // //                         <p className="text-sm font-medium text-gray-800"></p>
// // // //                         <p className="text-xs text-gray-500"></p>
// // // //                       </div>
// // // //                     </td>
// // // //                     <td className="p-4 text-sm text-gray-800"></td>
// // // //                     <td className="p-4 text-sm text-gray-800"></td>
// // // //                     <td className="p-4 text-sm text-gray-800 hidden md:table-cell"></td>
// // // //                     <td className="p-4 text-sm text-gray-800 hidden md:table-cell"></td>
// // // //                     <td className="p-4">
// // // //                       <button
// // // //                         className="w-full md:w-auto bg-[#1652F0] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1238B0] transition-colors"
// // // //                       >
// // // //                         معامله
// // // //                       </button>
// // // //                     </td>
// // // //                   </tr>
// // // //                   {expandedRow === row && (
// // // //                     <tr className="md:hidden bg-gray-50">
// // // //                       <td colSpan={6} className="p-4">
// // // //                         <div className="flex flex-col gap-2">
// // // //                           <div className="flex justify-between">
// // // //                             <span className="text-sm font-medium text-gray-700">ستون ۴:</span>
// // // //                             <span className="text-sm text-gray-800"></span>
// // // //                           </div>
// // // //                           <div className="flex justify-between">
// // // //                             <span className="text-sm font-medium text-gray-700">ستون ۵:</span>
// // // //                             <span className="text-sm text-gray-800"></span>
// // // //                           </div>
// // // //                         </div>
// // // //                       </td>
// // // //                     </tr>
// // // //                   )}
// // // //                 </React.Fragment>
// // // //               ))
// // // //             )}
// // // //           </tbody>
// // // //         </table>
// // // //       </div>

















































// // // //       {/* Pagination زیر جدول */}
// // // //       {totalPages > 1 && (
// // // //         <div className="flex justify-center mt-4">
// // // //           {/* اعداد صفحات */}
// // // //           <div className="flex space-x-1 items-center">
// // // //             {pageNumbers.map((page, index) => (
// // // //               <React.Fragment key={index}>
// // // //                 {typeof page === 'number' ? (
// // // //                   <button
// // // //                     onClick={() => handlePageChange(page as number)}
// // // //                     className={`px-3 py-2 text-sm font-medium rounded-md ${
// // // //                       currentPage === page
// // // //                         ? 'bg-blue-500 text-white'
// // // //                         : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
// // // //                     }`}
// // // //                   >
// // // //                     {page}
// // // //                   </button>
// // // //                 ) : (
// // // //                   <span className="px-3 py-2 text-sm text-gray-400">...</span>
// // // //                 )}
// // // //               </React.Fragment>
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default DataTableWithPagination;




// // // // 'use client'; // چون Next.js 13+ و useState/useQuery استفاده می‌کنیم

// // // // import React, { useState, useEffect } from 'react';
// // // // import { useQuery } from '@tanstack/react-query';
// // // // import Image from 'next/image';

// // // // // نوع داده برای هر ردیف جدول (TypeScript)
// // // // interface RowData {
// // // //   id: number;
// // // //   name: string;
// // // //   role: string;
// // // //   avatar: string;
// // // //   column2: number;
// // // //   column3: number;
// // // //   column4: number;
// // // //   column5: number;
// // // //   email: string;
// // // // }

// // // // const DataTableWithPagination: React.FC = () => {
// // // //   const [currentPage, setCurrentPage] = useState<number>(1); // صفحه فعلی
// // // //   const [searchTerm, setSearchTerm] = useState<string>(''); // برای جستجو
// // // //   const [expandedRow, setExpandedRow] = useState<number | null>(null); // برای expand ردیف
// // // //   const itemsPerPage = 5; // تعداد آیتم در هر صفحه

// // // //   // Fetch داده‌ها از API رایگان (JSONPlaceholder) و map به RowData با اعداد، و duplicate برای 50+ رکورد
// // // //   const { data: apiData = [], isLoading, error } = useQuery<RowData[]>({
// // // //     queryKey: ['users'],
// // // //     queryFn: async () => {
// // // //       const response = await fetch('https://b.wallet.ir/coinlist/list', {
// // // //         method: 'GET',
// // // //         body: JSON.stringify({
// // // //           mode: "raw",
// // // //           raw: "{\r\n    \"page\": 1,\r\n    \"limit\": 5\r\n}",
// // // //           options: {
// // // //             raw: {
// // // //               language: "json"
// // // //             }
// // // //           }
// // // //         })
// // // //       });
     
// // // //       const users: any[] = await response.json();
// // // //       // Map به RowData با اعداد تصادفی/از API و duplicate برای داده بیشتر (50 رکورد)
// // // //       const baseData: RowData[] = users.map((user, index) => ({
// // // //         id: user.id,
// // // //         name: user.name,
// // // //         role: user.company.name.split(' ')[0], // نقش از company
// // // //         avatar: `https://i.pravatar.cc/40?${user.id}`, // آواتار
// // // //         column2: Math.floor(Math.random() * 1000) + 1, // عدد تصادفی برای ستون 2
// // // //         column3: Math.floor(Math.random() * 500) + 1, // عدد تصادفی برای ستون 3
// // // //         column4: Math.floor(Math.random() * 200) + 1, // عدد تصادفی برای ستون 4
// // // //         column5: Math.floor(Math.random() * 100) + 1, // عدد تصادفی برای ستون 5
// // // //         email: user.email,
// // // //       }));
// // // //       // Duplicate برای 50 رکورد (5 برابر)
// // // //       const extendedData = [...baseData];
// // // //       for (let i = 1; i < 5; i++) {
// // // //         extendedData.push(...baseData.map((item, idx) => ({ ...item, id: item.id + (10 * i) })));
// // // //       }
// // // //       return extendedData;
// // // //     },
// // // //   });

// // // //   // فیلتر بر اساس جستجو (روی name)
// // // //   const filteredData = apiData.filter((row) =>
// // // //     row.name.toLowerCase().includes(searchTerm.toLowerCase())
// // // //   );

// // // //   // محاسبه صفحات کل روی filteredData
// // // //   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

// // // //   // داده‌های صفحه فعلی
// // // //   const startIndex = (currentPage - 1) * itemsPerPage;
// // // //   const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);


// // // //   // تابع تغییر صفحه
// // // //   const handlePageChange = (page: number) => {
// // // //     if (page >= 1 && page <= totalPages) {
// // // //       setCurrentPage(page);
// // // //     }
// // // //   };

// // // //   // تولید اعداد صفحات پویا بر اساس صفحه فعلی
// // // //   const getPageNumbers = (current: number, total: number): (number | string)[] => {
// // // //     const pages: (number | string)[] = [];
// // // //     if (total <= 4) {
// // // //       for (let i = 1; i <= total; i++) {
// // // //         pages.push(i);
// // // //       }
// // // //     } else {
// // // //       // همیشه صفحه اول
// // // //       pages.push(1);

// // // //       // اگر فاصله از اول باشه، ...
// // // //       if (current > 3) {
// // // //         pages.push('...');
// // // //       }

// // // //       // صفحات اطراف صفحه فعلی (حداکثر 3 تا)
// // // //       const start = Math.max(2, current - 1);
// // // //       const end = Math.min(total - 1, current + 1);
// // // //       for (let i = start; i <= end; i++) {
// // // //         pages.push(i);
// // // //       }
// // // //       if (current === 1) {
// // // //         pages[3] = 3
// // // //       }
// // // //       // اگر فاصله از آخر باشه، ...
// // // //       if (current < total - 2) {
// // // //         pages.push('...');
// // // //       }

// // // //       // همیشه صفحه آخر
// // // //       if (pages[pages.length - 1] !== total) {
// // // //         pages.push(total);
// // // //       }
// // // //     }
// // // //     return pages;
// // // //   };

// // // //   const pageNumbers = getPageNumbers(currentPage, totalPages);

// // // //   // باز کردن اولین ردیف به طور دیفالت
// // // //   // useEffect(() => {
// // // //   //   if (currentData.length > 0 && expandedRow === null) {
// // // //   //     setExpandedRow(currentData[0].id);
// // // //   //   }
// // // //   // }, [currentData, expandedRow]);

// // // //   // Loading و Error
// // // //   if (isLoading) {
// // // //     return (
// // // //       <div className="w-full max-w-7xl mx-auto p-4">
// // // //         <div className="overflow-x-auto">
// // // //           <table className="w-full border-collapse text-right">
// // // //             <tbody>
// // // //               <tr>
// // // //                 <td colSpan={6} className="p-4 text-center text-gray-500">
// // // //                   در حال بارگذاری...
// // // //                 </td>
// // // //               </tr>
// // // //             </tbody>
// // // //           </table>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (error) {
// // // //     return (
// // // //       <div className="w-full max-w-7xl mx-auto p-4">
// // // //         <div className="overflow-x-auto">
// // // //           <table className="w-full border-collapse text-right">
// // // //             <tbody>
// // // //               <tr>
// // // //                 <td colSpan={6} className="p-4 text-center text-red-500">
// // // //                   خطا: {error.message}
// // // //                 </td>
// // // //               </tr>
// // // //             </tbody>
// // // //           </table>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="w-full max-w-7xl mx-auto p-4">
// // // //       {/* جدول */}
// // // //       <div className="overflow-x-auto shadow-md rounded-lg">
// // // //         <table className="min-w-full bg-white border border-gray-200 text-right">
// // // //           <thead className="bg-gray-50">
// // // //             <tr>
// // // //               <th className="p-4 text-sm font-medium text-gray-700">کاربر</th>
// // // //               <th className="p-4 text-sm font-medium text-gray-700">ستون ۲</th>
// // // //               <th className="p-4 text-sm font-medium text-gray-700">ستون ۳</th>
// // // //               <th className="p-4 text-sm font-medium text-gray-700 hidden md:table-cell">ستون ۴</th>
// // // //               <th className="p-4 text-sm font-medium text-gray-700 hidden md:table-cell">ستون ۵</th>
// // // //               <th className="p-4 text-sm font-medium text-gray-700 hidden md:table-cell">
// // // //                 <input
// // // //                   type="text"
// // // //                   placeholder="جستجو..."
// // // //                   value={searchTerm}
// // // //                   onChange={(e) => {
// // // //                     setSearchTerm(e.target.value);
// // // //                     setCurrentPage(1); // ریست صفحه به 1 بعد از جستجو
// // // //                   }}
// // // //                   className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1652F0] text-sm"
// // // //                 />
// // // //               </th>
// // // //             </tr>
// // // //           </thead>
// // // //           <tbody className="bg-white divide-y divide-gray-200">
// // // //             {currentData.length === 0 ? (
// // // //               <tr>
// // // //                 <td colSpan={6} className="p-4 text-center text-gray-500">
// // // //                   داده‌ای یافت نشد
// // // //                 </td>
// // // //               </tr>
// // // //             ) : (
// // // //               currentData.map((row) => (
// // // //                 <React.Fragment key={row.id}>
// // // //                   <tr
// // // //                     className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
// // // //                     onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}
// // // //                   >
// // // //                     <td className="p-4 flex items-center gap-3">
// // // //                       {/* <Image
// // // //                         src={row.avatar}
// // // //                         alt={row.name}
// // // //                         width={40}
// // // //                         height={40}
// // // //                         className="rounded-full"
// // // //                       /> */}
// // // //                       <div>
// // // //                         <p className="text-sm font-medium text-gray-800">{row.name}</p>
// // // //                         <p className="text-xs text-gray-500">{row.role}</p>
// // // //                       </div>
// // // //                     </td>
// // // //                     <td className="p-4 text-sm text-gray-800">{row.column2}</td>
// // // //                     <td className="p-4 text-sm text-gray-800">{row.column3}</td>
// // // //                     <td className="p-4 text-sm text-gray-800 hidden md:table-cell">{row.column4}</td>
// // // //                     <td className="p-4 text-sm text-gray-800 hidden md:table-cell">{row.column5}</td>
// // // //                     <td className="p-4 hidden md:table-cell">
// // // //                       <button
// // // //                         className="w-full md:w-auto bg-[#1652F0] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1238B0] transition-colors"
// // // //                       >
// // // //                         معامله
// // // //                       </button>
// // // //                     </td>
// // // //                   </tr>
// // // //                   {expandedRow === row.id && (
// // // //                     <tr className="md:hidden bg-gray-50">
// // // //                       <td colSpan={3} className="p-4">
// // // //                         <div className="flex flex-col gap-2">
// // // //                           <div className="flex justify-between">
// // // //                             <span className="text-sm font-medium text-gray-700">ستون ۴:</span>
// // // //                             <span className="text-sm text-gray-800">{row.column4}</span>
// // // //                           </div>
// // // //                           <div className="flex justify-between">
// // // //                             <span className="text-sm font-medium text-gray-700">ستون ۵:</span>
// // // //                             <span className="text-sm text-gray-800">{row.column5}</span>
// // // //                           </div>
// // // //                           <div className="w-full">
// // // //                             <button
// // // //                               className="w-full bg-[#1652F0] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1238B0] transition-colors"
// // // //                             >
// // // //                               معامله
// // // //                             </button>
// // // //                           </div>
// // // //                         </div>
// // // //                       </td>
// // // //                     </tr>
// // // //                   )}
// // // //                 </React.Fragment>
// // // //               ))
// // // //             )}
// // // //           </tbody>
// // // //         </table>
// // // //       </div>

// // // //       {/* Pagination زیر جدول */}
// // // //       {totalPages > 1 && (
// // // //         <div className="flex justify-center mt-4">
// // // //           {/* اعداد صفحات */}
// // // //           <div className="flex space-x-1 items-center">
// // // //             {pageNumbers.map((page, index) => (
// // // //               <React.Fragment key={index}>
// // // //                 {typeof page === 'number' ? (
// // // //                   <button
// // // //                     onClick={() => handlePageChange(page as number)}
// // // //                     className={`px-3 py-2 text-sm font-medium rounded-md ${currentPage === page
// // // //                         ? 'bg-blue-500 text-white'
// // // //                         : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
// // // //                       }`}
// // // //                   >
// // // //                     {page}
// // // //                   </button>
// // // //                 ) : (
// // // //                   <span className="px-3 py-2 text-sm text-gray-400">...</span>
// // // //                 )}
// // // //               </React.Fragment>
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default DataTableWithPagination;









// // 'use client'; // چون Next.js 13+ و useState استفاده می‌کنیم

// // import React, { useState, useEffect } from 'react';
// // import Image from 'next/image';
// // import { useQuery } from '@tanstack/react-query';

// // // نوع داده برای هر ردیف جدول (TypeScript)
// // interface RowData {
// //   id: number;
// //   name: string;
// //   role: string;
// //   avatar: string;
// //   column2: number;
// //   column3: number;
// //   column4: number;
// //   column5: number;
// //   email: string;
// // }

// // const DataTableWithPagination: React.FC = () => {
// //   const [currentPage, setCurrentPage] = useState<number>(1); // صفحه فعلی
// //   const [searchTerm, setSearchTerm] = useState<string>(''); // برای جستجو
// //   const [expandedRow, setExpandedRow] = useState<number | null>(null); // برای expand ردیف
// //   const itemsPerPage = 5; // تعداد آیتم در هر صفحه
 
// //   const { data: apiData = [], isLoading, error } = useQuery<RowData[]>({
// //     queryKey: ['coins', currentPage, searchTerm], // refetch وقتی page/search تغییر کنه
// //     queryFn: async () => {
// //       const myHeaders = new Headers();
// //       myHeaders.append("Content-Type", "application/json");
      
// //       const raw = JSON.stringify({
// //         "page": currentPage,
// //         "limit": itemsPerPage,
// //         "search": searchTerm
// //       });
      
// //       const requestOptions = {
// //         method: "get",
// //         headers: myHeaders,
// //         body: raw,
// //         redirect: "follow"
// //       };
      
// //       const response = await fetch("https://b.wallet.ir/coinlist/list", requestOptions);
// //       if (!response.ok) {
// //         const errorText = await response.text();
// //         throw new Error(`خطا در fetch: ${response.status} - ${errorText}`);
// //       }
// //       const result = await response.json(); // به جای text()، json() برای parse
     
// //       return result.data || result; // فرض بر { data: [] } یا مستقیم آرایه
      
// //     },
// //     staleTime: 5 * 60 * 1000, // 5 دقیقه cache
// //   });
// //   console.log(apiData)
  
// //   // داده‌های استاتیک (فقط یک ردیف)
// //   // const apiData: RowData[] = [
// //   //   {
// //   //     id: 1,
// //   //     name: 'علی احمدی',
// //   //     role: 'مدیر',
// //   //     avatar: 'https://i.pravatar.cc/40?1',
// //   //     column2: 1234,
// //   //     column3: 567,
// //   //     column4: 89,
// //   //     column5: 12,
// //   //     email: 'ali@example.com',
// //   //   },
// //   // ];

// //   // فیلتر بر اساس جستجو (روی name)
// //   const filteredData = apiData.filter((row) =>
// //     row.name.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   // محاسبه صفحات کل روی filteredData
// //   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

// //   // داده‌های صفحه فعلی
// //   const startIndex = (currentPage - 1) * itemsPerPage;
// //   const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

// //   // تابع تغییر صفحه
// //   const handlePageChange = (page: number) => {
// //     if (page >= 1 && page <= totalPages) {
// //       setCurrentPage(page);
// //     }
// //   };

// //   // تولید اعداد صفحات پویا بر اساس صفحه فعلی
// //   const getPageNumbers = (current: number, total: number): (number | string)[] => {
// //     const pages: (number | string)[] = [];
// //     if (total <= 4) {
// //       for (let i = 1; i <= total; i++) {
// //         pages.push(i);
// //       }
// //     } else {
// //       // همیشه صفحه اول
// //       pages.push(1);
     
// //       // اگر فاصله از اول باشه، ...
// //       if (current > 3) {
// //         pages.push('...');
// //       }
     
// //       // صفحات اطراف صفحه فعلی (حداکثر 3 تا)
// //       const start = Math.max(2, current - 1);
// //       const end = Math.min(total - 1, current + 1);
// //       for (let i = start; i <= end; i++) {
// //         pages.push(i);
// //       }
     
// //       // اگر فاصله از آخر باشه، ...
// //       if (current < total - 2) {
// //         pages.push('...');
// //       }
     
// //       // همیشه صفحه آخر
// //       if (pages[pages.length - 1] !== total) {
// //         pages.push(total);
// //       }
// //     }
// //     return pages;
// //   };

// //   const pageNumbers = getPageNumbers(currentPage, totalPages);

// //   // باز کردن اولین ردیف به طور دیفالت
// //   useEffect(() => {
// //     if (currentData.length > 0 && expandedRow === null) {
// //       setExpandedRow(currentData[0].id);
// //     }
// //   }, [currentData, expandedRow]);

// //   return (
// //     <div className="w-full max-w-7xl mx-auto p-4">
// //       {/* جدول */}
// //       <div className="overflow-x-auto shadow-md rounded-lg">
// //         <table className="min-w-full bg-white border border-gray-200 text-right">
// //           <thead className="bg-gray-50">
// //             <tr>
// //               <th className="p-4 text-sm font-medium text-gray-700">کاربر</th>
// //               <th className="p-4 text-sm font-medium text-gray-700">ستون ۲</th>
// //               <th className="p-4 text-sm font-medium text-gray-700">ستون ۳</th>
// //               <th className="p-4 text-sm font-medium text-gray-700 hidden md:table-cell">ستون ۴</th>
// //               <th className="p-4 text-sm font-medium text-gray-700 hidden md:table-cell">ستون ۵</th>
// //               <th className="p-4 text-sm font-medium text-gray-700 hidden md:table-cell">
// //                 <input
// //                   type="text"
// //                   placeholder="جستجو..."
// //                   value={searchTerm}
// //                   onChange={(e) => {
// //                     setSearchTerm(e.target.value);
// //                     setCurrentPage(1); // ریست صفحه به 1 بعد از جستجو
// //                   }}
// //                   className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1652F0] text-sm"
// //                 />
// //               </th>
// //             </tr>
// //           </thead>
// //           <tbody className="bg-white divide-y divide-gray-200">
// //             {currentData.length === 0 ? (
// //               <tr>
// //                 <td colSpan={6} className="p-4 text-center text-gray-500">
// //                   داده‌ای یافت نشد
// //                 </td>
// //               </tr>
// //             ) : (
// //               currentData.map((row) => (
// //                 <React.Fragment key={row.id}>
// //                   <tr
// //                     className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
// //                     onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}
// //                   >
// //                     <td className="p-4 flex items-center gap-3">
// //                       {/* <Image
// //                         src={row.avatar}
// //                         alt={row.name}
// //                         width={40}
// //                         height={40}
// //                         className="rounded-full"
// //                       /> */}
// //                       <div>
// //                         <p className="text-sm font-medium text-gray-800">{row.name}</p>
// //                         <p className="text-xs text-gray-500">{row.role}</p>
// //                       </div>
// //                     </td>
// //                     <td className="p-4 text-sm text-gray-800">{row.column2}</td>
// //                     <td className="p-4 text-sm text-gray-800">{row.column3}</td>
// //                     <td className="p-4 text-sm text-gray-800 hidden md:table-cell">{row.column4}</td>
// //                     <td className="p-4 text-sm text-gray-800 hidden md:table-cell">{row.column5}</td>
// //                     <td className="p-4 hidden md:table-cell">
// //                       <button
// //                         className="w-full md:w-auto bg-[#1652F0] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1238B0] transition-colors"
// //                       >
// //                         معامله
// //                       </button>
// //                     </td>
// //                   </tr>
// //                   {expandedRow === row.id && (
// //                     <tr className="md:hidden bg-gray-50">
// //                       <td colSpan={3} className="p-4">
// //                         <div className="flex flex-col gap-2">
// //                           <div className="flex justify-between">
// //                             <span className="text-sm font-medium text-gray-700">ستون ۴:</span>
// //                             <span className="text-sm text-gray-800">{row.column4}</span>
// //                           </div>
// //                           <div className="flex justify-between">
// //                             <span className="text-sm font-medium text-gray-700">ستون ۵:</span>
// //                             <span className="text-sm text-gray-800">{row.column5}</span>
// //                           </div>
// //                           <div className="w-full">
// //                             <button
// //                               className="w-full bg-[#1652F0] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1238B0] transition-colors"
// //                             >
// //                               معامله
// //                             </button>
// //                           </div>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   )}
// //                 </React.Fragment>
// //               ))
// //             )}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Pagination زیر جدول */}
// //       {totalPages > 1 && (
// //         <div className="flex justify-center mt-4">
// //           {/* اعداد صفحات */}
// //           <div className="flex space-x-1 items-center">
// //             {pageNumbers.map((page, index) => (
// //               <React.Fragment key={index}>
// //                 {typeof page === 'number' ? (
// //                   <button
// //                     onClick={() => handlePageChange(page as number)}
// //                     className={`px-3 py-2 text-sm font-medium rounded-md ${
// //                       currentPage === page
// //                         ? 'bg-blue-500 text-white'
// //                         : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
// //                     }`}
// //                   >
// //                     {page}
// //                   </button>
// //                 ) : (
// //                   <span className="px-3 py-2 text-sm text-gray-400">...</span>
// //                 )}
// //               </React.Fragment>
// //             ))}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default DataTableWithPagination;













































// // // 'use client'; // چون Next.js 13+ و useState/useQuery استفاده می‌کنیم

// // // import React, { useState, useEffect } from 'react';
// // // import { useQuery } from '@tanstack/react-query';
// // // import Image from 'next/image';

// // // // نوع داده برای هر ردیف جدول (TypeScript) – فرض بر لیست کوین‌ها، اما با فیلدهای عمومی
// // // interface RowData {
// // //   id: number;
// // //   name: string;
// // //   role: string; // یا symbol برای کوین
// // //   avatar: string;
// // //   column2: number;
// // //   column3: number;
// // //   column4: number;
// // //   column5: number;
// // //   email: string; // یا price برای کوین
// // // }

// // // const DataTableWithPagination: React.FC = () => {
// // //   const [currentPage, setCurrentPage] = useState<number>(1); 
// // //   const [searchTerm, setSearchTerm] = useState<string>(''); 
// // //   const [expandedRow, setExpandedRow] = useState<number | null>(null); 
// // //   const itemsPerPage = 5; 


// // //   const { data: apiData = [], isLoading, error } = useQuery<RowData[]>({
// // //     queryKey: ['coins', currentPage, searchTerm], 
// // //     queryFn: async () => {
// // //       const myHeaders = new Headers();
// // //       myHeaders.append("Content-Type", "application/json");
      
// // //       const raw = JSON.stringify({
// // //         "page": currentPage,
// // //         "limit": itemsPerPage,
// // //         "search": searchTerm
// // //       });
      
// // //       const requestOptions = {
// // //         method: "POST",
// // //         headers: myHeaders,
// // //         body: raw,
// // //         redirect: "follow"
// // //       };
      
// // //       const response = await fetch("https://b.wallet.ir/coinlist/list", requestOptions);
// // //       if (!response.ok) {
// // //         const errorText = await response.text();
// // //         throw new Error(`خطا در fetch: ${response.status} - ${errorText}`);
// // //       }
// // //       const result = await response.json(); 
// // //       return result.data || result; 
// // //     },
// // //     staleTime: 5 * 60 * 1000, 
// // //   });

// // //   // فیلتر بر اساس جستجو (روی name) – اگه server-side باشه، این رو حذف کن
// // //   const filteredData = apiData.filter((row) =>
// // //     row.name.toLowerCase().includes(searchTerm.toLowerCase())
// // //   );

// // //   // محاسبه صفحات کل روی filteredData (اگه server-side، از response.total استفاده کن)
// // //   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

// // //   // داده‌های صفحه فعلی
// // //   const startIndex = (currentPage - 1) * itemsPerPage;
// // //   const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

// // //   // تابع تغییر صفحه
// // //   const handlePageChange = (page: number) => {
// // //     if (page >= 1 && page <= totalPages) {
// // //       setCurrentPage(page);
// // //     }
// // //   };

// // //   // تولید اعداد صفحات پویا بر اساس صفحه فعلی
// // //   const getPageNumbers = (current: number, total: number): (number | string)[] => {
// // //     const pages: (number | string)[] = [];
// // //     if (total <= 4) {
// // //       for (let i = 1; i <= total; i++) {
// // //         pages.push(i);
// // //       }
// // //     } else {
// // //       // همیشه صفحه اول
// // //       pages.push(1);
     
// // //       // اگر فاصله از اول باشه، ...
// // //       if (current > 3) {
// // //         pages.push('...');
// // //       }
     
// // //       // صفحات اطراف صفحه فعلی (حداکثر 3 تا)
// // //       const start = Math.max(2, current - 1);
// // //       const end = Math.min(total - 1, current + 1);
// // //       for (let i = start; i <= end; i++) {
// // //         pages.push(i);
// // //       }
     
// // //       // اگر فاصله از آخر باشه، ...
// // //       if (current < total - 2) {
// // //         pages.push('...');
// // //       }
     
// // //       // همیشه صفحه آخر
// // //       if (pages[pages.length - 1] !== total) {
// // //         pages.push(total);
// // //       }
// // //     }
// // //     return pages;
// // //   };

// // //   const pageNumbers = getPageNumbers(currentPage, totalPages);

// // //   // باز کردن اولین ردیف به طور دیفالت
// // //   useEffect(() => {
// // //     if (currentData.length > 0 && expandedRow === null) {
// // //       setExpandedRow(currentData[0].id);
// // //     }
// // //   }, [currentData, expandedRow]);

// // //   // Loading و Error
// // //   if (isLoading) {
// // //     return (
// // //       <div className="w-full max-w-7xl mx-auto p-4">
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full border-collapse text-right">
// // //             <tbody>
// // //               <tr>
// // //                 <td colSpan={6} className="p-4 text-center text-gray-500">
// // //                   در حال بارگذاری...
// // //                 </td>
// // //               </tr>
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="w-full max-w-7xl mx-auto p-4">
// // //         <div className="overflow-x-auto">
// // //           <table className="w-full border-collapse text-right">
// // //             <tbody>
// // //               <tr>
// // //                 <td colSpan={6} className="p-4 text-center text-red-500">
// // //                   خطا: {error.message}
// // //                 </td>
// // //               </tr>
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="w-full max-w-7xl mx-auto p-4">
// // //       {/* جدول */}
// // //       <div className="overflow-x-auto shadow-md rounded-lg">
// // //         <table className="min-w-full bg-white border border-gray-200 text-right">
// // //           <thead className="bg-gray-50">
// // //             <tr>
// // //               <th className="p-4 text-sm font-medium text-gray-700">کاربر</th>
// // //               <th className="p-4 text-sm font-medium text-gray-700">ستون ۲</th>
// // //               <th className="p-4 text-sm font-medium text-gray-700">ستون ۳</th>
// // //               <th className="p-4 text-sm font-medium text-gray-700 hidden md:table-cell">ستون ۴</th>
// // //               <th className="p-4 text-sm font-medium text-gray-700 hidden md:table-cell">ستون ۵</th>
// // //               <th className="p-4 text-sm font-medium text-gray-700 hidden md:table-cell">
// // //                 <input
// // //                   type="text"
// // //                   placeholder="جستجو..."
// // //                   value={searchTerm}
// // //                   onChange={(e) => {
// // //                     setSearchTerm(e.target.value);
// // //                     setCurrentPage(1); // ریست صفحه به 1 بعد از جستجو
// // //                   }}
// // //                   className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1652F0] text-sm"
// // //                 />
// // //               </th>
// // //             </tr>
// // //           </thead>
// // //           <tbody className="bg-white divide-y divide-gray-200">
// // //             {currentData.length === 0 ? (
// // //               <tr>
// // //                 <td colSpan={6} className="p-4 text-center text-gray-500">
// // //                   داده‌ای یافت نشد
// // //                 </td>
// // //               </tr>
// // //             ) : (
// // //               currentData.map((row) => (
// // //                 <React.Fragment key={row.id}>
// // //                   <tr
// // //                     className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
// // //                     onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}
// // //                   >
// // //                     <td className="p-4 flex items-center gap-3">
// // //                       <Image
// // //                         src={row.avatar}
// // //                         alt={row.name}
// // //                         width={40}
// // //                         height={40}
// // //                         className="rounded-full"
// // //                       />
// // //                       <div>
// // //                         <p className="text-sm font-medium text-gray-800">{row.name}</p>
// // //                         <p className="text-xs text-gray-500">{row.role}</p>
// // //                       </div>
// // //                     </td>
// // //                     <td className="p-4 text-sm text-gray-800">{row.column2}</td>
// // //                     <td className="p-4 text-sm text-gray-800">{row.column3}</td>
// // //                     <td className="p-4 text-sm text-gray-800 hidden md:table-cell">{row.column4}</td>
// // //                     <td className="p-4 text-sm text-gray-800 hidden md:table-cell">{row.column5}</td>
// // //                     <td className="p-4 hidden md:table-cell">
// // //                       <button
// // //                         className="w-full md:w-auto bg-[#1652F0] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1238B0] transition-colors"
// // //                       >
// // //                         معامله
// // //                       </button>
// // //                     </td>
// // //                   </tr>
// // //                   {expandedRow === row.id && (
// // //                     <tr className="md:hidden bg-gray-50">
// // //                       <td colSpan={3} className="p-4">
// // //                         <div className="flex flex-col gap-2">
// // //                           <div className="flex justify-between">
// // //                             <span className="text-sm font-medium text-gray-700">ستون ۴:</span>
// // //                             <span className="text-sm text-gray-800">{row.column4}</span>
// // //                           </div>
// // //                           <div className="flex justify-between">
// // //                             <span className="text-sm font-medium text-gray-700">ستون ۵:</span>
// // //                             <span className="text-sm text-gray-800">{row.column5}</span>
// // //                           </div>
// // //                           <div className="w-full">
// // //                             <button
// // //                               className="w-full bg-[#1652F0] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1238B0] transition-colors"
// // //                             >
// // //                               معامله
// // //                             </button>
// // //                           </div>
// // //                         </div>
// // //                       </td>
// // //                     </tr>
// // //                   )}
// // //                 </React.Fragment>
// // //               ))
// // //             )}
// // //           </tbody>
// // //         </table>
// // //       </div>

// // //       {/* Pagination زیر جدول */}
// // //       {totalPages > 1 && (
// // //         <div className="flex justify-center mt-4">
// // //           {/* اعداد صفحات */}
// // //           <div className="flex space-x-1 items-center">
// // //             {pageNumbers.map((page, index) => (
// // //               <React.Fragment key={index}>
// // //                 {typeof page === 'number' ? (
// // //                   <button
// // //                     onClick={() => handlePageChange(page as number)}
// // //                     className={`px-3 py-2 text-sm font-medium rounded-md ${
// // //                       currentPage === page
// // //                         ? 'bg-blue-500 text-white'
// // //                         : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
// // //                     }`}
// // //                   >
// // //                     {page}
// // //                   </button>
// // //                 ) : (
// // //                   <span className="px-3 py-2 text-sm text-gray-400">...</span>
// // //                 )}
// // //               </React.Fragment>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default DataTableWithPagination;




// 'use client'; // چون Next.js 13+ و useState استفاده می‌کنیم
// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { useQuery } from '@tanstack/react-query';
// import { useRouter } from 'next/navigation'; // اضافه: برای navigation

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
// }

// const DataTableWithPagination: React.FC = () => {
//   const router = useRouter(); // اضافه: router برای navigation
//   const [currentPage, setCurrentPage] = useState<number>(1); // صفحه فعلی
//   const [searchTerm, setSearchTerm] = useState<string>(''); // برای جستجو
//   const [expandedRow, setExpandedRow] = useState<number | null>(null); // برای expand ردیف
//   const itemsPerPage = 5; // تعداد آیتم در هر صفحه (limit=5 ثابت)

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
//   useEffect(() => {
//     if (currentData.length > 0 && expandedRow === null) {
//       setExpandedRow(currentData[0].id);
//     }
//   }, [currentData, expandedRow]);
//   const formatNumber = (num: number | string, locale: 'fa' | 'en' = 'fa') => {
//     if (!num) return '0';
//     const number = typeof num === 'string' ? parseFloat(num) : num;
//     return number.toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US');
//   };
//   // تابع برای رفتن به صفحه جزئیات
//   const handleTradeClick = (row: RowData) => {
//     router.push(`/coin/${row.id}`); // برو به /coin/[id] با id کوین
//   };
//   return (
//     <div className="w-full max-w-7xl mx-auto p-4">
//       {/* جدول */}
//       <div className="overflow-x-auto shadow-md rounded-lg">
//         <table className="min-w-full bg-white border border-gray-200 text-right">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="p-4 text-sm font-medium text-gray-700">نام رمز ارز</th>
//               <th className="p-4 text-sm font-medium text-gray-700">ارزش دلاری</th>
//               <th className="p-4 text-sm font-medium text-gray-700">تغییر روزانه</th>
//               <th className="p-4 text-sm font-medium text-gray-700 hidden md:table-cell"> خرید از والت </th>
//               <th className="p-4 text-sm font-medium text-gray-700 hidden md:table-cell"> فروش به والت</th>
//               <th className="p-4 text-sm font-medium text-gray-700 hidden md:table-cell">
//                 <input
//                   type="text"
//                   placeholder="جستجو..."
//                   value={searchTerm}
//                   onChange={(e) => {
//                     setSearchTerm(e.target.value);
//                     setCurrentPage(1); // ریست صفحه به 1 بعد از جستجو
//                   }}
//                   className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1652F0] text-sm"
//                 />
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {currentData.length === 0 ? (
//               <tr>
//                 <td colSpan={6} className="p-4 text-center text-gray-500">
//                   داده‌ای یافت نشد
//                 </td>
//               </tr>
//             ) : (
//               currentData.map((row) => (
//                 <React.Fragment key={row.id}>
//                   <tr
//                     className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
//                     onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}
//                   >
//                     <td className="p-4 flex items-center gap-3">
//                       <img
//                         src={row.icon}
//                         alt={row.en_name}
//                         width={40}
//                         height={40}
//                         className="rounded-full"
//                       />
//                       <div>
//                         <p className="text-sm font-medium text-gray-800">{row.fa_name}</p>
//                         <p className="text-xs text-gray-500">{row.currency_code}</p>
//                       </div>
//                     </td>
//                     <td className="p-4 text-sm text-gray-800">${formatNumber(row.price)}</td>
//                     <td className="p-4 text-sm text-gray-800" dir='ltr'>{formatNumber(row.daily_change_percent)}%</td>
//                     <td className="p-4 text-sm text-gray-800 hidden md:table-cell">{formatNumber(row.buy_irt_price)} تومان </td>
//                     <td className="p-4 text-sm text-gray-800 hidden md:table-cell">{formatNumber(row.sell_irt_price)} تومان</td>
//                     <td className="p-4 hidden md:table-cell">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation(); // جلوگیری از trigger onClick ردیف
//                           handleTradeClick(row); // برو به صفحه جزئیات
//                         }}
//                         className="w-full md:w-auto bg-[#1652F0] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1238B0] transition-colors"
//                       >
//                         معامله
//                       </button>
//                     </td>
//                   </tr>
//                   {expandedRow === row.id && (
//                     <tr className="md:hidden bg-gray-50">
//                       <td colSpan={3} className="p-4">
//                         <div className="flex flex-col gap-2">
//                           <div className="flex justify-between">
//                             <span className="text-sm font-medium text-gray-700">خرید از والت:</span>
//                             <span className="text-sm text-gray-800">{formatNumber(row.buy_irt_price)} تومان</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-sm font-medium text-gray-700">فروش به والت:</span>
//                             <span className="text-sm text-gray-800">{formatNumber(row.sell_irt_price)} تومان</span>
//                           </div>
//                           <div className="w-full">
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation(); // جلوگیری از trigger onClick ردیف
//                                 handleTradeClick(row); // برو به صفحه جزئیات
//                               }}
//                               className="w-full bg-[#1652F0] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1238B0] transition-colors"
//                             >
//                               معامله
//                             </button>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
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




'use client'; // چون Next.js 13+ و useState استفاده می‌کنیم
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // برای navigation
import { useQuery } from '@tanstack/react-query';

// نوع داده برای هر ردیف جدول (TypeScript) – بر اساس response API
interface RowData {
  id: number;
  currency_code: string; // نماد کوین مثل BTC
  fa_name: string;
  // فرض فیلدهای عددی از API (price, volume, change, market_cap – اگه فرق داره، تنظیم کن)
  price?: number; // ستون 2
  volume?: number; // ستون 3
  change?: number; // ستون 4
  market_cap?: number; // ستون 5
  // فیلدهای دیگه از API
  [key: string]: any;
  daily_change_percent?: number;
  buy_irt_price?: number | string;
  sell_irt_price?: number | string;
  icon?: string;
  en_name?: string;
}

const DataTableWithPagination: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1); // صفحه فعلی
  const [searchTerm, setSearchTerm] = useState<string>(''); // برای جستجو
  const [expandedRow, setExpandedRow] = useState<number | null>(null); // برای expand ردیف
  const itemsPerPage = 5; // تعداد آیتم در هر صفحه (limit=5 ثابت)

  const { data: apiDataRaw, isLoading, error } = useQuery<any>({
    queryKey: ['coins', currentPage, searchTerm], // refetch وقتی page/search تغییر کنه
    queryFn: async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      const raw = JSON.stringify({
        "page": currentPage,
        "limit": itemsPerPage, // limit=5 ثابت
        "search": searchTerm
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
      const result = await response.json(); // به جای text()، json() برای parse
      
      console.log('API Response Full:', result); // دیباگ کامل: کل object رو ببین
      
      return result; // کل result رو برگردون
      
    },
    staleTime: 5 * 60 * 1000, // 5 دقیقه cache
  });

  // ایمن‌سازی apiData: از items استفاده کن (از logت)
  const apiData: RowData[] = apiDataRaw?.items || [];
  const totalCount = apiDataRaw?.total || apiDataRaw?.total_count || apiDataRaw?.count || 0; // تعداد کل از API
  console.log('Processed apiData Length:', apiData.length); // دیباگ: طول آرایه رو ببین
  console.log('Total Count from API:', totalCount); // دیباگ: تعداد کل – این مهمه!
  console.log('First Item (if any):', apiData[0]); // دیباگ: اولین آیتم رو ببین

  // چون server-side، فیلتر server-side هست (search در API فرستاده می‌شه) – currentData = apiData
  const currentData = apiData;

  // محاسبه صفحات کل از API (server-side) – حالا درست!
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // تابع تغییر صفحه
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // تولید اعداد صفحات پویا بر اساس صفحه فعلی
  const getPageNumbers = (current: number, total: number): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (total <= 4) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // همیشه صفحه اول
      pages.push(1);
      
      // اگر فاصله از اول باشه، ...
      if (current > 3) {
        pages.push('...');
      }
      
      // صفحات اطراف صفحه فعلی (حداکثر 3 تا)
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // اگر فاصله از آخر باشه، ...
      if (current < total - 2) {
        pages.push('...');
      }
      
      // همیشه صفحه آخر
      if (pages[pages.length - 1] !== total) {
        pages.push(total);
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  // باز کردن اولین ردیف به طور دیفالت – ایمن‌سازی
  useEffect(() => {
    if (currentData.length > 0 && expandedRow === null) {
      setExpandedRow(currentData[0].id);
    }
  }, [currentData, expandedRow]);

  const formatNumber = (num: number | string, locale: 'fa' | 'en' = 'fa') => {
    if (!num) return '0';
    const number = typeof num === 'string' ? parseFloat(num) : num;
    return number.toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US');
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* جدول */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 text-right">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-sm font-medium text-gray-700">نام رمز ارز</th>
              <th className="p-4 text-sm font-medium text-gray-700">ارزش دلاری</th>
              <th className="p-4 text-sm font-medium text-gray-700">تغییر روزانه</th>
              <th className="p-4 text-sm font-medium text-gray-700 hidden md:table-cell"> خرید از والت </th>
              <th className="p-4 text-sm font-medium text-gray-700 hidden md:table-cell"> فروش به والت</th>
              <th className="p-4 text-sm font-medium text-gray-700 hidden md:table-cell">
                <input
                  type="text"
                  placeholder="جستجو..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // ریست صفحه به 1 بعد از جستجو
                  }}
                  className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1652F0] text-sm"
                />
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  داده‌ای یافت نشد
                </td>
              </tr>
            ) : (
              currentData.map((row) => (
                <React.Fragment key={row.id}>
                  <tr
                    className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}
                  >
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={row.icon}
                        alt={row.en_name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{row.fa_name}</p>
                        <p className="text-xs text-gray-500">{row.currency_code}</p>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-800">${formatNumber(row.price)}</td>
                    <td className="p-4 text-sm text-gray-800" dir='ltr'>{formatNumber(row.daily_change_percent)}%</td>
                    <td className="p-4 text-sm text-gray-800 hidden md:table-cell">{formatNumber(row.buy_irt_price)} تومان </td>
                    <td className="p-4 text-sm text-gray-800 hidden md:table-cell">{formatNumber(row.sell_irt_price)} تومان</td>
                    <td className="p-4 hidden md:table-cell">
                      <Link
                        href={`/coin/${row.id}?code=${encodeURIComponent(row.currency_code)}&name=${encodeURIComponent(row.fa_name)}`}
                        className="w-full md:w-auto bg-[#1652F0] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1238B0] transition-colors inline-block text-center"
                      >
                        معامله
                      </Link>
                    </td>
                  </tr>
                  {expandedRow === row.id && (
                    <tr className="md:hidden bg-gray-50">
                      <td colSpan={3} className="p-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium text-gray-700">ستون ۴:</span>
                            <span className="text-sm text-gray-800">{row.change || row.column4 || row.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium text-gray-700">ستون ۵:</span>
                            <span className="text-sm text-gray-800">{row.market_cap || row.column5 || row.id}</span>
                          </div>
                          <div className="w-full">
                            <Link
                              href={`/coin/${row.id}?code=${encodeURIComponent(row.currency_code)}&name=${encodeURIComponent(row.fa_name)}`}
                              className="w-full bg-[#1652F0] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1238B0] transition-colors block text-center"
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

      {/* Pagination زیر جدول – همیشه نشون بده */}
      {totalPages > 0 && (
        <div className="flex justify-center mt-4">
          {/* اعداد صفحات */}
          <div className="flex space-x-1 items-center">
            {pageNumbers.map((page, index) => (
              <React.Fragment key={index}>
                {typeof page === 'number' ? (
                  <button
                    onClick={() => handlePageChange(page as number)}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      currentPage === page
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ) : (
                  <span className="px-3 py-2 text-sm text-gray-400">...</span>
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
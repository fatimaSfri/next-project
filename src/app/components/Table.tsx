'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

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
  const itemsPerPage = 5;
  const { data: apiDataRaw, isLoading, error } = useQuery({
    queryKey: ['coins', currentPage, searchTerm],
    queryFn: async () => {
      const response = await fetch('https://b.wallet.ir/coinlist/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: currentPage,
          limit: itemsPerPage,
          search: searchTerm,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`خطا در fetch: ${response.status} - ${errorText}`);
      }
  
      const result = await response.json();
      return result;
    },
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 دقیقه
  });
  
  const apiData: RowData[] = apiDataRaw?.items || [];
  const totalCount = apiDataRaw?.total || apiDataRaw?.total_count || apiDataRaw?.count || 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getPageNumbers = (current: number, total: number): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (total <= 4) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push('...');
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (current < total - 2) pages.push('...');
      if (pages[pages.length - 1] !== total) pages.push(total);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const formatNumber = (num: number | string, locale: 'fa' | 'en' = 'fa') => {
    if (!num) return '0';
    const number = typeof num === 'string' ? parseFloat(num) : num;
    return number.toLocaleString(locale === 'fa' ? 'fa-IR' : 'en-US');
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
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
                      <img src="/images/search.svg" alt="جستجو" />
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
              <tbody>
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
                ) : apiData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-gray-500 align-middle">
                      داده‌ای یافت نشد
                    </td>
                  </tr>
                ) : (
                  apiData.map((row, index) => (
                    <React.Fragment key={row.id}>
                      <tr
                        className={clsx(' hover:bg-gray-100 cursor-pointer', {
                          'bg-[#F7F7F7]': index % 2 === 0,
                          'bg-white mx-4': index % 2 !== 0,
                        })}
                        onClick={() =>
                          setExpandedRow(expandedRow === row.id ? null : row.id)
                        }
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
                              <p className="text-sm font-medium text-gray-800">
                                {row.fa_name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {row.currency_code}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-800 text-center align-middle w-[16.66%]">
                          ${formatNumber(row.price)}
                        </td>
                        <td
                          className={clsx(
                            'p-4 text-sm text-center align-middle w-[16.66%]',
                            {
                              'text-red-500': row.daily_change_percent < 0,
                              'text-green-500': row.daily_change_percent >= 0,
                            }
                          )}
                          dir="ltr"
                        >
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
                            href={`/coin/${row.id}?code=${encodeURIComponent(
                              row.currency_code
                            )}&name=${encodeURIComponent(row.fa_name)}`}
                            className="bg-[#1652F0] text-white min-w-20 lg:w-32 py-3 rounded-md text-sm font-medium hover:bg-[#1238B0] transition-colors inline-block mx-auto"
                          >
                            معامله
                          </Link>
                        </td>
                      </tr>
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
        <div className="flex justify-center mt-8">
          <div className="flex flex-row-reverse space-x-2 items-center">
            {pageNumbers.map((page, index) => (
              <React.Fragment key={index}>
                {typeof page === 'number' ? (
                  <button
                    onClick={() => handlePageChange(page)}
                    className={`w-8 text-sm text-center align-middle rounded-full aspect-square cursor-pointer ${
                      currentPage === page
                        ? 'bg-blue-500 text-white'
                        : ' bg-[#EEF2F5]  hover:bg-gray-200'
                    }`}
                  >
                    {formatNumber(page)}
                  </button>
                ) : (
                  <span className="px-3 py-2 text-sm">...</span>
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

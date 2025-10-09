// ۱. فایل hook: src/hooks/useCoinDetail.ts (دقیقاً کپی کن)
import { useState ,useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

// Interface برای داده کوین
export interface CoinDetailData {
  id: number;
  currency_code: string;
  fa_name: string;
  en_name?: string;
  icon?: string;
  price?: number;
  daily_change_percent?: number;
  buy_irt_price?: number | string;
  sell_irt_price?: number | string;
  [key: string]: any;
}

// Hook سفارشی – fetch با fallback
export const useCoinDetail = (id: string) => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const faName = searchParams.get('name');

  console.log('Hook params:', { id, code, faName });

  // Query اول: با code
  const { data: codeData, isLoading: codeLoading, error: codeError } = useQuery<any>({
    queryKey: ['coin-by-code', id, code],
    queryFn: async () => {
      if (!code) return null;
      return fetchCoin(code);
    },
    enabled: !!code,
    staleTime: 5 * 60 * 1000,
  });

  // Query دوم: fallback با fa_name
  const [useFallback, setUseFallback] = useState(false);
  const { data: nameData, isLoading: nameLoading, error: nameError } = useQuery<any>({
    queryKey: ['coin-by-name', id, faName],
    queryFn: async () => {
      if (!faName || !useFallback) return null;
      return fetchCoin(faName);
    },
    enabled: !!faName && useFallback,
    staleTime: 5 * 60 * 1000,
  });

  // تابع fetch مشترک
  const fetchCoin = async (searchValue: string) => {
    console.log('Fetching with search:', searchValue);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "page": 1,
      "limit": 5,
      "search": searchValue
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
    
    console.log('API Response for', searchValue, ':', result);
    
    if (!result.items || result.items.length === 0) {
      console.warn('Items empty for', searchValue, '- trying fallback');
      return null;
    }
    
    // فیلتر client-side
    const matched = result.items.find((item: CoinDetailData) => item.currency_code === code);
    return matched || result.items[0];
  };

  // Trigger fallback
useEffect(() => {
    if (codeData === null && !codeLoading && !codeError && faName) {
      setUseFallback(true);
    }
  }, [codeData, codeLoading, codeError, faName, code]);

  const data = codeData || nameData;
  const isLoading = codeLoading || nameLoading;
  const error = codeError || nameError;

  return { data, isLoading, error };
};
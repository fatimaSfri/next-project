'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import {  useCoinDetail } from '../../../hooks/useCoinDetail';
import CoinDetail from './CoinDetail';
import Other from './OtherCoinChild'
import Header from '@/app/components/Header';
import About from './About';
import Chart from './Chart';
import MoreDetails from './MoreDetails';
import Questions from './Questions';
import Footer from '@/app/components/Footer';
import StartNow from './StartNow';

const CoinDetailPage: React.FC = () => {
  const params = useParams();
  const id = params.id as string;

  const { data: coin, isLoading, error } = useCoinDetail(id);

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-4 text-center">
        <p className="text-gray-500">در حال بارگذاری جزئیات...</p>
      </div>
    );
  }

  if (error || !coin) {
    return (
      <div className="w-full max-w-7xl mx-auto p-4 text-center">
        <p className="text-red-500">خطا در بارگذاری داده‌ها: {error?.message || 'کوین یافت نشد'}</p>
      </div>
    );
  }

  return (
    <div>
      <Header></Header>
      <CoinDetail coin={coin}/>
      <Other coin={coin}/>
      <About coin={coin}/>
      <Chart coin={coin} />
      <MoreDetails coin={coin}/>
      <Questions/>
      <StartNow coin={coin}/>
      <Footer/>

    </div>
  );
};

export default CoinDetailPage;
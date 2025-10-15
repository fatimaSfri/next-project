'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface DataPoint {
  time: string;
  price: number;
  exchange: number;
  dollar: number;
}

interface OtherCoinChildProps {
  coin: {
    currency_code: string;
    fa_name: string;
  } | null;
}

const periods: Record<string, string> = {
  '24 ساعته' : '24h',
  '1 هفته' : '1w',
  '1 ماه' : '1m',
  '1 سال' : '1y',
};

const fetchChartData = async (currency_code: string, periodApi: string): Promise<DataPoint[]> => {
  const res = await fetch('https://b.wallet.ir/coinlist/chart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ period: periodApi, currency_code }),
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  const json = await res.json();
  if (!json.items || !Array.isArray(json.items)) {
    throw new Error(`Unexpected API response`);
  }
  return json.items.map((item: any) => ({
    time: item.title || new Date(item.time * 1000).toLocaleTimeString(),
    price: Number(item.price),
    exchange: Number(item.irt_price) / 1e6,
    dollar: Number(item.usd_price),
  }));
};

const DynamicChart = dynamic(() =>
  Promise.resolve(({ data }: { data: DataPoint[] }) => {
    if (!data || data.length === 0) return null;
    const currentPrice = data.at(-1)?.price ?? 0;
    const currentDollar = data.at(-1)?.dollar ?? 0;

    const upperOptions = {
      chart: { type: 'line', height: 350, toolbar: { show: false }, zoom: { enabled: false } },
      stroke: { curve: 'straight', width: 2 },
      dataLabels: { enabled: false },
      grid: { xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } } },
      legend: {
        show: false 
      },
      colors: ['#f97316', '#3b82f6'],
      xaxis: { categories: data.map(d => d.time), labels: { show: false } },
      yaxis: [
        { min: Math.min(...data.map(d => d.price)), max: Math.max(...data.map(d => d.price)), labels: { formatter: (v: number) => `${v.toFixed(0)}k`, style: { fontSize: '11px' } } },
        { opposite: true, min: Math.min(...data.map(d => d.exchange)), max: Math.max(...data.map(d => d.exchange)), labels: { formatter: (v: number) => `${v.toFixed(0)}M`, style: { fontSize: '11px' } } }
      ],
      fill: { type: 'gradient', gradient: { shadeIntensity: 0.3, opacityFrom: 0.4, opacityTo: 0, colorStops: [{ offset: 0, color: '#fecdd3', opacity: 0.4 }, { offset: 100, color: '#fecdd3', opacity: 0 }] } },
      tooltip: { shared: true, y: { formatter: (v: number, { seriesIndex }: any) => seriesIndex === 0 ? `${v.toFixed(0)}k تومان` : `${v.toFixed(0)}M` } },
    };

    const upperSeries = [
      { name: 'قیمت بیت‌کوین', data: data.map(d => d.price) },
      { name: 'برابری', data: data.map(d => d.exchange) },
    ];

    const miniOptions = {
      chart: { type: 'line', height: 100, toolbar: { show: false } },
      stroke: { width: 2, curve: 'straight' },
      grid: { show: false },
      xaxis: { categories: data.slice(-12).map(d => d.time), labels: { style: { fontSize: '9px' } } },
      yaxis: { labels: { formatter: (v: number) => `${v.toFixed(0)}`, style: { fontSize: '9px' } } },
      colors: ['#10b981'],
      dataLabels: { enabled: false },
    };
    const miniSeries = [{ name: 'نرخ دلار', data: data.slice(-12).map(d => d.dollar) }];

      
    return (
      <div className="relative">
        <div className="absolute top-10 right-24 text-sm border-2 border-gray-300 bg-white z-20 p-1 ">
        {Math.max(...data.map(d => d.price)).toLocaleString('fa-IR')} تومان</div>
        <div className="absolute bottom-60 left-24 text-sm border-2 border-gray-300 bg-white z-20 p-1">
        {Math.min(...data.map(d => d.price)).toLocaleString('fa-IR')} تومان</div>

        <Chart options={upperOptions} series={upperSeries} type="area" height={350} />
        <div className="mt-3">
          <Chart options={miniOptions} series={miniSeries} type="line" height={100} />
        </div>

        <div className="flex justify-center mt-3 gap-5 text-xs">
          <div className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded-full" /> نرخ دلار</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 rounded-full" /> برابری</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-500 rounded-full" /> قیمت کوین</div>
        </div>
      </div>
    );
  }),
  { ssr: false }
);

const OtherCoinChild: React.FC<OtherCoinChildProps> = ({ coin }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('24 ساعته');
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['chartData', coin?.currency_code, selectedPeriod],
    queryFn: () => coin ? fetchChartData(coin.currency_code, periods[selectedPeriod]) : Promise.resolve([]),
    enabled: !!coin,
  });

  if (!coin) return null;

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="w-full max-w-5xl">
          <div className="animate-pulse bg-white rounded-2xl p-6 shadow-sm">
            <div className="h-6 w-1/3 bg-gray-200 rounded mb-6"></div>
            <div className="h-64 bg-gray-100 rounded mb-4"></div>
            <div className="h-12 bg-gray-100 rounded"></div>
            <div className="mt-4 flex justify-center text-sm text-gray-500">
              در حال بارگذاری نمودار...
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className='lg:w-10/12 sm:w-11/12 w-full px-4  mx-auto pb-28 '>
    <div className='mb-20 mt-4 sm:text-3xl text-xl font-black w-full lg:text-right text-center'>
    نمودار قیمت
     <span className='px-1'>{coin.fa_name}  </span>
     و نرخ برابری تومان
    </div>
    <div className="w-full mt-6 rounded-2xl  shadow-[0px_4px_103px_0px_rgba(13,26,142,0.08)] text-right bg-white py-6 px-2 ">
      
      <div className="flex gap-3 mb-5 mr-6">
        {Object.keys(periods).map(p => (
          <button key={p} onClick={() => setSelectedPeriod(p)}
            className={`px-3 py-1 rounded-full text-sm transition cursor-pointer font-bold ${selectedPeriod === p ? 'text-[#0D1A8E]' : ' text-[#696464]'}`}>
            {p}
          </button>
        ))}
      </div>

      <div>
        {error && <div className="text-center text-red-500">خطا: {(error as Error).message}</div>}
        {data && <DynamicChart data={data} />}
        {isFetching && <div className="mt-2 text-center text-xs text-slate-500">به‌روز‌رسانی داده‌ها...</div>}
      </div>
    </div>
    </div>
  );
};

export default OtherCoinChild;

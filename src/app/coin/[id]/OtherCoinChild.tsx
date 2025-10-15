import React from 'react';

interface OtherCoinChildProps {
  coin: {
    id: number;
    currency_code: string;
    fa_name: string;
    daily_change_percent?: number;
  } | null;
}

const OtherCoinChild: React.FC<OtherCoinChildProps> = ({ coin }) => {
  if (!coin) return null;

  return (
    <div className="mt-6  rounded-lg p-4 text-right">
      <h2 className="text-lg font-semibold mb-2"> </h2>
    
    </div>
  );
};

export default OtherCoinChild;
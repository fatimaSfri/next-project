'use client'; 

import Image from 'next/image';
import React, { useState } from 'react';


const items = [
  'دیفای',
  'حریم خصوصی',
  'متاورس',
  'قابل استخراج',
  'میم کوین ',
  ' استیبل کوین',
  ' توکن',
  ' ICO',
];

export default function ResponsiveBoxes() {
  const [activeItem, setActiveItem] = useState(items[0]); 

  return (
    <div className="lg:container w-11/12 mx-auto p-4">
      <div className="hidden md:flex flex-row lg:gap-4 gap-2">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => setActiveItem(item)}
            className={`flex-1 h-12 rounded-lg text-center flex items-center justify-center text-sm  transition-colors ${
              activeItem === item
                ? 'bg-[#1652F0] text-white font-black'
                : 'bg-[#F7F7F7] text-gray-800 hover:bg-gray-200'
            } max-w-[150px]`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="md:hidden relative">
       <select
          value={activeItem}
          onChange={(e) => setActiveItem(e.target.value)}
          className={`w-full h-12 px-6 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1652F0] appearance-none ${
            activeItem ? 'bg-[#1652F0] text-white' : 'bg-[#F7F7F7] text-gray-800'
          }`}
        >
           
          {items.map((item) => (
            <option key={item} value={item} className="bg-white text-gray-800">
              {item}
            </option>
          ))}
        </select>
        <Image
          src="/images/arrow.svg" 
          alt=" arrow "
          width={40}
          height={40}
          className={`absolute left-4 top-1  pointer-events-none  ${
            activeItem ? 'invert' : ''
          }`}
        />
      </div>
    </div>
  );
}
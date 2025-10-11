'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'چگونه می‌توانم ارز دیجیتال بخرم؟',
    answer:
      'برای خرید ارز دیجیتال، ابتدا باید در صرافی ثبت‌نام کنید، حساب خود را شارژ کنید و سپس ارز مورد نظر را انتخاب و خریداری کنید.',
  },
  {
    question: 'کارمزد تراکنش‌ها چقدر است؟',
    answer: 'کارمزد بسته به نوع ارز و حجم تراکنش متفاوت است. برای جزئیات، به بخش کارمزدها مراجعه کنید.',
  },
  {
    question: 'آیا پلتفرم شما امن است؟',
    answer: 'بله، ما از پروتکل‌های امنیتی پیشرفته برای حفاظت از اطلاعات و دارایی‌های کاربران استفاده می‌کنیم.',
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4  lg:text-base text-sm leading-relaxed border-2 py-24 ">
        <p className='text-right'>سوالات متداول</p>
      {faqData.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg shadow-sm bg-white p-4 lg:w-10/12 w-11/12"
        >
          <button
            className="flex items-center justify-between w-full text-right focus:outline-none"
            onClick={() => toggleFAQ(index)}
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <span className="font-bold">{item.question}</span>
            <img
              src="/images/arrow.svg"
              alt="آیکون باز/بسته"
              className={`h-5 w-5 transition-transform duration-200 ease-in-out ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>
          <div
            id={`faq-answer-${index}`}
            className={`overflow-hidden  ${
              openIndex === index ? 'max-h-[1000px] pt-3' : 'max-h-0'
            }`}
          >
            <p className="text-justify">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
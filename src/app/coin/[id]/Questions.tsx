'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'رمز ارز چیست؟ ',
    answer:
      'برای خرید ارز دیجیتال، ابتدا باید در صرافی ثبت‌نام کنید، حساب خود را شارژ کنید و سپس ارز مورد نظر را انتخاب و خریداری کنید.',
  },
  {
    question: ' آیا میتوانم با کارت بانکی بیت کوین بخرم؟',
    answer: 'کارمزد بسته به نوع ارز و حجم تراکنش متفاوت است. برای جزئیات، به بخش کارمزدها مراجعه کنید.',
  },
  {
    question: 'چرا باید از والت استفاده کنم؟',
    answer: 'بله، ما از پروتکل‌های امنیتی پیشرفته برای حفاظت از اطلاعات و دارایی‌های کاربران استفاده می‌کنیم.',
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 xl:w-8/12 lg:w-10/12 w-11/12 mx-auto lg:px-10 sm:px-4 lg:text-base text-sm leading-relaxed mb-20 ">
        <div className='lg:text-right  py-6 w-full sm:text-3xl text-xl font-black text-center'>سوالات متداول</div>
      {faqData.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-2xl bg-white py-6 px-10 w-full flex flex-col gap-2 lg:text-lg sm:text-sm text-xs"
        >
          <button
            className="flex items-center justify-between w-full text-right focus:outline-none cursor-pointer"
            onClick={() => toggleFAQ(index)}
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <span className="">{item.question}</span>
            <img
              src="/images/arrow-lg.svg"
              alt="آیکون باز/بسته"
              className={`h-5 w-5 transition-transform duration-200 ease-in-out ${
                openIndex === index ? '' : 'rotate-180'
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
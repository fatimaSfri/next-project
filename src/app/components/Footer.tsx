// import Link from "next/link"
// export default function Footer() {
//     const footerItems = [
//         // ستون 1 (فرد: عنوان bold)
//         {
//             title: "درباره ما",
//             items: ["تاریخچه", "تیم", "مأموریت", "تماس با ما"]
//         },
//         // ستون 2 (زوج: عنوان معمولی)
//         {

//             items: ["رمزارزها", "معاملات", "پشتیبانی", "آموزش"]
//         },
//         // ستون 3 (فرد: عنوان bold)
//         {
//             title: "منابع",
//             items: ["وبلاگ", "راهنما", "سوالات متداول", "سیاست‌ها"]
//         },
//         // ستون 4 (زوج: عنوان معمولی؛ در تبلت hidden)
//         {

//             items: ["پشتیبانی", "گزارش مشکل", "بازخورد", "همکاری"]
//         }
//     ];
//     return (
//         <div className="bg-[#1B2A4E] min-w-full p-8  flex flex-col items-center ">
//             {/* top section */}
//             <div className="w-11/12 flex max-sm:flex-col border-y-amber-400 gap-6 items-center">
//                 {/* right */}
//                 <div className="border border-sky-400 sm:w-4/12">
//                     <img src="./images/logo_light.png" alt="" />
//                     <div className="text-white">راهکارهای پرداخت ری در سال 2009 فعالیت خود را در زمینه سیستم های پرداخت بین المللی با وبسایت wallet.ir آغاز کرد. ری پرداخت با نام تجاری MGY INVESTMENT LTD با شماره ثبت ۷۳۶۵۰۶۳ در کشور انگلستان به ثبت رسید و فعالیت رسمی آغاز نمود.</div>
//                 </div>
//                 {/* left */}


//                 <div className=" sm:w-7/12 max-sm:w-11/12 flex justify-between max-sm:border-t  max-sm:border-white">
//                     {footerItems.map((column, index) => (
//                         <div
//                             key={index}
//                             className={`${index === 3 ? "lg:block hidden" : "block" // ستون آخر فقط در lg+ نمایش داده بشه
//                                 }`}
//                         >
//                             {/* Header placeholder برای تراز: ارتفاع ثابت معادل عنوان + margin */}
//                             <div className="h-12 mb-4 flex items-end">
//                                 {column.title && (
//                                     <h3 className="font-bold text-lg text-white">
//                                         {column.title}
//                                     </h3>
//                                 )}
//                             </div>
//                             <ul className="space-y-2  text-white">
//                                 {column.items.map((item, itemIndex) => (
//                                     <li key={itemIndex}>
//                                         <Link
//                                             href="#"
//                                             className="hover:text-gray-300 transition-colors duration-200"
//                                         >
//                                             {item}
//                                         </Link>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     ))}
//                 </div>

//             </div>

//             {/* bottom section */}
//             <div className="w-11/12 border-t  border-white flex max-sm:flex-col-reverse pt-2 items-center justify-between">
//                 <p className="text-white max-sm:border-t  max-sm:border-white"> تمامی حقوق این سرویس متعلق به مجموعه  
//                      <span className="font-bold px-2">ری پیمنت</span> است</p>
  
//               <div className="flex items-center gap-4 ">
//                 <img src="./images/facebook.svg" alt="" />
//                 <img src="./images/inesta.svg" alt="" />
//                 <img src="./images/tiwiter.svg" alt="" />
//                 <img src="./images/youtube.svg" alt="" />
//                 <img src="./images/linkdin.svg" alt="" />
//               </div>

//             </div>
//         </div>
//     )
// }



import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const footerItems = [
   {
      title: "لینک های مرتبط ",
      items: ["صفحه اصلی","قیمت رمزارزها", "مقالات و وبلاگ","درباره ما" ],
    },
    {
      items: ["سوالات متداول", "شرایط و قوانین", "فرصت های شغلی","انجمن"],
    },
    {
      title: "تبادل ارز",
      items: [ "خرید بیت کوین", " خرید اتریوم", "خرید ریپل","خرید سولانا"],
    },
    {
      items: [ "خرید یواس دی کوین", "خرید چین لینک", " خرید دوج کوین","خرید تتر"],
    },
  ];

  const socialIcons = [
    { src: "/images/facebook.svg", alt: "فیسبوک" },
    { src: "/images/insta.svg", alt: "اینستاگرام" }, // تصحیح: inesta -> insta
    { src: "/images/twitter.svg", alt: "توییتر" }, // تصحیح: tiwiter -> twitter
    { src: "/images/youtube.svg", alt: "یوتیوب" },
    { src: "/images/linkedin.svg", alt: "لینکدین" }, // تصحیح: linkdin -> linkedin
  ];

  return (
    <footer dir="rtl" className="bg-[#1B2A4E] w-full py-8 md:py-10  overflow-x-hidden">
      <div className="lg:w-10/12 sm:w-11/12 w-full  mx-auto ">
        {/* Top section: Logo & Description + Columns */}
        <div className="flex flex-col sm:flex-row lg:gap-6 gap-2  max-sm:px-6 ">
          {/* Logo & Description */}
          <div className="w-full sm:max-w-96 flex flex-col items-start  pb-8">
            <Image
              src="/images/logo_light.svg"
              alt="لوگوی ری پرداخت"
              width={132}
              height={64}
              className="mb-4 object-contain max-lg:w-30 max-sm:w-24 "
              priority={false}
            />
            <p className="text-white lg:text-base text-xs leading-relaxed">
              راهکارهای پرداخت ری در سال 2009 فعالیت خود را در زمینه سیستم های پرداخت
              بین المللی با وبسایت wallet.ir آغاز کرد. ری پرداخت با نام تجاری MGY
              INVESTMENT LTD با شماره ثبت ۷۳۶۵۰۶۳ در کشور انگلستان به ثبت رسید و
              فعالیت رسمی آغاز نمود.
            </p>
          </div>

          {/* Columns */}
          <div className="w-full flex justify-between  max-sm:border-t max-sm:border-gray-600 
           max-sm:py-6 ">
            {footerItems.map((column, index) => (
              <div
                key={index}
                className={`${
                  index === 3 ? "hidden lg:block" : "block"
                } flex-1  min-w-0 `} 
              >
                <div className="h-12 flex ">
                  {column.title && (
                    <h3 className="font-black lg:text-xl ma:text-lg text-md text-white">{column.title}</h3>
                  )}
                </div>
                <ul className="space-y-4 lg:text-base text-xs text-white">
                  {column.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Link
                        href="#"
                        className="block hover:text-gray-300 transition-colors duration-200"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section: Copyright + Social Icons */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between md:items-center gap-4 pt-6 border-t border-gray-600 max-sm:w-11/12 mx-auto">
          <p className="text-white lg:text-base text-xs leading-relaxed text-center md:text-right max-sm:border-t max-sm:border-gray-600 max-sm:w-full max-sm:pt-6 max-sm:mx-auto">
            تمامی حقوق این سرویس متعلق به مجموعه{" "}
            <span className="font-black px-2">ری پیمنت</span> است
          </p>

          <div className="flex items-center justify-center md:justify-end gap-4">
            {socialIcons.map((icon, index) => (
              <Link key={index} href="#" aria-label={icon.alt}>
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  width={50}
                  height={50}
                  className="hover:opacity-80 transition-opacity duration-200 object-contain max-lg:w-8"
                  priority={false}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
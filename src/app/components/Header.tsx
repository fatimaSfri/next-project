import Image from "next/image";

export default function Header() {

    return (
        <header className="bg-[#F8F9FA] h-[104px] w-full  " dir="rtl">
            <div className="lg:container w-full  mx-auto h-full flex items-center justify-between">

                <div className="lg:w-8/12 max-lg:w-full max-sm:w-1/2  px-2 h-full flex">
                    {/* *** */}
                    <button className="p-4 sm:hidden focus:outline-none cursor-pointer">
                    
                        <Image src="/images/menu.svg" alt="Toggle menu" width={24}
                            height={24} className="min-w-9" />
                    </button>
                    
                    {/* logo image */}
                    <div className="md:w-2/12 justify-center lg:-mr-4 flex items-center">
                        <Image
                            src="/images/logo_dark.png"
                            alt="logo"
                            width={109}
                            height={53}
                            className="min-w-20"
                        />
                    </div>

                    <nav className="lg:w-8/12 max-lg:w-10/12">
                        <ul className=" h-full w-full flex items-center justify-evenly max-sm:hidden max-md:text-xs ">
                            <li className="cursor-pointer">صفحه اصلی</li>
                            <li className="cursor-pointer">قیمت رمزارزها</li>
                            <li className="cursor-pointer">مقالات</li>
                            <li className="cursor-pointer">تماس با ما</li>
                            <li className="max-lg:hidden cursor-pointer">سایر</li>
                        </ul>
                    </nav>

                </div>
                <div className="lg:w-4/12 max-lg:w-6/12 max-sm:w-auto  px-2 h-full flex items-center gap-8  justify-end">
                    <div className="flex items-center max-sm:hidden">
                       
                        <Image src="/images/phone.svg" alt="not found" width={24} height={24} 
                        className="max-md:max-w-5"/>
                        <p className="max-md:text-sm">۰۲۱-۹۱۰۰۸۵۹۰</p>
                    </div>
                    <div>
                    
                        <div className="flex items-center justify-between">
                            {/* profile */}
                            <div className="rounded-full aspect-square lg:min-w-10 max-lg:min-w-6 max-w-14 bg-gray-200 -mt-1 mx-2">
                                <Image src="/images/frame-1.svg" alt="not found" width={30} height={30} className="w-full h-full object-cover" />
                            </div>

                            {/* name */}
                            <p className="md:text-sm max-md:text-[12px] font-bold">  علی اسماعیلی</p>

                            {/* arrow */}
                             <Image src="/images/arrow.svg" alt="not found" width={28} height={28} className="-mt-1 cursor-pointer border-2" />
                             
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

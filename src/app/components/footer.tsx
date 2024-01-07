import Image from "next/image";
export default function Footer() {
return(

    <div className="items-stretch flex flex-col ">
      <header className="items-center bg-slate-100 flex w-full flex-col justify-center px-16 py-8 max-md:max-w-full max-md:px-5">
        <div className="flex w-[887px] max-w-full flex-col items-stretch">
          <h1 className="text-gray-800 text-center text-6xl font-semibold leading-[76px] max-md:max-w-full max-md:text-4xl max-md:leading-[52px]">
            Mit SortAI jetzt zur klaren Ordnung – sicher, schnell und smart!
          </h1>
          <div className="justify-center items-stretch rounded bg-blue-400 self-center flex gap-2 mt-8 px-8 py-3.5 max-md:px-5">
            <a href="#" className="text-white text-center text-base font-medium leading-6 grow whitespace-nowrap">
              Teste Jetzt
            </a>
            <Image
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/66ea9aeb1a4a0a9affb34a0b08a82001f531fb388777b5f44306c941749b66a9?apiKey=66dfc47dff124ae099f0affe8343122c&"
              className="aspect-square object-contain object-center w-4 justify-center items-center overflow-hidden self-center shrink-0 max-w-full my-auto"
              alt=""
              width={4}
              height={4}
            />
          </div>
        </div>
      </header>
      <section className="items-center bg-gray-800 flex w-full flex-col justify-center px-16 py-12 max-md:max-w-full max-md:px-5">
        <form className="w-full max-w-[1110px] my-3.5 max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[37%] max-md:w-full max-md:ml-0">
              <div className="items-stretch flex grow flex-col max-md:mt-10">
                <div className="items-stretch flex justify-between gap-2.5 pr-20 max-md:pr-5">
                  
                  <Image
                    src="/logo.svg"
                    className="aspect-[5.31] object-contain object-center w-full fill-white overflow-hidden self-center shrink-0 max-w-full my-auto"
                    alt="Sort AI Logo"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="text-slate-100 text-sm leading-5 whitespace-nowrap mt-10">
                  Copyright © 2024 SortAI
                </div>
                <div className="text-slate-100 text-sm leading-5 whitespace-nowrap mt-2">All rights reserved</div>
                
              </div>
            </div>
            <div className="flex flex-col items-stretch w-[63%] ml-5 max-md:w-full max-md:ml-0">
              <div className="max-md:max-w-full max-md:mt-10">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                  <div className="flex flex-col items-stretch w-[28%] max-md:w-full max-md:ml-0">
                    <div className="items-stretch flex grow flex-col max-md:mt-8">
                      <div className="text-white text-xl font-semibold leading-7 whitespace-nowrap">SortAI</div>
                      <div className="text-slate-100 text-sm leading-5 whitespace-nowrap mt-6">Über us</div>
                      <div className="text-slate-100 text-sm leading-5 whitespace-nowrap mt-3">Contact us</div>
                      <div className="text-slate-100 text-sm leading-5 whitespace-nowrap mt-3">Pricing</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch w-[28%] ml-5 max-md:w-full max-md:ml-0">
                    <div className="items-stretch flex flex-col max-md:mt-8">
                      <div className="text-white text-xl font-semibold leading-7 whitespace-nowrap">Support</div>
                      <div className="text-slate-100 text-sm leading-5 whitespace-nowrap mt-6">Terms of service</div>
                      <div className="text-slate-100 text-sm leading-5 whitespace-nowrap mt-3">Privacy policy</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch w-[44%] ml-5 max-md:w-full max-md:ml-0">
                    <div className="items-stretch flex flex-col max-md:mt-8">
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}




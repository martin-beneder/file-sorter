import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="items-stretch flex flex-col">
      <section className="items-center bg-gray-800 flex w-full flex-col justify-center px-16 py-12 max-md:max-w-full max-md:px-5">
        <div className="w-full max-w-[1110px] my-3.5 max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[37%] max-md:w-full max-md:ml-0">
              <div className="items-stretch flex grow flex-col max-md:mt-10">
                <div className="items-stretch flex justify-between gap-2.5 pr-20 max-md:pr-5">
                  <Link href="/">
                    <Image
                      src="/logo.svg"
                      className="aspect-[5.31] object-contain object-center w-full fill-white overflow-hidden self-center shrink-0 max-w-full my-auto"
                      alt="Sort AI Logo"
                      width={200}
                      height={200}
                    />
                  </Link>
                </div>
                <div className="text-slate-100 text-sm leading-5 whitespace-nowrap mt-10">
                  Copyright © {new Date().getFullYear()} SortAI
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
                      <Link href="/" className="text-slate-100 text-sm leading-5 hover:text-blue-300 transition-colors whitespace-nowrap mt-6">
                        Home
                      </Link>
                      <Link href="/app" className="text-slate-100 text-sm leading-5 hover:text-blue-300 transition-colors whitespace-nowrap mt-3">
                        Sortiere Dateien
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch w-[28%] ml-5 max-md:w-full max-md:ml-0">
                    <div className="items-stretch flex flex-col max-md:mt-8">
                      <div className="text-white text-xl font-semibold leading-7 whitespace-nowrap">Konto</div>
                      <Link href="/login/sign-in" className="text-slate-100 text-sm leading-5 hover:text-blue-300 transition-colors whitespace-nowrap mt-6">
                        Login
                      </Link>
                      <Link href="/signup/sign-up" className="text-slate-100 text-sm leading-5 hover:text-blue-300 transition-colors whitespace-nowrap mt-3">
                        Registrieren
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


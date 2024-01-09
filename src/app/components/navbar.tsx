
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="bg-slate-100 flex flex-col justify-center items-center px-4  lg:px-16 py-3 max-md:px-5">
      <div className="flex w-full max-w-[1197px] items-stretch justify-between gap-5 max-md:max-w-full ">
      <Image
          loading="lazy"
          alt="Logo"
          src="/logo.svg"
          className="aspect-[2.78] object-contain object-center w-44 overflow-hidden shrink-0 max-w-full" width={167} height={60}
        />
        <div className="justify-between items-stretch self-center hidden sm:flex gap-2 md:gap-5 my-auto max-md:max-w-full max-md:flex-wrap">
        
          <div className="text-zinc-900 text-base font-medium leading-6 grow whitespace-nowrap">
            Home
          </div>
          <Link href="#feature" className="text-zinc-900 text-base leading-6">Feature</Link>
          <Link href="#product" className="text-zinc-900 text-base leading-6">Produkt</Link>
          
        </div>
        <div className="items-stretch self-center flex  lg:flex gap-3.5 my-auto ">
          <Link href="/login" className="text-blue-400 text-center text-sm font-medium leading-5 whitespace-nowrap items-stretch bg-slate-100 grow justify-center px-5 py-2.5 rounded-md">
            Login
          </Link>
          <Link href="/signup" className="text-white text-center text-sm font-medium leading-5 whitespace-nowrap items-stretch bg-blue-400 grow justify-center px-5 py-2.5 rounded-md">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}



import { MultiFileDropzoneUsage } from "../components/upload";
import Image from "next/image";
export default function Page() {
    return (
        <div className="flex flex-col">
            <Image src="/logo.svg" alt="Logo" width={167} height={60} className=" block ml-auto mr-auto " />
            <h1 className="text-center text-4xl font-semibold leading-10 self-center max-w-[542px] mt-10 max-md:max-w-full">Sotiere schnell und einfach!</h1>
            <MultiFileDropzoneUsage  />
            <h3 className="text-center text-2xl font-semibold leading-10 self-center max-w-4xl  max-md:max-w-full" >Lade jetzt deine Datein hoch um sie zu storeiren zu lassen!</h3>
        </div>
    );
}
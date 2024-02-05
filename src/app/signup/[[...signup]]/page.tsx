

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import * as context from "next/headers";
import { redirect } from "next/navigation";
import Form from "../../components/form";
import Link from "next/link";
import Image from "next/image";
import { SignUp as SignUpClerk } from "@clerk/nextjs";

export default async function SignUp() {


  return (
    <>

      <div className="bg-white">
        <div className="flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch  max-md:w-full max-md:ml-0">
            <div className=" bg-white flex grow flex-col w-full py-12 max-md:max-w-full">
              <header className="self-stretch flex flex-col mt-40 md:mt-0 px-9 max-md:max-w-full max-md:mt-10 max-md:px-5">
                <Image
                  src="/logo.svg"
                  className="aspect-[3.63] object-contain object-center w-[218px] overflow-hidden self-center max-w-full"
                  alt="Logo"
                  //layout="fixed"
                  width={218}
                  height={60}
                />
                <h1 className="text-black text-xl font-bold self-center whitespace-nowrap mt-7">
                  Regrestriere dich jetzt bei SortAI
                </h1>
                <SignUpClerk />
                
              </header>

              
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[72%] ml-5 max-md:w-full max-md:ml-0">
            <div className="bg-gray-100 flex grow flex-col justify-center items-center w-full px-16 py-12 max-md:max-w-full max-md:px-5">
              <Image
                src="/login.svg"
                className="aspect-square object-contain object-center w-1/2  overflow-hidden max-w-full mt-32 mb-24 max-md:my-10"
                alt="Illustration"
                //layout="responsive"
                width={632}
                height={632}
              />
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
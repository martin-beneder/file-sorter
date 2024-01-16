

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";
import Form from "../components/form";
import Link from "next/link";
import Image from "next/image";

export default async function SignUp() {

  const authRequest = auth.handleRequest("GET", context);
	const session = await authRequest.validate();
	if (session) {
		if (!session.user.emailVerified) redirect("/email-verification");
		redirect("/");
	}

  return (
	<>

	  <div className="bg-white">
      <div className="flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div className="flex flex-col items-stretch w-[28%] max-md:w-full max-md:ml-0">
          <div className=" bg-white flex grow flex-col w-full py-12 max-md:max-w-full">
            <header className="self-stretch flex flex-col mt-40 px-9 max-md:max-w-full max-md:mt-10 max-md:px-5">
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
              <Form action="/api/signup">
              <label htmlFor="email" className="text-neutral-600 text-base self-stretch mt-14 max-md:mt-10">
                Email Addresse
              </label>
              <div className="self-stretch flex items-center justify-between mt-4  rounded-lg">
                <input type="email" name="email" className="w-full bg-gray-100 h-12 self-stretch text-neutral-600 text-base my-auto  pl-5 rounded-lg" placeholder="alex@email.com" />
                <Image
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8532e9f9ea13d957d488e53e53e28fcb3b1e1fc58eb4b1be1af575491f03db36?apiKey=66dfc47dff124ae099f0affe8343122c&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/8532e9f9ea13d957d488e53e53e28fcb3b1e1fc58eb4b1be1af575491f03db36?apiKey=66dfc47dff124ae099f0affe8343122c&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8532e9f9ea13d957d488e53e53e28fcb3b1e1fc58eb4b1be1af575491f03db36?apiKey=66dfc47dff124ae099f0affe8343122c&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/8532e9f9ea13d957d488e53e53e28fcb3b1e1fc58eb4b1be1af575491f03db36?apiKey=66dfc47dff124ae099f0affe8343122c&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/8532e9f9ea13d957d488e53e53e28fcb3b1e1fc58eb4b1be1af575491f03db36?apiKey=66dfc47dff124ae099f0affe8343122c&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8532e9f9ea13d957d488e53e53e28fcb3b1e1fc58eb4b1be1af575491f03db36?apiKey=66dfc47dff124ae099f0affe8343122c&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/8532e9f9ea13d957d488e53e53e28fcb3b1e1fc58eb4b1be1af575491f03db36?apiKey=66dfc47dff124ae099f0affe8343122c&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/8532e9f9ea13d957d488e53e53e28fcb3b1e1fc58eb4b1be1af575491f03db36?apiKey=66dfc47dff124ae099f0affe8343122c&" 
                  className="aspect-square object-contain object-center w-[50px] overflow-hidden self-stretch shrink-0 max-w-full rounded-lg"
                  alt="Avatar"
                  //layout="fixed"
                  width={50}
                  height={50}
                />
              </div>
              <label htmlFor="password" className="text-neutral-600 text-base self-stretch mt-7">
                Passwort
              </label>
              <div className="self-stretch flex items-center justify-between mt-4  rounded-lg">
              <input type="password" name="password" className="w-full bg-gray-100 h-12 self-stretch text-neutral-600 text-base my-auto  pl-5 rounded-lg" placeholder="Passwort"/>
              <Image
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/34ed5ca20c1402e3f3b919c5ab7c93c7affc64a50647fc47b7e4e7585cd9481b?apiKey=66dfc47dff124ae099f0affe8343122c&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/34ed5ca20c1402e3f3b919c5ab7c93c7affc64a50647fc47b7e4e7585cd9481b?apiKey=66dfc47dff124ae099f0affe8343122c&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/34ed5ca20c1402e3f3b919c5ab7c93c7affc64a50647fc47b7e4e7585cd9481b?apiKey=66dfc47dff124ae099f0affe8343122c&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/34ed5ca20c1402e3f3b919c5ab7c93c7affc64a50647fc47b7e4e7585cd9481b?apiKey=66dfc47dff124ae099f0affe8343122c&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/34ed5ca20c1402e3f3b919c5ab7c93c7affc64a50647fc47b7e4e7585cd9481b?apiKey=66dfc47dff124ae099f0affe8343122c&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/34ed5ca20c1402e3f3b919c5ab7c93c7affc64a50647fc47b7e4e7585cd9481b?apiKey=66dfc47dff124ae099f0affe8343122c&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/34ed5ca20c1402e3f3b919c5ab7c93c7affc64a50647fc47b7e4e7585cd9481b?apiKey=66dfc47dff124ae099f0affe8343122c&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/34ed5ca20c1402e3f3b919c5ab7c93c7affc64a50647fc47b7e4e7585cd9481b?apiKey=66dfc47dff124ae099f0affe8343122c&" 
                  className="aspect-square object-contain object-center w-[50px] overflow-hidden self-stretch shrink-0 max-w-full rounded-lg"
                  alt="Avatar"
                  //layout="fixed"
                  width={50}
                  height={50}
                />
                </div>
				<label htmlFor="passwordconfirm" className="text-neutral-600 text-base self-stretch mt-7">
                Passwort Bestätitigen
              </label>
              <div className="self-stretch flex items-center justify-between mt-4  rounded-lg">
              <input type="password" name="passwordconfirm" className="w-full bg-gray-100 h-12 self-stretch text-neutral-600 text-base my-auto  pl-5 rounded-lg" placeholder="Passwort Bestätigen"/>
              <Image
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/34ed5ca20c1402e3f3b919c5ab7c93c7affc64a50647fc47b7e4e7585cd9481b?apiKey=66dfc47dff124ae099f0affe8343122c&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/34ed5ca20c1402e3f3b919c5ab7c93c7affc64a50647fc47b7e4e7585cd9481b?apiKey=66dfc47dff124ae099f0affe8343122c&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/34ed5ca20c1402e3f3b919c5ab7c93c7affc64a50647fc47b7e4e7585cd9481b?apiKey=66dfc47dff124ae099f0affe8343122c&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/34ed5ca20c1402e3f3b919c5ab7c93c7affc64a50647fc47b7e4e7585cd9481b?apiKey=66dfc47dff124ae099f0affe8343122c&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/34ed5ca20c1402e3f3b919c5ab7c93c7affc64a50647fc47b7e4e7585cd9481b?apiKey=66dfc47dff124ae099f0affe8343122c&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/34ed5ca20c1402e3f3b919c5ab7c93c7affc64a50647fc47b7e4e7585cd9481b?apiKey=66dfc47dff124ae099f0affe8343122c&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/34ed5ca20c1402e3f3b919c5ab7c93c7affc64a50647fc47b7e4e7585cd9481b?apiKey=66dfc47dff124ae099f0affe8343122c&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/34ed5ca20c1402e3f3b919c5ab7c93c7affc64a50647fc47b7e4e7585cd9481b?apiKey=66dfc47dff124ae099f0affe8343122c&" 
                  className="aspect-square object-contain object-center w-[50px] overflow-hidden self-stretch shrink-0 max-w-full rounded-lg"
                  alt="Avatar"
                  //layout="fixed"
                  width={50}
                  height={50}
                />
                </div>
			
              <Link href="#" passHref>
                <div className="text-indigo-900 text-sm underline whitespace-nowrap mt-4 self-end">
                  Forgot Password?
                </div>
              </Link>
              <button
              type="submit"
              className="text-white text-base font-semibold whitespace-nowrap shadow-md bg-blue-400 self-center w-[410px] max-w-full justify-center items-center mt-9 px-16 py-4 rounded-lg max-md:px-5"
            >
              Regrestriere dich jetzt!
            </button>
            </Form>
            </header>
            
            <div className="self-center flex w-auto max-w-full items-stretch justify-between  mt-9 px-2 sm:px-5">
              <div className="bg-stone-300 self-center w-[175px] shrink-0 h-px my-auto" />
              <div className="text-stone-300 text-sm">OR</div>
              <div className="bg-stone-300 self-center w-[175px] shrink-0 h-px my-auto" />
            </div>
            <Link href="/login" className="text-blue-400 overflow-hidden   m-3 sm:m-0 text-center text-base font-semibold whitespace-nowrap border border-blue-400 shadow-md self-center  max-w-full justify-center items-center mt-7 mb-28 px-0 xl:px-16 sm:px-5 py-4 rounded-lg border-solid max-md:mb-10 max-md:px-5"  passHref>
                Du hast schon einen Account?<br/> Log dich ein!
            </Link>
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
import { auth } from "../auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";
import Form from "../components/form";
import Image from "next/image";
import Link from "next/link";
const Page = async () => {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();
  if (!session) redirect("/login");
  if (session.user.emailVerified) redirect("/");
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
              <h1 className="text-black text-xl font-bold text-center items-center self-center whitespace-nowrap mt-7">
                Bitte bestätige deine Email-Adresse!<br/>
                <span className="text-lg font-normal ">Eine Bestätigungs Email wurde an<br/>  <span className="font-sans">{session.user.email}</span> gesendet</span>
              </h1>
              <p className="text-center text-lg font-normal pt-5 items-center self-center whitespace-nowrap" >kein Email bekommen?</p>
              <Form action="/api/email-verification">

              <button
              type="submit"
              className="text-white text-base font-semibold whitespace-nowrap shadow-md bg-blue-400 self-center w-[410px] max-w-full justify-center items-center mt-5 px-16 py-4 rounded-lg max-md:px-5"
            >
              eine neue Email senden?
            </button>
            </Form>
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
};

export default Page;
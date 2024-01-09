import { auth } from "../auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";
import LogOutComponent from "@/app/components/logoutbutton";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Home() {
  const authRequest = auth.handleRequest("GET", context);
  const session = (await authRequest.validate()) ?? null;
  if (!session) redirect("/login");

    console.log(session?.user?.userId);
    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.userId,
      },
    });

    console.log(user?.email);
  return (
    <main className="min-h-screen py-2 max-w-5xl mx-auto">
      {session && (
        <div>
          <h1>Home</h1>
          <code>{JSON.stringify(session)}</code>
          <LogOutComponent />
        </div>
      )}
    </main>
  );
}
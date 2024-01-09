import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { prisma as prismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const auth = lucia({
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },
  adapter: prismaAdapter(prismaClient, {
    user: "user", // model User {}
    key: "key", // model Key {}
    session: "session" // model Session {}
})
});

export type Auth = typeof auth;
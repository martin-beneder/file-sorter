import { auth } from "@/app/auth/lucia";
import * as context from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();

    const { email, password, name, role } = data;

    const user = await auth.createUser({
      key: {
        providerId: "email",
        providerUserId: email,
        password,
      },
      attributes: {
        email,
        name,
        role,
      },
    });

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });

    const authRequest = await auth.handleRequest(req.method, context);
    authRequest.setSession(session);

    return new Response(
      JSON.stringify({
        message: "User created",
      }),
      {
        status: 201,
      }
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        error: "An unknown error occurred",
      },
      {
        status: 500,
      }
    );
  }
};
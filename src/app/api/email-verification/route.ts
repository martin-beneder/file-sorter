import { auth } from "@/app/auth/lucia";
import { generateEmailVerificationToken } from "@/app/auth/token";
import { sendEmailVerificationLink } from "@/app/auth/email";

import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    const authRequest = auth.handleRequest(request);
    const session = await authRequest.validate();
    if (!session) {
        return new Response(null, {
            status: 401
        });
    }
    console.log(session?.user?.emailVerified);
    if (session.user.emailVerified) {
        return new Response(
            JSON.stringify({
                error: "Email already verified"
            }),
            {
                status: 422
            }
        );
    }
    try {
        const token = await generateEmailVerificationToken(session.user.userId);
        await sendEmailVerificationLink(token, session.user.email);
        return new Response();
    } catch {
        return new Response(
            JSON.stringify({
                error: "An unknown error occurred"
            }),
            {
                status: 500
            }
        );
    }
};
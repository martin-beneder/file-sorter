import { auth } from "@/app/auth/lucia";
import * as context from "next/headers";
import { NextResponse } from "next/server";
import { generateEmailVerificationToken } from "@/app/auth/token";
import { sendEmailVerificationLink } from "@/app/auth/email";

import type { NextRequest } from "next/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


const isValidEmail = (maybeEmail: unknown): maybeEmail is string => {
	if (typeof maybeEmail !== "string") return false;
	if (maybeEmail.length > 255) return false;
	const emailRegexp = /^.+@.+$/; // [one or more character]@[one or more character]
	return emailRegexp.test(maybeEmail);
};

export const POST = async (request: NextRequest) => {
	const formData = await request.formData();
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	// basic check
	if (!isValidEmail(email)) {
		return NextResponse.json(
			{
				error: "Invalid email"
			},
			{
				status: 400
			}
		);
	}
	if (
		typeof password !== "string" ||
		password.length < 6 ||
		password.length > 255
	) {
		return NextResponse.json(
			{
				error: "Invalid password"
			},
			{
				status: 400
			}
		);
	}
	try {
		const user = await auth.createUser({
			key: {
				providerId: "email", // auth method
				providerUserId: email.toLowerCase() as string, // unique id when using "email" auth method
				password // hashed by Lucia
			},
			attributes: {
				email: email.toLowerCase() as string,
				email_verified: false as boolean, // `Number(true)` if stored as an integer
			}
		});
		console.log(user);
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		console.log(session);
		const authRequest = auth.handleRequest(request.method, context);
		authRequest.setSession(session);

		const token = await generateEmailVerificationToken(user.userId);
		await sendEmailVerificationLink(token);
		console.log(token);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/email-verification"
			}
		});
	} catch (e) {
		// this part depends on the database you're using
		// check for unique constraint error in user table
		console.log(e);
		if (
			e instanceof PrismaClientKnownRequestError && e.code === 'P2002'
		) {
			return NextResponse.json(
				{
					error: "Account already exists"
				},
				{
					status: 400
				}
			);
		}
		return NextResponse.json(
			{
				error: "An unknown error occurred"
			},
			{
				status: 500
			}
		);
	}
};
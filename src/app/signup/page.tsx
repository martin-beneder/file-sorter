

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";
import Form from "../components/form";
import Link from "next/link";

export default async function SignUp() {

  const authRequest = auth.handleRequest("GET", context);
	const session = await authRequest.validate();
	if (session) {
		if (!session.user.emailVerified) redirect("/email-verification");
		redirect("/");
	}

  return (
    <div className="h-screen">
      <h1>Sign up</h1>
			<Form action="/api/signup">
				<label htmlFor="email">Email</label>
				<input name="email" id="email" />
				<br />
				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />
				<br />
				<input type="submit" />
			</Form>
			<Link href="/login">Sign in</Link>
      </div>
  );
}


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
	<>
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

<div className="min-h-screen flex items-center justify-center bg-blue-100">
<div className="max-w-md w-full space-y-8">
  <div>
	<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
	  Registrieren bei SortAI
	</h2>
  </div>
  <form className="mt-8 space-y-6" >
	<div className="rounded-md shadow-sm -space-y-px">
	  <div>
		<label htmlFor="email-address" className="sr-only">
		  E-Mail Adresse
		</label>
		<input
		  id="email-address"
		  name="email"
		  type="email"
		  autoComplete="email"
		  required
		  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
		  placeholder="E-Mail Adresse"
		
		/>
	  </div>
	  <div>
		<label htmlFor="password" className="sr-only">
		  Passwort
		</label>
		<input
		  id="password"
		  name="password"
		  type="password"
		  autoComplete="new-password"
		  required
		  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
		  placeholder="Passwort"
		  
		/>
	  </div>
	  <div>
		<label htmlFor="confirm-password" className="sr-only">
		  Passwort bestätigen
		</label>
		<input
		  id="confirm-password"
		  name="confirm-password"
		  type="password"
		  autoComplete="new-password"
		  required
		  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
		  placeholder="Passwort bestätigen"
		 
/>
</div>
</div>

php
Copy code
<div>
  <button
	type="submit"
	className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  >
	Registrieren
  </button>
</div>
</form>

<div className="text-sm text-center">
<Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
  Schon registriert? Jetzt anmelden
</Link>
</div>
</div>
</div>
</>
  );
}
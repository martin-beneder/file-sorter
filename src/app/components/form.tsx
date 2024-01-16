"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Form = (props: {
	children: React.ReactNode;
	action: string;
	successMessage?: string;
	className?: string;
}) => {
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState<null | string>(null);
	const [successMessage, setSuccessMessage] = useState<null | string>(null);
	return (
		<>
			<form
				action={props.action}
				className={props.className}
				method="post"
				onSubmit={async (e) => {
					e.preventDefault();
					setErrorMessage(null);
					setSuccessMessage(null);
					const formData = new FormData(e.currentTarget);
					if(props.action !== "/api/email-verification"){
						const body = Object.fromEntries(formData.entries());
						if(!body.email) return setErrorMessage("Bitte geben Sie eine Email-Adresse ein");
						if(body?.passwortconfirm){

							if(!body.password && !body.passwordconfirmation) return setErrorMessage("Bitte geben Sie ein Passwort ein");
							if(body.password !== body.passwordconfirmation) return setErrorMessage("Passwörter stimmen nicht überein");
						}
						}
					const response = await fetch(props.action, {
						method: "POST",
						body: formData,
						redirect: "manual"
					});
					if (response.status === 0) {
						// redirected
						// when using `redirect: "manual"`, response status 0 is returned
						return router.refresh();
					}
					if (!response.ok) {
						const result = (await response.json()) as {
							error?: string;
						};
						setErrorMessage(result.error ?? null);
						return;
					}
					setSuccessMessage(props.successMessage ?? null);
				}}
			>
				{props.children}
			</form>
			{errorMessage && <p className="error">{errorMessage}</p>}
			{successMessage && <p>{successMessage}</p>}
		</>
	);
};

export default Form;
"use client";
import { useRouter } from "next/navigation";

const Form = (props: { children: React.ReactNode; action: string }) => {
	const router = useRouter();
	return (
		<>
			<form
				action={props.action}
				method="post"
				onSubmit={async (e) => {
					e.preventDefault();
					const formData = new FormData(e.currentTarget);
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
				}}
			>
				{props.children}
			</form>
		</>
	);
};

export default Form;
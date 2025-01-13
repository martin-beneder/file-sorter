"use client";
import { Check } from "lucide-react";
import * as React from "react";
import { env } from "process";
import type Stripe from "stripe";
import { createCheckoutSession } from "../api/stripe/route";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import getStripe from "../lib/stripe";
interface CheckoutFormProps {
    uiMode: Stripe.Checkout.SessionCreateParams.UiMode;
}
function buy() {
    return null;
}


interface PlanCardProps {
    plan: {
        name: string;
        price: number;
        features: string[];
        buttonText: string;
        buttonStyle: string;
    };
}

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
    return (
        <div className="flex flex-col grow self-stretch pb-8 mt-3 w-full bg-gray-100 rounded-[32px] max-md:mt-5">
            <div className="flex flex-col px-6 py-8 max-md:px-5">
                <div className="text-base font-semibold tracking-wide text-neutral-800">
                    {plan.name}
                </div>
                <div className="flex gap-2 mt-4">
                    <div className="text-4xl font-extrabold tracking-wider text-neutral-800">
                        €{plan.price}
                    </div>
                    <div className="flex flex-col justify-center my-auto text-xs text-stone-300">
                        <div>per editor/month</div>
                        <div>billed monthly</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col px-6 pb-14 text-sm font-light leading-4 text-neutral-800 max-md:px-5">
                {plan.features.map((feature, index) => (
                    <div key={index} className="flex gap-2 mt-3">
                        <Check className="w-4 h-4  aspect-square bg-gray-300 rounded-full " />
                        <div className="flex-1">{feature}</div>
                    </div>
                ))}
            </div>
            <div className={`justify-center items-center px-16 py-3.5 mx-6 text-base font-medium leading-6 text-center ${plan.buttonStyle} rounded-lg max-md:px-5 max-md:mx-2.5`}>
                {plan.buttonText}
            </div>
        </div>
    );
};

interface SpecialPlanCardProps {
    plan: {
        name: string;
        price: number;
        features: string[];
        buttonText: string;
    };
}

const SpecialPlanCard: React.FC<SpecialPlanCardProps> = ({ plan }) => {
    return (
        <div className="flex flex-col px-2 pb-2 w-full backdrop-blur-[2px] bg-blue-400 bg-opacity-70 rounded-[32px] max-md:mt-2">
            <div className="flex flex-col pb-8 shadow-sm rounded-[30px]">
                <div className="flex flex-col px-6 pb-8 max-md:pl-5">
                    <div className="flex gap-5 justify-between text-base font-semibold tracking-wide text-white">
                        <div className="mt-5" >{plan.name}</div>
                        <div className="text-xs font-semibold bg-white text-black rounded-b-2xl p-2">Most popular</div>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <div className="text-4xl font-extrabold tracking-wider text-white">
                            €{plan.price}
                        </div>
                        <div className="flex flex-col justify-center my-auto text-xs text-gray-400">
                            <div>per editor/month</div>
                            <div>billed monthly</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col px-6 pb-14 text-sm font-medium leading-4 text-white max-md:px-5">
                    {plan.features.map((feature, index) => (
                        <div key={index} className="flex gap-2 mt-3">
                            <Check className="w-4 h-4  aspect-square bg-blue-500 rounded-full " />
                            <div className="flex-1">{feature}</div>
                        </div>
                    ))}
                </div>
                <div className="justify-center items-center px-16 py-3.5 mx-6 text-base font-medium leading-6 text-center text-white bg-indigo-400 rounded-lg max-md:px-5 max-md:mx-2.5">
                    {plan.buttonText}
                </div>
            </div>
        </div>
    );
};

const plans = [
    {
        name: "Gratis Plan",
        price: 0,
        features: [
            "30h Fast generations",
            "Unlimited Relaxed generations",
            "General commercial terms",
            "Access to member gallery",
            "Optional credit top ups",
            "3 concurrent fast jobs",
            "12 concurrent fast jobs",
            "Access to member gallery",
            "Optional credit top ups",
        ],
        buttonText: "Current Plan",
        buttonStyle: "text-violet-300 bg-indigo-50",
    },
    {
        name: "Starter Plan",
        price: 15,
        features: [
            "15h Fast generations",
            "Unlimited Relaxed generations",
            "General commercial terms",
            "Access to member gallery",
            "Optional credit top ups",
            "3 concurrent fast jobs",
            "Access to member gallery",
            "Optional credit top ups",
        ],
        buttonText: "Choose Plan",
        buttonStyle: "text-white bg-indigo-400",
    },
    {
        name: "Premium Plan",
        price: 40,
        features: [
            "30h Fast generations",
            "Unlimited Relaxed generations",
            "General commercial terms",
            "Access to member gallery",
            "Optional credit top ups",
            "3 concurrent fast jobs",
        ],
        buttonText: "Choose Plan",
        buttonStyle: "text-indigo-500 bg-indigo-50",
    },
    {
        name: "Unlimited Plan",
        price: 120,
        features: [
            "60h Fast generations",
            "Unlimited Relaxed generations",
            "General commercial terms",
            "Access to member gallery",
            "Optional credit top ups",
            "3 concurrent fast jobs",
            "12 concurrent fast jobs",
        ],
        buttonText: "Choose Plan",
        buttonStyle: "text-indigo-500 bg-indigo-50",
    },
];



function pricing() {

    const [clientSecret, setClientSecret] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);

    async function handleSubscription(data: FormData) {
        setLoading(true);
        const uiMode = data.get(
            "uiMode",
        ) as Stripe.Checkout.SessionCreateParams.UiMode;
        const { client_secret, url } = await createCheckoutSession(data);

        if (uiMode === "embedded") return setClientSecret(client_secret);

        window.location.assign(url as string);
        setLoading(false);
    }



    const options = {
        // passing the client secret obtained from the server
        clientSecret: env.STRIPE_CLIENT,
    };
    return (
        <main className="justify-center px-3 pb-3 mt-28 w-auto bg-white max-w-full rounded-[32px] max-md:mt-10 max-md:max-w-full">


            <div className="grow max-md:mt-4 max-md:max-w-full">
                <div className="flex gap-3 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full  ">
                        <PlanCard plan={plans[0]} />
                    </div>
                    <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                        <SpecialPlanCard plan={plans[1]} />
                    </div>
                    <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                        <PlanCard plan={plans[2]} />
                    </div>
                </div>
            </div>
            <form action={handleSubscription}>
                <input type="hidden" name="uiMode" value={"hosted"} />
                <input type="hidden" name="price" value={"price_1P5u0SFbXc7uYDxnsKiloE1L"} />
                <input type="hidden" name="email" value={"beneder.martin@gmail.com"} />
                <button
                    className="checkout-style-background"
                    type="submit"
                    disabled={loading}
                >
                    Sub
                </button>
            </form>
            {clientSecret ? (
                <EmbeddedCheckoutProvider
                    stripe={getStripe()}
                    options={{ clientSecret }}
                >
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            ) : null}

        </main>
    );
}

export default pricing;
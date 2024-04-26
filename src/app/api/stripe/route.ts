"use server";

import type { Stripe } from "stripe";

import { headers } from "next/headers";


import { stripe } from "@/app/lib/stripeserver";

export async function createCheckoutSession(
    data: FormData,
): Promise<{ client_secret: string | null; url: string | null }> {
    const ui_mode = data.get(
        "uiMode",
    ) as Stripe.Checkout.SessionCreateParams.UiMode;

    const origin: string = headers().get("origin") as string;

    const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create({
            mode: "subscription",
            customer_email: data.get("email") as string,
            line_items: [
                { price: data.get("price") as string, quantity: 1 }
            ],
            ...(ui_mode === "hosted" && {
                success_url: `${origin}/price/result?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${origin}/price`,
            }),
            ...(ui_mode === "embedded" && {
                return_url: `${origin}/donate-with-embedded-checkout/result?session_id={CHECKOUT_SESSION_ID}`,
            }),
            ui_mode,
        });

    return {
        client_secret: checkoutSession.client_secret,
        url: checkoutSession.url,
    };
}


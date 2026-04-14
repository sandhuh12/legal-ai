import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: "Legal AI Pro" },
          unit_amount: 1000,
          recurring: { interval: "month" }
        },
        quantity: 1
      }
    ],
    success_url: "https://your-site.vercel.app",
    cancel_url: "https://your-site.vercel.app"
  });

  res.json({ url: session.url });
}

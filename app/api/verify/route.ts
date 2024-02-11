import { getServerSession } from "next-auth/next";
import db from "db";
import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { nextAuthConfig } from "utils/auth-config";
import { redirect } from "next/navigation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: null,
});

export async function GET() {
  const session = await getServerSession(nextAuthConfig);

  if (!session?.user) {
    return redirect("/login");
  }
  const user = session.user;

  if (!user.Company && !user.admin) {
    const customer = await stripe.customers.create(
      {
        email: user.email,
        name: user.name,
      },
      {
        idempotencyKey: user.id,
      }
    );
    await db.user.update({
      where: { email: user.email },
      data: {
        Company: {
          create: {
            stripeCustomerId: customer.id,
          },
        },
      },
    });
  }

  if (user?.admin) {
    return redirect("/admin");
  }

  return redirect("/dashboard");
}

import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

import { SubscriptionProvider } from "use-stripe-subscription";

import { ClerkProvider } from "@clerk/nextjs";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <SubscriptionProvider
      stripePublishableKey={
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
      }
    >
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
    </SubscriptionProvider>
  );
};

export default api.withTRPC(MyApp);

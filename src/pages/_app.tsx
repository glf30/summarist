import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

import { SubscriptionProvider } from "use-stripe-subscription";

import { ClerkProvider } from "@clerk/nextjs";
import DefaultLayout from "~/components/LayoutComponents/Layout";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import { LoadingSpinner } from "~/components/LayoutComponents/Loading";

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const Layout = DefaultLayout;
  const isPlayer = router.pathname.slice(0, 7) === "/player";
  let timeout: NodeJS.Timeout;
  
  useEffect(() => {
    const handleRouteChangeStart = () => {
      timeout = setTimeout(() => {
        setIsLoading(true);
      }, 300);
    };

    const handleRouteChangeComplete = () => {
      clearTimeout(timeout);
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <SubscriptionProvider
      stripePublishableKey={
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
      }
    >
      <ClerkProvider {...pageProps}>
        {router.pathname === "/" || router.pathname === "/choose-plan" ? (
          <>
            <Component {...pageProps} />
          </>
        ) : (
          <Layout isPlayer={isPlayer}>
            {isLoading ? <div className="flex justify-center">
              <LoadingSpinner size={180} /> 
              </div>: <Component {...pageProps} />}
          </Layout>
        )}
      </ClerkProvider>
    </SubscriptionProvider>
  );
};

export default api.withTRPC(MyApp);

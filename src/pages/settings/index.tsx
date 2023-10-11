import Image from "next/image";
import React from "react";
import Link from "next/link";
import Layout from "~/components/LayoutComponents/Layout";
import loginImage from "public/assets/login.png";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useSubscription } from "use-stripe-subscription";
import { useRouter } from "next/router";

const Settings = () => {
  const { user } = useUser();
  return (
    <Layout>{!!user ? <SettingsLoggedIn /> : <SettingsLoggedOut />}</Layout>
  );
};

export default Settings;

const SettingsLoggedOut = () => {
  const { asPath } = useRouter();

  return (
    <>
      <div className="mb-8 border-b border-[#e1e7ea] pb-4 text-2xl font-semibold text-primary">
        Settings
      </div>
      <div className="mx-auto flex max-w-[500px] flex-col items-center">
        <Image src={loginImage} width={1033} height={712} alt="" />
        <div className="mb-8 text-center text-2xl font-bold text-primary">
          Log in to your account to see your details.
        </div>
        <SignInButton mode="modal" redirectUrl={asPath}>
          <button className="flex h-10 w-full min-w-[180px] max-w-[300px] items-center justify-center rounded bg-[#2bd97c] text-base text-primary duration-200 hover:bg-[#20ba68]">
            Login
          </button>
        </SignInButton>
      </div>
    </>
  );
};

const SettingsLoggedIn = () => {
  const { subscription } = useSubscription();
  const { user } = useUser();
  return (
    <>
      <div className="mb-8 border-b border-[#e1e7ea] pb-4 text-2xl font-semibold text-primary">
        Settings
      </div>
      <div className="border-b border-[#e1e7ea] pb-2">
        <div className="text-lg font-semibold text-primary">
          Your Subscription Plan:
        </div>
        <div className="py-2 text-primary">Basic</div>
        {!!subscription ? (
          subscription.plan.product === "prod_OnRU8HqeQFRNJg" ? (
            <div> Premium Plus </div>
          ) : (
            <div>Premium</div>
          )
        ) : (
          <Link
            href={"/choose-plan"}
            className="mb-4 flex h-10 w-full max-w-[180px] items-center justify-center rounded bg-[#2bd97c] text-base text-primary duration-200 hover:bg-[#20ba68]"
          >
            Upgrade to Premium
          </Link>
        )}
      </div>

      <div className="pt-4 text-lg font-semibold text-primary">Email</div>
      <div className="py-2 text-primary">{user?.emailAddresses[0]?.emailAddress}</div>
    </>
  );
};

import Head from "next/head";
import Link from "next/link";
import Features from "~/components/LandingComponents/Features";
import Footer from "~/components/LandingComponents/Footer";
import Landing from "~/components/LandingComponents/Landing";
import NavBar from "~/components/LandingComponents/NavBar";
import Numbers from "~/components/LandingComponents/Numbers";
import Reviews from "~/components/LandingComponents/Reviews";

import { api } from "~/utils/api";

export default function Home() {

  return (
    <>
      <Head>
        <title>Summarist</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Landing />
      <Features />
      <Reviews />
      <Numbers /> 
      <Footer />
    </>
  );
}
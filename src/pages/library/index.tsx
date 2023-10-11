import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import playButton from "public/assets/play-button.svg";
import BookCard from "~/components/BookComponents/BookCard";
import Layout from "~/components/LayoutComponents/Layout";
import { Book } from "~/types/Book";
import loginImage from "public/assets/login.png";
import { SignInButton, useUser } from "@clerk/nextjs";

const Library = () => {
  return (
    <Layout>
      <LibraryLoggedOut />
    </Layout>
  );
};

export default Library;

const LibraryLoggedOut = () => {
  return (
    <>
      <div className="mx-auto flex max-w-[500px] flex-col items-center">
        <Image src={loginImage} width={1033} height={712} alt="" />
        <div className="mb-8 text-center text-2xl font-bold text-primary">
          Log in to your account to see your details.
        </div>
        <SignInButton mode="modal">
          <button className="flex h-10 w-full min-w-[180px] max-w-[300px] items-center justify-center rounded bg-[#2bd97c] text-base text-primary duration-200 hover:bg-[#20ba68]">
            Login
          </button>
        </SignInButton>
      </div>
    </>
  );
};

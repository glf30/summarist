import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import logo from "public/assets/logo.png";
import Link from "next/link";
import homeIcon from "public/assets/home-icon.svg";
import bookmarkIcon from "public/assets/bookmark-icon.svg";
import penIcon from "public/assets/pen-icon.svg";
import searchIcon from "public/assets/search-icon.svg";
import settingsIcon from "public/assets/settings-wheel.svg";
import questionIcon from "public/assets/question-icon.svg";
import logoutIcon from "public/assets/logout-icon.svg";
import hamburgerIcon from "public/assets/hamburger-menu.svg";
import testImg from "public/assets/test-img.png";
import playButton from "public/assets/play-button.svg";
import clockIcon from "public/assets/clock-icon.svg";
import starIcon from "public/assets/star-icon.svg";
import BookCard from "~/components/BookComponents/BookCard";
import Layout from "~/components/LayoutComponents/Layout";

const ForYou = () => {
  return (
    <Layout>
      <ForYouArea />
    </Layout>
  );
};

export default ForYou;


const ForYouArea = () => {
  return (
    <div>
      {/* For You Secition */}
      <div className="mb-4 text-xl font-bold text-[#032b41]">
        Selected just for you
      </div>
      <Link
        className="mb-6 flex w-[calc((100%/3)*2)] flex-col justify-between gap-6 rounded-[4px] bg-[#fbefd5] p-6 md:flex-row"
        href={`/book`}
      >
        <div className="w-full text-[#032b41] md:w-[40%] ">
          How Constant Innovation Creates Radically Successful Businesses
        </div>
        <div className="w-[1px] bg-[#bac8ce]"></div>
        <div className="flex w-3/5 gap-4">
          <figure className="h-[140px] w-[140px] min-w-[140px]">
            <Image src={testImg} alt="" />
          </figure>
          <div className="w-full">
            <div className="mb-2 font-semibold text-[#032b41]">
              The Lean Startup
            </div>
            <div className="mb-4 text-sm text-[#394547]">Eric Riles</div>
            <div className="flex items-center gap-2">
              <div className="min-w-10 flex h-10 w-10 items-center">
                <Image src={playButton} alt="" width={40} height={40} />
              </div>
              <div className="text-sm font-medium text-[#032b41]">
                3 mins 23 secs
              </div>
            </div>
          </div>
        </div>
      </Link>
      {/* Recommended Section */}
      <div>
        <div className="mb-4 text-xl font-bold text-[#032b41]">
          Recommended For You
        </div>
        <div className="mb-4 font-light text-[#394547]">
          We think you'll like these
        </div>
        {/* Books Container */}
        <div className="mb-8 flex gap-4 overflow-x-clip">
          {Array(5)
            .fill(0)
            .map(() => (
              <BookCard />
            ))}
        </div>
      </div>
      {/* Suggested Section */}
      <div>
        <div className="mb-4 text-xl font-bold text-[#032b41]">
          Suggested Books
        </div>
        <div className="mb-4 font-light text-[#394547]">Browse these books</div>
        {/* Books Container */}
        <div className="mb-8 flex gap-4 overflow-x-clip">
          {Array(5)
            .fill(0)
            .map(() => (
              <BookCard />
            ))}
        </div>
      </div>
    </div>
  );
};
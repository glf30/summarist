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

const ForYou = () => {
  return (
    <>
      <SideBar />
      <div className="relative flex w-full flex-col md:ml-[200px] md:w-[calc(100%-200px)]">
        <SearchArea />
        <div className="mx-auto my-0 w-full max-w-[1070px] px-6 py-0">
          <div className="w-full px-0 py-10">
            <ForYouArea />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForYou;

const SideBar = () => {
  return (
    <div className="fixed z-50 hidden h-screen w-[200px] min-w-[200px] bg-[#f7faf9] md:block">
      <div className="max-width-[160px] mx-auto my-0 flex h-14 items-center justify-center pt-4">
        <Image src={logo} alt="logo" className="h-10 w-40" />
      </div>
      <div className="flex h-[calc(100vh-60px)] flex-col justify-between overflow-y-auto pb-5">
        <div className="mt-10 flex-1">
          <Link
            href={"/for-you"}
            className="mb-2 flex h-14 items-center text-[#032b41] duration-200 hover:bg-[#f0efef]"
          >
            <div className="mr-4 h-full w-1 bg-transparent"></div>
            <div className="mr-2 flex items-center justify-center">
              <Image src={homeIcon} alt="home icon" height={24} width={24} />
            </div>
            <div>For you</div>
          </Link>
          <Link
            href={"/for-you"}
            className="mb-2 flex h-14 items-center text-[#032b41] duration-200 hover:bg-[#f0efef]"
          >
            <div className="mr-4 h-full w-1 bg-transparent"></div>
            <div className="mr-2 flex items-center justify-center">
              <Image
                src={bookmarkIcon}
                alt="home icon"
                height={24}
                width={24}
              />
            </div>
            <div>My Library</div>
          </Link>
          <Link
            href={"/for-you"}
            className="mb-2 flex h-14 items-center text-[#032b41] duration-200 hover:bg-[#f0efef]"
          >
            <div className="mr-4 h-full w-1 bg-transparent"></div>
            <div className="mr-2 flex items-center justify-center">
              <Image src={penIcon} alt="home icon" height={24} width={24} />
            </div>
            <div>Highlights</div>
          </Link>
          <Link
            href={"/for-you"}
            className="mb-2 flex h-14 items-center text-[#032b41] duration-200 hover:bg-[#f0efef]"
          >
            <div className="mr-4 h-full w-1 bg-transparent"></div>
            <div className="mr-2 flex items-center justify-center">
              <Image src={searchIcon} alt="home icon" height={24} width={24} />
            </div>
            <div>Search</div>
          </Link>
        </div>
        <div className="">
          <Link
            href={"/for-you"}
            className="mb-2 flex h-14 items-center text-[#032b41] duration-200 hover:bg-[#f0efef]"
          >
            <div className="mr-4 h-full w-1 bg-transparent"></div>
            <div className="mr-2 flex items-center justify-center">
              <Image
                src={settingsIcon}
                alt="home icon"
                height={24}
                width={24}
              />
            </div>
            <div>Settings</div>
          </Link>
          <Link
            href={"/for-you"}
            className="mb-2 flex h-14 items-center text-[#032b41] duration-200 hover:bg-[#f0efef]"
          >
            <div className="mr-4 h-full w-1 bg-transparent"></div>
            <div className="mr-2 flex items-center justify-center">
              <Image
                src={questionIcon}
                alt="home icon"
                height={24}
                width={24}
              />
            </div>
            <div>Help & Support</div>
          </Link>
          <SignOutButton>
            <Link
              href={"/for-you"}
              className="mb-2 flex h-14 items-center text-[#032b41] duration-200 hover:bg-[#f0efef]"
            >
              <div className="mr-4 h-full w-1 bg-transparent"></div>
              <div className="mr-2 flex items-center justify-center">
                <Image
                  src={logoutIcon}
                  alt="home icon"
                  height={24}
                  width={24}
                />
              </div>
              <div>Logout</div>
            </Link>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
};

const SearchArea = () => {
  return (
    <div className="z-[1] h-20 w-full border-b border-b-[#e1e7ea] bg-white">
      <div className="relative mx-auto my-0 flex h-full max-w-[1070px] items-center justify-between px-8 py-0">
        {/* space holder */}
        <figure>
          <Image src={""} height={0} width={0} alt="logo" />
        </figure>
        <div className="flex w-full max-w-[340px] items-center gap-6">
          <div className="flex w-full items-center">
            <div className="relative flex w-full items-center gap-2">
              <input
                type="text"
                className="h-10 w-full rounded-lg border-2 border-[#e1e7ea] bg-[#f1f6f4] px-4 py-0 text-[#042330] outline-none"
                placeholder="Search for books"
                autoComplete="off"
              />
              <div className="absolute right-2 flex h-full items-center justify-end border-l-2 border-l-[#e1e7ea] pl-2">
                <Image src={searchIcon} alt="search icon" />
              </div>
            </div>
          </div>
          <div className="flex cursor-pointer items-center justify-center md:hidden">
            <Image src={hamburgerIcon} alt="home icon" height={24} width={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

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
        <div className="mb-32 flex gap-4 overflow-x-clip">
          {
            Array(5).fill(0).map(() => (
              <BookCard />
            ))
          }
        </div>
      </div>
    </div>
  );
};

const BookCard = () => {
  return (
    <Link
      href={"/for-you"}
      className="relative w-full max-w-[200px] rounded px-3 pb-3 pt-8 duration-200 hover:bg-[#f1f6f4]"
    >
      <div className="absolute right-0 top-0 flex h-[18px] w-fit items-center rounded-[20px] bg-[#032b41] px-2 py-0 text-[10px] text-white">
        Premium
      </div>
      <figure className="h-[172px] w-[172px]">
        <Image src={testImg} alt="" />
      </figure>
      <div className="mb-2 text-base font-bold text-[#032b41]">Mastery</div>
      <div className="mb-2 text-sm font-light text-[#6b757b]">
        Dale Dalington
      </div>
      <div className="mb-2 text-sm text-[#394547]">
        Time tested advice for the digital age
      </div>
      <div className="flex gap-2">
        <div className="flex items-center gap-1 text-sm font-light text-[#6b757b]">
          <div className="flex h-4 w-4">
            <Image src={clockIcon} alt="" />
          </div>
          <div className="text-sm font-light text-[#6b757b]">0:34</div>
        </div>
        <div className="flex items-center gap-1 text-sm font-light text-[#6b757b]">
          <div className="flex h-4 w-4">
            <Image src={starIcon} alt="" />
          </div>
          <div className="text-sm font-light text-[#6b757b]">4.4</div>
        </div>
      </div>
    </Link>
  );
};

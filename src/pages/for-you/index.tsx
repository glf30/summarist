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
import hamburgerIcon from "public/assets/hamburger-menu.svg"

const ForYou = () => {
  return (
    <>
    <SideBar />
    <div className="relative flex flex-column w-full md:ml-[200px] md:w-[calc(100%-200px)]">
      
   
        <SearchArea />
        {/* <div>Main</div> */}
    </div>
    </>
  );
};

export default ForYou;

const SideBar = () => {
  return (
    <div className="hidden md:block fixed z-50 h-screen w-[200px] min-w-[200px] bg-[#f7faf9]">
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
    <div className="z-[1] h-20 border-b border-b-[#e1e7ea] bg-white w-full">
      <div className="relative mx-auto my-0 flex h-full max-w-[1070px] items-center justify-between px-8 py-0">
        {/* space holder */}
        <figure>
          <Image src={""} height={0} width={0} alt="logo"  />
        </figure>
        <div className="flex items-center gap-6 max-w-[340px] w-full">
          <div className="flex items-center w-full">
            <div className="relative gap-2 flex items-center w-full">
              <input type="text" className="h-10 w-full py-0 px-4 outline-none bg-[#f1f6f4] text-[#042330] border-2 border-[#e1e7ea] rounded-lg" placeholder="Search for books" autoComplete="off" />
              <div className="flex items-center absolute h-full right-2 justify-end border-l-2 border-l-[#e1e7ea] pl-2">
                <Image src={searchIcon} alt="search icon" />
              </div>
            </div>
          </div>
          <div className="flex md:hidden items-center justify-center cursor-pointer">
            <Image src={hamburgerIcon} alt="home icon" height={24} width={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

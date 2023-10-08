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

const ForYou = () => {
  return (
    <div className="relative">
      <SideBar />
    </div>
  );
};

export default ForYou;

const SideBar = () => {
  return (
    <div className="fixed z-50 h-screen w-[200px] min-w-[200px] bg-[#f7faf9]">
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

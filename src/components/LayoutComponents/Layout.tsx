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

interface LayoutProps {
    children: JSX.Element;
}

const Layout = ({children} : LayoutProps) => {
  return (
    <>
      <SideBar />
      <div className="relative flex w-full flex-col md:ml-[200px] md:w-[calc(100%-200px)]">
        <SearchArea />
        <div className="mx-auto my-0 w-full max-w-[1070px] px-6 py-0">
          <div className="w-full px-0 py-10">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;

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
          <img src={""} height={0} width={0} alt="logo" />
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

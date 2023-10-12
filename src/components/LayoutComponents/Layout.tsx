import { SignOutButton, SignInButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/router";
import { Book } from "~/types/Book";
import BookCardSearch from "../BookComponents/BookCardSearch";
import closeIcon from "public/assets/close-icon.svg";

interface LayoutProps {
  children: JSX.Element;
  isPlayer?: boolean;
}

interface SidebarProps {
  isPlayer?: boolean;
}

const Layout = ({ children, isPlayer }: LayoutProps) => {
  return (
    <>
      <div className="relative flex w-full flex-col overflow-y-auto md:ml-[200px] md:w-[calc(100%-200px)]">
        <SideBar isPlayer={isPlayer} />
        <SearchArea />
        <div className="mx-auto my-0 w-full max-w-[1070px] px-6 py-0">
          <div className="w-full px-0 py-10">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;

const SideBar = ({ isPlayer }: SidebarProps) => {
  const { user } = useUser();
  const { asPath } = useRouter();

  return (
    <div className="fixed left-0 top-0 z-50 hidden h-screen w-[200px] min-w-[200px] bg-[#f7faf9] md:block">
      <div className="max-width-[160px] mx-auto my-0 flex h-14 items-center justify-center pt-4">
        <Image src={logo} alt="logo" className="h-10 w-40" />
      </div>
      <div
        className={`flex flex-col justify-between pb-5 ${
          isPlayer ? `h-[calc(100vh-140px)]` : `h-[calc(100vh-60px)]`
        }  `}
      >
        <div className="mt-10 flex-1">
          <Link
            href={"/for-you"}
            className="mb-2 flex h-14 items-center text-primary duration-200 hover:bg-[#f0efef]"
          >
            <div className="mr-4 h-full w-1 bg-transparent"></div>
            <div className="mr-2 flex items-center justify-center">
              <Image src={homeIcon} alt="home icon" height={24} width={24} />
            </div>
            <div>For you</div>
          </Link>
          <Link
            href={"/library"}
            className="mb-2 flex h-14 items-center text-primary duration-200 hover:bg-[#f0efef]"
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
          <div
            className="cursor-not-allowed mb-2 flex h-14 items-center text-primary duration-200 hover:bg-[#f0efef]"
          >
            <div className="mr-4 h-full w-1 bg-transparent"></div>
            <div className="mr-2 flex items-center justify-center">
              <Image src={penIcon} alt="home icon" height={24} width={24} />
            </div>
            <div>Highlights</div>
          </div>
          <div className="mb-2 flex h-14 cursor-not-allowed items-center text-primary duration-200 hover:bg-[#f0efef]">
            <div className="mr-4 h-full w-1 bg-transparent"></div>
            <div className="mr-2 flex items-center justify-center">
              <Image src={searchIcon} alt="home icon" height={24} width={24} />
            </div>
            <div>Search</div>
          </div>
        </div>
        <div className="">
          <Link
            href={"/settings"}
            className="mb-2 flex h-14 items-center text-primary duration-200 hover:bg-[#f0efef]"
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
          <div className="mb-2 flex h-14 cursor-not-allowed items-center text-primary duration-200 hover:bg-[#f0efef]">
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
          </div>
          {!!user ? (
            <SignOutButton>
              <button className="mb-2 flex h-14 w-full items-center text-primary duration-200 hover:bg-[#f0efef]">
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
              </button>
            </SignOutButton>
          ) : (
            <SignInButton mode="modal" redirectUrl={asPath}>
              <button className="mb-2 flex h-14 w-full items-center text-primary duration-200 hover:bg-[#f0efef]">
                <div className="mr-4 h-full w-1 bg-transparent"></div>
                <div className="mr-2 flex items-center justify-center">
                  <Image
                    src={logoutIcon}
                    alt="home icon"
                    height={24}
                    width={24}
                  />
                </div>
                <div>Login</div>
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </div>
  );
};

const SearchArea = () => {
  const [searchedBooks, setSearchedBooks] = useState<Book[]>();
  const [searchText, setSearchText] = useState("");
  const [debounceText, setDebounceText] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceText(searchText);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchText]);

  useEffect(() => {
    if (!!debounceText) {
      const getSearchedBooks = async () => {
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${searchText.toLowerCase()}`,
        );
        const data: Book[] = await res.json();

        console.log(data);
        setSearchedBooks([...data]);
      };
      getSearchedBooks();
    }
  }, [debounceText]);

  const handleClose = () => {
    setSearchText("");
  };

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
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              {!!searchText ? (
                <div
                  className="absolute right-2 flex h-full cursor-pointer items-center justify-end border-l-2 border-l-[#e1e7ea] pl-2"
                  onClick={handleClose}
                >
                  <Image src={closeIcon} alt="close icon" />
                </div>
              ) : (
                <div className="absolute right-2 flex h-full items-center justify-end border-l-2 border-l-[#e1e7ea] pl-2">
                  <Image src={searchIcon} alt="search icon" />
                </div>
              )}
            </div>
          </div>
          <div className="flex cursor-pointer items-center justify-center md:hidden">
            <Image src={hamburgerIcon} alt="home icon" height={24} width={24} />
          </div>
        </div>
        {!!searchText && searchedBooks && (
          <div className="absolute right-[24px] top-[104px] ml-auto flex max-h-[640px] w-full max-w-[440px] flex-col overflow-y-auto border border-[#e1e7ea] bg-white p-4 shadow-md">
            {searchedBooks.length > 0 ? (
              searchedBooks.map((bookInfo, index) => (
                <BookCardSearch {...bookInfo} key={index} />
              ))
            ) : (
              <>No books found</>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

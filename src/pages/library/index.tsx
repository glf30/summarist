import Image from "next/image";
import React, { useEffect, useState } from "react";
import BookCard from "~/components/BookComponents/BookCard";
import Layout from "~/components/LayoutComponents/Layout";
import { Book } from "~/types/Book";
import loginImage from "public/assets/login.png";
import { SignInButton, useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

const Library = () => {
  const { user } = useUser();
  return <Layout>{!!user ? <LibraryLoggedIn /> : <LibraryLoggedOut />}</Layout>;
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

const LibraryLoggedIn = () => {
  const { user } = useUser();
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
  const [finishedBooks, setFinishedBooks] = useState<Book[]>([]);

  const { data, refetch } = api.book.getBooksByUserId.useQuery(user?.id as string);

  useEffect(() => {
    const getFavoriteBooks = async () => {
      console.log("hey!");
      const fetchPromises = data
        ?.filter((book) => book.favorite === true)
        .map(async (bookInfo) => {
          console.log(bookInfo)
          const res = await fetch(
            `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookInfo.bookId}`,
          );
          const data: Book = await res.json();
          return data;
        });

      const collectedData: Book[] = await Promise.all(
        fetchPromises as Promise<Book>[],
      );

        setFavoriteBooks([...collectedData]);
        // for a bug, potentially a caching bug, where the data fetched will not be updated after fetch, refetch query to ensure we can get it to hit the empty check AFTER the incorrect data from the promise has been set
        refetch();
    };
    if (!!data) {
      // for a bug, potentially a caching bug, where the data fetched will not be updated after fetch
      if ((data?.filter((book) => book.favorite === true)).length !== 0) {
        getFavoriteBooks();
      } else {
        setFavoriteBooks([]);
      }
    }
  }, [data]);

  useEffect(() => {
    const getFinishedBooks = async () => {
      const fetchPromises = data
        ?.filter((book) => book.finished === true)
        .map(async (bookInfo) => {
          const res = await fetch(
            `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookInfo.bookId}`,
          );
          const data: Book = await res.json();
          return data;
        });

      const collectedData: Book[] = await Promise.all(
        fetchPromises as Promise<Book>[],
      );

      setFinishedBooks([...collectedData]);
    };
    if (!!data && finishedBooks.length === 0) {
      getFinishedBooks();
    }
  }, [data]);

  return (
    <>
      <div>
        <div className="mb-3 text-2xl font-bold text-primary">Saved Books</div>
        <div className="mb-4 font-light text-[#394547]">
          {favoriteBooks.length} items
        </div>
        {/* map through favorites here */}
        {favoriteBooks.length > 0 ? (
          <div className="mb-8 flex gap-4 overflow-x-visible">
            {favoriteBooks.map((bookInfo, index) => (
              <BookCard {...bookInfo} key={index} />
            ))}
          </div>
        ) : (
          <div className="mx-auto mb-14 flex max-w-fit flex-col items-center gap-2 rounded-xl bg-[#f1f6f4] p-8 text-center">
            <div className="text-lg font-semibold text-[#042330]">
              Save your favorite books!
            </div>
            <div className="text-[#394547]">
              When you save a book, it will appear here.
            </div>
          </div>
        )}
      </div>
      <div>
        <div className="mb-3 text-2xl font-bold text-primary">
          Finished Books
        </div>
        <div className="mb-4 font-light text-[#394547]">
          {finishedBooks.length} items
        </div>
        {/* map through favorites here */}
        {finishedBooks.length > 0 ? (
          <div className="mb-8 flex gap-4 overflow-x-visible">
            {finishedBooks.map((bookInfo, index) => (
              <BookCard {...bookInfo} key={index} />
            ))}
          </div>
        ) : (
          <div className="mx-auto mb-14 flex max-w-fit flex-col items-center gap-2 rounded-xl bg-[#f1f6f4] p-8 text-center">
            <div className="text-lg font-semibold text-[#042330]">
              Done and dusted!
            </div>
            <div className="text-[#394547]">
              When you finish a book, you can find it here later
            </div>
          </div>
        )}
      </div>
    </>
  );
};

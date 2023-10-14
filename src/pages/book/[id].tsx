import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import React, { useEffect, useRef, useState } from "react";
import { Book } from "~/types/Book";
import Image from "next/image";
import starIcon from "public/assets/star-icon.svg";
import clockIcon from "public/assets/clock-icon.svg";
import micIcon from "public/assets/mic-icon.svg";
import lightbulbIcon from "public/assets/lightbulb-icon.svg";
import bookIcon from "public/assets/book-icon.svg";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useSubscription } from "use-stripe-subscription";
import { formatTime } from "~/utils/formatTime";
import { api } from "~/utils/api";

export const getStaticPaths = (async () => {
  return {
    paths: [],
    fallback: "blocking", // false or "blocking"
  };
}) satisfies GetStaticPaths;

export const getStaticProps: GetStaticProps = (async (context) => {
  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${context.params?.id}`,
  );
  const bookInfo = await res.json();
  return { props: { bookInfo } };
}) satisfies GetStaticProps<{
  bookInfo: Book;
}>;

type UserBookData = {
  userId: string;
  bookId: string;
  favorite: boolean;
  finished: boolean;
};

export default function BookInfoPage({
  bookInfo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { user } = useUser();
  const { subscription } = useSubscription();
  const [duration, setDuration] = useState(0);
  const [bookLoaded, setBookLoaded] = useState(false);
  const [saved, setSaved] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [tempBook, setTempBook] = useState<UserBookData>({
    userId: "",
    bookId: "",
    favorite: false,
    finished: false,
  });
  const onLoadedMetadata = () => {
    if (!!audioRef.current) {
      const seconds = audioRef.current?.duration;
      setDuration(seconds);
    }
  };

  const checkBook = api.book.getById.useQuery({
    userId: user?.id as string,
    bookId: bookInfo.id,
  });

  const addBook = api.book.bookAdd.useMutation();
  const updateBook = api.book.updateBook.useMutation();

  const handleSaveBook = () => {
    //book exists in database, flip the favorite flag
    setSaved(true);

    if (!!checkBook.data && !!tempBook.userId) {
      setTempBook({
        ...tempBook,
        favorite: !tempBook.favorite,
      });
    } else {
      //book does not exist in database, add to database and set favorite to true
      //if book is not in db, then it cannot have been finished, so set that to false
      const newBook = {
        userId: user?.id as string,
        bookId: bookInfo.id,
        favorite: true,
        finished: false,
      };
      setTempBook(newBook);
    }
  };

  useEffect(() => {
    if (saved) {
      if (!!checkBook.data && !!tempBook.userId) {
        updateBook.mutate(tempBook);
      } else if (!!user && !checkBook.data) {
        addBook.mutate(tempBook);
      }

      setSaved(false);
    }
  }, [tempBook]);

  useEffect(() => {
    if (!!checkBook.data && !bookLoaded) {
      const timeout = setTimeout(() => {
        setBookLoaded(true);
        setTempBook(checkBook.data as UserBookData);
        checkBook.refetch();
      }, 300);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [checkBook]);

  return (
      <div className="flex flex-col-reverse items-center gap-8 md:flex-row md:items-start md:gap-4">
        <audio
          src={bookInfo.audioLink}
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
        />
        <div className="w-full">
          {/* Title Section */}
          <div className="mb-4 text-3xl font-semibold text-primary">
            {bookInfo.title}{" "}
            {bookInfo.subscriptionRequired && !subscription && `(Premium)`}
          </div>
          <div className="mb-4 font-semibold text-primary">
            {bookInfo.author}
          </div>
          <div className="mb-4 text-xl font-light text-primary">
            {bookInfo.subTitle}
          </div>
          {/* Icon Section */}
          <div className="mb-6 border-b border-t border-[#e1e7ea] py-4">
            <div className="flex max-w-[400px] flex-wrap gap-y-3">
              {/* Ratings */}
              <div className="flex w-1/2 items-center text-sm font-semibold text-primary">
                <div className="mr-1 flex h-6 w-6">
                  <Image src={starIcon} alt="" width={24} height={24} />
                </div>
                <div>{bookInfo.averageRating} </div>
                <div className="whitespace-pre">
                  {" "}
                  {`(${bookInfo.totalRating} ratings)`}
                </div>
              </div>
              {/* Duration */}
              <div className="flex w-1/2 items-center text-sm font-semibold text-primary">
                <div className="mr-1 flex h-6 w-6">
                  <Image src={clockIcon} alt="" width={24} height={24} />
                </div>
                <div>{formatTime(duration)}</div>
              </div>
              {/* Audio */}
              <div className="flex w-1/2 items-center text-sm font-semibold text-primary">
                <div className="mr-1 flex h-6 w-6">
                  <Image src={micIcon} alt="" width={24} height={24} />
                </div>
                <div>{bookInfo.type}</div>
              </div>
              {/* Key */}
              <div className="flex w-1/2 items-center text-sm font-semibold text-primary">
                <div className="mr-1 flex h-6 w-6">
                  <Image src={lightbulbIcon} alt="" width={24} height={24} />
                </div>
                <div>{`${bookInfo.keyIdeas} Key Ideas`}</div>
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="mb-8 flex gap-4">
            {!!user ? (
              bookInfo.subscriptionRequired && !subscription ? (
                <Link
                  href={`/choose-plan`}
                  className="flex h-12 w-36 cursor-pointer items-center justify-center gap-2 rounded bg-primary text-[16px] font-semibold text-white duration-200 hover:opacity-80"
                >
                  <div className="flex">
                    <Image
                      src={bookIcon}
                      alt=""
                      width={24}
                      height={24}
                      className="invert"
                    />
                  </div>
                  <div>Read</div>
                </Link>
              ) : (
                <Link
                  href={`/player/${bookInfo.id}`}
                  className="flex h-12 w-36 cursor-pointer items-center justify-center gap-2 rounded bg-primary text-[16px] font-semibold text-white duration-200 hover:opacity-80"
                >
                  <div className="flex">
                    <Image
                      src={bookIcon}
                      alt=""
                      width={24}
                      height={24}
                      className="invert"
                    />
                  </div>
                  <div>Read</div>
                </Link>
              )
            ) : (
              <SignInButton mode="modal" redirectUrl={`/player/${bookInfo.id}`}>
                <button className="flex h-12 w-36 cursor-pointer items-center justify-center gap-2 rounded bg-primary text-[16px] font-semibold text-white duration-200 hover:opacity-80">
                  <div className="flex">
                    <Image
                      src={bookIcon}
                      alt=""
                      width={24}
                      height={24}
                      className="invert"
                    />
                  </div>
                  <div>Read</div>
                </button>
              </SignInButton>
            )}

            {!!user ? (
              bookInfo.subscriptionRequired && !subscription ? (
                <Link
                  href={`/choose-plan`}
                  className="flex h-12 w-36 cursor-pointer items-center justify-center gap-2 rounded bg-primary text-[16px] font-semibold text-white duration-200 hover:opacity-80"
                >
                  <div className="flex">
                    <Image
                      src={micIcon}
                      alt=""
                      width={24}
                      height={24}
                      className="invert"
                    />
                  </div>
                  <div>Listen</div>
                </Link>
              ) : (
                <Link
                  href={`/player/${bookInfo.id}`}
                  className="flex h-12 w-36 cursor-pointer items-center justify-center gap-2 rounded bg-primary text-[16px] font-semibold text-white duration-200 hover:opacity-80"
                >
                  <div className="flex">
                    <Image
                      src={micIcon}
                      alt=""
                      width={24}
                      height={24}
                      className="invert"
                    />
                  </div>
                  <div>Listen</div>
                </Link>
              )
            ) : (
              <SignInButton mode="modal" redirectUrl={`/player/${bookInfo.id}`}>
                <button className="flex h-12 w-36 cursor-pointer items-center justify-center gap-2 rounded bg-primary text-[16px] font-semibold text-white duration-200 hover:opacity-80">
                  <div className="flex">
                    <Image
                      src={micIcon}
                      alt=""
                      width={24}
                      height={24}
                      className="invert"
                    />
                  </div>
                  <div>Listen</div>
                </button>
              </SignInButton>
            )}
          </div>
          {/* Bookmark */}

          {!!user ? (
            tempBook.favorite ? (
              <div
                className="group mb-10 flex cursor-pointer items-center gap-2 text-lg font-semibold text-[#0365f2] "
                onClick={handleSaveBook}
              >
                <div className="flex h-5 w-5">
                  <svg
                    className="fill-[#0365f2] stroke-[#0365f2] duration-200 group-hover:fill-primary"
                    stroke-width="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"></path>
                  </svg>
                </div>
                <div className="duration-200 group-hover:text-[#044298]">
                  Saved in My Library
                </div>
              </div>
            ) : (
              <div
                className="group mb-10 flex cursor-pointer items-center gap-2 text-lg font-semibold text-[#0365f2] "
                onClick={handleSaveBook}
              >
                <div className="flex h-5 w-5">
                  <svg
                    viewBox="0 0 16 16"
                    height="24px"
                    width="24px"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-[#0365f2] duration-200 group-hover:fill-primary"
                  >
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"></path>
                  </svg>
                </div>
                <div className="duration-200 group-hover:text-[#044298]">
                  Add title to My Library
                </div>
              </div>
            )
          ) : (
            <SignInButton mode="modal" redirectUrl="">
              <div className="group mb-10 flex cursor-pointer items-center gap-2 text-lg font-semibold text-[#0365f2] ">
                <div className="flex h-5 w-5">
                  <svg
                    viewBox="0 0 16 16"
                    height="24px"
                    width="24px"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-[#0365f2] duration-200 group-hover:fill-primary"
                  >
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"></path>
                  </svg>
                </div>
                <div className="duration-200 group-hover:text-[#044298]">
                  Add title to My Library
                </div>
              </div>
            </SignInButton>
          )}

          <div className="mb-4 text-lg font-semibold text-primary">
            What's it about?
          </div>
          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-4">
            {bookInfo.tags.length > 0 &&
              bookInfo.tags.map(
                (tag: string, index: React.Key | null | undefined) => (
                  <TagCard tag={tag} key={index} />
                ),
              )}
          </div>
          {/* Description */}
          <div className="mb-4 text-base text-primary">
            {bookInfo.bookDescription}
          </div>
          {/* About the Author */}
          <h2 className="mb-4 text-lg font-semibold text-primary">
            About the author
          </h2>
          <div className="text-base text-primary">
            {bookInfo.authorDescription}
          </div>
        </div>
        <div>
          <figure className="h-[300px] w-[300px] min-w-[300px]">
            <Image src={bookInfo.imageLink} height={300} width={300} alt="" />
          </figure>
        </div>
      </div>
  );
}

type Tag = {
  tag: string;
};

const TagCard: React.FC<Tag> = ({ tag }) => {
  return (
    <div className="flex h-12 items-center rounded bg-[#f1f6f4] px-4 py-0 font-semibold text-primary ">
      {tag}
    </div>
  );
};

import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";
import Layout from "~/components/LayoutComponents/Layout";
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

export default function BookInfoPage({
  bookInfo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { user } = useUser();
  const { subscription } = useSubscription();

  return (
    <Layout>
      <div className="flex flex-col-reverse items-center gap-8 md:flex-row md:items-start md:gap-4">
        <div className="w-full">
          {/* Title Section */}
          <div className="text-primary mb-4 text-3xl font-semibold">
            {bookInfo.title} {(bookInfo.subscriptionRequired && !subscription) && `(Premium)`}
          </div>
          <div className="text-primary mb-4 font-semibold">
            {bookInfo.author}
          </div>
          <div className="text-primary mb-4 text-xl font-light">
            {bookInfo.subTitle}
          </div>
          {/* Icon Section */}
          <div className="mb-6 border-b border-t border-[#e1e7ea] py-4">
            <div className="flex max-w-[400px] flex-wrap gap-y-3">
              {/* Ratings */}
              <div className="text-primary flex w-1/2 items-center text-sm font-semibold">
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
              <div className="text-primary flex w-1/2 items-center text-sm font-semibold">
                <div className="mr-1 flex h-6 w-6">
                  <Image src={clockIcon} alt="" width={24} height={24} />
                </div>
                <div>04:52</div>
              </div>
              {/* Audio */}
              <div className="text-primary flex w-1/2 items-center text-sm font-semibold">
                <div className="mr-1 flex h-6 w-6">
                  <Image src={micIcon} alt="" width={24} height={24} />
                </div>
                <div>{bookInfo.type}</div>
              </div>
              {/* Key */}
              <div className="text-primary flex w-1/2 items-center text-sm font-semibold">
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
              <Link href={`/player/${bookInfo.id}`} className="bg-primary flex h-12 w-36 cursor-pointer items-center justify-center gap-2 rounded text-[16px] font-semibold text-white duration-200 hover:opacity-80">
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
              <SignInButton mode="modal" redirectUrl={`/player/${bookInfo.id}`}>
                <button className="bg-primary flex h-12 w-36 cursor-pointer items-center justify-center gap-2 rounded text-[16px] font-semibold text-white duration-200 hover:opacity-80">
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
              <Link href={`/player/${bookInfo.id}`} className="bg-primary flex h-12 w-36 cursor-pointer items-center justify-center gap-2 rounded text-[16px] font-semibold text-white duration-200 hover:opacity-80">
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
              <SignInButton mode="modal" redirectUrl={`/player/${bookInfo.id}`}>
                <button className="bg-primary flex h-12 w-36 cursor-pointer items-center justify-center gap-2 rounded text-[16px] font-semibold text-white duration-200 hover:opacity-80">
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
            <div className="group mb-10 flex cursor-pointer items-center gap-2 text-lg font-semibold text-[#0365f2] ">
              <div className="flex h-5 w-5">
                <svg
                  viewBox="0 0 16 16"
                  height="24px"
                  width="24px"
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:fill-primary fill-[#0365f2] duration-200"
                >
                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"></path>
                </svg>
              </div>
              <div className="duration-200 group-hover:text-[#044298]">
                Add title to My Library
              </div>
            </div>
          ) : (
            <SignInButton mode="modal" redirectUrl="">
              <div className="group mb-10 flex cursor-pointer items-center gap-2 text-lg font-semibold text-[#0365f2] ">
                <div className="flex h-5 w-5">
                  <svg
                    viewBox="0 0 16 16"
                    height="24px"
                    width="24px"
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:fill-primary fill-[#0365f2] duration-200"
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

          <div className="text-primary mb-4 text-lg font-semibold">
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
          <div className="text-primary mb-4 text-base">
            {bookInfo.bookDescription}
          </div>
          {/* About the Author */}
          <h2 className="text-primary mb-4 text-lg font-semibold">
            About the author
          </h2>
          <div className="text-primary text-base">
            {bookInfo.authorDescription}
          </div>
        </div>
        <div>
          <figure className="h-[300px] w-[300px] min-w-[300px]">
            <Image src={bookInfo.imageLink} height={300} width={300} alt="" />
          </figure>
        </div>
      </div>
    </Layout>
  );
}

type Tag = {
  tag: string;
};

const TagCard: React.FC<Tag> = ({ tag }) => {
  return (
    <div className="text-primary flex h-12 items-center rounded bg-[#f1f6f4] px-4 py-0 font-semibold ">
      {tag}
    </div>
  );
};

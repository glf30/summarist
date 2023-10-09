import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import testImg from "public/assets/test-img.png";
import playButton from "public/assets/play-button.svg";
import BookCard from "~/components/BookComponents/BookCard";
import Layout from "~/components/LayoutComponents/Layout";
import { Book } from "~/types/Book";

const ForYou = () => {
  return (
    <Layout>
      <ForYouArea />
    </Layout>
  );
};

export default ForYou;

const ForYouArea = () => {
  const [selectedBook, setSelectedBook] = useState<Book>();
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>();
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>();

  useEffect(() => {
    const getSelectedBook = async () => {
      const res = await fetch(
        "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected",
      );
      const data = await res.json();

      setSelectedBook(data[0] as Book);
    };
    getSelectedBook();
  }, []);

  useEffect(() => {
    const getRecommendedBooks = async () => {
      const res = await fetch(
        "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended",
      );
      const data: Book[] = await res.json();

      setRecommendedBooks([...data]);
    };
    getRecommendedBooks();

  }, []);

  useEffect(() => {
    const getSuggestedBooks = async () => {
      const res = await fetch(
        "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested",
      );
      const data: Book[] = await res.json();

      setSuggestedBooks([...data]);
    };
    getSuggestedBooks();
  }, []);

  return (
    <div>
      {/* For You Section */}
      <div className="mb-4 text-xl font-bold text-[#032b41]">
        Selected just for you
      </div>
      <Link
        className="mb-6 flex w-[calc((100%/3)*2)] flex-col justify-between gap-6 rounded-[4px] bg-[#fbefd5] p-6 md:flex-row"
        href={`/book`}
      >
        <div className="w-full text-[#032b41] md:w-[40%] ">
          {selectedBook?.subTitle}
        </div>
        <div className="w-[1px] bg-[#bac8ce]"></div>
        <div className="flex w-3/5 gap-4">
          <figure className="h-[140px] w-[140px] min-w-[140px]">
            <Image src={selectedBook?.imageLink ?? ""} width={140} height={140} alt="" />
          </figure>
          <div className="w-full">
            <div className="mb-2 font-semibold text-[#032b41]">
              {selectedBook?.title}
            </div>
            <div className="mb-4 text-sm text-[#394547]">{selectedBook?.author}</div>
            <div className="flex items-center gap-2">
              <div className="min-w-10 flex h-10 w-10 items-center">
                <Image src={playButton} alt="" width={40} height={40}/>
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
          {recommendedBooks?.slice(0,5)
            .map((bookInfo,index) => (
              <BookCard {...bookInfo} key={index} />
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
          {suggestedBooks?.slice(0,5)
            .map((bookInfo,index) => (
              <BookCard {...bookInfo} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

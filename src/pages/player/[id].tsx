import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Layout from "~/components/LayoutComponents/Layout";
import { Book } from "~/types/Book";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import backButton from "public/assets/back-button.svg";
import forwardButton from "public/assets/forward-button.svg";
import playButton from "public/assets/play-button.svg";
import pauseButton from "public/assets/pause-button.svg";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLInputElement | null>(null);
  const playRef = useRef<number | null>();
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const { user } = useUser();

  const repeat = useCallback(() => {
    if(!!playRef.current && !!progressRef.current){
        const currentTime = audioRef.current?.currentTime;
        setTimeProgress(Number(currentTime));

        progressRef.current.value = String(currentTime);
        progressRef.current.style.setProperty(
            '--range-progress',
            `${(Number(progressRef.current.value) / duration) * 100}%`
          );

        playRef.current = requestAnimationFrame(repeat);
    }
  },[audioRef, duration, progressRef, setTimeProgress])

  const handleProgressChange = () => {
    if (!!audioRef.current && !!progressRef.current) {
      audioRef.current.currentTime = Number(progressRef.current.value);
    }
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play(); 
    } else {
      audioRef.current?.pause();
    }
    playRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  const onLoadedMetadata = () => {
    if (!!audioRef.current && !!progressRef.current) {
      const seconds = audioRef.current?.duration
      setDuration(seconds);
      progressRef.current.max = String(seconds);
    }
  };

  const formatTime = (time: number) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes =
        minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds =
        seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return '00:00';
  };


  if (!user) return null;
  return (
    <>
      <Layout isPlayer={true}>
        <div className="relative h-[calc(100vh-240px)] w-full">
          <div className="mx-auto my-0 max-w-[800px] whitespace-pre-line p-6 pt-0 text-base">
            {/* title */}
            <div className="text-primary mb-8 border-b border-[#e1e7ea] pb-4 text-2xl font-semibold">
              {bookInfo.title}
            </div>
            {/* summary */}
            <div className="text-primary whitespace-pre-line leading-[1.4rem]">
              {bookInfo.summary}
            </div>
          </div>
        </div>
      </Layout>
      {/* Audio Player */}
      <audio
        src={bookInfo.audioLink}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
      />
      <div className="fixed bottom-0 left-0 z-[9000] mt-auto flex w-full flex-col items-center justify-between bg-[#042330] px-10 py-0 md:h-20 md:flex-row">
        {/* book info */}
        <div className="flex w-full justify-center gap-3 py-3 md:w-[calc(100%/3)] md:justify-normal md:py-0">
          {/* image */}
          <figure className="flex md:max-w-[48px]">
            <figure className="h-12 w-12 min-w-[48px]">
              <Image src={bookInfo.imageLink} width={48} height={48} alt="" />
            </figure>
          </figure>
          {/* details */}
          <div className="flex flex-col justify-center gap-1 text-[14px] text-white">
            <div>{bookInfo.title}</div>
            <div className="text-[#bac8ce]">{bookInfo.author}</div>
          </div>
        </div>
        {/* audio controller */}
        <div className="md:w-[calc(100%/3)]">
          <div className="flex items-center justify-center gap-6 py-4 md:py-0">
            <button className="cursor-pointer rounded-full ">
              <Image
                src={backButton}
                width={28}
                height={28}
                alt=""
                className="invert"
              />
            </button>
            <button
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white"
              onClick={handlePlay}
            >
              {!!isPlaying ? (
                <Image
                  src={pauseButton}
                  width={36}
                  height={36}
                  alt=""
                  className="fill-primary"
                />
              ) : (
                <Image
                  src={playButton}
                  width={36}
                  height={36}
                  alt=""
                  className="fill-primary"
                />
              )}
            </button>
            <button className="cursor-pointer rounded-full">
              <Image
                src={forwardButton}
                width={28}
                height={28}
                alt=""
                className="invert"
              />
            </button>
          </div>
        </div>
        {/* progress bar */}
        <div className="flex w-full items-center justify-center gap-4 py-3 md:w-[calc(100%/3)] md:justify-normal md:py-0">
          <div className="text-sm text-white">{formatTime(timeProgress)}</div>
          <input
            type="range"
            defaultValue={0}
            className="audio__bar h-1 w-full max-w-[300px] cursor-pointer appearance-none rounded-lg outline-none"
            style={{
              background:
                `linear-gradient(to right, rgb(43, 217, 124) ${(timeProgress/duration) *100}%, rgb(109, 120, 125) 0%)`,
            }}
            ref={progressRef}
            onChange={handleProgressChange}
          />
          <div className="text-sm text-white">{formatTime(duration)}</div>
        </div>
      </div>
    </>
  );
}

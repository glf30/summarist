import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clockIcon from "public/assets/clock-icon.svg";
import { Book } from "~/types/Book";
import { formatTime } from "~/utils/formatTime";

const BookCardSearch = (props: Book) => {
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const onLoadedMetadata = () => {
    if (!!audioRef.current) {
      const seconds = audioRef.current?.duration;
      setDuration(seconds);
    }
  };

  return (
    <Link
      href={`/book/${props.id}`}
      className="relative flex items-center w-full flex-row rounded p-4 gap-4 duration-200 hover:bg-[#f1f6f4] border-b border-[#e1e7ea]"
    >
      <audio
        src={props.audioLink}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
      />
      <figure className="h-20 w-20 min-w-[80px]">
        <Image src={props.imageLink ?? ""} alt="" width={80} height={80} />
      </figure>

      <div>
        <div className="mb-2 text-md font-bold text-primary">
          {props.title}
        </div>
        <div className="mb-2 text-sm font-light text-[#6b757b]">
          {props.author}
        </div>
        <div className="flex items-center gap-1 text-sm font-light text-[#6b757b]">
          <div className="flex h-4 w-4">
            <Image src={clockIcon} alt="" />
          </div>
          <div className="text-sm font-light text-[#6b757b]">
            {formatTime(duration)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCardSearch;

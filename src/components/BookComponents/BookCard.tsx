import React from 'react'
import Image from "next/image";
import Link from "next/link";
import clockIcon from "public/assets/clock-icon.svg";
import starIcon from "public/assets/star-icon.svg";
import { Book } from '~/types/Book';
import { useSubscription } from 'use-stripe-subscription';

const BookCard = (props: Book) => {
   const { subscription } = useSubscription();

    return (
      <Link
        href={`/book/${props.id}`}
        className="relative w-full max-w-[200px] rounded px-3 pb-3 pt-8 duration-200 hover:bg-[#f1f6f4]"
      >
        {/* if subscription is required AND they do not have a subscription, display that it is premium */}
        {(props.subscriptionRequired && !subscription) && <div className="absolute right-0 top-0 flex h-[18px] w-fit items-center rounded-[20px] bg-primary px-2 py-0 text-[10px] text-white">
          Premium
        </div> }
        <figure className="h-[172px] w-[172px]">
          <Image src={props.imageLink ?? ""} alt="" width={172} height={172} />
        </figure>
        <div className="mb-2 text-base font-bold text-primary">{props.title}</div>
        <div className="mb-2 text-sm font-light text-[#6b757b]">
          {props.author}
        </div>
        <div className="mb-2 text-sm text-[#394547]">
          {props.subTitle}
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 text-sm font-light text-[#6b757b]">
            <div className="flex h-4 w-4">
              <Image src={clockIcon} alt="" />
            </div>
            <div className="text-sm font-light text-[#6b757b]">0:34</div>
          </div>
          <div className="flex items-center gap-1 text-sm font-light text-[#6b757b]">
            <div className="flex h-4 w-4">
              <Image src={starIcon} alt="" />
            </div>
            <div className="text-sm font-light text-[#6b757b]">{props.averageRating}</div>
          </div>
        </div>
      </Link>
    );
  };

export default BookCard
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BookCardSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#f4f4f5" highlightColor="#d4d4d4">
      <div className="relative w-full max-w-[200px] rounded px-3 pb-3 pt-8 duration-200 hover:bg-[#f1f6f4]">
        <figure className="h-[172px] w-[172px]">
          <Skeleton width={172} height={172} />
        </figure>
        <div className="mb-2 text-base font-bold text-primary">
          <Skeleton width={172} height={20} />
        </div>
        <div className="mb-2 text-sm font-light text-[#6b757b]">
          <Skeleton width={172} height={20} />
        </div>
        <div className="mb-2 text-sm text-[#394547]">
          <Skeleton width={172} height={20} />
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 text-sm font-light text-[#6b757b]">
            <Skeleton width={172} height={20} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default BookCardSkeleton;

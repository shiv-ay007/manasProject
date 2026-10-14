import React from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';

const SkeletonBlogCard = () => {
  return (
    <div className="relative w-full h-[280px] sm:h-[310px] md:h-[320px] rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 bg-slate-100 animate-pulse">
      {/* Skeleton Background Placeholder */}
      <div className="w-full h-full bg-slate-200" />

      {/* Skeleton Bottom Wave Frosted Area */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-white/80 backdrop-blur-md p-4 flex flex-col items-center justify-center">
        <div className="h-4 bg-slate-200 rounded-full w-3/4 mb-2" />
        <div className="h-3 bg-slate-100 rounded-full w-1/2" />
      </div>
    </div>
  );
};

export default SkeletonBlogCard;

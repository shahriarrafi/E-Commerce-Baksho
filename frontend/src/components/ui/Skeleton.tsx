
"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div 
      className={cn(
        "animate-pulse rounded-md bg-brand-cream/50",
        className
      )} 
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col h-full bg-white rounded-2xl">
      <Skeleton className="aspect-[4/5] rounded-2xl w-full" />
      <div className="pt-3 pb-1 flex flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/4 mt-auto" />
      </div>
    </div>
  );
}

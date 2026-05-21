import { Skeleton } from "@/components/ui/skeleton";

export default function ListingDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl flex flex-col gap-8">
      <div className="space-y-3">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-8 w-32" />
      </div>
      <Skeleton className="aspect-[16/9] rounded-lg" />
      <div className="grid md:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-3">
          <Skeleton className="h-24" />
          <Skeleton className="h-40" />
        </div>
        <Skeleton className="h-72 rounded-lg" />
      </div>
    </div>
  );
}
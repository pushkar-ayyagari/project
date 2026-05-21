import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center gap-4 max-w-md">
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground">
        We couldn&apos;t find what you were looking for. The listing may have been removed.
      </p>
      <Link href="/listings" className={cn(buttonVariants(), "mt-2")}>
        Browse listings
      </Link>
    </div>
  );
}
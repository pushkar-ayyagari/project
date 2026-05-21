import { Badge } from "@/components/ui/badge";
import { formatListingStatus } from "@/lib/format";
import type { ListingStatus } from "@prisma/client";

const STYLES: Record<ListingStatus, string> = {
  FOR_SALE: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-200",
  FOR_RENT: "bg-sky-100 text-sky-900 dark:bg-sky-900/30 dark:text-sky-200",
  PENDING: "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200",
  SOLD: "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
};

export function StatusBadge({ status }: { status: ListingStatus }) {
  return (
    <Badge variant="secondary" className={STYLES[status]}>
      {formatListingStatus(status)}
    </Badge>
  );
}
import Link from "next/link";
import { Plus, ExternalLink, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/listings/status-badge";
import { DeleteListingButton } from "@/components/admin/delete-listing-button";
import { formatPrice, formatPropertyType } from "@/lib/format";

export const metadata = {
  title: "Manage listings",
};

export default async function AdminListingsPage() {
  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { inquiries: true, favorites: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Listings</h1>
        <Link href="/admin/listings/new" className={cn(buttonVariants(), "gap-1")}>
          <Plus className="size-4" />
          New listing
        </Link>
      </div>

      <div className="border rounded-lg bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-12">
                  No listings yet.
                </TableCell>
              </TableRow>
            )}
            {listings.map((l) => (
              <TableRow key={l.id}>
                <TableCell className="font-medium max-w-[280px] truncate">
                  {l.title}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {l.city}, {l.state}
                </TableCell>
                <TableCell>{formatPrice(l.price, l.listingStatus)}</TableCell>
                <TableCell>
                  <StatusBadge status={l.listingStatus} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatPropertyType(l.propertyType)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/listings/${l.id}`}
                      target="_blank"
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon-sm" }),
                        "text-muted-foreground"
                      )}
                      aria-label="View live"
                    >
                      <ExternalLink className="size-4" />
                    </Link>
                    <Link
                      href={`/admin/listings/${l.id}/edit`}
                      className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }))}
                      aria-label="Edit"
                    >
                      <Pencil className="size-4" />
                    </Link>
                    <DeleteListingButton id={l.id} title={l.title} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
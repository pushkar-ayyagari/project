import Link from "next/link";
import { Mail } from "lucide-react";
import { prisma } from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InquiryStatusSelect } from "@/components/admin/inquiry-status-select";

export const metadata = {
  title: "Inquiries",
};

function formatRelative(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    include: {
      listing: {
        select: { id: true, title: true, city: true, state: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Inquiries</h1>
        <p className="text-sm text-muted-foreground">
          {inquiries.length} total · update status as you contact each lead.
        </p>
      </div>

      {inquiries.length === 0 ? (
        <div className="border border-dashed rounded-lg p-12 text-center">
          <Mail className="size-10 mx-auto text-muted-foreground" />
          <p className="mt-3 font-medium">No inquiries yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            When a visitor submits the inquiry form on a listing detail page,
            it&apos;ll show up here.
          </p>
        </div>
      ) : (
        <div className="border rounded-lg bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Listing</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Received</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((inq) => (
                <TableRow key={inq.id}>
                  <TableCell className="align-top">
                    <div className="font-medium">{inq.name}</div>
                    <a
                      href={`mailto:${inq.email}`}
                      className="text-xs text-muted-foreground underline-offset-4 hover:underline block"
                    >
                      {inq.email}
                    </a>
                    {inq.phone && (
                      <a
                        href={`tel:${inq.phone}`}
                        className="text-xs text-muted-foreground underline-offset-4 hover:underline block"
                      >
                        {inq.phone}
                      </a>
                    )}
                  </TableCell>
                  <TableCell className="align-top">
                    <Link
                      href={`/listings/${inq.listing.id}`}
                      target="_blank"
                      className="hover:underline underline-offset-4 line-clamp-1"
                    >
                      {inq.listing.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {inq.listing.city}, {inq.listing.state}
                    </p>
                  </TableCell>
                  <TableCell className="align-top max-w-md">
                    <p className="text-sm line-clamp-3 whitespace-pre-line">{inq.message}</p>
                  </TableCell>
                  <TableCell className="align-top text-sm text-muted-foreground">
                    {formatRelative(inq.createdAt)}
                  </TableCell>
                  <TableCell className="align-top text-right">
                    <InquiryStatusSelect id={inq.id} status={inq.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
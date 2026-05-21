import Link from "next/link";
import { Home, List, Mail, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function AdminOverviewPage() {
  const [listingsCount, inquiriesCount, newInquiries, recentListings] = await Promise.all([
    prisma.listing.count(),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: "NEW" } }),
    prisma.listing.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, title: true, city: true, state: true, createdAt: true, listingStatus: true },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin overview</h1>
          <p className="text-sm text-muted-foreground">
            Manage listings, inquiries, and other site content.
          </p>
        </div>
        <Link href="/admin/listings/new" className={cn(buttonVariants(), "gap-1")}>
          <Plus className="size-4" />
          New listing
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={<Home className="size-5" />} label="Listings" value={listingsCount} />
        <StatCard icon={<Mail className="size-5" />} label="Total inquiries" value={inquiriesCount} />
        <StatCard icon={<Mail className="size-5" />} label="New inquiries" value={newInquiries} highlight={newInquiries > 0} />
      </div>

      <section className="border rounded-lg p-5 bg-card space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Recent listings</h2>
          <Link href="/admin/listings" className="text-sm hover:underline underline-offset-4">
            View all
          </Link>
        </div>

        {recentListings.length === 0 ? (
          <p className="text-sm text-muted-foreground">No listings yet.</p>
        ) : (
          <ul className="divide-y">
            {recentListings.map((l) => (
              <li key={l.id} className="py-2 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium truncate">{l.title}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {l.city}, {l.state} · {l.listingStatus.replace("_", " ").toLowerCase()}
                  </p>
                </div>
                <Link
                  href={`/admin/listings/${l.id}/edit`}
                  className="text-sm hover:underline underline-offset-4 shrink-0"
                >
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div className={cn("border rounded-lg p-4 bg-card", highlight && "border-primary")}>
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        {icon}
        {label}
      </div>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}
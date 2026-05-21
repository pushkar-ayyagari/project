import { redirect } from "next/navigation";
import Link from "next/link";
import { Home, LayoutDashboard, List, Mail, ChevronLeft } from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Admin",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-8 grid md:grid-cols-[220px_1fr] gap-8">
      <aside className="md:sticky md:top-20 h-fit border rounded-lg p-3 bg-card">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground p-2"
        >
          <ChevronLeft className="size-4" />
          Back to site
        </Link>
        <nav className="mt-2 flex flex-col gap-1">
          <AdminNavLink href="/admin" icon={<LayoutDashboard className="size-4" />}>
            Overview
          </AdminNavLink>
          <AdminNavLink href="/admin/listings" icon={<List className="size-4" />}>
            Listings
          </AdminNavLink>
          <AdminNavLink href="/admin/inquiries" icon={<Mail className="size-4" />}>
            Inquiries
          </AdminNavLink>
        </nav>
      </aside>

      <main>{children}</main>
    </div>
  );
}

function AdminNavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
      )}
    >
      {icon}
      {children}
    </Link>
  );
}
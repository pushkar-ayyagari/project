"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ShieldCheck } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import type { Role } from "@prisma/client";

export function MobileMenu({ role }: { role?: Role }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon-sm" className="md:hidden" aria-label="Open menu" />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="left" className="p-6">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-4 flex flex-col gap-1">
          <MobileLink href="/" onNavigate={() => setOpen(false)}>
            Home
          </MobileLink>
          <MobileLink href="/listings" onNavigate={() => setOpen(false)}>
            Browse
          </MobileLink>
          <MobileLink href="/favorites" onNavigate={() => setOpen(false)}>
            Favorites
          </MobileLink>
          {role === "ADMIN" && (
            <MobileLink href="/admin" onNavigate={() => setOpen(false)}>
              <ShieldCheck className="size-4 mr-1.5 inline" />
              Admin
            </MobileLink>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function MobileLink({
  href,
  onNavigate,
  children,
}: {
  href: string;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition-colors"
    >
      {children}
    </Link>
  );
}
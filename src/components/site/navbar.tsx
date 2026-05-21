import Link from "next/link";
import { Home, ShieldCheck } from "lucide-react";
import { auth, signOut } from "@/auth";
import { buttonVariants, Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MobileMenu } from "@/components/site/mobile-menu";

export async function Navbar() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="border-b bg-background sticky top-0 z-40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-2">
        <div className="flex items-center gap-2">
          <MobileMenu role={user?.role} />
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <Home className="size-5" />
            <span>Homestead</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/listings" className="hover:text-foreground/80 transition-colors">
            Browse
          </Link>
          <Link href="/favorites" className="hover:text-foreground/80 transition-colors">
            Favorites
          </Link>
          {user?.role === "ADMIN" && (
            <Link
              href="/admin"
              className="flex items-center gap-1 text-foreground/90 hover:text-foreground transition-colors"
            >
              <ShieldCheck className="size-4" />
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden sm:inline text-sm text-muted-foreground max-w-[180px] truncate">
                {user.name ?? user.email}
              </span>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <Button type="submit" variant="ghost" size="sm">
                  Sign out
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
              >
                Log in
              </Link>
              <Link href="/register" className={cn(buttonVariants({ size: "sm" }))}>
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
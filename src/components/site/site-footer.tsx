export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} Homestead. All rights reserved.</p>
        <p>Built with Next.js, Prisma, and shadcn/ui.</p>
      </div>
    </footer>
  );
}
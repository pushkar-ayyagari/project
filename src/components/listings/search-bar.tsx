"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initial = searchParams.get("q") ?? "";

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const q = String(form.get("q") ?? "").trim();
    const next = new URLSearchParams(searchParams.toString());
    if (q) next.set("q", q);
    else next.delete("q");
    router.push(`/listings?${next.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-2 rounded-full border bg-background pl-4 pr-2 py-2 shadow-sm"
    >
      <Search className="size-5 text-muted-foreground shrink-0" />
      <input
        name="q"
        defaultValue={initial}
        placeholder="City, neighborhood, or ZIP code"
        className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
      />
      <Button type="submit" size="sm" className="rounded-full">
        Search
      </Button>
    </form>
  );
}
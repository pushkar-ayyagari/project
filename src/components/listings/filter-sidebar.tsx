"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ANY = "_any";

export function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string | null | undefined) => {
      const next = new URLSearchParams(searchParams.toString());
      if (!value || value === ANY) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
      router.push(`${pathname}?${next.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const onPriceBlur =
    (key: "minPrice" | "maxPrice") => (e: React.FocusEvent<HTMLInputElement>) => {
      setParam(key, e.target.value || undefined);
    };

  const clearAll = () => router.push(pathname);

  const has = (k: string) => Boolean(searchParams.get(k));
  const anyFilterActive = [
    "q",
    "city",
    "minPrice",
    "maxPrice",
    "bedrooms",
    "bathrooms",
    "propertyType",
    "listingStatus",
  ].some(has);

  return (
    <aside className="space-y-6 p-4 border rounded-lg bg-card h-fit">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
          Filters
        </h2>
        {anyFilterActive && (
          <Button variant="link" size="sm" onClick={clearAll} className="h-auto p-0 text-xs">
            Reset
          </Button>
        )}
      </div>

      <FilterBlock label="Status">
        <Select
          value={searchParams.get("listingStatus") ?? ANY}
          onValueChange={(v) => setParam("listingStatus", v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Any</SelectItem>
            <SelectItem value="FOR_SALE">For Sale</SelectItem>
            <SelectItem value="FOR_RENT">For Rent</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="SOLD">Sold</SelectItem>
          </SelectContent>
        </Select>
      </FilterBlock>

      <FilterBlock label="Property type">
        <Select
          value={searchParams.get("propertyType") ?? ANY}
          onValueChange={(v) => setParam("propertyType", v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Any</SelectItem>
            <SelectItem value="HOUSE">House</SelectItem>
            <SelectItem value="APARTMENT">Apartment</SelectItem>
            <SelectItem value="CONDO">Condo</SelectItem>
            <SelectItem value="TOWNHOUSE">Townhouse</SelectItem>
            <SelectItem value="LAND">Land</SelectItem>
            <SelectItem value="COMMERCIAL">Commercial</SelectItem>
          </SelectContent>
        </Select>
      </FilterBlock>

      <FilterBlock label="Bedrooms">
        <Select
          value={searchParams.get("bedrooms") ?? ANY}
          onValueChange={(v) => setParam("bedrooms", v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Any</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
            <SelectItem value="5">5+</SelectItem>
          </SelectContent>
        </Select>
      </FilterBlock>

      <FilterBlock label="Bathrooms">
        <Select
          value={searchParams.get("bathrooms") ?? ANY}
          onValueChange={(v) => setParam("bathrooms", v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY}>Any</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
          </SelectContent>
        </Select>
      </FilterBlock>

      <FilterBlock label="Price">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="minPrice" className="text-xs text-muted-foreground">Min</Label>
            <Input
              id="minPrice"
              type="number"
              inputMode="numeric"
              placeholder="0"
              defaultValue={searchParams.get("minPrice") ?? ""}
              onBlur={onPriceBlur("minPrice")}
            />
          </div>
          <div>
            <Label htmlFor="maxPrice" className="text-xs text-muted-foreground">Max</Label>
            <Input
              id="maxPrice"
              type="number"
              inputMode="numeric"
              placeholder="Any"
              defaultValue={searchParams.get("maxPrice") ?? ""}
              onBlur={onPriceBlur("maxPrice")}
            />
          </div>
        </div>
      </FilterBlock>
    </aside>
  );
}

function FilterBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
      {children}
    </div>
  );
}
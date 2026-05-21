"use client";

import { useOptimistic, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toggleFavorite } from "@/components/favorites/actions";

type Props = {
  listingId: string;
  initialFavorited: boolean;
  variant?: "icon" | "full";
};

export function FavoriteButton({
  listingId,
  initialFavorited,
  variant = "icon",
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [optimisticFavorited, setOptimisticFavorited] = useOptimistic(initialFavorited);

  const handle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    startTransition(async () => {
      setOptimisticFavorited(!optimisticFavorited);
      const result = await toggleFavorite(listingId);
      if (!result.ok) {
        if (result.needsAuth) {
          toast.message("Please sign in to save listings", {
            action: {
              label: "Log in",
              onClick: () => router.push("/login"),
            },
          });
        } else {
          toast.error(result.error);
        }
      }
    });
  };

  if (variant === "full") {
    return (
      <Button
        type="button"
        variant={optimisticFavorited ? "default" : "outline"}
        onClick={handle}
        disabled={isPending}
        className="gap-2"
      >
        <Heart className={cn("size-4", optimisticFavorited && "fill-current")} />
        {optimisticFavorited ? "Saved" : "Save"}
      </Button>
    );
  }

  return (
    <button
      type="button"
      onClick={handle}
      disabled={isPending}
      className={cn(
        "absolute top-3 right-3 size-9 rounded-full bg-background/90 backdrop-blur flex items-center justify-center transition-colors hover:bg-background z-10",
        optimisticFavorited && "text-rose-500"
      )}
      aria-label={optimisticFavorited ? "Remove from favorites" : "Save to favorites"}
    >
      <Heart
        className={cn("size-5", optimisticFavorited && "fill-current")}
      />
    </button>
  );
}
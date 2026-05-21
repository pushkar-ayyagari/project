"use client";

import { CldUploadButton } from "next-cloudinary";
import { ImagePlus } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  onUpload: (url: string) => void;
};

export function CloudinaryUploadButton({ onUpload }: Props) {
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!preset || !cloudName) {
    return (
      <Button type="button" variant="outline" size="sm" disabled className="gap-1">
        <ImagePlus className="size-4" />
        Upload (configure Cloudinary first)
      </Button>
    );
  }

  return (
    <CldUploadButton
      uploadPreset={preset}
      options={{
        sources: ["local", "url", "camera"],
        multiple: true,
        maxFiles: 10,
        cloudName,
      }}
      onSuccess={(result) => {
        if (
          result.info &&
          typeof result.info === "object" &&
          "secure_url" in result.info
        ) {
          const url = String((result.info as { secure_url: string }).secure_url);
          onUpload(url);
        }
      }}
      className={cn(
        buttonVariants({ variant: "outline", size: "sm" }),
        "gap-1 cursor-pointer"
      )}
    >
      <ImagePlus className="size-4" />
      Upload image
    </CldUploadButton>
  );
}
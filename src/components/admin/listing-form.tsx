"use client";

import { useState, useTransition } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { Trash2, GripVertical } from "lucide-react";
import {
  listingFormSchema,
  type ListingFormValues,
  PROPERTY_TYPES,
  LISTING_STATUSES,
} from "@/lib/schemas/listing";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CloudinaryUploadButton } from "@/components/admin/image-uploader";
import { formatPropertyType, formatListingStatus } from "@/lib/format";

type Props = {
  defaultValues?: ListingFormValues;
  submitLabel?: string;
  onSubmit: (values: ListingFormValues) => Promise<{ ok: true; id: string } | { ok: false; error: string }>;
};

const emptyDefaults: ListingFormValues = {
  title: "",
  description: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  latitude: null,
  longitude: null,
  price: 0,
  bedrooms: 0,
  bathrooms: 0,
  squareFeet: 0,
  propertyType: "HOUSE",
  listingStatus: "FOR_SALE",
  yearBuilt: null,
  lotSize: null,
  images: [],
};

export function ListingForm({ defaultValues, submitLabel = "Save listing", onSubmit }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [urlDraft, setUrlDraft] = useState("");

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: defaultValues ?? emptyDefaults,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  const onValid = (values: ListingFormValues) => {
    startTransition(async () => {
      const result = await onSubmit(values);
      if (result.ok) {
        toast.success("Listing saved");
        router.push("/admin/listings");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  };

  const onAddUrl = () => {
    const value = urlDraft.trim();
    if (!value) return;
    append({ imageUrl: value });
    setUrlDraft("");
  };

  return (
    <form onSubmit={handleSubmit(onValid)} className="space-y-8">
      <Section title="Basic info">
        <Field label="Title" error={errors.title?.message}>
          <Input {...register("title")} placeholder="e.g. Modern downtown loft" />
        </Field>
        <Field label="Description" error={errors.description?.message}>
          <Textarea rows={6} {...register("description")} />
        </Field>
      </Section>

      <Section title="Location">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Address" error={errors.address?.message}>
            <Input {...register("address")} />
          </Field>
          <Field label="City" error={errors.city?.message}>
            <Input {...register("city")} />
          </Field>
          <Field label="State" error={errors.state?.message}>
            <Input {...register("state")} placeholder="CA, TX, NY..." />
          </Field>
          <Field label="ZIP code" error={errors.zipCode?.message}>
            <Input {...register("zipCode")} />
          </Field>
          <Field label="Latitude" error={errors.latitude?.message}>
            <Input
              type="number"
              step="any"
              {...register("latitude", { setValueAs: nullableNumber })}
            />
          </Field>
          <Field label="Longitude" error={errors.longitude?.message}>
            <Input
              type="number"
              step="any"
              {...register("longitude", { setValueAs: nullableNumber })}
            />
          </Field>
        </div>
      </Section>

      <Section title="Pricing & details">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Field label="Price (USD)" error={errors.price?.message}>
            <Input type="number" {...register("price", { valueAsNumber: true })} />
          </Field>
          <Field label="Square feet" error={errors.squareFeet?.message}>
            <Input
              type="number"
              {...register("squareFeet", { valueAsNumber: true })}
            />
          </Field>
          <Field label="Bedrooms" error={errors.bedrooms?.message}>
            <Input
              type="number"
              {...register("bedrooms", { valueAsNumber: true })}
            />
          </Field>
          <Field label="Bathrooms" error={errors.bathrooms?.message}>
            <Input
              type="number"
              step="0.5"
              {...register("bathrooms", { valueAsNumber: true })}
            />
          </Field>
          <Field label="Year built" error={errors.yearBuilt?.message}>
            <Input
              type="number"
              {...register("yearBuilt", { setValueAs: nullableInt })}
            />
          </Field>
          <Field label="Lot size (sqft)" error={errors.lotSize?.message}>
            <Input
              type="number"
              {...register("lotSize", { setValueAs: nullableInt })}
            />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Field label="Property type">
            <Controller
              control={control}
              name="propertyType"
              render={({ field }) => (
                <Select value={field.value} onValueChange={(v) => v && field.onChange(v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PROPERTY_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {formatPropertyType(t)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
          <Field label="Listing status">
            <Controller
              control={control}
              name="listingStatus"
              render={({ field }) => (
                <Select value={field.value} onValueChange={(v) => v && field.onChange(v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LISTING_STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {formatListingStatus(s)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
        </div>
      </Section>

      <Section title="Images" subtitle="Upload via Cloudinary or paste image URLs. First image is the cover.">
        <div className="flex flex-wrap items-center gap-2">
          <CloudinaryUploadButton onUpload={(url) => append({ imageUrl: url })} />

          <div className="flex items-center gap-2 flex-1 min-w-[260px]">
            <Input
              placeholder="https://… image URL"
              value={urlDraft}
              onChange={(e) => setUrlDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onAddUrl();
                }
              }}
            />
            <Button type="button" variant="outline" size="sm" onClick={onAddUrl}>
              Add
            </Button>
          </div>
        </div>

        {fields.length > 0 && (
          <ul className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            {fields.map((f, i) => (
              <li
                key={f.id}
                className="relative aspect-square rounded-md overflow-hidden border bg-muted"
              >
                <Image
                  src={f.imageUrl}
                  alt={`Image ${i + 1}`}
                  fill
                  sizes="200px"
                  className="object-cover"
                  unoptimized
                />
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="absolute top-1.5 right-1.5 rounded-md bg-background/80 p-1 hover:bg-background"
                  aria-label="Remove image"
                >
                  <Trash2 className="size-4" />
                </button>
                {i === 0 && (
                  <span className="absolute bottom-1.5 left-1.5 rounded bg-background/80 text-xs px-1.5 py-0.5 font-medium">
                    Cover
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </Section>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving…" : submitLabel}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 border rounded-lg p-5 bg-card">
      <div>
        <h2 className="font-semibold">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function nullableNumber(v: unknown): number | null {
  if (v === "" || v === null || v === undefined) return null;
  const n = typeof v === "number" ? v : parseFloat(String(v));
  return Number.isFinite(n) ? n : null;
}

function nullableInt(v: unknown): number | null {
  if (v === "" || v === null || v === undefined) return null;
  const n = typeof v === "number" ? Math.trunc(v) : parseInt(String(v), 10);
  return Number.isFinite(n) ? n : null;
}
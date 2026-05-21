"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { inquirySchema, type InquiryFormValues } from "@/lib/schemas/inquiry";
import { createInquiryAction } from "@/components/inquiries/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function InquiryForm({
  listingId,
  defaultEmail,
  defaultName,
}: {
  listingId: string;
  defaultEmail?: string;
  defaultName?: string | null;
}) {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: defaultName ?? "",
      email: defaultEmail ?? "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (values: InquiryFormValues) => {
    startTransition(async () => {
      const res = await createInquiryAction(listingId, values);
      if (res.ok) {
        toast.success("Inquiry sent! The seller will be in touch.");
        setSubmitted(true);
        reset();
      } else {
        toast.error(res.error);
      }
    });
  };

  if (submitted) {
    return (
      <div className="text-sm border border-emerald-200 bg-emerald-50 text-emerald-900 rounded-md p-4 dark:bg-emerald-950/30 dark:border-emerald-900 dark:text-emerald-200">
        Thanks — your inquiry has been sent. You can submit another below.
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="ml-1 underline underline-offset-4"
        >
          New inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="space-y-1.5">
        <Label htmlFor="inq-name">Name</Label>
        <Input id="inq-name" {...register("name")} />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="inq-email">Email</Label>
        <Input id="inq-email" type="email" {...register("email")} />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="inq-phone">Phone (optional)</Label>
        <Input id="inq-phone" type="tel" {...register("phone")} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="inq-message">Message</Label>
        <Textarea
          id="inq-message"
          rows={4}
          placeholder="I'd like to know more about…"
          {...register("message")}
        />
        {errors.message && (
          <p className="text-xs text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Sending…" : "Send inquiry"}
      </Button>
    </form>
  );
}
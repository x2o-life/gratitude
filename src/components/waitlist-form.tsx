"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { submitWaitlistEntry } from "@/lib/firebase/waitlist";
import {
  selectIsWaitlistOpen,
  selectWaitlistAudience,
  type WaitlistAudience,
  useWaitlistStore,
} from "@/stores/waitlist-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const formTitles: Record<WaitlistAudience, string> = {
  brand: "Partner with us",
  consumer: "Join the waitlist",
};

function WaitlistFormTitle({ audience }: { audience: WaitlistAudience }) {
  return (
    <h3 className="mb-4 font-bodoni-moda text-3xl font-medium">
      {formTitles[audience]}
    </h3>
  );
}

function WaitlistSuccessMessage() {
  return (
    <div className="flex flex-1 flex-col justify-center py-6">
      <p className="font-bodoni-moda text-3xl font-medium">Thank you</p>
      <p className="mt-2 text-muted-foreground leading-relaxed">
        We&apos;ll be in touch.
      </p>
    </div>
  );
}

const brandFormSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.email("Enter a valid email address."),
  phone: z.string().min(1, "Phone is required."),
  company: z.string().min(1, "Company name is required."),
});

const consumerFormSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.email("Enter a valid email address."),
});

type BrandFormValues = z.infer<typeof brandFormSchema>;
type ConsumerFormValues = z.infer<typeof consumerFormSchema>;

type WaitlistFormProps = {
  onSuccess: () => void;
};

function BrandWaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
    },
  });

  async function onSubmit(data: BrandFormValues) {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitWaitlistEntry("brand", data);
      form.reset();
      onSuccess();
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      id="waitlist-form-brand"
      className="flex flex-1 flex-col justify-center"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup className="flex flex-col gap-4">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="waitlist-brand-name">Name</FieldLabel>
              <Input
                {...field}
                id="waitlist-brand-name"
                autoComplete="name"
                placeholder="Jane Smith"
                aria-invalid={fieldState.invalid}
                disabled={isSubmitting}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="waitlist-brand-phone">Phone</FieldLabel>
                <Input
                  {...field}
                  id="waitlist-brand-phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+1 (555) 000-0000"
                  aria-invalid={fieldState.invalid}
                  disabled={isSubmitting}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="waitlist-brand-email">Work email</FieldLabel>
                <Input
                  {...field}
                  id="waitlist-brand-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  aria-invalid={fieldState.invalid}
                  disabled={isSubmitting}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <Controller
          name="company"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="waitlist-brand-company">Company</FieldLabel>
              <Input
                {...field}
                id="waitlist-brand-company"
                autoComplete="organization"
                placeholder="Acme Coffee Co."
                aria-invalid={fieldState.invalid}
                disabled={isSubmitting}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </FieldGroup>
      {submitError && (
        <p className="mt-3 text-sm text-destructive">{submitError}</p>
      )}
      <Field orientation="horizontal" className="mt-4 justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="shrink-0 bg-violet-300 text-black hover:bg-gray-900 hover:text-white"
        >
          {isSubmitting ? "Submitting..." : "Request access"}
        </Button>
      </Field>
    </form>
  );
}

function ConsumerWaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<ConsumerFormValues>({
    resolver: zodResolver(consumerFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  async function onSubmit(data: ConsumerFormValues) {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitWaitlistEntry("consumer", data);
      form.reset();
      onSuccess();
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      id="waitlist-form-consumer"
      className="flex flex-1 flex-col justify-center"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup className="flex flex-col gap-4">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="waitlist-consumer-name">Name</FieldLabel>
              <Input
                {...field}
                id="waitlist-consumer-name"
                autoComplete="name"
                placeholder="Jane Smith"
                aria-invalid={fieldState.invalid}
                disabled={isSubmitting}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="waitlist-consumer-email">Email</FieldLabel>
              <Input
                {...field}
                id="waitlist-consumer-email"
                type="email"
                autoComplete="email"
                placeholder="you@email.com"
                aria-invalid={fieldState.invalid}
                disabled={isSubmitting}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </FieldGroup>
      {submitError && (
        <p className="mt-3 text-sm text-destructive">{submitError}</p>
      )}
      <Field orientation="horizontal" className="mt-4 justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="shrink-0 bg-orange-300 text-black hover:bg-gray-900 hover:text-white"
        >
          {isSubmitting ? "Submitting..." : "Get early access"}
        </Button>
      </Field>
    </form>
  );
}

export default function WaitlistForm() {
  const audience = useWaitlistStore(selectWaitlistAudience);
  const isOpen = useWaitlistStore(selectIsWaitlistOpen);
  const open = useWaitlistStore((store) => store.open);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const activeAudience: WaitlistAudience = audience ?? "brand";

  useEffect(() => {
    if (isOpen && audience === null) {
      open("brand");
    }
  }, [isOpen, audience, open]);

  useEffect(() => {
    if (!isOpen) {
      setSubmitSuccess(false);
    }
  }, [isOpen]);

  useEffect(() => {
    setSubmitSuccess(false);
  }, [activeAudience]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col justify-center">
      {submitSuccess ? (
        <WaitlistSuccessMessage />
      ) : (
        <>
          <WaitlistFormTitle audience={activeAudience} />
          {activeAudience === "brand" ? (
            <BrandWaitlistForm
              key="brand"
              onSuccess={() => setSubmitSuccess(true)}
            />
          ) : (
            <ConsumerWaitlistForm
              key="consumer"
              onSuccess={() => setSubmitSuccess(true)}
            />
          )}
        </>
      )}
    </div>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, Check, Store } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { MonoLabel, PillButton, Sparkle } from "@/components/home/kit";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { submitWaitlistEntry } from "@/lib/firebase/waitlist";
import { cn } from "@/lib/utils";
import {
  selectWaitlistAudience,
  useWaitlistStore,
  type WaitlistAudience,
} from "@/stores/waitlist-store";

const formTitles: Record<
  WaitlistAudience,
  { title: string; description: string }
> = {
  brand: {
    title: "Partner with <em>Gratitude</em>",
    description:
      "Tell us about your business. We'll help you launch your first campaign.",
  },
  consumer: {
    title: "Get <em>early</em> access",
    description:
      "Be first to know when Gratitude opens near you. Free for people who shop.",
  },
};

function WaitlistFormTitle({ audience }: { audience: WaitlistAudience }) {
  const { title, description } = formTitles[audience];
  const [before, emphasis, after] = title.split(/<em>|<\/em>/);
  return (
    <div className="mb-6">
      <h3
        className={cn(
          "font-normal font-serif text-4xl leading-none tracking-tight md:text-5xl",
          audience === "brand"
            ? "[&_em]:text-studio-strong"
            : "[&_em]:text-pass-strong",
        )}
      >
        {before}
        <em>{emphasis}</em>
        {after}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

/** The peak-end moment: a sealed card that peels open. */
function WaitlistSuccessMessage({ audience }: { audience: WaitlistAudience }) {
  const accent = audience === "brand" ? "var(--studio)" : "var(--pass)";
  return (
    <div className="relative flex flex-1 flex-col justify-center py-6">
      <motion.div
        initial={{ rotateX: 0, opacity: 1 }}
        animate={{ rotateX: -110, opacity: 0 }}
        transition={{ delay: 0.25, duration: 0.6, ease: "easeIn" }}
        style={{ transformOrigin: "top", backgroundColor: accent }}
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-2xl border-2 border-ink"
      >
        <MonoLabel className="text-ink">Sealed for you</MonoLabel>
      </motion.div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", damping: 14 }}
      >
        <div className="flex items-center gap-3">
          <span
            className="flex size-10 items-center justify-center rounded-full border-2 border-ink"
            style={{ backgroundColor: accent }}
          >
            <Check className="size-5" />
          </span>
          <p className="font-serif text-5xl leading-none">You&apos;re in.</p>
          <Sparkle className="size-7" />
        </div>
        <p className="mt-4 max-w-sm text-muted-foreground">
          {audience === "brand"
            ? "We'll reach out to set up your first campaign with you."
            : "We'll let you know the moment Gratitude opens near you."}
        </p>
      </motion.div>
    </div>
  );
}

const FIELD =
  "h-11 rounded-xl border-2 border-ink/15 bg-white px-3 shadow-none focus-visible:border-ink focus-visible:ring-0";

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
                className={FIELD}
                {...field}
                id="waitlist-brand-name"
                autoComplete="name"
                placeholder="Mike Perera"
                aria-invalid={fieldState.invalid}
                disabled={isSubmitting}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                  className={FIELD}
                  {...field}
                  id="waitlist-brand-phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+94 77 123 4567"
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
                <FieldLabel htmlFor="waitlist-brand-email">
                  Work email
                </FieldLabel>
                <Input
                  className={FIELD}
                  {...field}
                  id="waitlist-brand-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@business.lk"
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
                className={FIELD}
                {...field}
                id="waitlist-brand-company"
                autoComplete="organization"
                placeholder="Brew Lab"
                aria-invalid={fieldState.invalid}
                disabled={isSubmitting}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      {submitError && (
        <p className="mt-3 text-sm text-destructive">{submitError}</p>
      )}
      <Field orientation="horizontal" className="mt-4 justify-end">
        <PillButton
          type="submit"
          disabled={isSubmitting}
          accent="var(--studio)"
          icon={<Store />}
        >
          {isSubmitting ? "Sending..." : "Request a call"}
        </PillButton>
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
                className={FIELD}
                {...field}
                id="waitlist-consumer-name"
                autoComplete="name"
                placeholder="Mike Perera"
                aria-invalid={fieldState.invalid}
                disabled={isSubmitting}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                className={FIELD}
                {...field}
                id="waitlist-consumer-email"
                type="email"
                autoComplete="email"
                placeholder="you@email.com"
                aria-invalid={fieldState.invalid}
                disabled={isSubmitting}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      {submitError && (
        <p className="mt-3 text-sm text-destructive">{submitError}</p>
      )}
      <Field orientation="horizontal" className="mt-4 justify-end">
        <PillButton
          type="submit"
          disabled={isSubmitting}
          accent="var(--pass)"
          icon={<ArrowRight />}
        >
          {isSubmitting ? "Sending..." : "Get early access"}
        </PillButton>
      </Field>
    </form>
  );
}

export default function WaitlistForm() {
  const audience = useWaitlistStore(selectWaitlistAudience);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  return (
    <div className="flex flex-1 flex-col justify-center">
      {submitSuccess ? (
        <WaitlistSuccessMessage audience={audience} />
      ) : (
        <>
          <WaitlistFormTitle audience={audience} />
          {audience === "brand" ? (
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

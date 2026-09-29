"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { INTERESTS, LIMITS, ROLES, type FieldName, type WaitlistState, type WaitlistValues } from "@/lib/waitlist/fields";
import { joinWaitlist } from "./actions";

const INITIAL: WaitlistState = { status: "idle" };

type Props = {
  alreadyJoined: boolean;
  defaults: WaitlistValues;
  source: string;
};

export function WaitlistForm({ alreadyJoined, defaults, source }: Props) {
  const [state, formAction, pending] = useActionState(joinWaitlist, INITIAL);
  const [dismissed, setDismissed] = useState<WaitlistState | "initial" | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const startedRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  const showSuccess =
    (state.status === "success" && dismissed !== state) ||
    (state.status === "idle" && alreadyJoined && dismissed !== "initial");

  useEffect(() => {
    if (startedRef.current && !startedRef.current.value) startedRef.current.value = String(Date.now());
  });

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
    if (state.status === "error") {
      const invalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      (invalid ?? formRef.current?.querySelector<HTMLElement>("#form-error"))?.focus();
    }
  }, [state]);

  if (showSuccess) {
    const duplicate = state.status === "success" && state.duplicate;
    return (
      <div className="border border-line bg-ink-raised/40 p-6 sm:p-10" role="status" aria-live="polite">
        <p className="label flex items-center gap-2 text-signal">
          <span aria-hidden="true" className="inline-block size-2 bg-signal" />
          {duplicate ? "Already listed" : "Confirmed"}
        </p>
        <h2 ref={successRef} tabIndex={-1} className="font-display mt-8 text-5xl leading-none outline-none sm:text-6xl">
          You&rsquo;re on the list.
        </h2>
        <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-fg-muted">
          {duplicate
            ? "That email was already on the list, so there is nothing else to do."
            : "We’ll reach out when there’s something worth showing you."}
        </p>
        <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-fg-subtle">
          No confirmation email, no newsletter. The next message you get from us will be a real one.
        </p>
        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:gap-8">
          <Link href="/roadmap" className="text-[15px] text-fg underline decoration-line-strong underline-offset-[6px] hover:decoration-signal">
            See what we&rsquo;re building next
          </Link>
          <button
            type="button"
            onClick={() => setDismissed(state.status === "success" ? state : "initial")}
            className="text-left text-[15px] text-fg-muted underline decoration-line-strong underline-offset-[6px] hover:text-fg"
          >
            Submit another response
          </button>
        </div>
      </div>
    );
  }

  const errors: Partial<Record<FieldName, string>> = state.status === "error" ? state.fieldErrors : {};
  const values: WaitlistValues = state.status === "error" ? state.values : defaults;
  const formKey = state.status === "error" ? JSON.stringify(state.values) : "initial";

  return (
    <form ref={formRef} key={formKey} action={formAction} className="flex flex-col gap-12">
      {state.status === "error" ? (
        <div
          id="form-error"
          tabIndex={-1}
          role="alert"
          className="border border-signal/60 bg-signal/5 px-4 py-3 text-[15px] text-fg outline-none"
        >
          {state.message}
        </div>
      ) : null}

      <fieldset className="flex flex-col gap-6">
        <legend className="label mb-6 text-fg-subtle">
          <span className="text-signal">01</span> · You
        </legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field name="name" label="Name" required autoComplete="name" maxLength={LIMITS.name} values={values} errors={errors} />
          <Field
            name="email"
            label="Email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            maxLength={LIMITS.email}
            values={values}
            errors={errors}
          />
          <Field name="phone" label="Phone" type="tel" autoComplete="tel" maxLength={LIMITS.phone} values={values} errors={errors} />
          <Field name="company" label="Company" autoComplete="organization" maxLength={LIMITS.company} values={values} errors={errors} />
          <Field
            name="website"
            label="Website"
            autoComplete="url"
            inputMode="url"
            placeholder="acme.ai"
            maxLength={LIMITS.website}
            values={values}
            errors={errors}
          />
          <Field
            name="linkedin"
            label="LinkedIn"
            inputMode="url"
            placeholder="linkedin.com/in/…"
            maxLength={LIMITS.linkedin}
            values={values}
            errors={errors}
          />
        </div>
      </fieldset>

      <fieldset aria-describedby={errors.role ? "role-error" : undefined}>
        <legend className="label mb-2 text-fg-subtle">
          <span className="text-signal">02</span> · What best describes you?
        </legend>
        <p className="mb-5 text-[14px] text-fg-subtle">Optional. Pick one.</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {ROLES.map((r) => (
            <Choice key={r.value} type="radio" name="role" value={r.value} label={r.label} defaultChecked={values.role === r.value} />
          ))}
        </div>
        {errors.role ? <ErrorText id="role-error">{errors.role}</ErrorText> : null}
      </fieldset>

      <fieldset aria-describedby={errors.interest ? "interest-error" : undefined}>
        <legend className="label mb-2 text-fg-subtle">
          <span className="text-signal">03</span> · What are you interested in?
        </legend>
        <p className="mb-5 text-[14px] text-fg-subtle">Optional. Pick any.</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {INTERESTS.map((i) => (
            <Choice
              key={i.value}
              type="checkbox"
              name="interest"
              value={i.value}
              label={i.label}
              defaultChecked={values.interest?.includes(i.value) ?? false}
            />
          ))}
        </div>
        {errors.interest ? <ErrorText id="interest-error">{errors.interest}</ErrorText> : null}
      </fieldset>

      <div className="flex flex-col gap-3">
        <label htmlFor="message" className="label text-fg-subtle">
          <span className="text-signal">04</span> · What would you want AGENYRA to help you do?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={LIMITS.message}
          defaultValue={values.message}
          placeholder="Optional. A sentence is plenty."
          className="w-full resize-y border border-line-strong bg-ink-raised/40 px-4 py-3 text-[16px] leading-relaxed text-fg placeholder:text-fg-subtle/70 transition-colors hover:border-fg-subtle focus:border-fg focus:outline-none focus-visible:outline-none"
        />
      </div>

      <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="nickname">Leave this field empty</label>
        <input id="nickname" name="nickname" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <input ref={startedRef} type="hidden" name="started_at" defaultValue="" />
      <input type="hidden" name="source" value={source} />

      <div className="flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[40ch] text-[14px] leading-relaxed text-fg-subtle">
          Used only to contact you about AGENYRA. No newsletter, and we don&rsquo;t share it.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex h-12 items-center justify-center gap-3 border border-fg bg-fg px-6 text-[15px] font-medium text-ink transition-colors hover:bg-white disabled:cursor-progress disabled:opacity-70"
        >
          {pending ? "Joining…" : "Join the early network"}
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-x-0.5">
            <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  name: Exclude<FieldName, "interest" | "role" | "message">;
  label: string;
  values: WaitlistValues;
  errors: Partial<Record<FieldName, string>>;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">;

function Field({ name, label, values, errors, required, ...rest }: FieldProps) {
  const error = errors[name];
  const errorId = `${name}-error`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="flex items-baseline justify-between text-[14px] text-fg">
        <span>{label}</span>
        <span className="label text-fg-subtle">{required ? "Required" : "Optional"}</span>
      </label>
      <input
        id={name}
        name={name}
        type="text"
        required={required}
        defaultValue={values[name]}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`h-12 w-full border bg-ink-raised/40 px-4 text-[16px] text-fg placeholder:text-fg-subtle/70 transition-colors hover:border-fg-subtle focus:border-fg focus:outline-none focus-visible:outline-none ${
          error ? "border-signal" : "border-line-strong"
        }`}
        {...rest}
      />
      {error ? <ErrorText id={errorId}>{error}</ErrorText> : null}
    </div>
  );
}

function Choice({
  type,
  name,
  value,
  label,
  defaultChecked,
}: {
  type: "radio" | "checkbox";
  name: string;
  value: string;
  label: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex min-h-12 cursor-pointer items-center gap-3 border border-line-strong px-3.5 py-2.5 text-[15px] text-fg-muted transition-colors hover:border-fg-subtle has-checked:border-fg has-checked:bg-ink-raised has-checked:text-fg has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-signal">
      <input type={type} name={name} value={value} defaultChecked={defaultChecked} className="peer sr-only" />
      <span
        aria-hidden="true"
        className={`inline-block size-3 shrink-0 border border-fg-subtle peer-checked:border-signal peer-checked:bg-signal ${
          type === "radio" ? "rounded-full" : ""
        }`}
      />
      {label}
    </label>
  );
}

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1 text-[14px] text-signal">
      {children}
    </p>
  );
}

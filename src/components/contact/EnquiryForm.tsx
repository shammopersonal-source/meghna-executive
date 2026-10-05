"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { sendEnquiry, type EnquiryState } from "@/app/contact/actions";
import styles from "./EnquiryForm.module.css";

type Option = { value: string; label: string; group: string };

export default function EnquiryForm({ options, defaultHouse }: { options: Option[]; defaultHouse?: string }) {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(sendEnquiry, { status: "idle" });
  const [started, setStarted] = useState(0);
  const statusRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStarted(Date.now());
  }, []);
  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  if (state.status === "sent") {
    return (
      <p ref={statusRef} tabIndex={-1} className={styles.sent} role="status">
        {state.message}
      </p>
    );
  }

  const err = state.errors ?? {};
  const val = state.values ?? {};
  const groups = Array.from(new Set(options.map((o) => o.group)));

  return (
    <form action={action} className={styles.form} noValidate>
      {state.status === "error" ? (
        <p ref={statusRef} tabIndex={-1} className={styles.alert} role="alert">
          {state.message}
        </p>
      ) : null}

      <div className={styles.field}>
        <label htmlFor="house">Who would you like to reach?</label>
        <select
          id="house"
          name="house"
          defaultValue={val.house ?? defaultHouse ?? "group"}
          aria-invalid={!!err.house}
          aria-describedby={err.house ? "house-err" : undefined}
        >
          <option value="group">Meghna Executive Holdings (group)</option>
          {groups.map((g) => (
            <optgroup key={g} label={g}>
              {options
                .filter((o) => o.group === g)
                .map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
        {err.house ? (
          <p id="house-err" className={styles.error}>
            {err.house}
          </p>
        ) : null}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            defaultValue={val.name}
            aria-invalid={!!err.name}
            aria-describedby={err.name ? "name-err" : undefined}
          />
          {err.name ? (
            <p id="name-err" className={styles.error}>
              {err.name}
            </p>
          ) : null}
        </div>
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={val.email}
            aria-invalid={!!err.email}
            aria-describedby={err.email ? "email-err" : undefined}
          />
          {err.email ? (
            <p id="email-err" className={styles.error}>
              {err.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="phone">
          Phone <span className={styles.optional}>(optional)</span>
        </label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" defaultValue={val.phone} />
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={val.message}
          aria-invalid={!!err.message}
          aria-describedby={err.message ? "message-err" : undefined}
        />
        {err.message ? (
          <p id="message-err" className={styles.error}>
            {err.message}
          </p>
        ) : null}
      </div>

      {/* Spam protection: hidden from people, irresistible to bots */}
      <div className={styles.hp} aria-hidden="true">
        <label htmlFor="company_website">Leave this empty</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="started" value={started || ""} />

      <button type="submit" className="btn btn-solid" disabled={pending} data-cta="enquiry-submit">
        {pending ? "Sending…" : "Send message"}
        <span className="arrow" aria-hidden="true" />
      </button>
    </form>
  );
}

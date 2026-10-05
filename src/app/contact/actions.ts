"use server";

import { houses } from "@/content/houses";
import { site } from "@/content/site";

export type EnquiryState = {
  status: "idle" | "error" | "sent";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message" | "house", string>>;
  values?: { name?: string; email?: string; phone?: string; message?: string; house?: string };
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Enquiry handler. Works with and without JavaScript (progressively enhanced
 * server action). Delivery: POSTs JSON to ENQUIRY_WEBHOOK_URL when set (e.g. a
 * CRM, Slack or email relay); otherwise logs on the server. See README.
 */
export async function sendEnquiry(_prev: EnquiryState, form: FormData): Promise<EnquiryState> {
  const v = {
    name: String(form.get("name") ?? "").trim(),
    email: String(form.get("email") ?? "").trim(),
    phone: String(form.get("phone") ?? "").trim(),
    message: String(form.get("message") ?? "").trim(),
    house: String(form.get("house") ?? "group"),
  };

  // Spam protection: honeypot + minimum fill time.
  const honeypot = String(form.get("company_website") ?? "");
  const started = Number(form.get("started") ?? 0);
  if (honeypot || (started && Date.now() - started < 2500)) {
    return { status: "sent", message: "Thank you. Your message is on its way." };
  }

  const errors: EnquiryState["errors"] = {};
  if (v.name.length < 2) errors.name = "Please tell us your name.";
  if (!emailRe.test(v.email)) errors.email = "Please enter a valid email address, like name@example.com.";
  if (v.message.length < 10) errors.message = "Please write a few words (at least 10 characters).";
  const target = v.house === "group" ? null : houses.find((h) => h.slug === v.house);
  if (v.house !== "group" && !target) errors.house = "Please choose a house from the list.";
  if (Object.keys(errors).length) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values: v };
  }

  const route = target?.locations.find((l) => l.email)?.email ?? site.email;
  const payload = {
    receivedAt: new Date().toISOString(),
    routeTo: route,
    ...v,
    houseName: target?.name ?? "Meghna Executive Holdings",
  };

  const hook = process.env.ENQUIRY_WEBHOOK_URL;
  try {
    if (hook) {
      const res = await fetch(hook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } else {
      console.info("[enquiry]", JSON.stringify(payload));
    }
  } catch (e) {
    console.error("[enquiry] delivery failed", e);
    return {
      status: "error",
      message: `We couldn’t send your message just now. Please call ${site.hotline} or email ${site.email}.`,
      values: v,
    };
  }

  return {
    status: "sent",
    message: `Thank you, ${v.name.split(" ")[0]}. ${target ? target.name.replace(/ Ltd\.$/, "") : "Our team"} will be in touch.`,
  };
}

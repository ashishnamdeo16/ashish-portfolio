"use client";

import { useState } from "react";
import ScrollReveal from "@/app/components/common/ScrollReveal";
import SectionHeading from "@/app/components/common/SectionHeading";

export default function Contact({ darkModeFlag }: { darkModeFlag?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xnjnaapb", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <ScrollReveal as="section" id="contact" className="flex flex-col items-center justify-center">
      <SectionHeading tag="h2" title="Contact" accent className="mb-10 text-center" />

      <form onSubmit={handleSubmit} className="grid gap-5 w-full max-w-lg">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] prose-body text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] transition-colors"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] prose-body text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] transition-colors"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          required
          rows={5}
          className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] prose-body text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] transition-colors resize-none"
        />

        <button
          type="submit"
          className="px-5 py-3 rounded-lg bg-[var(--accent)] text-white prose-body font-medium hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:opacity-60"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : "Send"}
        </button>

        {status === "success" && <p className="text-green-600 dark:text-green-400 mt-3 prose-caption">Message sent successfully!</p>}
        {status === "error" && <p className="text-red-600 dark:text-red-400 mt-3 prose-caption">Failed to send message.</p>}
      </form>
    </ScrollReveal>
  );
}

import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setStatus("sending");

  const form = e.currentTarget; // TypeScript knows this is HTMLFormElement
  const formData = new FormData(form);

  try {
    const res = await fetch("https://formspree.io/f/xnjnaapb", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });

    if (res.ok) {
      setStatus("success");
      form.reset(); // Safe now
    } else {
      setStatus("error");
    }
  } catch (err) {
    console.error(err);
    setStatus("error");
  }
};


  return (
    <section id="contact" className="flex flex-col items-center justify-center py-16">
      <h2 className="text-2xl font-bold mb-8">Contact</h2>

      <form onSubmit={handleSubmit} className="grid gap-4 w-full max-w-lg">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="p-2 rounded-md border border-gray-300 bg-white text-gray-800"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="p-2 rounded-md border border-gray-300 bg-white text-gray-800"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          required
          rows={5}
          className="p-2 rounded-md border border-gray-300 bg-white text-gray-800"
        ></textarea>

        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-emerald-400 text-black hover:bg-emerald-500 transition-colors duration-300"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : "Send"}
        </button>

        {status === "success" && <p className="text-green-600 mt-2">Message sent successfully!</p>}
        {status === "error" && <p className="text-red-600 mt-2">Failed to send message.</p>}
      </form>
    </section>
  );
}

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, X } from "lucide-react";

const EMAIL = "muktasuryavanshi48@gmail.com";
// Messages are handled by Netlify Forms (see the hidden form in index.html).
// Optional: set VITE_WEB3FORMS_KEY to send through Web3Forms instead (also works on localhost).
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-white/10 dark:bg-white/[0.03] dark:text-white";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const send = async () => {
    if (ACCESS_KEY) {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: ACCESS_KEY, subject: `Portfolio message from ${form.name}`, ...form }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.message || `Request failed (${res.status})`);
      return;
    }

    if (import.meta.env.DEV) {
      throw new Error("Netlify Forms only works on the live site, not on localhost.");
    }

    const res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ "form-name": "contact", "bot-field": "", ...form }).toString(),
    });
    if (!res.ok) throw new Error(`Request failed (${res.status})`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await send();
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      setErrorMsg(
        err.message === "Failed to fetch"
          ? "Network error. Check your connection and try again. Or email me at"
          : `Couldn't send your message (${err.message}). Please email me at`
      );
      setStatus("error");
    }
  };

  useEffect(() => {
    if (status !== "sent" && status !== "error") return;
    const t = setTimeout(() => setStatus("idle"), 6000);
    return () => clearTimeout(t);
  }, [status]);

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-white/[0.03]"
    >
      <h3 className="mb-6 text-lg font-semibold text-slate-900 dark:text-white">
        Send me a message
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Your name" value={form.name} onChange={update} className={inputClass} />
        <input name="email" type="email" required placeholder="Your email" value={form.email} onChange={update} className={inputClass} />
      </div>
      <textarea
        name="message"
        required
        rows={5}
        placeholder="Your message"
        value={form.message}
        onChange={update}
        className={`${inputClass} mt-4 resize-none`}
      />

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-600 disabled:opacity-60"
        >
          <Send size={16} /> {status === "sending" ? "Sending..." : "Send Message"}
        </button>
      </div>
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex justify-center px-4">
      <AnimatePresence>
        {(status === "sent" || status === "error") && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl px-4 py-3 text-sm text-white shadow-2xl ${
              status === "sent" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {status === "sent" ? <CheckCircle2 size={18} className="mt-0.5 shrink-0" /> : <AlertCircle size={18} className="mt-0.5 shrink-0" />}
            <span className="flex-1">
              {status === "sent"
                ? "Message sent! Thank you, I will reply soon."
                : (
                  <>
                    {errorMsg}{" "}
                    <a href={`mailto:${EMAIL}`} className="font-semibold underline">
                      {EMAIL}
                    </a>
                  </>
                )}
            </span>
            <button type="button" onClick={() => setStatus("idle")} aria-label="Dismiss" className="opacity-80 hover:opacity-100">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </form>
  );
}

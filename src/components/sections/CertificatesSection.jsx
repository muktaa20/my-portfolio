import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, X } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { CERTIFICATES } from "../../utils/data";

export default function CertificatesSection() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => e.key === "Escape" && setActive(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="certificates" className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow="Courses" title="My" highlight="Certificates">
          Courses I have completed to improve my front-end skills.
        </SectionHeading>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {CERTIFICATES.map((cert, i) => (
            <motion.button
              key={cert.id}
              onClick={() => setActive(cert)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03]"
            >
              <div className="overflow-hidden bg-slate-50 dark:bg-white/5">
                <img
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  loading="lazy"
                  className="aspect-[3/2] w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-start gap-3 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                  <Award size={20} />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{cert.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {cert.issuer} · {cert.date}
                  </p>
                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                    Credential ID: {cert.id}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <button
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            >
              <X size={22} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={active.image}
              alt={`${active.title} certificate`}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] max-w-full rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

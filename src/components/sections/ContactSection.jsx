import { motion } from "framer-motion";
import { MapPin, Mail } from "lucide-react";

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Location",
    value: "Burhanpur, India",
    href: "https://maps.google.com/?q=Burhanpur",
  },
  {
    icon: Mail,
    label: "Email",
    value: "muktasuryavanshi48@gmail.com",
    href: "mailto:muktasuryavanshi48@gmail.com",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-500">
            Let&apos;s talk
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Contact <span className="text-gradient">Me</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Have a project or a job opening? Or just want to say hi? Email me or
            message me on LinkedIn and I will reply soon.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="group flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03]"
            >
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/20 transition group-hover:scale-105">
                <Icon size={24} />
              </span>
              <h3 className="mb-1 text-base font-semibold text-slate-900 dark:text-white">
                {label}
              </h3>
              <p className="break-words text-sm text-slate-600 dark:text-slate-400">
                {value}
              </p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

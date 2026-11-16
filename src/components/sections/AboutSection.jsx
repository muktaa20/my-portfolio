import { motion } from "framer-motion";
import { Heart, Coffee, BookOpen } from "lucide-react";
import SIGNATURE from "../../assets/images/signa.svg";

const PASSIONS = [
  {
    icon: Heart,
    title: "Easy to Use",
    description: "Making websites that are simple and easy to use.",
  },
  {
    icon: Coffee,
    title: "Problem Solving",
    description: "Breaking big problems into small steps and solving them.",
  },
  {
    icon: BookOpen,
    title: "Always Learning",
    description: "Learning new tools and better ways to write code.",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function AboutSection() {
  return (
    <section id="about" className="bg-grid-glow py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-500">
            Get to know me
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            About <span className="text-gradient">Me</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
          >
            <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
              My Story
            </h3>
            <p className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300">
              I am a front-end developer. I take ideas and turn them into
              websites that look good, load fast and are easy to use on any
              screen size.
            </p>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              I mostly work with <b>React</b>, <b>JavaScript</b> and{" "}
              <b>Tailwind CSS</b>. I like writing clean code that is easy to
              read and easy to change later.
            </p>

            <div className="mt-8 hidden items-center gap-3 md:flex">
              <img
                src={SIGNATURE}
                alt="Mukta Suryavanshi signature"
                className="h-12 w-auto opacity-80 dark:invert"
              />
            </div>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid gap-4"
          >
            {PASSIONS.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-500/40 dark:border-white/10 dark:bg-white/[0.03]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/20">
                  <Icon size={22} />
                </span>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    {title}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

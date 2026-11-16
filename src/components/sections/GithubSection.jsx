import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub } from "react-icons/fi";
import { ArrowUpRight } from "lucide-react";

const GITHUB_USER = "muktaa20";
const GITHUB_URL = `https://github.com/${GITHUB_USER}`;
const API_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`;

const LEVEL_CLASSES = [
  "bg-slate-200 dark:bg-white/[0.06]",
  "bg-blue-200 dark:bg-blue-900",
  "bg-blue-400 dark:bg-blue-700",
  "bg-blue-500 dark:bg-blue-500",
  "bg-blue-700 dark:bg-blue-300",
];

function useContributions() {
  const [state, setState] = useState({ status: "loading", days: [], total: 0 });
  useEffect(() => {
    let cancelled = false;
    fetch(API_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        if (cancelled) return;
        const days = data.contributions || [];
        const total = days.reduce((sum, d) => sum + d.count, 0);
        setState({ status: "ready", days, total });
      })
      .catch(() => !cancelled && setState({ status: "error", days: [], total: 0 }));
    return () => {
      cancelled = true;
    };
  }, []);
  return state;
}

function getStreaks(days) {
  let current = 0;
  let longest = 0;
  let run = 0;
  days.forEach((d) => {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  });
  // current streak: count back from today (allow today to be empty)
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) current++;
    else if (i !== days.length - 1) break;
  }
  return { current, longest };
}

function ContributionGrid({ days }) {
  if (!days.length) return null;
  // pad start so first column begins on Sunday
  const firstDay = new Date(`${days[0].date}T00:00`).getDay();
  const cells = [...Array(firstDay).fill(null), ...days];
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return (
    <div className="overflow-x-auto pb-2">
      <div className="mx-auto flex w-max gap-[3px]">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day, di) =>
              day ? (
                <div
                  key={day.date}
                  title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${new Date(`${day.date}T00:00`).toDateString()}`}
                  className={`h-[11px] w-[11px] rounded-[2px] ${LEVEL_CLASSES[day.level]}`}
                />
              ) : (
                <div key={`e${di}`} className="h-[11px] w-[11px]" />
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GithubSection() {
  const { status, days, total } = useContributions();
  const streaks = getStreaks(days);
  return (
    <section id="activity" className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-500">
            Coding every day
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            GitHub <span className="text-gradient">Activity</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
            My live GitHub graph. Each square is one day, and darker squares
            mean I wrote more code that day.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-white/10 dark:bg-white/[0.03]"
        >
          <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-white/10">
                <FiGithub size={20} />
              </span>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  @muktaa20
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Contributions in the last year
                </p>
              </div>
            </div>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 self-start rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-500 ring-1 ring-blue-500/20 transition hover:bg-blue-500/20 sm:self-auto"
            >
              View Profile <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="bg-slate-50 p-4 sm:p-6 dark:bg-transparent">
            {status === "loading" && (
              <div className="h-[110px] animate-pulse rounded-lg bg-slate-200 dark:bg-white/5" />
            )}
            {status === "error" && (
              <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                Couldn&apos;t load live activity right now —{" "}
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  view it on GitHub
                </a>
                .
              </p>
            )}
            {status === "ready" && (
              <>
                <div className="mb-5 grid grid-cols-3 gap-3 text-center">
                  {[
                    { label: "Contributions (last year)", value: total },
                    { label: "Current streak", value: `${streaks.current}d` },
                    { label: "Longest streak", value: `${streaks.longest}d` },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-white/[0.03]">
                      <p className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">{s.value}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
                    </div>
                  ))}
                </div>
                <ContributionGrid days={days} />
                <div className="mt-3 flex items-center justify-end gap-1 text-xs text-slate-500 dark:text-slate-400">
                  Less
                  {LEVEL_CLASSES.map((c) => (
                    <span key={c} className={`h-[11px] w-[11px] rounded-[2px] ${c}`} />
                  ))}
                  More
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

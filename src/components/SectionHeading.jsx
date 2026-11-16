export default function SectionHeading({ eyebrow, title, highlight, children }) {
  return (
    <div className="mb-12 text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-500">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        {title} <span className="text-gradient">{highlight}</span>
      </h2>
      {children && (
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
          {children}
        </p>
      )}
    </div>
  );
}

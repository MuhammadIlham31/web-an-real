export function SectionHeading({ title, subtitle, dark = false }) {
  return (
    <div className="mb-10">
      <h2 className={`text-4xl md:text-5xl font-bold ${dark ? "text-primary-light" : "text-text-primary"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-2 ${dark ? "text-[#0D47A1]" : "text-text-secondary"}`}>{subtitle}</p>
      )}
    </div>
  );
}

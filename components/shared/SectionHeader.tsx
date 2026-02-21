interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({ title, subtitle, centered = true, className = '' }: SectionHeaderProps) {
  return (
    <div className={`mb-8 sm:mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="text-3xl sm:text-4xl font-bold text-text tracking-tight">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-lg text-text-muted max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}

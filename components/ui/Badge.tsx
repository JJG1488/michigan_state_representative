interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'new' | 'primary' | 'secondary';
  className?: string;
}

const variantStyles = {
  default: 'bg-surface text-text-muted',
  new: 'bg-cta-green text-white animate-new-badge',
  primary: 'bg-primary text-white',
  secondary: 'bg-secondary text-white',
};

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}

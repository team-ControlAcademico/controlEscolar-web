interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  tone?: 'primary' | 'secondary';
}

const sizeClasses: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-9 w-9 text-sm',
  lg: 'h-12 w-12 text-base',
};

const toneClasses: Record<NonNullable<AvatarProps['tone']>, string> = {
  primary: 'bg-primary-100 text-primary-700',
  secondary: 'bg-secondary-400 text-primary-900',
};

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({ name, size = 'md', tone = 'secondary' }: AvatarProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-full font-semibold shadow-sm ${sizeClasses[size]} ${toneClasses[tone]}`}
      title={name}
    >
      {initials(name)}
    </div>
  );
}

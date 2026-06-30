import { Reveal } from './reveal'
import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  className?: string
}) {
  return (
    <Reveal className={cn('mx-auto max-w-2xl text-center', className)}>
      {eyebrow && (
        <p className="text-sm font-medium text-cyan">{eyebrow}</p>
      )}
      <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}

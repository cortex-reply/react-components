import { FC } from 'react'

interface SvgGradientProps {
  gradientId: string
  colors?: string[]
  direction?: 'vertical' | 'horizontal'
}

export const SvgGradient: FC<SvgGradientProps> = ({
  gradientId,
  colors = ['rgb(var(--primary))', 'rgb(var(--accent))'],
  direction = 'vertical',
}) => {
  const gradientProps =
    direction === 'vertical'
      ? { x1: '0%', y1: '0%', x2: '0%', y2: '100%' }
      : { x1: '0%', y1: '0%', x2: '100%', y2: '0%' }

  return (
    <defs>
      <linearGradient id={gradientId} {...gradientProps}>
        <stop offset="0%" stopColor={colors[0]} />
        <stop offset="100%" stopColor={colors[1]} />
      </linearGradient>
    </defs>
  )
}

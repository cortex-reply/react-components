import Image from 'next/image'

interface ImageEffectProps {
  effect: 'glow' | 'gradient'
  image: {
    src: string
    alt: string
    width?: number
    height?: number
    fill?: boolean
    priority?: boolean
    quality?: number
    sizes?: string
    className?: string
  }
  className?: string
}

export const ImageEffect = ({ className, effect = 'gradient', image }: ImageEffectProps) => {
  return (
    <div className={`relative w-fit h-fit ${className}`}>
      <Image {...image} />

      {effect === 'gradient' && (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-green to-brand-plum opacity-50" />
      )}

      {effect === 'glow' && (
        <div className="absolute right-10 bottom-4 inset-0 w-1/3 h-1/2 rounded-full bg-brand-plum opacity-70 blur-3xl" />
      )}
    </div>
  )
}

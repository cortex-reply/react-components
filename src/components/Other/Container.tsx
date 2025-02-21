import { cn } from '@/lib/utils'


export interface IContainer {
  /**
   * The content or components to be rendered inside the container.
   * @type {React.ReactNode}
   */
  children: React.ReactNode

  /**
   * Determines if the container should have a full width.
   * @type {boolean}
   */
  isFluid?: boolean

  /**
   * Determines if the container should have no padding.
   * @type {boolean}
   */
  isNoPadding?: boolean

  /**
   * Additional class names to apply to the container.
   * @type {string}
   */
  className?: string
}

/** Container provide content containment, padding, and alignment within specific devices or viewports. */
export function Container({ children, isFluid = false, isNoPadding = false, className = '' }: IContainer) {
  const containerClasses = cn('container', isFluid && 'full-width', isNoPadding && 'no-padding', className)
    
  return <div className={containerClasses}>{children}</div>
}

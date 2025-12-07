'use client';

import { useControllableState } from '@radix-ui/react-use-controllable-state';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { Users, ChevronDownIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import { createContext, memo, useContext, useEffect, useState } from 'react';
import { Response } from './Response';

type ColleagueHandoffContextValue = {
  isStreaming: boolean;
  name: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  duration: number;
};

const ColleagueHandoffContext = createContext<ColleagueHandoffContextValue | null>(null);

const useColleagueHandoff = () => {
  const context = useContext(ColleagueHandoffContext);
  if (!context) {
    throw new Error('ColleagueHandoff components must be used within ColleagueHandoff');
  }
  return context;
};

export type ColleagueHandoffProps = ComponentProps<typeof Collapsible> & {
  isStreaming?: boolean;
  name?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  duration?: number;
};

const AUTO_CLOSE_DELAY = 1000;
const MS_IN_S = 1000;

export const ColleagueHandoff = memo(
  ({
    className,
    isStreaming = false,
    name = 'Digital Colleague',
    open,
    defaultOpen = true,
    onOpenChange,
    duration: durationProp,
    children,
    ...props
  }: ColleagueHandoffProps) => {
    const [isOpen, setIsOpen] = useControllableState({
      prop: open,
      defaultProp: defaultOpen,
      onChange: onOpenChange,
    });
    const [duration, setDuration] = useControllableState({
      prop: durationProp,
      defaultProp: 0,
    });

    const [hasAutoClosed, setHasAutoClosed] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);

    // Track duration when streaming starts and ends
    useEffect(() => {
      if (isStreaming) {
        if (startTime === null) {
          setStartTime(Date.now());
        }
      } else if (startTime !== null) {
        setDuration(Math.ceil((Date.now() - startTime) / MS_IN_S));
        setStartTime(null);
      }
    }, [isStreaming, startTime, setDuration]);

    // Auto-open when streaming starts, auto-close when streaming ends (once only)
    useEffect(() => {
      if (defaultOpen && !isStreaming && isOpen && !hasAutoClosed) {
        // Add a small delay before closing to allow user to see the content
        const timer = setTimeout(() => {
          setIsOpen(false);
          setHasAutoClosed(true);
        }, AUTO_CLOSE_DELAY);

        return () => clearTimeout(timer);
      }
    }, [isStreaming, isOpen, defaultOpen, setIsOpen, hasAutoClosed]);

    const handleOpenChange = (newOpen: boolean) => {
      setIsOpen(newOpen);
    };

    return (
      <ColleagueHandoffContext.Provider
        value={{ isStreaming, name, isOpen, setIsOpen, duration }}
      >
        <Collapsible
          className={cn('not-prose mb-4', className)}
          onOpenChange={handleOpenChange}
          open={isOpen}
          {...props}
        >
          {children}
        </Collapsible>
      </ColleagueHandoffContext.Provider>
    );
  },
);

export type ColleagueHandoffTriggerProps = ComponentProps<typeof CollapsibleTrigger>;

const getThinkingMessage = (isStreaming: boolean, name: string, duration?: number) => {
  if (isStreaming || duration === 0) {
    return <p>Asking our {name}...</p>;
  }
  if (duration === undefined) {
    return <p>Got an answer from our {name}</p>;
  }
  return <p>Got an answer from our {name} in {duration} seconds</p>;
};

export const ColleagueHandoffTrigger = memo(
  ({ className, children, ...props }: ColleagueHandoffTriggerProps) => {
    const { isStreaming, isOpen, name, duration } = useColleagueHandoff();

    return (
      <CollapsibleTrigger
        className={cn(
          'flex w-full items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground',
          className,
        )}
        {...props}
      >
        {children ?? (
          <>
            <Users className="size-4" />
            {getThinkingMessage(isStreaming, name, duration)}
            <ChevronDownIcon
              className={cn(
                'size-4 transition-transform',
                isOpen ? 'rotate-180' : 'rotate-0',
              )}
            />
          </>
        )}
      </CollapsibleTrigger>
    );
  },
);

export type ColleagueHandoffContentProps = ComponentProps<
  typeof CollapsibleContent
> & {
  children: string;
};

export const ColleagueHandoffContent = memo(
  ({ className, children, ...props }: ColleagueHandoffContentProps) => (
    <CollapsibleContent
      className={cn(
        'mt-4 text-sm',
        'data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 text-muted-foreground outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
        className,
      )}
      {...props}
    >
      <Response className="grid gap-2">{children}</Response>
    </CollapsibleContent>
  ),
);
export const ColleagueHandoffQuery = memo(
  ({ className, children, ...props }: ColleagueHandoffContentProps) => (
    <CollapsibleContent
      className={cn(
        'mt-4 text-sm',
        'data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 text-foreground outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
        className,
      )}
      {...props}
    >
      <Response className="grid gap-2">{children}</Response>
    </CollapsibleContent>
  ),
);

ColleagueHandoff.displayName = 'ColleagueHandoff';
ColleagueHandoffTrigger.displayName = 'ColleagueHandoffTrigger';
ColleagueHandoffContent.displayName = 'ColleagueHandoffContent';
ColleagueHandoffQuery.displayName = 'ColleagueHandoffQuery';
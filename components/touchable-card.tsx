'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent } from './ui/card'
import { cva } from 'class-variance-authority';
import { Switch } from './ui/switch';
import useConnection from '@/app/providers/api-provider';

type CardTheme = "plant" | "water" | "default";

type TouchableCardProps = {
  children: React.ReactNode;
  value: boolean;
  handleValueToggle: () => {};
  theme?: CardTheme;
}

const TouchableCard = ({ children, handleValueToggle, value, theme, }: TouchableCardProps) => {
  const { isConnected } = useConnection();

  // If Enter or Space key pressed
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // Prevents page scroll on Space
      handleValueToggle();
    }
  };

  return (
    <Card
      role='button'
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={handleValueToggle}
      className={cn(cardStyles({ theme, value }))}
    >
      {/* Glow */}
      <div className={cn(glowStyles({ theme }))} />

      {/* Content */}
      <CardContent className="relative flex justify-between items-center">
        {children}
        <Switch
          disabled={!isConnected}
          checked={value}
          onCheckedChange={handleValueToggle}
          className={cn(switchStyle({ theme }))}
        />
      </CardContent>
    </Card>
  );
};

const cardStyles = cva(
  cn(
    "transition-all duration-300",
    "w-full cursor-pointer relative overflow-hidden",
    "shadow-lg hover:shadow-xl hover:scale-101 hover:brightness-95 dark:hover:brightness-200",
    "active:scale-98 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
  ),
  {
    variants: {
      theme: {
        default:
          "",

        plant: cn(
          "hover:text-primary border-primary",

          // shimmer
          "shimmer-color-primary",

          // light mode
          // "bg-gradient-to-br from-primary/5 to-primary/50",

          // dark mode
          // "dark:bg-gradient-to-br dark:from-primary/50 dark:to-primary/20",
        ),

        water: cn(
          "hover:text-blue-500",

          // shimmer
          "shimmer-color-blue-500",

          // light mode
          // "bg-gradient-to-br from-blue-100 via-blue-500/50 to-blue-500",

          // dark mode
          // "dark:bg-gradient-to-br dark:from-blue-500/50 dark:to-blue-500/20",
        )
      },
      value: {
        true: cn(
          "ring-2 ring-offset-5 ring-offset-background",
        ),
        false: cn(""),
      },
    },
    compoundVariants: [
      {
        theme: 'plant',
        value: true,
        className: cn(
          'bg-gradient-to-br from-primary/5 to-primary/50',
          'dark:bg-gradient-to-br dark:from-primary/50 dark:to-primary/20',
          'text-primary ring-primary',

          'dark:brightness-150',
        )
      },
      {
        theme: 'water',
        value: true,
        className: cn(
          'bg-gradient-to-br from-blue-100 via-blue-500/50 to-blue-500',
          'dark:bg-gradient-to-br dark:from-blue-500/50 dark:to-blue-500/20',
          'text-blue-500 ring-blue-500',

          'dark:hover:brightness-140',
        )
      }
    ],
    defaultVariants: {
      theme: "default",
      value: false,
    },
  }
);

const glowStyles = cva(
  cn(
    "absolute -inset-1 opacity-35 pointer-events-none",
    "shimmer shimmer-bg shimmer-angle-30 shimmer-spread-200 shimmer-duration-1500 shimmer-repeat-delay-3500",
  ),
  {
    variants: {
      theme: {
        default:
          "",

        plant:
          "",
        // "bg-gradient-to-r from-primary via-primary/70 to-primary/50      dark:bg-gradient-to-r dark:from-primary dark:via-primary/70 dark:to-background/50",

        water:
          "",
        // "bg-gradient-to-r from-blue-500 via-blue-500/70 dark:from-blue-500 dark:via-blue-500/60",
      },
    },
  }
);

const switchStyle = cva(
  cn(
    // "!scale-100 ring-2 ring-offset-5 ring-blue-500 ring-offset-background bg-blue-500/20 dark:bg-blue/5"
  ),
  {
    variants: {
      theme: {
        default:
          "",

        plant: cn(
          "data-[state=unchecked]:bg-foreground/50",
          "data-[state=checked]:bg-primary",
          // "data-[state=unchecked]:!bg-primary/20",
          // "data-[state=checked]:bg-gradient-to-r",
          // "data-[state=checked]:from-primary/60",
          // "data-[state=checked]:via-background/30",
          // "data-[state=checked]:to-primary",
        ),

        water: cn(
          "data-[state=unchecked]:bg-foreground/50",
          "data-[state=checked]:bg-blue-500",
          // "data-[state=unchecked]:!bg-blue-800/20",
          // "data-[state=checked]:bg-gradient-to-r",
          // "data-[state=checked]:from-blue-800/60",
          // "data-[state=checked]:via-background/30",
          // "data-[state=checked]:to-blue-800",
        )
      },
    },
    defaultVariants: {
      theme: "default",
    },
  }
)

export default TouchableCard
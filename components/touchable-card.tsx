'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent } from './ui/card'
import { cva } from 'class-variance-authority';

type CardTheme = "plant" | "water" | "default";

type TouchableCardProps = {
  children: React.ReactNode;
  onClick: () => {};
  theme?: CardTheme;
}

const TouchableCard = ({
  children,
  onClick,
  theme = 'default',
}: TouchableCardProps) => {

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // Prevents page scroll on Space
      onClick();
    }
  };
  return (
    <Card
      role='button'
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={onClick}
      className={cn(cardStyles({ theme }))}
    >
      {/* Glow */}
      <div className={cn(glowStyles({ theme }))} />

      {/* Content */}
      <CardContent className="relative flex justify-between items-center">
        {children}
      </CardContent>
    </Card>
  );
};

const cardStyles = cva(
  "w-full cursor-pointer relative overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-101 hover:brightness-95 dark:hover:brightness-200 active:scale-98 hover:text-primary focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
  {
    variants: {
      theme: {
        default:
          "",

        plant:
          "bg-gradient-to-br from-primary/5 to-primary/50     dark:bg-gradient-to-br dark:from-primary/50 dark:to-primary/20",

        water:
          "bg-gradient-to-br from-blue-100 via-blue-500/50 to-blue-500     dark:bg-gradient-to-br dark:from-blue-500/50 dark:to-blue-500/20",
      },
    },
    defaultVariants: {
      theme: "plant",
    },
  }
);

const glowStyles = cva(
  "absolute -inset-1 blur-3xl opacity-50 pointer-events-none",
  {
    variants: {
      theme: {
        default:
          "",

        plant:
          "bg-gradient-to-r from-primary via-primary/70 to-primary/50      dark:bg-gradient-to-r dark:from-primary dark:via-primary/70 dark:to-background/50",

        water:
          "bg-gradient-to-r from-blue-500 via-blue-500/70 dark:from-blue-500 dark:via-blue-500/60",
      },
    },
  }
);

export default TouchableCard
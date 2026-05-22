"use client"

import { useModeAnimation } from 'react-theme-switch-animation'
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { useTheme } from 'next-themes';

export function ModeToggle() {
    const { setTheme } = useTheme();
    const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation();

    const handleToggleTheme = async () => {
        await toggleSwitchTheme();
        setTheme(isDarkMode ? "light" : "dark");
    }

    return (
        <Button
            variant='outline'
            size='icon'
            ref={ref}
            onClick={handleToggleTheme}
        >

            {isDarkMode ? (
                <Moon
                // className={cn(
                //     "absolute h-5 w-5",
                //     "transition-transform transition-opacity duration-500 ease-in-out",
                // )}
                />
            ) : (
                <Sun
                // className={cn(
                //     "absolute h-[1.5rem] w-[1.3rem]",
                //     "transition-transform transition-opacity duration-500 ease-in-out",
                // )}
                />
            )}


            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}

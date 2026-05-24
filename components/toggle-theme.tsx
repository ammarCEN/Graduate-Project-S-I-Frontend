"use client"

import { useEffect, useState } from "react";
import { useModeAnimation } from "react-theme-switch-animation";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function ModeToggle() {
    const [mounted, setMounted] = useState(false);

    const { setTheme, resolvedTheme } = useTheme();

    const { ref, toggleSwitchTheme } = useModeAnimation();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDarkMode = resolvedTheme === "dark";

    const handleToggleTheme = async () => {
        await toggleSwitchTheme();

        setTheme(isDarkMode ? "light" : "dark");
    };

    return (
        <Button
            variant="outline"
            size="icon"
            ref={ref}
            onClick={handleToggleTheme}
        >
            {isDarkMode ? <Moon /> : <Sun />}

            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
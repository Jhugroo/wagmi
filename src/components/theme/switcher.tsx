import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react';
export function ModeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [showIcon, setShowIcon] = useState<string | undefined>()
    useEffect(() => {
        if (theme === 'system') {
            setShowIcon(resolvedTheme)
        } else {
            setShowIcon(theme)
        }
    }, [theme, resolvedTheme]);
    return (
        <Button onClick={() => setTheme((showIcon === 'dark' ? 'light' : 'dark'))} className="rounded-full ml-2" size="icon">
            {showIcon == 'dark' ?
                <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                :
                <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            }
        </Button>

    )
}
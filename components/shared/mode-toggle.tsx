"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-full bg-muted/50 animate-pulse" />
    )
  }

  const currentTheme = theme === "system" ? systemTheme : theme

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={cn(
        "relative rounded-full",
        "hover:bg-muted/60 dark:hover:bg-muted/40",
        "transition-all duration-300",
        "active:scale-95"
      )}
    >
      {/* Sun */}
      <Sun
        className={cn(
          "h-5 w-5",
          "transition-all duration-300",
          "rotate-0 scale-100",
          "dark:-rotate-90 dark:scale-0"
        )}
      />

      {/* Moon */}
      <Moon
        className={cn(
          "absolute h-5 w-5",
          "transition-all duration-300",
          "rotate-90 scale-0",
          "dark:rotate-0 dark:scale-100"
        )}
      />

      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

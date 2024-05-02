"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {Moon, Sun} from "lucide-react" 

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === 'light' ? (
       <p className="text-2xl">D</p>
      ) : (
        <p className="text-2xl">L</p>
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
"use client"

import * as React from "react"
import Link from 'next/link'
import { usePathname } from 'next/navigation' 
import { cn } from '@/lib/utils'
import { navigation } from './nav-config'

interface NavLinksProps {
  direction?: 'row' | 'column'
  onClick?: () => void
  className?: string | undefined
}

export function NavLinks({
  direction = 'row',
  onClick,
  className
}: NavLinksProps) {
  const pathname = usePathname()
  const isColumn = direction === 'column'
  const isHomePage = pathname === "/"

  return (
    <nav
      className={cn(
        'flex',
        isColumn
          ? 'flex-col space-y-6'
          : 'items-center space-x-6 text-sm font-medium',
        className
      )}
    >
      {navigation.map((item) => {
        // <--- 4. smart href logic starts here
        let href = item.href

        // If it is an anchor link (#) and we are NOT on home, prepend /
        if (item.href.startsWith('#') && !isHomePage) {
          href = `/${item.href}`
        }
        // <--- Logic ends here

        return (
          <Link
            key={item.name} // Better to use name as key since href changes dynamically
            href={href}     // Use the new dynamic variable
            onClick={onClick}
            className={cn(
              'transition-colors',
              isColumn
                ? 'text-muted-foreground hover:text-primary'
                : 'text-foreground/60 hover:text-foreground/80',
              // Optional: specific styling for active link if you want
              pathname === item.href && "text-primary font-semibold" 
            )}
          >
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
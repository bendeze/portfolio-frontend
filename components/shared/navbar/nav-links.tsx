"use client"

import * as React from "react"
import Link from 'next/link'
import { usePathname } from 'next/navigation' 
import { cn } from '@/lib/utils'
import { navigation } from './nav-config'
import { useTranslation } from '@/context/language-context'

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
  const { t } = useTranslation()
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
        let href = item.href

        // If it is an anchor link (#) and we are NOT on home, prepend /
        if (item.href.startsWith('#') && !isHomePage) {
          href = `/${item.href}`
        }

        const nameKey = item.name.toLowerCase()

        return (
          <Link
            key={item.name} 
            href={href}     
            onClick={onClick}
            className={cn(
              'transition-colors font-mono font-semibold uppercase tracking-[0.16em]',
              isColumn
                ? 'text-xs text-muted-foreground hover:text-foreground py-1.5'
                : 'text-[10px] text-muted-foreground hover:text-foreground',
              pathname === item.href && "text-foreground font-black" 
            )}
          >
            {t(`nav.${nameKey}`)}
          </Link>
        )
      })}
    </nav>
  )
}
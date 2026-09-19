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
          ? 'flex-col space-y-2.5'
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
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))

        return (
          <Link
            key={item.name} 
            href={href}     
            onClick={onClick}
            className={cn(
              'group inline-flex items-center gap-1 font-mono uppercase tracking-wider transition-all duration-200 select-none cursor-pointer',
              isColumn
                ? 'text-[11px] py-0.5 border-b border-transparent hover:border-dashed hover:border-[#ebcb00] hover:text-[#ebcb00]'
                : 'text-[10px] hover:text-[#ebcb00]',
              isActive
                ? 'text-[#ebcb00] font-bold border-dashed border-[#ebcb00]'
                : 'text-zinc-500 dark:text-zinc-400'
            )}
          >
            {isColumn && (
              <span
                className={cn(
                  'text-[9px] transition-all duration-200',
                  isActive
                    ? 'text-[#ebcb00]'
                    : 'text-zinc-400 dark:text-zinc-600 group-hover:text-[#ebcb00] group-hover:translate-x-0.5'
                )}
              >
                /
              </span>
            )}
            <span>{t(`nav.${nameKey}`) || item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}
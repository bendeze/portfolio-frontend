import Link from 'next/link'
import { NavLinks } from './nav-links'
import { MobileNav } from './mobile-nav'
import { Socials } from '../socials'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-ful border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between mx-auto px-4 md:px-8">
        <Link
          href="/"
          className="font-bold text-xl tracking-tight"
        >
          E<span className="text-primary">.</span>Ndeze
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavLinks />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex">
            <Socials />
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

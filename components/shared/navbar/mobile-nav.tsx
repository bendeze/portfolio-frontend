'use client'

import * as React from 'react'
import { PanelLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'
import { NavLinks } from './nav-links'
import { Socials } from '../socials'

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
        >
          <PanelLeft className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <SheetHeader>
          <SheetTitle className="text-lg font-bold">
            Menu
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 py-3 pl-3">
          <NavLinks direction="column" onClick={() => setOpen(false)} />
        </div>

        <SheetFooter className='flex flex-1 items-center justify-end '>
          <Socials />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

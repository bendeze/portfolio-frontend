import { FooterBrand } from './footer-brand'
import { Socials } from '../socials'
import { FooterMeta } from './footer-meta'
import { EmailCTA } from './email-cta'
import { NavLinks } from '../navbar/nav-links'

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container py-12 px-4 md:px-8 md:mx-auto md:max-w-6xl">
        
        <div className="grid gap-8 md:grid-cols-4">
            <FooterBrand />
            <div className="inset-x-0 h-px w-full" />
            <NavLinks direction='column' className='space-y-2 text-sm' />
            <div className="flex flex-col gap-4">
                <FooterMeta />
                <EmailCTA />
                <Socials showModeToggle={false} showYoutube={true} />
            </div>
        </div>

        <div className="mt-10 mx-auto border-t border-border/40 pt-6 flex flex-col items-center gap-4 md:flex-row md:justify-center">
            <p className='tetx-sm text-muted-foreground'>&copy; {new Date().getFullYear()} Ndeze Emmanuel. All rights reserved.</p>  
        </div>
      </div>
    </footer>
  )
}

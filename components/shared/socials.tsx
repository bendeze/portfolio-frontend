import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'
import { ModeToggle } from '@/components/shared/mode-toggle'
import { MotionDiv } from './motion-wrapper'
import { cn } from '@/lib/utils'
import SvgYoutube from '@/components/icons/Youtube'
import SvgWhatsapp from '@/components/icons/Whatsapp'

function SvgBluesky({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566 1.01 1.5 1.733 1.5 3.5c0 1.25.5 8.25 4.5 11.5-3.5-.5-5 1.5-5 3.5 0 2.25 2.5 3.5 6 1.5 4-2.286 5-5.2 5-5.2s1 2.914 5 5.2c3.5 2 6 .75 6-1.5 0-2-1.5-4-5-3.5 4-3.25 4.5-10.25 4.5-11.5 0-1.767-1.066-2.49-3.702-.695C16.046 4.747 13.087 8.686 12 10.8z" />
    </svg>
  )
}

function SvgTelegram({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  )
}

function SvgX({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

interface FooterSocialsProps {
  className?: string
  showGithub?: boolean
  showLinkedin?: boolean
  showTwitter?: boolean
  showBluesky?: boolean
  showTelegram?: boolean
  showWhatsapp?: boolean
  showYoutube?: boolean
  showRss?: boolean
  showEmail?: boolean
  showModeToggle?: boolean
  variant?: 'default' | 'navbar'
}

export function Socials({
  className,
  showGithub = true,
  showLinkedin = true,
  showTwitter = true,
  showBluesky = true,
  showTelegram = true,
  showWhatsapp = true,
  showYoutube = true,
  showEmail = false,
  showModeToggle = true,
  variant = 'default',
}: FooterSocialsProps) {
  const isNavbar = variant === 'navbar'

  const linksContent = (
    <>
      {showGithub && (
        <Link
          href="https://github.com/bendeze"
          target="_blank"
          className="text-muted-foreground hover:text-[#2a7c13] dark:hover:text-[#ebcb00] transition-colors"
          aria-label="GitHub Profile (bendeze)"
          title="GitHub (@bendeze)"
        >
          <MotionDiv
            whileHover={{ scale: 1.15, y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Github className="h-4 w-4" />
          </MotionDiv>
        </Link>
      )}

      {showLinkedin && (
        <Link
          href="https://www.linkedin.com/in/bonheur-ndeze-bne/"
          target="_blank"
          className="text-muted-foreground hover:text-[#2a7c13] dark:hover:text-[#ebcb00] transition-colors"
          aria-label="LinkedIn Profile"
          title="LinkedIn (Emmanuel Bonheur Ndeze)"
        >
          <MotionDiv
            whileHover={{ scale: 1.15, y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Linkedin className="h-4 w-4" />
          </MotionDiv>
        </Link>
      )}

      {showTwitter && (
        <Link
          href="https://x.com/ndeze_emmanuel"
          target="_blank"
          className="text-muted-foreground hover:text-[#2a7c13] dark:hover:text-[#ebcb00] transition-colors"
          aria-label="Twitter / X Profile (@ndeze_emmanuel)"
          title="X / Twitter (@ndeze_emmanuel)"
        >
          <MotionDiv
            whileHover={{ scale: 1.15, y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <SvgX className="h-4 w-4" />
          </MotionDiv>
        </Link>
      )}

      {showBluesky && (
        <Link
          href="https://bsky.app/profile/ndezebonheur.bsky.social"
          target="_blank"
          className="text-muted-foreground hover:text-[#2a7c13] dark:hover:text-[#ebcb00] transition-colors"
          aria-label="Bluesky Profile (@ndezebonheur.bsky.social)"
          title="Bluesky (@ndezebonheur.bsky.social)"
        >
          <MotionDiv
            whileHover={{ scale: 1.15, y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <SvgBluesky className="h-4 w-4" />
          </MotionDiv>
        </Link>
      )}

      {showTelegram && (
        <Link
          href="https://t.me/BonheurNe"
          target="_blank"
          className="text-muted-foreground hover:text-[#2a7c13] dark:hover:text-[#ebcb00] transition-colors"
          aria-label="Telegram (@BonheurNe)"
          title="Telegram (@BonheurNe)"
        >
          <MotionDiv
            whileHover={{ scale: 1.15, y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <SvgTelegram className="h-4 w-4" />
          </MotionDiv>
        </Link>
      )}

      {showWhatsapp && (
        <Link
          href="https://wa.me/250791348888"
          target="_blank"
          className="text-muted-foreground hover:text-[#2a7c13] dark:hover:text-[#ebcb00] transition-colors"
          aria-label="WhatsApp (+250791348888)"
          title="WhatsApp (+250791348888)"
        >
          <MotionDiv
            whileHover={{ scale: 1.15, y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <SvgWhatsapp className="h-4 w-4" />
          </MotionDiv>
        </Link>
      )}

      {showYoutube && (
        <Link
          href="https://www.youtube.com/@NdezeBonheur"
          target="_blank"
          className="text-muted-foreground hover:text-[#2a7c13] dark:hover:text-[#ebcb00] transition-colors"
          aria-label="YouTube Channel (@NdezeBonheur)"
          title="YouTube (@NdezeBonheur)"
        >
          <MotionDiv
            whileHover={{ scale: 1.15, y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <SvgYoutube className="h-4 w-4" />
          </MotionDiv>
        </Link>
      )}

      {showEmail && (
        <Link
          href="mailto:bonheurndezenc@gmail.com"
          className="text-muted-foreground hover:text-[#2a7c13] dark:hover:text-[#ebcb00] transition-colors"
          aria-label="Email (bonheurndezenc@gmail.com)"
          title="Email (Emmanuel Bonheur Ndeze)"
        >
          <MotionDiv
            whileHover={{ scale: 1.15, y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Mail className="h-4 w-4" />
          </MotionDiv>
        </Link>
      )}
    </>
  )

  if (isNavbar) {
    return (
      <div 
        className={cn(
          "flex items-center gap-2.5 px-2.5 py-1 rounded-md border border-dashed border-zinc-300 dark:border-zinc-800 bg-transparent h-9 select-none",
          className
        )}
      >
        {linksContent}
      </div>
    )
  }

  return (
    <div className={cn("flex items-center gap-8", className)}>
      {linksContent}
      {showModeToggle && <ModeToggle />}
    </div>
  )
}

import Link from 'next/link'
import { Github, Linkedin, Twitter, YoutubeIcon } from 'lucide-react'
import { ModeToggle } from '@/components/shared/mode-toggle'
import { MotionDiv } from './motion-wrapper'
import { cn } from '@/lib/utils'

interface FooterSocialsProps {
  className?: string
  showGithub?: boolean
  showLinkedin?: boolean
  showTwitter?: boolean
  showYoutube?: boolean
  showModeToggle?: boolean
  variant?: 'default' | 'navbar'
}

export function Socials({
  className,
  showGithub = true,
  showLinkedin = true,
  showTwitter = true,
  showYoutube = false,
  showModeToggle = true,
  variant = 'default',
}: FooterSocialsProps) {
  const isNavbar = variant === 'navbar'

  const linksContent = (
    <>
      {showGithub && (
        <Link
          href="https://github.com/bonheurNE07"
          target="_blank"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="GitHub Profile"
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
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="LinkedIn Profile"
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
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Twitter / X Profile"
        >
          <MotionDiv
            whileHover={{ scale: 1.15, y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Twitter className="h-4 w-4" />
          </MotionDiv>
        </Link>
      )}

      {showYoutube && (
        <Link
          href="https://www.youtube.com/@NdezeBonheur"
          target="_blank"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="YouTube Channel"
        >
          <MotionDiv
            whileHover={{ scale: 1.15, y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <YoutubeIcon className="h-4 w-4" />
          </MotionDiv>
        </Link>
      )}
    </>
  )

  if (isNavbar) {
    return (
      <div 
        className={cn(
          "flex items-center gap-3 px-3 py-1.5 rounded-full border border-border bg-muted/40 backdrop-blur h-10 select-none",
          className
        )}
      >
        {linksContent}
      </div>
    )
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {linksContent}
      {showModeToggle && <ModeToggle />}
    </div>
  )
}

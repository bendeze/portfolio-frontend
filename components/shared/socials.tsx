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
}

export function Socials({
  className,
  showGithub = true,
  showLinkedin = true,
  showTwitter = true,
  showYoutube = false,
  showModeToggle = true,
}: FooterSocialsProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      
      {showGithub && (
        <Link
          href="https://github.com/bonheurNE07"
          target="_blank"
          className="text-muted-foreground hover:text-foreground"
        >
          <MotionDiv
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Github className="h-4 w-4" />
          </MotionDiv>
        </Link>
      )}

      {showLinkedin && (
        <Link
          href="https://www.linkedin.com/in/bonheur-ndeze-bne/"
          target="_blank"
          className="text-muted-foreground hover:text-foreground"
        >
          <MotionDiv
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Linkedin className="h-4 w-4" />
          </MotionDiv>
        </Link>
      )}

      {showTwitter && (
        <Link
          href="https://x.com/ndeze_emmanuel"
          target="_blank"
          className="text-muted-foreground hover:text-foreground"
        >
          <MotionDiv
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Twitter className="h-4 w-4" />
          </MotionDiv>
        </Link>
      )}

      {showYoutube && (
        <Link
          href="https://www.youtube.com/@NdezeBonheur"
          target="_blank"
          className="text-muted-foreground hover:text-foreground"
        >
          <MotionDiv
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <YoutubeIcon className="h-4 w-4" />
          </MotionDiv>
        </Link>
      )}

      {showModeToggle && <ModeToggle />}
    </div>
  )
}

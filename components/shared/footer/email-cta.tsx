// components/layout/footer/email-cta.tsx
import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function EmailCTA() {
  return (
    <Button
      variant="outline"
      className="mt-4 w-fit gap-2"
      asChild
    >
      <a href="mailto:bonheurndezenc@gmail.com">
        <Mail className="h-4 w-4" />
        Contact me
      </a>
    </Button>
  )
}

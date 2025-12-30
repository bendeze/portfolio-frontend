// components/layout/footer/footer-meta.tsx
import { MapPin, Clock } from 'lucide-react'

export function FooterMeta() {
  return (
    <div className="space-y-2 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4" />
        <span>Kigali, Rwanda</span>
      </div>

      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        <span>GMT+2 (EAT)</span>
      </div>
    </div>
  )
}

import Link from 'next/link'
import { StatusIndicator } from '../status-indicator/status-indicator'

export function FooterBrand() {
  return (
    <div className="space-y-2">
        <Link
            href="/"
            className="text-lg font-bold tracking-tight"
        >
            E<span className="text-primary">.</span>Ndeze
        </Link>

        <p className="text-sm text-muted-foreground max-w-xs">
            Software Developer, Cisco-Certified Network Engineer,
            and Telecommunications Engineer building reliable
            backend systems and intelligent applications.
        </p>

        <StatusIndicator status="active" label="Available for new projects" labelClassName='text-bold' />
    </div>
  )
}

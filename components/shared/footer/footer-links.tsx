import Link from 'next/link'
import { navigation } from '@/components/shared/navbar/nav-config'

export function FooterLinks() {
  return (
    <nav className="flex flex-col space-y-2 text-sm">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}

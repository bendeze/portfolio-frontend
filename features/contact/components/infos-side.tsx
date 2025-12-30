"use client";

import { SOCIAL_LINKS } from "@/components/shared/utils";

export function ContactInfos() {
  return (
    <>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Get in Touch
        </h2>
        <p className="text-muted-foreground text-lg max-w-[600px]">
            I’m Bonheur Ndeze Emmanuel, a backend-focused software developer and Cisco-certified network engineer. 
            If you have a project that needs scalable APIs, secure backend systems, or network-aware architecture, 
            I’d love to hear about it. Let’s collaborate to turn ideas into reliable, high-performance applications.
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-4 pt-4">
            {SOCIAL_LINKS.map((social) => (
            <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                title={social.label}
            >
                {social.icon}
                <span className="hidden sm:inline text-sm">{social.label}</span>
            </a>
            ))}
        </div>
    </>
  );
}

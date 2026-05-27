"use client";

import { ContactForm } from "@/features/contact/components/contact-form";
import { ContactInfos } from "@/features/contact/components/infos-side";
import { useTranslation } from "@/context/language-context";

export function ContactSection() {
  const { t } = useTranslation();

  return (
    <section 
      id="contact" 
      aria-labelledby="contact-heading"
      className="relative py-32 bg-[#030303] noise-overlay border-t border-white/5"
    >
      {/* Background soft glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[140px] opacity-[0.03] bg-blue-500 pointer-events-none -z-10" />

      <div className="container px-6 max-w-6xl mx-auto relative z-10">
        <div className="grid gap-16 lg:grid-cols-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-indigo-400">
                {t("contact.badge")}
              </span>
              <h2 
                id="contact-heading"
                className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
              >
                {t("contact.title")}
              </h2>
            </div>
            <ContactInfos />
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#0a0a0c]/60 p-8 sm:p-10 rounded-3xl border border-white/5 glassmorphism shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/[0.02] to-transparent pointer-events-none" />
            <ContactForm />
          </div>
          
        </div>
      </div>
    </section>
  );
}


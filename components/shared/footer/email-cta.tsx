"use client";

import React from "react";
import { Mail } from "lucide-react";
import SvgWhatsapp from "@/components/icons/Whatsapp";

export function EmailCTA() {
  return (
    <div className="inline-flex flex-col sm:flex-row items-stretch sm:items-center rounded-lg border-[0.5px] border-dashed border-zinc-300 dark:border-zinc-700 bg-transparent overflow-hidden font-mono text-xs select-none shadow-sm">
      {/* Email Action */}
      <a
        href="mailto:bonheurndezenc@gmail.com"
        className="group relative flex items-center justify-center gap-2 px-3.5 py-2 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-950 transition-colors duration-300 overflow-hidden cursor-pointer"
      >
        {/* Background filling animation with Brand Yellow */}
        <span className="absolute inset-0 bg-[#ebcb00] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 pointer-events-none" />
        <Mail className="h-3.5 w-3.5 relative z-10 transition-transform duration-300 group-hover:scale-110" />
        <span className="relative z-10 font-medium">Write an email</span>
      </a>

      {/* Dashed Internal Separator */}
      <div className="hidden sm:block w-[0.5px] self-stretch border-r-[0.5px] border-dashed border-zinc-300 dark:border-zinc-700" />
      <div className="block sm:hidden h-[0.5px] w-full border-b-[0.5px] border-dashed border-zinc-300 dark:border-zinc-700" />

      {/* WhatsApp Action */}
      <a
        href="https://wa.me/250791348888"
        target="_blank"
        rel="noreferrer"
        className="group relative flex items-center justify-center gap-2 px-3.5 py-2 text-zinc-700 dark:text-zinc-300 hover:text-white transition-colors duration-300 overflow-hidden cursor-pointer"
      >
        {/* Background filling animation with WhatsApp Green */}
        <span className="absolute inset-0 bg-[#25D366] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 pointer-events-none" />
        <SvgWhatsapp className="h-3.5 w-3.5 relative z-10 transition-transform duration-300 group-hover:scale-110" />
        <span className="relative z-10 font-medium">Chat on WhatsApp</span>
      </a>
    </div>
  );
}

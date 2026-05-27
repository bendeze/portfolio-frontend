"use client";

import React from "react";
import { SOCIAL_LINKS } from "@/components/shared/utils";
import { Mail, ShieldCheck, Cpu } from "lucide-react";
import { useTranslation } from "@/context/language-context";

export function ContactInfos() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground text-lg leading-relaxed font-light">
        {t("contact.infos.description")}
      </p>

      {/* Feature Badges */}
      <div className="space-y-4 pt-4 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">{t("contact.infos.devFocus")}</h4>
            <p className="text-xs text-muted-foreground font-light">{t("contact.infos.devDesc")}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">{t("contact.infos.netFocus")}</h4>
            <p className="text-xs text-muted-foreground font-light">{t("contact.infos.netDesc")}</p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/5">
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5 text-xs font-mono text-muted-foreground hover:text-white hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
            title={social.label}
          >
            {social.icon}
            <span>{social.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}


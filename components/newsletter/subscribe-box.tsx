"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Check, Mail, QrCode, ExternalLink, Sparkles, ChevronDown, ChevronUp, Rss } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "@/lib/axios";
import { useTranslation } from "@/context/language-context";
import SvgWhatsapp from "@/components/icons/Whatsapp";

interface SubscribeBoxProps {
  className?: string;
  source?: string;
}

const WHATSAPP_CHANNEL_URL = "https://whatsapp.com/channel/0029VbEWMfgEFeXhQ7h6EH2P";

export function SubscribeBox({ className, source = "publication" }: SubscribeBoxProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"email" | "whatsapp">("email");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [showQr, setShowQr] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage(t("blog.newsletter.invalidEmail"));
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      await axios.post("/subscribers/", { name, email, source });
      setStatus("success");
      setMessage(t("blog.newsletter.success"));
      setName("");
      setEmail("");
    } catch (err: any) {
      const emailError = err?.response?.data?.errors?.email || err?.response?.data?.email;
      if (emailError) {
        setStatus("error");
        setMessage(
          Array.isArray(emailError)
            ? emailError[0]
            : typeof emailError === "string"
            ? emailError
            : t("blog.newsletter.alreadySubscribed")
        );
      } else {
        setStatus("error");
        setMessage(err?.response?.data?.message || t("blog.newsletter.alreadySubscribed"));
      }
    }
  };

  return (
    <div
      className={`my-10 p-6 sm:p-8 rounded-xl border-[0.5px] border-[#ebcb00]/40 dark:border-[#ebcb00]/30 border-dashed bg-transparent font-mono shadow-sm ${className || ""}`}
    >
      {/* Header & Mode Switch Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-800/80">
        <div>
          <h3 className="text-sm font-bold tracking-wider uppercase text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span>Stay Connected & Informed</span>
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            {activeTab === "email" ? t("blog.newsletter.desc") : t("blog.newsletter.whatsappDesc")}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-100 dark:bg-[#141518] border border-zinc-200 dark:border-zinc-800 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("email")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
              activeTab === "email"
                ? "bg-white dark:bg-[#000000] text-zinc-900 dark:text-[#ebcb00]/80 shadow-sm font-bold border border-zinc-200 dark:border-[#ebcb00]/40"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{t("blog.newsletter.emailTab")}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("whatsapp")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
              activeTab === "whatsapp"
                ? "bg-white dark:bg-[#000000] text-emerald-600 dark:text-emerald-400/80 shadow-sm font-bold border border-zinc-200 dark:border-emerald-500/40"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            <SvgWhatsapp className="w-3.5 h-3.5 text-emerald-500" />
            <span>{t("blog.newsletter.whatsappTab")}</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Email Form */}
      {activeTab === "email" && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("blog.newsletter.namePlaceholder")}
                disabled={status === "loading" || status === "success"}
                className="flex-1 px-4 py-2.5 text-xs font-mono rounded-lg bg-white dark:bg-[#000000] border-[0.3px] border-[#ebcb00]/40 dark:border-[#ebcb00]/30 border-dashed text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-[#ebcb00] transition-colors"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("blog.newsletter.emailPlaceholder")}
                required
                disabled={status === "loading" || status === "success"}
                className="flex-1 px-4 py-2.5 text-xs font-mono rounded-lg bg-white dark:bg-[#000000] border-[0.3px] border-[#ebcb00]/80 dark:border-[#ebcb00]/30 border-dashed text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-[#ebcb00] transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="px-6 py-2.5 text-xs font-mono font-bold rounded-lg bg-[#ebcb00] text-black hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 shrink-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                {status === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin text-black" />
                ) : status === "success" ? (
                  <>
                    <Check className="h-4 w-4 text-black" />
                    <span>{t("blog.newsletter.subscribedBtn")}</span>
                  </>
                ) : (
                  <span>{t("blog.newsletter.subscribeBtn")}</span>
                )}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 pt-1 gap-2">
              <div className="flex items-center gap-2">
                <span>{t("blog.newsletter.frequency")}</span>
                <span className="text-zinc-300 dark:text-zinc-700">·</span>
                <Link
                  href="/rss.xml"
                  target="_blank"
                  prefetch={false}
                  className="inline-flex items-center gap-1 text-zinc-500 dark:text-zinc-400 hover:text-[#ebcb00] transition-colors"
                  title="Subscribe via RSS (XML Feed)"
                >
                  <Rss className="w-3 h-3" />
                  <span>RSS</span>
                </Link>
              </div>
              
              {/* WhatsApp direct link */}
              <Link
                href={WHATSAPP_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer text-left font-bold"
              >
                <SvgWhatsapp className="w-3.5 h-3.5 shrink-0" />
                <span>Prefer WhatsApp? Join our channel &rarr;</span>
              </Link>
            </div>

            {message && (
              <div
                className={`text-xs mt-2 font-medium ${
                  status === "error" ? "text-red-500" : "text-green-500 dark:text-[#ebcb00]"
                }`}
              >
                {message}
                {status === "success" && (
                  <div className="mt-2 pt-2 border-t border-dashed border-zinc-200 dark:border-zinc-800">
                    <Link
                      href={WHATSAPP_CHANNEL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-500 hover:underline font-bold"
                    >
                      <SvgWhatsapp className="w-3.5 h-3.5" />
                      <span>Also join our WhatsApp Channel for instant live notifications &rarr;</span>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </form>
        </motion.div>
      )}

      {/* Tab 2: WhatsApp Channel Card */}
      {activeTab === "whatsapp" && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          <div className="p-4 sm:p-5 rounded-lg bg-transparent border border-emerald-500/30 dark:border-emerald-500/20 border-dashed flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <SvgWhatsapp className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 font-mono">
                    E. Ndeze Bonheur
                  </h4>
                </div>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5 leading-relaxed">
                  Real-time article drops, engineering insights, and tech broadcasts.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
              <Link
                href={WHATSAPP_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-4 py-2 text-xs font-mono font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>{t("blog.newsletter.joinWhatsApp")}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={() => setShowQr(!showQr)}
                className="px-3 py-2 text-xs font-mono font-medium rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-[#18191c] dark:hover:bg-[#222428] border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                title="Toggle QR Code"
              >
                <QrCode className="w-3.5 h-3.5 text-emerald-500" />
                <span className="hidden sm:inline">
                  {showQr ? t("blog.newsletter.hideQr") : t("blog.newsletter.scanQr")}
                </span>
                {showQr ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* Expandable QR Code Card */}
          <AnimatePresence>
            {showQr && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 rounded-xl bg-transparent border border-zinc-200 dark:border-zinc-800 border-dashed flex flex-col items-center justify-center text-center shadow-md">
                  <div className="relative w-56 h-96 sm:w-64 sm:h-[420px] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-xl bg-white">
                    <Image
                      src="/images/whatsapp-channel-qr.jpg"
                      alt="E. Ndeze Bonheur WhatsApp Channel QR Code"
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 224px, 256px"
                      priority
                    />
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-4 max-w-xs font-mono">
                    {t("blog.newsletter.scanInstructions")}
                  </p>

                  <Link
                    href={WHATSAPP_CHANNEL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 text-xs text-emerald-500 hover:underline font-bold inline-flex items-center gap-1 font-mono"
                  >
                    <span>Open Channel in WhatsApp &rarr;</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

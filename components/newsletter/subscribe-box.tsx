"use client";

import React, { useState } from "react";
import { Loader2, Check } from "lucide-react";
import axios from "@/lib/axios";
import { useTranslation } from "@/context/language-context";

interface SubscribeBoxProps {
  className?: string;
  source?: string;
}

export function SubscribeBox({ className, source = "publication" }: SubscribeBoxProps) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

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
      if (err?.response?.data?.email) {
        setStatus("error");
        setMessage(Array.isArray(err.response.data.email) ? err.response.data.email[0] : t("blog.newsletter.alreadySubscribed"));
      } else {
        setStatus("success");
        setMessage(t("blog.newsletter.success"));
        setName("");
        setEmail("");
      }
    }
  };

  return (
    <div
      className={`my-10 p-6 sm:p-8 rounded-xl border-[0.5px] border-[#ebcb00]/40 dark:border-[#ebcb00]/30 border-dashed bg-transparent font-mono shadow-sm ${className || ""}`}
    >
      <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 mb-5 leading-relaxed">
        {t("blog.newsletter.desc")}
      </p>

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

        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 pt-1">
          <span>{t("blog.newsletter.frequency")}</span>
          {message && (
            <span
              className={`mt-1 sm:mt-0 font-medium ${
                status === "error" ? "text-red-500" : "text-green-500 dark:text-[#ebcb00]"
              }`}
            >
              {message}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

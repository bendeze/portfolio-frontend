"use client";

import { useEffect, useState } from "react";
import { MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

export function FooterMeta() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Africa",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="space-y-3 text-sm text-muted-foreground flex flex-col justify-start select-none pt-1"
    >
      <motion.div 
        className="flex items-center gap-2.5 group cursor-default w-fit"
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 400, damping: 12 }}
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] group-hover:border-indigo-500/30 group-hover:bg-indigo-500/[0.02] transition-colors duration-300">
          <MapPin className="h-4 w-4 text-indigo-500 dark:text-indigo-400 group-hover:animate-bounce" />
        </div>
        <span className="font-mono text-[11px] tracking-wide text-muted-foreground group-hover:text-foreground transition-colors duration-300">
          Kigali, Rwanda
        </span>
      </motion.div>

      <motion.div 
        className="flex items-center gap-2.5 group cursor-default w-fit"
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 400, damping: 12 }}
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] group-hover:border-indigo-500/30 group-hover:bg-indigo-500/[0.02] transition-colors duration-300">
          <Clock className="h-4 w-4 text-indigo-500 dark:text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
        </div>
        <span className="font-mono text-[11px] tracking-wider text-muted-foreground group-hover:text-foreground transition-colors duration-300">
          {time ? `${time} (GMT+2)` : "GMT+2"}
        </span>
      </motion.div>
    </motion.div>
  );
}


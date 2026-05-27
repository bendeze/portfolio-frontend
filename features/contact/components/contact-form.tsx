"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ContactFormSchema, ContactFormValues } from "../schemas"
import { useContact } from "../hooks/use-contact"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/context/language-context"

export function ContactForm() {
  const { mutate, isPending } = useContact()
  const { t } = useTranslation()

  // 1. Initialize Form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  // 2. Submit Handler
  function onSubmit(data: ContactFormValues) {
    mutate(data, {
      onSuccess: () => {
        form.reset() // Clear form on success
      },
    })
  }

  const inputClasses = cn(
    "bg-white/[0.01] border-white/5 text-white placeholder:text-white/30 rounded-xl",
    "focus-visible:border-indigo-500/40 focus-visible:ring-1 focus-visible:ring-indigo-500/20 focus-visible:bg-white/[0.02]",
    "transition-all duration-300 py-6"
  );

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-mono uppercase tracking-wider text-white/50">{t("contact.name")}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t("contact.placeholders.name")} 
                      className={inputClasses} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-rose-500/90 font-mono mt-1" />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-mono uppercase tracking-wider text-white/50">{t("contact.email")}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={t("contact.placeholders.email")} 
                      className={inputClasses} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-rose-500/90 font-mono mt-1" />
                </FormItem>
              )}
            />
          </div>

          {/* Subject Field */}
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-mono uppercase tracking-wider text-white/50">{t("contact.subject")}</FormLabel>
                <FormControl>
                  <Input 
                    placeholder={t("contact.placeholders.subject")} 
                    className={inputClasses} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-xs text-rose-500/90 font-mono mt-1" />
              </FormItem>
            )}
          />

          {/* Message Field */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-mono uppercase tracking-wider text-white/50">{t("contact.message")}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("contact.placeholders.message")}
                    className={cn(
                      inputClasses,
                      "min-h-[140px] py-4 resize-none leading-relaxed"
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-rose-500/90 font-mono mt-1" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button 
            type="submit" 
            className={cn(
              "w-full cursor-pointer rounded-full font-medium tracking-wide py-6 text-sm",
              "bg-white text-black hover:bg-white/90",
              "transition-all duration-300 shadow-lg hover:shadow-white/5",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-black" />
                <span>{t("contact.btnPending")}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Send className="h-4 w-4 text-black" />
                <span>{t("contact.btnTransmit")}</span>
              </div>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
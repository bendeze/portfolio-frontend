import { useMutation } from "@tanstack/react-query"
import { sendContactMessage } from "../api"
import { toast } from "sonner"

export function useContact() {
  return useMutation({
    mutationFn: sendContactMessage,
    onSuccess: () => {
      toast.success("Message sent!", {
        description: "Thanks for reaching out. I'll get back to you soon.",
      })
    },
    onError: (error: unknown) => {
      console.error("Contact Error:", error)
      toast.error("Something went wrong.", {
        description: "Please try again later or email me directly.",
      })
    },
  })
}
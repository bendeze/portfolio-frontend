import { useMutation } from "@tanstack/react-query"
import { sendContactMessage } from "../api"
import { toast } from "sonner"
import { AxiosError } from "axios"

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
      
      let errorMessage = "Please try again later or email me directly."
      
      if (error instanceof AxiosError && error.response) {
        const data = error.response.data as Record<string, unknown>
        if (data && typeof data === "object") {
          // 1. Handle Django REST Framework throttle limit message
          if ("detail" in data && typeof data.detail === "string") {
            errorMessage = data.detail
          } 
          // 2. Handle field validation errors
          else {
            const keys = Object.keys(data)
            if (keys.length > 0) {
              const firstKey = keys[0]
              const errors = data[firstKey]
              if (Array.isArray(errors) && errors.length > 0) {
                // capitalize the key for friendly formatting
                const capitalizedKey = firstKey.charAt(0).toUpperCase() + firstKey.slice(1)
                errorMessage = `${capitalizedKey}: ${errors[0]}`
              } else if (typeof errors === "string") {
                errorMessage = errors
              }
            }
          }
        }
      }

      toast.error("Submission failed.", {
        description: errorMessage,
      })
    },
  })
}
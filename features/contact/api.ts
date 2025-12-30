import { api } from "@/lib/axios"
import { ContactFormValues } from "./schemas"

export const sendContactMessage = async (data: ContactFormValues) => {
  const response = await api.post("/contact/", data)
  return response.data
}
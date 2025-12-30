
import z from "zod";
import { Github, X, Whatsapp, Linkedin } from "../icons";

export const SocialType = z.enum(["LinkedIn", "GitHub", "Twitter", "WhatsApp"]);

export const socialSchema = z.object({
  icon: z.any(),
  label: SocialType,
  url: z.string().url(),
});

export type Socials = z.infer<typeof socialSchema>;

export const SOCIALS:Socials[] = [
  { icon: <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground" />, label: "LinkedIn", url: "https://www.linkedin.com/in/bonheur-ndeze-bne/" },
  { icon: <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />, label: "GitHub", url: "https://github.com/bonheurNE07" },
  { icon: <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />, label: "Twitter", url: "https://x.com/ndeze_emmanuel" },
  { icon: <Whatsapp className="h-5 w-5 text-muted-foreground hover:text-foreground" />, label: "WhatsApp", url: "https://wa.me/250791348888" },
];

export const SOCIAL_LINKS = SOCIALS.map((social) => ({
  href: social.url,
  label: social.label,
  icon: social.icon,
}));


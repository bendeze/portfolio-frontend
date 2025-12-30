import { ContactForm } from "@/features/contact/components/contact-form";
import { ContactInfos } from "@/features/contact/components/infos-side";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 border-t border-border/30 bg-background">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20 items-start">
          
          {/* Left Column */}
          <div className="space-y-6">
            <ContactInfos />
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-background p-8 rounded-2xl border shadow-sm">
            <ContactForm />
          </div>
          
        </div>
      </div>
    </section>
  );
}

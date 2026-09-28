import type { Metadata } from "next";
import ContactSection from "@/components/sections/contact";
import { config } from "@/data/config";

export const metadata: Metadata = {
  title: `Contact | ${config.author}`,
  description: `Get in touch with ${config.author}.`,
};

export default function ContactPage() {
  return (
    <main className="pt-16 pb-20 px-4">
      <ContactSection />
    </main>
  );
}

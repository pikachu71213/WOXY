import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Loader2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { sendEmailNotification } from "@/lib/email";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Woxy Academy — Best Academy in Bhiwani, Haryana" },
      { name: "description", content: "Contact Woxy Science & Physics Academy in Bhiwani, Haryana. Find our map directions, address near Maharana Pratap College, and phone number 094663 39415." },
      { name: "keywords", content: "best academy in bhiwani, science academy, woxy academy, science and physics academy, contact woxy, coaching phone number" },
      { property: "og:title", content: "Contact Woxy Academy Bhiwani" },
      { property: "og:description", content: "Address, phone and directions to Woxy Academy in Bhiwani, Haryana." },
    ],
  }),
  component: Contact,
});

const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100, "Name is too long"),
  phone: z.string().trim().regex(/^[0-9+\-\s]{6,20}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(255).optional().or(z.literal("")),
  program: z.string().trim().max(60),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

const programs = [
  "Foundation (6–10)",
  "NEET",
  "IIT-JEE",
  "NTSE / Olympiad",
  "NDA",
  "Boards / IISER",
];

function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      program: String(fd.get("program") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    const parsed = leadSchema.safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }

    setSubmitting(true);

    // 1. Attempt Supabase insertion
    let dbSuccess = false;
    try {
      const { error } = await supabase.from("leads").insert({
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        program: parsed.data.program || null,
        message: parsed.data.message || null,
        source: "website_contact_form",
        status: "new",
      });
      if (!error) {
        dbSuccess = true;
      } else {
        console.error("Supabase insert error:", error);
      }
    } catch (err) {
      console.error("Supabase connection exception:", err);
    }

    // 2. Attempt EmailJS notification
    let emailSuccess = false;
    try {
      emailSuccess = await sendEmailNotification({
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email || undefined,
        program: parsed.data.program,
        message: parsed.data.message || undefined,
        source: "Contact Us Page Form",
      });
    } catch (err) {
      console.error("EmailJS notification exception:", err);
    }

    setSubmitting(false);

    // 3. Handle outcome
    if (dbSuccess || emailSuccess) {
      toast.success("Thanks! We've received your enquiry and will get back to you soon.");
      setDone(true);
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error("Could not send your message. Please call us at 094663 39415.");
    }
  };

  return (
    <>
      <Toaster position="top-center" richColors />

      <section className="py-16" style={{ background: "var(--gradient-brand)" }}>
        <div className="container-x text-center text-white">
          <p className="text-xs uppercase tracking-widest opacity-80">Get in touch</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold">Contact Us</h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/90">
            Visit our campus, give us a call, or send a message — we usually respond within a few hours.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            {[
              { icon: MapPin, title: "Visit Us",
                lines: ["MRM Honda, Maharana Pratap College", "Gate No. 1, Bhagat Singh Chowk,", "Bhiwani, Haryana 127021"] },
              { icon: Phone, title: "Call Us", lines: ["094663 39415", "9588335289"] },
              { icon: Mail, title: "Email", lines: ["info@woxyacademy.in"] },
              { icon: Clock, title: "Open Hours", lines: ["Mon – Sat: 8:00 AM – 8:00 PM", "Sunday: Doubt sessions only"] },
            ].map((c) => (
              <div key={c.title} className="p-5 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">{c.title}</h3>
                </div>
                <div className="mt-3 text-sm text-muted-foreground space-y-0.5">
                  {c.lines.map((l) => <p key={l}>{l}</p>)}
                </div>
              </div>
            ))}
            <div className="flex gap-3 px-1">
              <a href="https://instagram.com/woxycompetition" target="_blank" rel="noopener"
                 className="p-2.5 rounded-full bg-card border border-border hover:text-primary" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com/" target="_blank" rel="noopener"
                 className="p-2.5 rounded-full bg-card border border-border hover:text-primary" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 p-8 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)] space-y-4"
          >
            <h2 className="text-2xl font-bold">Send us a message</h2>
            <p className="text-sm text-muted-foreground">
              Fill in the form and we'll get back to you shortly.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Your Name *" name="name" placeholder="Full name" required maxLength={100} />
              <Field label="Phone *" name="phone" type="tel" placeholder="10-digit mobile" required maxLength={20} />
            </div>
            <Field label="Email" name="email" type="email" placeholder="you@example.com" maxLength={255} />
            <div>
              <label className="text-sm font-medium">Class / Program *</label>
              <select
                name="program"
                required
                defaultValue="Foundation (6–10)"
                className="mt-1 w-full px-4 py-2.5 rounded-lg border border-border bg-background"
              >
                {programs.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea
                name="message"
                rows={4}
                maxLength={2000}
                placeholder="Tell us how we can help..."
                className="mt-1 w-full px-4 py-2.5 rounded-lg border border-border bg-background"
              />
            </div>
            <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-70">
              {submitting ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>) : "Send Message"}
            </button>
            {done && (
              <p className="text-sm text-primary font-medium">
                Thanks! We've received your enquiry — our team will reach out shortly.
              </p>
            )}
          </form>
        </div>

        <div className="container-x mt-12">
          <div className="rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-card)]">
            <iframe
              title="Woxy Academy on map"
              src="https://www.google.com/maps?q=Maharana+Pratap+College+Bhiwani&output=embed"
              width="100%" height="380" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input {...rest} className="mt-1 w-full px-4 py-2.5 rounded-lg border border-border bg-background" />
    </div>
  );
}

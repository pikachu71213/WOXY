import { useEffect, useState } from "react";
import { MessageCircle, X, Sparkles, Loader2, GraduationCap, Phone } from "lucide-react";
import { z } from "zod";
import { toast, Toaster } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import registrationFlyer from "@/assets/registration-flyer.jpg";
import { sendEmailNotification } from "@/lib/email";

const WHATSAPP_NUMBER = "919466339415";
const WHATSAPP_MSG = encodeURIComponent(
  "Hello Woxy Academy, I'd like to know more about your courses."
);
const POPUP_KEY = "woxy_reg_popup_shown_v1";

const regSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  phone: z.string().trim().regex(/^[0-9+\-\s]{6,20}$/, "Enter a valid phone"),
  program: z.string().trim().min(1).max(60),
});

const programs = [
  "Foundation (6–10)",
  "NEET",
  "IIT-JEE",
  "NTSE / Olympiad",
  "NDA",
  "Boards / IISER",
];

export function FloatingWidgets() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Auto-open the registration popup once per visitor (after 5s).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(POPUP_KEY)) return;
    const t = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(POPUP_KEY, "1");
    }, 5000);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      program: String(fd.get("program") ?? ""),
    };
    const parsed = regSchema.safeParse(raw);
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
        email: null,
        program: parsed.data.program,
        message: "Free demo registration (popup)",
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
        program: parsed.data.program,
        message: "Requesting free demo class via home popup modal",
        source: "Homepage Demo Popup",
      });
    } catch (err) {
      console.error("EmailJS notification exception:", err);
    }

    setSubmitting(false);

    // 3. Handle outcome
    if (dbSuccess || emailSuccess) {
      toast.success("Registered! Our team will call you shortly. 🎉");
      setOpen(false);
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error("Could not register. Please call 094663 39415.");
    }
  };

  return (
    <>
      <Toaster position="top-center" richColors />

      {/* WhatsApp floating button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 group"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40" />
        <span className="relative flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 transition-transform">
          <MessageCircle className="h-7 w-7" fill="currentColor" />
        </span>
        <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-foreground text-background px-3 py-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Chat with us
        </span>
      </a>

      {/* Register CTA pill (left side) */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 -rotate-90 origin-left translate-x-6 hidden md:flex items-center gap-2 px-4 py-2 rounded-b-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg hover:bg-primary/90 transition"
        aria-label="Register for free demo"
      >
        <Sparkles className="h-4 w-4" /> Register for Free Demo
      </button>

      {/* Registration modal */}
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-lg md:max-w-[860px] max-h-[92vh] overflow-y-auto md:overflow-y-hidden rounded-3xl bg-card shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-border/80 grid grid-cols-1 md:grid-cols-12 animate-in zoom-in-95 duration-200 md:max-h-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-3 right-3 z-50 p-1.5 rounded-full bg-background/80 hover:bg-background text-foreground shadow-sm"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Left side: Image */}
            <div className="md:col-span-5 relative bg-gradient-to-b from-[#5ca3e5] to-[#0e498c] flex items-center justify-center border-b md:border-b-0 md:border-r border-border overflow-hidden">
              <img
                src={registrationFlyer}
                alt="Woxy Academy Admission Open"
                className="w-full h-full object-cover max-h-[260px] md:max-h-full"
              />
            </div>

            {/* Right side: Form */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <div
                className="py-4 px-6 text-white"
                style={{ background: "var(--gradient-brand)" }}
              >
                <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest opacity-95">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Limited Seats Open
                </div>
                <h3 className="mt-1 text-xl md:text-2xl font-bold leading-tight">
                  Admission Enquiry <span className="underline decoration-2 underline-offset-4 decoration-white/30">2026–27</span>
                </h3>
                <p className="mt-0.5 text-xs md:text-sm text-white/80">
                  Fill the form to book your free demo class.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-5 md:p-6 space-y-3">
                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Full Name *</label>
                  <input
                    name="name"
                    required
                    maxLength={100}
                    placeholder="Student's name"
                    className="mt-1 w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Mobile Number *</label>
                  <input
                    name="phone"
                    required
                    type="tel"
                    maxLength={20}
                    placeholder="10-digit mobile"
                    className="mt-1 w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                    <GraduationCap className="h-3.5 w-3.5 text-muted-foreground/80" /> Class / Program *
                  </label>
                  <select
                    name="program"
                    required
                    defaultValue="Foundation (6–10)"
                    className="mt-1 w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  >
                    {programs.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full justify-center py-2.5 rounded-xl disabled:opacity-70 mt-2 font-semibold text-sm cursor-pointer shadow-[0_4px_12px_rgba(var(--primary-glow),0.15)]"
                >
                  {submitting ? (
                    <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Submitting…</>
                  ) : (
                    <>Submit Enquiry</>
                  )}
                </button>

                <div className="flex flex-wrap gap-x-3 gap-y-1 justify-center pt-3 border-t border-border/50">
                  <a
                    href="tel:+919466339415"
                    className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="h-3 w-3 text-primary/70" />
                    <span>Ashish Sir: <strong className="font-semibold text-foreground">094663 39415</strong></span>
                  </a>
                  <span className="text-border hidden sm:inline text-xs">•</span>
                  <a
                    href="tel:+918950285289"
                    className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="h-3 w-3 text-primary/70" />
                    <span>Pawan Sir: <strong className="font-semibold text-foreground">8950285289</strong></span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { useEffect, useState } from "react";
import { MessageCircle, X, Sparkles, Loader2, GraduationCap, Phone } from "lucide-react";
import { z } from "zod";
import { toast, Toaster } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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

  // Auto-open the registration popup once per visitor (after 6s).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(POPUP_KEY)) return;
    const t = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(POPUP_KEY, "1");
    }, 6000);
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
    const { error } = await supabase.from("leads").insert({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: null,
      program: parsed.data.program,
      message: "Free demo registration (popup)",
      source: "website_contact_form",
      status: "new",
    });
    setSubmitting(false);
    if (error) {
      console.error(error);
      toast.error("Could not register. Please call 094663 39415.");
      return;
    }
    toast.success("Registered! Our team will call you shortly. 🎉");
    setOpen(false);
    (e.target as HTMLFormElement).reset();
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
            className="relative w-full max-w-md rounded-2xl bg-card shadow-2xl overflow-hidden border border-border animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-background/80 hover:bg-background text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div
              className="p-6 text-white"
              style={{ background: "var(--gradient-brand)" }}
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-90">
                <Sparkles className="h-3.5 w-3.5" /> Limited Seats
              </div>
              <h3 className="mt-2 text-2xl font-bold leading-tight">
                Book Your <span className="underline decoration-2 underline-offset-4">Free Demo Class</span>
              </h3>
              <p className="mt-1 text-sm text-white/90">
                NEET • IIT-JEE • NDA • Foundation — taught by Ashish Sir & Pawan Sir.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Full Name *</label>
                <input
                  name="name"
                  required
                  maxLength={100}
                  placeholder="Student's name"
                  className="mt-1 w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Mobile Number *</label>
                <input
                  name="phone"
                  required
                  type="tel"
                  maxLength={20}
                  placeholder="10-digit mobile"
                  className="mt-1 w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <GraduationCap className="h-3.5 w-3.5" /> Class / Program *
                </label>
                <select
                  name="program"
                  required
                  defaultValue="Foundation (6–10)"
                  className="mt-1 w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm"
                >
                  {programs.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full justify-center disabled:opacity-70"
              >
                {submitting ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Registering…</>
                ) : (
                  <>Register Now — It's Free</>
                )}
              </button>

              <a
                href="tel:+919466339415"
                className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-primary"
              >
                <Phone className="h-3 w-3" /> Or call us at 094663 39415
              </a>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

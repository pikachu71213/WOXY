import { createFileRoute, Link } from "@tanstack/react-router";
import { courses } from "@/lib/courses";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — NEET, IIT, NTSE, NDA Coaching | Woxy Academy Bhiwani" },
      { name: "description", content: "Explore Woxy Academy's courses in Bhiwani — NEET, IIT-JEE, NTSE, NDA, Olympiads, IISER and Foundation classes for Class 6 to 12." },
      { property: "og:title", content: "Courses at Woxy Academy Bhiwani" },
      { property: "og:description", content: "NEET, IIT-JEE, NTSE, NDA, Olympiads and strong school foundation programs." },
    ],
  }),
  component: Courses,
});

const features = [
  "Concept-first teaching by experienced faculty",
  "Weekly chapter tests and monthly competitive level exams",
  "Doubt-clearing sessions, mentor calls and parent updates",
  "Well-equipped science laboratory & library",
  "NCERT-aligned study material with revision booklets",
  "Performance dashboards and individual learning plans",
];

function Courses() {
  return (
    <>
      <section className="py-16" style={{ background: "var(--gradient-brand)" }}>
        <div className="container-x text-center text-white">
          <p className="text-xs uppercase tracking-widest opacity-80">Programs</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold">Our Courses</h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/90">
            Special preparation foundation for Class 6 to 12 — IIT | NEET | NTSE | NDA | IISER | Olympiads.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => (
            <article key={c.title} className="p-6 rounded-2xl bg-card border border-border hover:shadow-[var(--shadow-elegant)] transition">
              <div className="p-3 inline-flex rounded-xl bg-primary/10 text-primary">
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="container-x grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary font-semibold">What's included</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">A complete learning system</h2>
            <p className="mt-3 text-muted-foreground">
              Every Woxy program is built around clarity, practice and feedback — the three things that actually move scores.
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <li key={f} className="flex gap-3 p-4 rounded-xl bg-card border border-border">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 text-center">
        <div className="container-x">
          <h2 className="text-3xl md:text-4xl font-bold">Not sure which program is right for you?</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Talk to our counsellor — we'll suggest the best track based on your class, goals and current preparation.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="tel:+919466339415" className="btn-primary">Call 094663 39415</a>
            <Link to="/contact" className="btn-outline">Visit Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}

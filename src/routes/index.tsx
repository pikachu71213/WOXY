import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroCarousel } from "@/components/HeroCarousel";
import { BannerStrip } from "@/components/BannerStrip";
import { courses } from "@/lib/courses";
import { Award, Users, BookOpenCheck, Sparkles, ArrowRight, Star } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Woxy Academy Bhiwani — NEET, IIT, NTSE, NDA Coaching" },
      { name: "description", content: "Woxy Science & Competition Classes in Bhiwani — concept-based coaching for NEET, IIT-JEE, NTSE, NDA, Olympiads and Foundation (Class 6–12)." },
      { property: "og:title", content: "Woxy Academy Bhiwani — Building Concepts, Building Futures" },
      { property: "og:description", content: "Top coaching academy in Bhiwani for NEET, IIT, NTSE, NDA, Olympiads and school foundation." },
    ],
  }),
  component: Home,
});

const stats = [
  { icon: Users, value: "1500+", label: "Students Mentored" },
  { icon: Award, value: "5.0", label: "Google Rating" },
  { icon: BookOpenCheck, value: "10+", label: "Years of Excellence" },
  { icon: Sparkles, value: "100+", label: "Selections" },
];

function Home() {
  return (
    <>
      <HeroCarousel />

      {/* Stats strip */}
      <section className="border-b border-border bg-background">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-6 py-10">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-secondary text-primary">
                <s.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <BannerStrip />

      {/* About preview */}
      <section className="py-20">
        <div className="container-x grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary font-semibold">About Woxy</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">
              Where Concepts Become Confidence
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Woxy Science &amp; Competition Classes is Bhiwani's trusted institute
              for serious learners. We specialise in <strong>NEET, IIT-JEE, NTSE,
              NDA, IISER and Olympiads</strong> with strong foundation programs from
              Class 6 to 12. Our approach blends conceptual clarity, regular
              testing and one-on-one mentorship.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Led by educators <strong>Ashish Sir</strong> and <strong>Pawan Sir</strong>,
              the academy has earned a 5.0 rating on Google with consistent results
              and a culture of discipline.
            </p>
            <div className="mt-6 flex gap-3">
              <Link to="/about" className="btn-primary">
                Know More <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/courses" className="btn-outline">View Courses</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              "Concept-first teaching by experienced faculty",
              "Smart classrooms, science lab & library",
              "Weekly tests, doubt sessions, mentor calls",
              "Affordable fees with scholarship for toppers",
            ].map((t, i) => (
              <div key={i} className="p-5 rounded-xl bg-card border border-border shadow-[var(--shadow-card)]">
                <Star className="h-5 w-5 text-[var(--gold)] mb-3" />
                <p className="text-sm font-medium">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses preview */}
      <section className="py-20 bg-secondary">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold">Programs</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">Courses We Offer</h2>
            <p className="mt-3 text-muted-foreground">
              Special preparation foundation for Class 6 to 12 • IIT | NEET | NTSE | NDA | IISER
            </p>
          </div>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c) => (
              <article key={c.title} className="p-6 rounded-2xl bg-card border border-border hover:shadow-[var(--shadow-elegant)] transition-shadow">
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
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-x">
          <div className="rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden"
               style={{ background: "var(--gradient-brand)" }}>
            <h2 className="text-3xl md:text-4xl font-bold">Ready to start your journey?</h2>
            <p className="mt-3 max-w-xl mx-auto text-white/90">
              Admissions open for the 2026 batch. Visit our campus in Bhiwani or
              call us to book a free counselling session.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href="tel:+919466339415" className="bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition">
                Call 094663 39415
              </a>
              <Link to="/contact" className="border-2 border-white text-white font-semibold px-6 py-3 rounded-xl hover:bg-white hover:text-primary transition">
                Visit Campus
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

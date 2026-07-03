import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, Eye, Heart, Award } from "lucide-react";
import ashish from "@/assets/director-ashish.jpg";
import pawan from "@/assets/director-pawan.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Woxy Science & Competition Classes, Bhiwani" },
      { name: "description", content: "Meet Woxy Academy Bhiwani — directors Ashish Sir & Pawan Sir, our mission, teaching philosophy, and a decade of helping students crack NEET, IIT, NTSE & NDA." },
      { property: "og:title", content: "About Woxy Academy — Directors & Story" },
      { property: "og:description", content: "Founded by Ashish Sir & Pawan Sir, Woxy Academy is Bhiwani's trusted institute for science & competitive exam preparation." },
    ],
  }),
  component: About,
});

const directors = [
  {
    name: "Ashish Sir",
    role: "Principal & Co-Director",
    img: ashish,
    bio: "An educator with over a decade of experience teaching Physics and mentoring NEET & IIT aspirants. Ashish Sir leads academic strategy at Woxy and is known for breaking down complex concepts into intuitive, exam-ready ideas. His student-first approach has shaped hundreds of careers in medicine, engineering and defence.",
  },
  {
    name: "Pawan Sir",
    role: "Co-Director & Head of Mathematics",
    img: pawan,
    bio: "Pawan Sir heads the Mathematics and competitive aptitude wing at Woxy. With deep expertise in JEE, NTSE and NDA-level problem solving, he is loved by students for his calm, patient teaching style and his ability to make Maths simple, logical and even enjoyable.",
  },
];

const pillars = [
  { icon: Target, title: "Our Mission",
    text: "To make quality science and competitive exam coaching accessible to every aspiring student of Bhiwani and beyond." },
  { icon: Eye, title: "Our Vision",
    text: "To be the most trusted academy in Haryana — known for results, integrity and a culture of disciplined learning." },
  { icon: Heart, title: "Our Values",
    text: "Honesty, hard work and personal attention. We treat every student like family and every dream like our own." },
  { icon: Award, title: "Our Promise",
    text: "Smart classrooms, expert faculty, weekly tests and an unwavering commitment to your growth." },
];

function About() {
  return (
    <>
      <section className="relative py-20 overflow-hidden" style={{ background: "var(--gradient-brand)" }}>
        <div className="container-x text-center text-white">
          <p className="text-xs uppercase tracking-widest opacity-80">About Woxy Academy</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold">Building Concepts, Building Futures</h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/90">
            A decade of helping students of Bhiwani crack NEET, IIT-JEE, NTSE, NDA
            and Olympiads — with a teaching method built on clarity, consistency and care.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary font-semibold">Our Story</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">A culture of disciplined learning</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Woxy Science &amp; Competition Classes was founded with one simple
              belief: with the right guidance, no goal is out of reach. From a
              handful of curious students to one of Bhiwani's most respected
              science academies, our journey has always been student-first.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Today, Woxy is home to a 5.0-rated learning ecosystem — concept-first
              classrooms, well-equipped labs, regular practice tests, doubt
              sessions and personal mentoring. Whether you are in Class 6
              starting your foundation, or in Class 12 chasing NEET, IIT or NDA,
              you'll find a structured roadmap and people who care about your
              progress every single week.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              We don't just prepare students for an exam — we prepare them for
              the way of thinking that exams reward.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {pillars.map((p) => (
              <div key={p.title} className="p-6 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)]">
                <div className="p-3 inline-flex rounded-xl bg-primary/10 text-primary">
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-3 font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold">Leadership</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">Meet Our Directors</h2>
            <p className="mt-3 text-muted-foreground">
              The educators behind Woxy — guiding students with experience, empathy and a relentless focus on results.
            </p>
          </div>
          <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {directors.map((d) => (
              <article
                key={d.name}
                className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/20 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 flex flex-col group"
              >
                <div className="aspect-[4/5] overflow-hidden bg-muted relative">
                  <img
                    src={d.img}
                    alt={`${d.name} — ${d.role}`}
                    loading="lazy"
                    width={768}
                    height={896}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{d.name}</h3>
                  <p className="text-sm text-primary font-semibold mt-1">{d.role}</p>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed flex-1">{d.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Come visit our campus</h2>
          <p className="mt-3 text-muted-foreground">We'd love to show you around and answer your questions.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-primary">Get Directions</Link>
            <Link to="/gallery" className="btn-outline">View Gallery</Link>
          </div>
        </div>
      </section>
    </>
  );
}

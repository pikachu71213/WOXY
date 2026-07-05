import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import b20 from "@/assets/20.jpeg";
import b21 from "@/assets/21.jpeg";
import b22 from "@/assets/22.jpeg";
import b23 from "@/assets/23.jpeg";
import b24 from "@/assets/24.jpeg";

const slides = [
  { img: b20, title: "Building Concepts, Building Futures",
    sub: "Smart coaching for School & Competitive Exams in Bhiwani." },
  { img: b21, title: "Science Labs & Experiential Learning",
    sub: "Physics, Chemistry & Biology made simple, visual and hands-on." },
  { img: b22, title: "Expert Faculty. Personal Attention.",
    sub: "Concept-first teaching for NEET, IIT-JEE, NTSE, NDA & Olympiads." },
  { img: b23, title: "A Legacy of Achievers",
    sub: "Where consistent effort meets the right guidance." },
  { img: b24, title: "Structured Roadmap to Success",
    sub: "Interactive sessions, weekly tests, and detailed progress tracking." }
];

export function HeroCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[78vh] min-h-[520px] w-full overflow-hidden">
      {slides.map((s, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
          style={{ opacity: i === idx ? 1 : 0 }}
        >
          <img
            src={s.img}
            alt={s.title}
            className="h-full w-full object-cover"
            style={{
              transform: i === idx ? "scale(1.06)" : "scale(1)",
              transition: "transform 6s ease-out",
            }}
            loading={idx === 0 ? "eager" : "lazy"}
            width={1920}
            height={900}
          />
          <div
            className="absolute inset-0"
            style={{ background: "var(--gradient-hero)" }}
          />
        </div>
      ))}

      <div className="relative z-10 h-full container-x flex flex-col justify-center text-white">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/15 backdrop-blur border border-white/30">
            Woxy Academy · Bhiwani
          </span>
          <h1
            key={i}
            className="fade-up mt-5 text-4xl md:text-6xl font-bold leading-tight"
          >
            {slides[i].title}
          </h1>
          <p key={`p-${i}`} className="fade-up mt-4 text-lg md:text-xl text-white/90 max-w-xl">
            {slides[i].sub}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/courses" className="btn-primary">
              Explore Courses <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="tel:+919466339415" className="btn-outline !border-white !text-white hover:!bg-white hover:!text-primary">
              <Phone className="h-4 w-4" /> 094663 39415
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Slide ${idx + 1}`}
            className="h-1.5 rounded-full transition-all"
            style={{
              width: i === idx ? 32 : 12,
              background: i === idx ? "white" : "rgba(255,255,255,0.5)",
            }}
          />
        ))}
      </div>
    </section>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import g1 from "@/assets/1.jpeg";
import g2 from "@/assets/2.jpeg";
import g3 from "@/assets/3.jpeg";
import g4 from "@/assets/4.jpeg";
import g5 from "@/assets/5.jpeg";
import g6 from "@/assets/6.jpeg";
import g7 from "@/assets/7.jpeg";
import g8 from "@/assets/8.jpeg";
import g9 from "@/assets/9.jpeg";
import g10 from "@/assets/10.jpeg";
import g11 from "@/assets/11.jpeg";
import g12 from "@/assets/12.jpeg";
import g13 from "@/assets/13.jpeg";
import g14 from "@/assets/14.jpeg";
import g15 from "@/assets/15.jpeg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery & Student Life | Woxy Academy Bhiwani" },
      { name: "description", content: "Browse photos of classrooms, science labs, library, and student events at Woxy Academy, the best science and physics academy in Bhiwani, Haryana." },
      { name: "keywords", content: "best academy in bhiwani, science academy, woxy academy, science and physics academy, gallery, classroom photos, coaching lab" },
      { property: "og:title", content: "Gallery — Woxy Academy Bhiwani" },
      { property: "og:description", content: "Memorable moments, achievements and campus life at Woxy Academy." },
    ],
  }),
  component: Gallery,
});

const images = [
  { src: g1, caption: "Our Campus" },
  { src: g2, caption: "Group Photo with Faculty" },
  { src: g3, caption: "Interactive Classroom" },
  { src: g4, caption: "Topper Felicitation" },
  { src: g5, caption: "Chemistry Lab Session" },
  { src: g6, caption: "Library & Self Study" },
  { src: g7, caption: "Morning Assembly" },
  { src: g8, caption: "Personal Mentoring" },
  { src: g9, caption: "Olympiad Medals" },
  { src: g10, caption: "Annual Function" },
  { src: g11, caption: "NDA Aspirants" },
  { src: g12, caption: "Weekly Exam" },
  { src: g13, caption: "Parent-Teacher Meeting" },
  { src: g14, caption: "Smart Classroom" },
  { src: g15, caption: "Graduating Batch" },
];

function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <section className="py-16" style={{ background: "var(--gradient-brand)" }}>
        <div className="container-x text-center text-white">
          <p className="text-xs uppercase tracking-widest opacity-80">Memories</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold">Our Gallery</h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/90">
            Moments that define Woxy — from focused study sessions to celebrations of success.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map((im, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="group relative w-full overflow-hidden rounded-xl bg-secondary shadow-[var(--shadow-card)] break-inside-avoid mb-4 block cursor-pointer"
              >
                <img
                  src={im.src}
                  alt={`${im.caption} — Woxy Science & Physics Academy, Bhiwani, Haryana`}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 via-black/45 to-transparent text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition duration-300">
                  {im.caption}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {active !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            <X />
          </button>
          <figure className="max-w-5xl w-full">
            <img src={images[active].src} alt={images[active].caption}
                 className="w-full max-h-[80vh] object-contain rounded-xl" />
            <figcaption className="text-center text-white mt-4 text-sm">{images[active].caption}</figcaption>
          </figure>
        </div>
      )}
    </>
  );
}

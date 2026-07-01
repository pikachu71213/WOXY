import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import g7 from "@/assets/gallery-7.jpg";
import g8 from "@/assets/gallery-8.jpg";
import g9 from "@/assets/gallery-9.jpg";
import g10 from "@/assets/gallery-10.jpg";
import g11 from "@/assets/gallery-11.jpg";
import g12 from "@/assets/gallery-12.jpg";
import g13 from "@/assets/gallery-13.jpg";
import g14 from "@/assets/gallery-14.jpg";
import g15 from "@/assets/gallery-15.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Memories from Woxy Academy Bhiwani" },
      { name: "description", content: "A glimpse into life at Woxy Science & Competition Classes — classrooms, labs, awards, events and moments with our students in Bhiwani." },
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((im, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="group relative aspect-square overflow-hidden rounded-xl bg-secondary shadow-[var(--shadow-card)]"
              >
                <img
                  src={im.src}
                  alt={im.caption}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition">
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

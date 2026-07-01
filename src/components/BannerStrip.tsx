import g1 from "@/assets/gallery-1.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g14 from "@/assets/gallery-14.jpg";

const items = [
  { img: g1, label: "Our Campus" },
  { img: g3, label: "Interactive Classes" },
  { img: g5, label: "Science Lab" },
  { img: g14, label: "Smart Classrooms" },
];

export function BannerStrip() {
  // duplicate for seamless marquee
  const loop = [...items, ...items];
  return (
    <section className="py-16 bg-secondary overflow-hidden">
      <div className="container-x mb-8 text-center">
        <p className="text-xs uppercase tracking-widest text-primary font-semibold">A glimpse inside Woxy</p>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold">Our Institute</h2>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          A learning environment built for focus, curiosity and discipline.
        </p>
      </div>

      <div className="relative">
        <div className="marquee-track gap-6 px-6">
          {loop.map((it, i) => (
            <figure
              key={i}
              className="relative shrink-0 w-[300px] md:w-[420px] aspect-[4/3] rounded-xl overflow-hidden shadow-[var(--shadow-card)] group"
            >
              <img
                src={it.img}
                alt={it.label}
                loading="lazy"
                width={1024}
                height={768}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4 text-sm font-semibold">
                {it.label}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-secondary to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-secondary to-transparent" />
      </div>
    </section>
  );
}

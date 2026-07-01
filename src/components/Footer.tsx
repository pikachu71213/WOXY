import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 bg-secondary border-t border-border">
      <div className="container-x py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo className="h-20 md:h-24 w-auto mb-4" />
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            Woxy Science &amp; Competition Classes — Bhiwani's trusted academy for
            NEET, IIT-JEE, NTSE, NDA, Olympiads and Foundation (Class 6–12).
            Building concepts. Building futures.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <a href="https://instagram.com/woxycompetition" target="_blank" rel="noopener" aria-label="Instagram"
              className="p-2 rounded-full bg-background border border-border hover:text-primary">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://facebook.com/" target="_blank" rel="noopener" aria-label="Facebook"
              className="p-2 rounded-full bg-background border border-border hover:text-primary">
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://www.justdial.com/Bhiwani/Woxy-Science-Competition-Classes-Near-Mahana-Pratap-College-Bhagat-Singh-Chowk/9999PX166-X166-231228174318-E4N6_BZDET"
              target="_blank"
              rel="noopener"
              aria-label="Just Dial Certified"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF6F00] text-white text-xs font-bold tracking-wide shadow-md hover:brightness-110 transition"
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#FF6F00] font-black text-[10px]">JD</span>
              Certified by Just Dial
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link to="/courses" className="hover:text-primary">Courses</Link></li>
            <li><Link to="/gallery" className="hover:text-primary">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide">Reach Us</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              MRM Honda, Maharana Pratap College Gate No.1, Bhagat Singh Chowk, Bhiwani, Haryana 127021
            </li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-primary" />
              <a href="tel:+919466339415" className="hover:text-primary">094663 39415</a>
            </li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-primary" />
              <a href="mailto:info@woxyacademy.in" className="hover:text-primary">info@woxyacademy.in</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x py-5 text-xs text-muted-foreground flex flex-col md:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} Woxy Science &amp; Competition Classes. All rights reserved.</p>
          <p>Bhiwani, Haryana · Building Concepts, Building Futures.</p>
        </div>
      </div>
    </footer>
  );
}

import { Atom, FlaskConical, Trophy, Shield, GraduationCap, BookOpen } from "lucide-react";

export const courses = [
  {
    icon: GraduationCap,
    title: "Foundation (Class 6–10)",
    desc: "Build a rock-solid base in Maths and Science with concept-first teaching, regular tests and personal mentoring.",
    tags: ["Maths", "Science", "Mental Ability"],
  },
  {
    icon: FlaskConical,
    title: "NEET (Medical)",
    desc: "Complete preparation for NEET-UG with NCERT mastery, biology focus, daily practice problems and full-length tests.",
    tags: ["Biology", "Chemistry", "Physics"],
  },
  {
    icon: Atom,
    title: "IIT-JEE (Engineering)",
    desc: "Rigorous JEE Main & Advanced preparation with deep concept clarity, problem-solving sessions and Olympiad-level practice.",
    tags: ["JEE Main", "Advanced", "PCM"],
  },
  {
    icon: Trophy,
    title: "NTSE & Olympiads",
    desc: "Scholarship and Olympiad training — NTSE, NSO, NSEJS, IJSO and KVPY style — to sharpen thinking and competitive temperament.",
    tags: ["NTSE", "NSO", "KVPY"],
  },
  {
    icon: Shield,
    title: "NDA Foundation",
    desc: "Structured NDA written-exam coaching with maths, GAT, current affairs and disciplined daily routine for aspirants.",
    tags: ["Maths", "GAT", "Strategy"],
  },
  {
    icon: BookOpen,
    title: "IISER / Boards (11–12)",
    desc: "Class 11 & 12 board preparation aligned with CBSE/HBSE plus IISER aptitude training — strong boards, stronger competitive edge.",
    tags: ["CBSE", "HBSE", "IISER"],
  },
];

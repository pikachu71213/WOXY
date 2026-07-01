import logo from "@/assets/woxy-logo.png";

export function Logo({ className = "h-12" }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="Woxy Science & Competition Classes logo"
      className={className}
      width={900}
      height={300}
    />
  );
}

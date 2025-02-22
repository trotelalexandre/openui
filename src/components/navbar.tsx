import Link from "next/link";
import { AuthButton } from "@/components/auth-button";
import { Button } from "./ui/button";

interface NavbarProps {
  isAuthenticated: boolean;
}

const nav = [
  { href: "/", label: "Home" },
  { href: "/upload", label: "Upload" },
];

export function Navbar({ isAuthenticated }: NavbarProps) {
  return (
    <nav className="flex justify-between border-b p-4">
      <div className="space-x-2">
        {nav.map(({ href, label }) => (
          <Button key={href} variant="ghost" asChild>
            <Link href={href}>{label}</Link>
          </Button>
        ))}
      </div>

      <AuthButton isAuthenticated={isAuthenticated} />
    </nav>
  );
}

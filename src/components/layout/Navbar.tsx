import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navLinks } from "../../data/navigation";
import { Container } from "./Container";
import { cn } from "../../lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "border-b border-zinc-200/80 bg-white/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2" aria-label="Formzo home">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-950 text-[10px] font-bold text-white">
              F
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-zinc-950">
              formzo
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            <a
              href="#pricing"
              className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            >
              Pricing
            </a>
            {navLinks
              .filter((link) => link.href !== "#pricing")
              .map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                >
                  {link.label}
                </a>
              ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/new"
              className="inline-flex h-9 items-center rounded-lg bg-zinc-950 px-3.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
            >
              Create form
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-700 hover:bg-zinc-100 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="border-t border-zinc-200 bg-white md:hidden">
          <Container className="py-4">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                to="/new"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-zinc-950 px-4 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Create form
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}

import { Container } from "./Container";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Templates", href: "#templates" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "#" },
      { label: "Guides", href: "#" },
      { label: "Support", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#security" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2" aria-label="Formzo home">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-950 text-[10px] font-bold text-white">
                F
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-zinc-950">
                formzo
              </span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">
              The simplest way to create forms, collect responses, and understand
              what people think.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
                {col.title}
              </p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-zinc-500 transition-colors hover:text-zinc-900"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} Formzo. All rights reserved.
          </p>
          <p className="text-xs text-zinc-400">Built for makers who ship.</p>
        </div>
      </Container>
    </footer>
  );
}

import { Link } from "react-router-dom";
import {
  FileText,
  Sparkles,
  Palette,
  Share2,
  Check,
  ArrowRight,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Just start typing",
    description:
      "A block editor that works like a document. No drag-and-drop confusion — just type and your form builds itself.",
  },
  {
    icon: Sparkles,
    title: "Conditional logic",
    description:
      "Smart forms that adapt. Show or hide fields based on answers. Ask the right questions at the right time.",
  },
  {
    icon: Palette,
    title: "Customize everything",
    description:
      "Match your brand perfectly. Custom colors, fonts, backgrounds, and even your own domain.",
  },
];

const steps = [
  {
    icon: FileText,
    title: "Create",
    description: "Start typing to add fields. Your form takes shape as you write.",
  },
  {
    icon: Palette,
    title: "Customize",
    description: "Match your brand with custom themes, colors, and layouts.",
  },
  {
    icon: Share2,
    title: "Share",
    description: "Publish with one click. Share via link, embed, or QR code.",
  },
];

const templates = [
  { name: "Contact Form", description: "Collect inquiries and messages", fields: 5 },
  { name: "Feedback Survey", description: "Gather user feedback", fields: 8 },
  { name: "Event Registration", description: "Sign up attendees for events", fields: 6 },
  { name: "Job Application", description: "Accept job applications", fields: 10 },
  { name: "Newsletter Signup", description: "Grow your mailing list", fields: 3 },
  { name: "Order Form", description: "Accept orders and payments", fields: 7 },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["Unlimited forms", "Unlimited submissions", "Basic themes", "1 GB storage"],
    cta: "Get started",
    primary: false,
  },
  {
    name: "Pro",
    price: "$24",
    period: "/month",
    features: [
      "Everything in Free",
      "Custom domains",
      "Conditional logic",
      "File uploads",
      "Priority support",
    ],
    cta: "Start free trial",
    primary: true,
  },
  {
    name: "Business",
    price: "$74",
    period: "/month",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "API access",
      "SSO & SAML",
      "Dedicated support",
      "SLA",
    ],
    cta: "Contact sales",
    primary: false,
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#9B72FF]">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold">Formzo</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900">
            Log in
          </Link>
          <Link
            to="/signup"
            className="rounded-lg bg-[#9B72FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#8A5FE6]"
          >
            Get started
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-6xl">
          Forms that feel like{" "}
          <span className="text-[#9B72FF]">your product.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-gray-500">
          The form builder that works like a document. Just start typing.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            to="/signup"
            className="rounded-lg bg-[#9B72FF] px-6 py-3 text-sm font-medium text-white hover:bg-[#8A5FE6]"
          >
            Create a form
          </Link>
          <Link
            to="#templates"
            className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            See templates
          </Link>
        </div>
      </section>

      <section className="border-y border-gray-100 py-12">
        <p className="text-center text-sm text-gray-400">
          Trusted by 100,000+ teams
        </p>
        <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-12">
          {["Acme Corp", "Globex", "Initech", "Umbrella", "Stark"].map((name) => (
            <span key={name} className="text-lg font-semibold text-gray-200">
              {name}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="text-center text-3xl font-bold">Why Formzo?</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-gray-100 p-8 transition hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                <f.icon className="h-6 w-6 text-[#9B72FF]" />
              </div>
              <h3 className="mt-6 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-3xl font-bold">How it works</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#9B72FF] text-lg font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="templates" className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="text-center text-3xl font-bold">Start with a template</h2>
        <p className="mx-auto mt-4 text-center text-gray-500">
          Pick a template and customize it in minutes.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <div
              key={t.name}
              className="group cursor-pointer rounded-2xl border border-gray-200 p-6 transition hover:border-[#9B72FF] hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-[#9B72FF] transition group-hover:bg-[#9B72FF] group-hover:text-white">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{t.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{t.description}</p>
              <p className="mt-3 text-xs text-gray-400">{t.fields} fields</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="text-center text-3xl font-bold">Simple pricing</h2>
        <p className="mx-auto mt-4 text-center text-gray-500">
          Start free, upgrade when you need more.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl border p-8 ${
                p.primary
                  ? "border-[#9B72FF] bg-[#9B72FF] text-white shadow-xl"
                  : "border-gray-200"
              }`}
            >
              <h3 className={`text-lg font-semibold ${p.primary ? "text-white" : ""}`}>
                {p.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{p.price}</span>
                <span
                  className={`text-sm ${p.primary ? "text-purple-200" : "text-gray-400"}`}
                >
                  {p.period}
                </span>
              </div>
              <ul className="mt-6 space-y-3">
                {p.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className={`mt-8 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                  p.primary
                    ? "bg-white text-[#9B72FF] hover:bg-gray-100"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {p.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-900 py-24 text-center text-white">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-3xl font-bold">Build your first form</h2>
          <p className="mt-4 text-gray-400">
            Free forever. No credit card required. Set up in minutes.
          </p>
          <Link
            to="/signup"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#9B72FF] px-6 py-3 text-sm font-medium text-white hover:bg-[#8A5FE6]"
          >
            Get started for free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#9B72FF]">
              <Zap className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-bold">Formzo</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-900">Privacy</a>
            <a href="#" className="hover:text-gray-900">Terms</a>
            <a href="#" className="hover:text-gray-900">Docs</a>
            <a href="#" className="hover:text-gray-900">Contact</a>
          </div>
          <p className="text-xs text-gray-400">© 2026 Formzo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

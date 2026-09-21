import { Link, useNavigate } from "react-router-dom";

function DoodleSpeechBubble({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 100"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 15C10 11 13 8 17 8H85C89 8 92 11 92 15V55C92 59 89 62 85 62H45L25 82V62H17C13 62 10 59 10 55V15Z"
        stroke="#37352F"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="0"
        fill="none"
      />
      <circle cx="32" cy="35" r="4" fill="#37352F" />
      <circle cx="51" cy="35" r="4" fill="#37352F" />
      <circle cx="70" cy="35" r="4" fill="#37352F" />
    </svg>
  );
}

function DoodleStar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30 5L35 22H53L38 33L43 50L30 40L17 50L22 33L7 22H25L30 5Z"
        stroke="#37352F"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function DoodleSquiggle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 30"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 15C15 5 25 25 35 15C45 5 55 25 65 15C75 5 85 25 95 15C105 5 115 25 115 15"
        stroke="#37352F"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function DoodleSmiley({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 70 70"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="35"
        cy="35"
        r="28"
        stroke="#37352F"
        strokeWidth="2.5"
        fill="none"
      />
      <circle cx="25" cy="30" r="3.5" fill="#37352F" />
      <circle cx="45" cy="30" r="3.5" fill="#37352F" />
      <path
        d="M23 42C26 48 44 48 47 42"
        stroke="#37352F"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function DoodleSpiral({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30 30C30 26 34 22 38 22C42 22 46 26 46 30C46 34 42 38 38 38C35 38 32 36 32 33C32 30 35 28 38 28C40 28 42 30 42 32"
        stroke="#37352F"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function DoodleArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 60C25 50 35 25 55 20"
        stroke="#37352F"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M50 15L58 20L50 27"
        stroke="#37352F"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function DoodleCircle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="25"
        cy="25"
        r="18"
        stroke="#37352F"
        strokeWidth="2.5"
        strokeDasharray="4 6"
        fill="none"
      />
    </svg>
  );
}

function DoodleCross({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 10L30 30M30 10L10 30"
        stroke="#37352F"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function FormBuilderMockup() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
          <div className="h-3 w-3 rounded-full bg-gray-200" />
          <div className="h-3 w-3 rounded-full bg-gray-200" />
          <div className="h-3 w-3 rounded-full bg-gray-200" />
          <div className="ml-3 flex-1 rounded-md bg-gray-50 px-3 py-1 text-xs text-gray-400">
            tally.so/r/formzo
          </div>
        </div>
        <div className="p-8">
          <div className="mx-auto max-w-md space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Register now</h3>
            <p className="text-sm text-gray-500">
              Fill in the details below to create your account.
            </p>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Full name
                </label>
                <div className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Role
                </label>
                <div className="flex gap-3">
                  <div className="h-10 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3" />
                  <div className="h-10 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3" />
                  <div className="h-10 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded border border-gray-300" />
                <span className="text-sm text-gray-500">
                  I agree to the terms and conditions
                </span>
              </div>
              <div className="h-10 w-full rounded-lg bg-gray-900" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif] text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between bg-white/80 px-6 py-4 backdrop-blur-md lg:px-12">
        <Link to="/" className="text-xl font-black tracking-tight">
          formzo<span className="text-gray-900">*</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="#pricing"
            className="hidden rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 sm:inline-block"
          >
            Pricing
          </Link>
          <Link
            to="/login"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="hidden rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 sm:inline-block"
          >
            Sign up
          </Link>
          <button
            onClick={() => navigate("/signup")}
            className="rounded-lg bg-[#0070D7] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#005BB5]"
          >
            Create form
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pb-16 pt-20 lg:px-12 lg:pb-24 lg:pt-32">
        {/* Left doodles */}
        <div className="pointer-events-none absolute left-4 top-24 hidden w-48 lg:block xl:left-12 xl:w-56">
          <DoodleSpeechBubble className="mb-4 w-20 opacity-60" />
          <DoodleSquiggle className="ml-8 w-28 opacity-50" />
          <DoodleCross className="ml-2 mt-2 w-8 opacity-40" />
        </div>

        {/* Right doodles */}
        <div className="pointer-events-none absolute right-4 top-20 hidden w-48 lg:block xl:right-12 xl:w-56">
          <DoodleStar className="ml-auto w-12 opacity-60" />
          <DoodleSmiley className="ml-auto mt-4 w-14 opacity-50" />
          <DoodleSpiral className="ml-auto mt-2 w-10 opacity-40" />
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-black sm:text-5xl lg:text-6xl xl:text-[68px]">
            The simplest way to create forms
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-gray-500 sm:text-xl">
            Say goodbye to boring forms. Meet Formzo — the free, intuitive form
            builder you've been looking for.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              onClick={() => navigate("/signup")}
              className="inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800 sm:text-lg"
            >
              Create a free form
              <svg
                className="h-4 w-4"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 3L11 8L6 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span className="text-sm text-gray-400">No signup required</span>
          </div>
        </div>

        {/* Bottom doodles */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 opacity-30">
          <DoodleArrow className="w-16 rotate-[20deg]" />
        </div>
      </section>

      {/* Form Builder Preview */}
      <section className="px-6 pb-24 lg:px-12 lg:pb-32">
        <div className="relative">
          {/* Floating doodles around mockup */}
          <DoodleStar className="absolute -left-8 top-8 hidden w-10 opacity-40 lg:block" />
          <DoodleCircle className="absolute -right-6 top-12 hidden w-8 opacity-40 lg:block" />
          <DoodleSquiggle className="absolute -bottom-4 left-1/4 hidden w-20 opacity-30 lg:block" />

          <FormBuilderMockup />
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-gray-100 px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Why teams love Formzo
          </h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Start typing, forms appear",
                description:
                  "No drag-and-drop confusion. Just start typing and watch your form come to life, block by block.",
              },
              {
                title: "Conditional logic",
                description:
                  "Show or hide fields based on answers. Ask the right questions at the right time.",
              },
              {
                title: "Customize everything",
                description:
                  "Match your brand with custom colors, fonts, backgrounds, and even your own domain.",
              },
              {
                title: "Integrations",
                description:
                  "Connect to Notion, Google Sheets, Zapier, Make, and hundreds of other tools.",
              },
              {
                title: "Free forever",
                description:
                  "Unlimited forms, unlimited submissions. No watermarks, no trial periods.",
              },
              {
                title: "Collaborate with your team",
                description:
                  "Share forms, review responses together, and manage everything in one workspace.",
              },
            ].map((feature) => (
              <div key={feature.title} className="group">
                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Social proof */}
      <section className="border-t border-gray-100 px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg font-medium italic leading-relaxed text-gray-600 sm:text-xl">
            "Formzo replaced Typeform and Google Forms for our entire team.
            It's just so much simpler."
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gray-200" />
            <div className="text-left">
              <div className="text-sm font-semibold text-gray-900">
                Sarah Chen
              </div>
              <div className="text-xs text-gray-500">Product Lead, Acme Corp</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Build your first form in minutes
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Free forever. No credit card required.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800"
          >
            Get started for free
            <svg
              className="h-4 w-4"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-10 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <span className="text-sm font-bold tracking-tight">
              formzo<span className="text-gray-900">*</span>
            </span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="transition-colors hover:text-gray-900">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-gray-900">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-gray-900">
              Docs
            </a>
            <a href="#" className="transition-colors hover:text-gray-900">
              Contact
            </a>
          </div>
          <p className="text-xs text-gray-400">
            &copy; 2026 Formzo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

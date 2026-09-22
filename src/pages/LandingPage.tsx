import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../sections/Hero";
import { Highlights } from "../sections/Highlights";
import { Benefits } from "../sections/Benefits";
import { Templates } from "../sections/Templates";
import { Features } from "../sections/Features";
import { Security } from "../sections/Security";
import { Pricing } from "../sections/Pricing";
import { FAQ } from "../sections/FAQ";
import { CTA } from "../sections/CTA";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Highlights />
        <Benefits />
        <Templates />
        <Features />
        <Security />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

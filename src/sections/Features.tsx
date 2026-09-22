import {
  Type,
  GitBranch,
  Palette,
  Share2,
  BarChart3,
  WifiOff,
} from "lucide-react";
import { features } from "../data/features";
import { Section } from "../components/layout/Section";
import { SectionHeader } from "../components/layout/SectionHeader";
import { Card, CardTitle, CardDescription } from "../components/ui/Card";

const icons = [Type, GitBranch, Palette, Share2, BarChart3, WifiOff];

export function Features() {
  return (
    <Section id="features" className="border-t border-zinc-100">
      <SectionHeader
        eyebrow="Features"
        title="Everything you need, nothing you don't"
        description="Formzo is intentionally focused. Every capability earns its place in the product."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => {
          const Icon = icons[i] ?? Type;
          return (
            <Card key={feature.title} className="hover:border-zinc-300">
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50">
                <Icon size={16} className="text-zinc-700" strokeWidth={1.75} />
              </div>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

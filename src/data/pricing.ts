export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  cta: string;
  features: PricingFeature[];
  highlighted?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    tagline: "For side projects",
    monthlyPrice: 0,
    annualPrice: 0,
    cta: "Start for free",
    features: [
      { text: "3 active forms", included: true },
      { text: "100 responses / month", included: true },
      { text: "Core field types", included: true },
      { text: "Link sharing", included: true },
      { text: "CSV export", included: false },
      { text: "Conditional logic", included: false },
      { text: "Custom branding", included: false },
      { text: "Priority support", included: false },
    ],
  },
  {
    name: "Pro",
    tagline: "For serious builders",
    monthlyPrice: 19,
    annualPrice: 15,
    cta: "Get Pro",
    highlighted: true,
    features: [
      { text: "Unlimited forms", included: true },
      { text: "Unlimited responses", included: true },
      { text: "All field types", included: true },
      { text: "Link + embed sharing", included: true },
      { text: "CSV export", included: true },
      { text: "Conditional logic", included: true },
      { text: "Custom branding", included: true },
      { text: "Priority support", included: true },
    ],
  },
];

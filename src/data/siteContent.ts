export interface NavLinkItem {
  readonly label: string;
  readonly href: string;
}

export interface PlatformModule {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly pilotRelease: string;
  readonly laterReleases?: string;
}

export interface WorkflowStep {
  readonly stepNumber: number;
  readonly actor: string;
  readonly title: string;
  readonly description: string;
}

export interface PricingPlan {
  readonly id: string;
  readonly name: string;
  readonly monthlyPlatformFee: string;
  readonly feePerVerifiedCover: string;
  readonly feeOnCreatorPayments: string;
  readonly plannedBillingFrom: string;
  readonly features: string;
}

export interface FaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export const NAV_LINKS: readonly NavLinkItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Platform", href: "#platform" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Market Pricing", href: "#market-pricing" },
  { label: "FAQ", href: "#faq" },
];

export const WHO_IT_IS_FOR: readonly string[] = [
  "Initial venue customers are owner-operated restaurants, cafés and collection-based takeaways.",
  "The launch also targets South Asian community restaurants and sweet shops.",
  "Local creators can join free and earn the amounts agreed in each brief.",
  "Customers use a claim page to obtain their Visit Token.",
  "Small hospitality groups and higher-volume venues are later customer segments.",
];

export const PLATFORM_MODULES: readonly PlatformModule[] = [
  {
    id: "venue-hub",
    name: "Venue Hub",
    description:
      "Owners publish Local Briefs, set budgets and daily caps, approve creators, reconcile visits and review campaign spend and cost per verified cover. An exportable evidence pack collects the agreement, checks, redemptions, approvals and payments.",
    pilotRelease: "Planned for the founding pilot (April–May 2027).",
  },
  {
    id: "creator-app",
    name: "Creator App",
    description:
      "Creators find nearby briefs, book a visit, receive a campaign link and public QR code, check draft content and track verified visits and earnings.",
    pilotRelease: "Web app planned for the founding pilot (April–May 2027).",
    laterReleases: "Native iOS and Android apps planned for July 2029.",
  },
  {
    id: "claim-page-tokens",
    name: "Claim Page and Visit Tokens",
    description:
      "Customers open the public campaign link, read the offer terms and claim a signed, single-use QR code with a short backup code. Claims respect the offer’s validity period and the venue’s daily cap.",
    pilotRelease: "Planned for the founding pilot (April–May 2027).",
  },
  {
    id: "tilltap-connector",
    name: "TillTap and the Till Connector",
    description:
      "Staff scan the customer’s token on a registered phone or tablet, then enter the receipt number and bill total from their existing till.",
    pilotRelease: "Manual capture planned for the founding pilot (April–May 2027).",
    laterReleases:
      "Square integration planned for July 2027, followed by either SumUp or Epos Now in October 2027.",
  },
  {
    id: "compliance-engine",
    name: "Compliance Engine",
    description:
      "Checks captions and on-screen advertising disclosures before the campaign link activates. It blocks briefs asking for star ratings or third-party reviews and flags age-restricted promotions.",
    pilotRelease:
      "Text and on-screen checks planned for the founding pilot (April–May 2027).",
    laterReleases: "Audio checks planned for October 2027.",
  },
  {
    id: "settlement-fraud",
    name: "Settlement and Fraud Controls",
    description:
      "Duplicate or suspicious redemptions are flagged for review. Owner approval precedes per-cover charges and creator settlement through Stripe Connect.",
    pilotRelease:
      "Rule-based checks and settlement planned for the founding pilot (April–May 2027).",
    laterReleases: "Advanced fraud and collusion detection planned for July 2028.",
  },
  {
    id: "local-reach-matching",
    name: "Local Reach Score and Matching",
    description:
      "Pilot matching uses audience locality and category fit. The later Local Reach Score uses verified covers per thousand local viewers to help venues identify creators who bring in customers.",
    pilotRelease:
      "Locality and category matching planned for the founding pilot (April–May 2027).",
    laterReleases:
      "Local Reach Score planned for October 2027, with more advanced ranking planned for July 2028.",
  },
];

export const WORKFLOW_STEPS: readonly WorkflowStep[] = [
  {
    stepNumber: 1,
    actor: "Owner",
    title: "The owner publishes a Local Brief.",
    description:
      "After registering the venue and its TillTap device, the owner sets the Tuesday evening offer, dates, local radius, budget and maximum daily redemptions.",
  },
  {
    stepNumber: 2,
    actor: "Owner & Creator",
    title: "The creator prepares the post.",
    description:
      "The owner selects a local creator. The creator books a visit and prepares the content for the Tuesday evening offer. The advertising disclosure check must pass before the public campaign link activates.",
  },
  {
    stepNumber: 3,
    actor: "Customer",
    title: "A customer claims the offer.",
    description:
      "The customer opens the creator’s link, reads the Tuesday evening offer terms and receives a personal, single-use Visit Token.",
  },
  {
    stepNumber: 4,
    actor: "Staff",
    title: "Staff link the visit to a bill.",
    description:
      "At the till during Tuesday service, staff scan the personal token and record the receipt number and bill total. An offline scan stays provisional until it syncs.",
  },
  {
    stepNumber: 5,
    actor: "Owner",
    title: "The owner approves the day’s covers.",
    description:
      "At closing time, the owner checks the recorded Tuesday visits against the till report and reviews flagged entries. Only approved covers generate per-cover charges.",
  },
  {
    stepNumber: 6,
    actor: "Settlement & Review",
    title: "The creator receives payment.",
    description:
      "Stripe Connect processes settlement. The venue can review verified visits, campaign spend and cost per verified cover from the Tuesday offer before deciding whether to repeat it.",
  },
];

export const PRICING_PLANS: readonly PricingPlan[] = [
  {
    id: "pay-as-you-go",
    name: "Pay-as-you-go",
    monthlyPlatformFee: "£0 per month",
    feePerVerifiedCover: "£2.50",
    feeOnCreatorPayments: "20%",
    plannedBillingFrom: "June 2027",
    features:
      "Local Briefs, claim page and tokens, TillTap, owner approval, compliance checks, settlement, dashboard and evidence pack.",
  },
  {
    id: "growth",
    name: "Growth",
    monthlyPlatformFee: "£59 per site per month",
    feePerVerifiedCover: "£0.75",
    feeOnCreatorPayments: "12%",
    plannedBillingFrom: "July 2027",
    features:
      "Pay-as-you-go features with lower usage charges, native till integration where supported and a monthly campaign review. A venue can use Growth with manual receipt entry if its till is unsupported.",
  },
  {
    id: "multi-site",
    name: "Multi-site",
    monthlyPlatformFee: "£199 per group of up to 10 sites per month",
    feePerVerifiedCover: "£0.75",
    feeOnCreatorPayments: "12%",
    plannedBillingFrom: "July 2028",
    features:
      "Group dashboards, per-site budgets and comparisons across locations. £199 is the group price for up to 10 sites.",
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPlatformFee: "£99 per site per month",
    feePerVerifiedCover: "£0.40",
    feeOnCreatorPayments: "10%",
    plannedBillingFrom: "January 2029",
    features:
      "Repeat-visit tracking through an opt-in loyalty link and a tool for timing quiet-hours offers.",
  },
];

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: "verified-cover",
    question: "What counts as a verified cover?",
    answer:
      "A customer redeems a personal Visit Token, staff link it to a receipt and bill total, and the owner checks the entry against the day’s takings. The per-cover fee is charged after owner approval.",
  },
  {
    id: "change-till",
    question: "Do I need to change my till?",
    answer:
      "No. The planned pilot uses TillTap on a registered phone or tablet. Staff enter the receipt number and bill total from the existing till. Direct integrations are planned for later releases.",
  },
  {
    id: "reuse-screenshot",
    question: "Can a customer reuse a screenshot?",
    answer:
      "The public campaign code opens the offer. Each customer claims a personal token that can be accepted once. If two devices record the same token offline, the first valid record is accepted on sync and the duplicate is rejected.",
  },
  {
    id: "internet-down",
    question: "What happens if the internet goes down?",
    answer:
      "TillTap is designed to record a limited number of scans offline. Those visits stay provisional until they sync and the owner approves them.",
  },
  {
    id: "founding-pilot-cost",
    question: "What do we pay during the founding pilot?",
    answer:
      "The planned April–May 2027 pilot waives TillProof’s platform fees. Venues still fund creator payments agreed in each brief. The default is £25 per published post plus £4 per verified cover.",
  },
  {
    id: "percentage-fee",
    question: "What does the percentage fee apply to?",
    answer:
      "It applies to the creator payments funded by the venue. For example, on Growth, £195 of agreed creator pay generates a £23.40 fee. The creator receives the full £195.",
  },
  {
    id: "customer-details",
    question: "Does a customer have to provide personal details to redeem an offer?",
    answer:
      "By default, TillProof records the token, receipt number, bill value and time. A venue can require a mobile number for a one-per-person offer. Later repeat-visit tracking requires the customer to opt in.",
  },
  {
    id: "change-or-cancel",
    question: "Can a venue change plan or cancel?",
    answer:
      "Subscriptions are billed monthly in advance with no minimum term. A venue can change plan or cancel at the end of any month.",
  },
];

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Award,
  BarChart3,
  Check,
  EyeOff,
  Heart,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CopyField } from "@/components/CopyField";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSiteConfig } from "@/lib/residency";

const TIERS = [
  {
    name: "Shielded Supporter",
    range: "0.1 – 0.49 ZEC",
    who: "Individuals and community members supporting at an accessible level.",
    featured: false,
    benefits: [
      "Recognition on the Residency online/community supporter wall",
      "Thank-you recognition through ZOERD / Zcash Ghana social channels",
      "Digital Residency Supporter recognition",
      "Recognition during selected Residency livestreams",
    ],
  },
  {
    name: "Privacy Builder",
    range: "0.5 – 0.99 ZEC",
    who: "Individuals, developers, small businesses and community projects.",
    featured: false,
    benefits: [
      "Everything in Shielded Supporter",
      "Sponsor recognition during a Residency session",
      "Name/logo inclusion on selected digital materials",
      "Privacy Builder recognition",
      "Opportunity to submit a question, challenge or idea for residents",
    ],
  },
  {
    name: "Ecosystem Partner",
    range: "1 – 2.49 ZEC",
    who: "Our primary sponsorship tier for active ecosystem participants.",
    featured: true,
    benefits: [
      "Everything in Privacy Builder",
      "Prominent sponsor recognition on Residency digital materials",
      "Recognition during multiple livestreams",
      "Dedicated social-media appreciation",
      "Opportunity for a 5–10 minute ecosystem/community presentation",
      "Opportunity to sponsor a resident challenge or daily technical task",
      "Recognition during Demo Day",
    ],
  },
  {
    name: "Privacy Champion",
    range: "2.5 – 4.99 ZEC",
    who: "Organisations, protocols, wallets, businesses and major supporters.",
    featured: false,
    benefits: [
      "Everything in Ecosystem Partner",
      "Privacy Champion recognition",
      "Prominent branding throughout the Residency",
      "Dedicated sponsor spotlight",
      "Ability to sponsor a major technical challenge",
      "Opportunity to provide prizes for outstanding residents",
      "Recognition during Gala Night",
      "Inclusion in the final Residency report",
      "Sponsor interview/profile opportunity",
    ],
  },
  {
    name: "Zcash Residency Patron",
    range: "5+ ZEC",
    who: "Our flagship sponsorship category.",
    featured: false,
    benefits: [
      "Everything in Privacy Champion",
      "Official Residency Patron recognition",
      "Premium branding across major Residency materials",
      "Featured recognition during Opening and Gala events",
      "Opportunity to sponsor major awards: Best Project, Outstanding Resident Developer, Community Choice Award",
      "Dedicated Patron appreciation campaign",
      "Featured sponsor interview/profile",
      "Recognition in the final programme report/documentary",
      "Opportunity to propose an ecosystem challenge for residents",
    ],
  },
];

const ALLOCATION = [
  { label: "Resident support", zec: 5 },
  { label: "Developer prizes", zec: 5 },
  { label: "Facilitator / mentor support", zec: 3 },
  { label: "Internet and technical infrastructure", zec: 3 },
  { label: "Media and livestream production", zec: 3 },
  { label: "Gala and awards", zec: 3 },
  { label: "Community engagement and contingency", zec: 3 },
];

const GOAL_ZEC = 25;

const PRIVACY_OPTIONS = [
  {
    name: "Public Sponsor",
    body: "You provide a name, organisation or public identity and agree to public recognition.",
  },
  {
    name: "Private Sponsor",
    body: "Your contribution is acknowledged internally, but your identity is not publicly disclosed.",
  },
  {
    name: "Anonymous Sponsor",
    body: "No public identity recognition at all. Support with no trace attached to you.",
  },
];

const INTEGRATION = [
  "Sponsored developer challenges",
  "Sponsored technical workshops",
  "Sponsored learning resources",
  "Developer prizes",
  "Community voting",
  "Demo Day awards",
  "Gala recognition",
  "Ecosystem presentations",
  "Sponsor-led technical challenges",
  "Resident project support",
  "Community engagement activities",
];

const PARTICIPATION = [
  "Sponsor the Residency",
  "Sponsor a resident",
  "Sponsor a developer challenge",
  "Donate ZEC",
  "Submit technical challenges",
  "Provide mentorship",
  "Provide educational resources",
  "Support prizes",
  "Participate in community voting",
  "Attend livestreams",
  "Attend Demo Day / Gala Night",
  "Share Residency projects and outcomes",
];

const GOVERNANCE = [
  "Public sponsorship totals, where sponsors have consented",
  "Periodic funding updates published during the Residency",
  "Clear use-of-funds reporting",
  "Sponsor recognition records",
  "Conflict-of-interest safeguards",
  "Strict separation between sponsorship and resident evaluation",
  "Documentation of all sponsored activities",
  "A final sponsorship impact report",
];

const IMPACT_REPORT = [
  "Total ZEC received",
  "Number of sponsors",
  "Number of residents supported",
  "Sponsored activities",
  "Funds and utilisation summary",
  "Developer outcomes",
  "Projects produced",
  "Community engagement metrics",
  "Awards and prizes distributed",
  "Lessons learned",
  "Future recommendations",
];

export const Route = createFileRoute("/sponsorship")({
  head: () => ({
    meta: [
      { title: "Support the Residency — ZEC Sponsorship Programme" },
      {
        name: "description",
        content:
          "Sponsor the ZOERD × Zcash Ghana Technology Residency with ZEC. Sponsorship tiers, Sponsor a Resident, community fundraising target, privacy options and transparent reporting.",
      },
      { property: "og:title", content: "Support the Residency with ZEC" },
      {
        property: "og:description",
        content:
          "Support Developers. Build Privacy. Grow the Zcash Ecosystem — ZEC sponsorship tiers and Sponsor-a-Developer for Africa's privacy builders.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SponsorshipPage,
});

function SponsorshipPage() {
  const { data: config } = useSiteConfig();
  const wallet = config?.support_wallet ?? "";

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="pt-16">
        {/* Hero */}
        <section className="grid-backdrop border-b border-border/60">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              ZEC Sponsorship &amp; Community Support Programme
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
              <span className="text-gradient-brand">
                Support Developers. Build Privacy. Grow the Zcash Ecosystem.
              </span>
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The ZOERD × Zcash Ghana Technology Residency is a community-supported developer
              ecosystem. Sponsorship is an ecosystem-building initiative — not advertising. Every
              contribution goes toward developer education, privacy technology, ecosystem growth,
              community participation and the emergence of new builders across Africa.
            </p>
            <p className="mt-3 text-sm font-medium text-accent">
              From community support to developer innovation. Africa's next generation of
              privacy-focused developers starts here.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="hero" size="lg">
                <a href="#contribute">Support the Residency with ZEC</a>
              </Button>
              <Button asChild variant="accent" size="lg">
                <a href="#sponsor-a-resident">
                  <Heart /> Sponsor a Developer
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Tiers */}
        <section id="tiers" className="mx-auto max-w-6xl px-4 py-20">
          <SectionHeading
            eyebrow="Sponsorship Tiers"
            title="Sponsor in ZEC, at any level"
            description="Tiers are open to individuals and organisations alike. Benefits listed are proposed recognition opportunities offered in good faith — they are confirmed with each sponsor before the Residency, and are not guaranteed deliverables."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TIERS.map((tier) => (
              <article
                key={tier.name}
                className={`surface-panel relative rounded-2xl p-6 ${
                  tier.featured ? "border-accent/50 ring-1 ring-accent/30" : ""
                }`}
              >
                {tier.featured ? (
                  <span className="absolute right-5 top-5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                    Primary tier
                  </span>
                ) : null}
                <h3 className="text-lg font-semibold">{tier.name}</h3>
                <p className="mt-1 text-2xl font-bold text-primary">{tier.range}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tier.who}</p>
                <ul className="mt-5 space-y-2">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex gap-2 text-sm leading-relaxed">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Sponsor a resident */}
        <section id="sponsor-a-resident" className="border-y border-border/60 bg-surface/40">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <SectionHeading
                  eyebrow="Sponsor a Resident"
                  title="Sponsor a Developer. Build the Privacy Future."
                  description="For 1 ZEC you can directly support one developer taking part in the Residency. This option is designed for ordinary Zcash community members who want to help a builder rather than sponsor at organisational level."
                />
                <p className="mt-6 text-sm font-semibold">Contributions may help cover:</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {[
                    "Accommodation",
                    "Meals",
                    "Local transportation",
                    "Internet / data",
                    "Learning resources",
                    "Development resources",
                    "Residency materials",
                    "Other approved participation costs",
                  ].map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="surface-panel rounded-2xl p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                  <Heart className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">1 ZEC — Sponsor a Resident</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Sponsors are recognised as a <strong>Residency Developer Sponsor</strong>, subject
                  to the recognition preference they choose below. Send your contribution to the
                  official support address and include the memo <code>SPONSOR-RESIDENT</code> if
                  your wallet supports memos.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Resident allocation is handled by the organisers. Sponsoring a resident does not
                  give any influence over selection, assessment or a resident's technical work.
                </p>
                <Button asChild variant="accent" size="sm" className="mt-5">
                  <a href="#contribute">Contribute in ZEC</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Fundraising target */}
        <section id="target" className="mx-auto max-w-6xl px-4 py-20">
          <SectionHeading
            eyebrow="Community Fundraising Target"
            title="25 ZEC Community Sponsorship Goal"
            description="An indicative target for this cohort. The allocation below is a working plan — the final allocation is adjusted to actual programme needs, and all movements are reported transparently."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
            <div className="surface-panel rounded-2xl p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Suggested allocation
              </p>
              <ul className="mt-4 space-y-3">
                {ALLOCATION.map((a) => (
                  <li key={a.label}>
                    <div className="flex items-baseline justify-between gap-4 text-sm">
                      <span>{a.label}</span>
                      <span className="font-mono text-primary">{a.zec} ZEC</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary/70"
                        style={{ width: `${(a.zec / GOAL_ZEC) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface-panel rounded-2xl p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                <BarChart3 className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">Fundraising updates</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Periodic updates are published on this page and through ZOERD / Zcash Ghana
                channels, covering:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {[
                  "Total sponsorship goal",
                  "ZEC raised",
                  "ZEC remaining",
                  "Number of sponsors",
                  "Number of residents supported",
                  "How funds are being utilised",
                ].map((i) => (
                  <li key={i} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {i}
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-xl border border-border bg-surface p-3 text-xs text-muted-foreground">
                Current progress: [TO BE PUBLISHED] — the first update is released once the
                sponsorship window opens.
              </p>
            </div>
          </div>
        </section>

        {/* Contribute */}
        <section id="contribute" className="border-y border-border/60 bg-surface/40">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <SectionHeading
              eyebrow="Contribute in ZEC"
              title="Shielded ZEC payments, explained honestly"
              description="Sponsorship contributions are made in ZEC and, where your wallet supports it, through shielded transactions. We treat this as a practical, educational demonstration of privacy-preserving digital payments."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
              <div className="surface-panel rounded-2xl p-6">
                <CopyField
                  label="Official Residency Support Address"
                  value={wallet || "[OFFICIAL ADDRESS TO BE PUBLISHED]"}
                  successMessage="Support address copied."
                  buttonLabel="Copy Address"
                  tone="accent"
                />
                <p className="mt-4 flex gap-2 rounded-xl border border-warning/40 bg-warning/10 p-3 text-sm text-warning">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  Always verify the official address on this page — and through an official ZOERD or
                  Zcash Ghana channel — before sending funds. This address is separate from the
                  voting wallet: sponsorship contributions are not votes.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  If your wallet supports memos, you may include a memo/tag such as your sponsor
                  name, organisation or the tier you are supporting. Memos are optional — sponsors
                  choose whether they want public recognition at all.
                </p>
              </div>

              <div className="surface-panel rounded-2xl p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">
                  Support the future of Zcash without unnecessarily exposing your contribution
                  publicly
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  We do not make claims about how Zcash works beyond what is publicly documented.
                  What matters for sponsors:
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <li>
                    <strong className="text-foreground">Publicly visible:</strong> whatever the
                    transaction type you choose exposes on-chain. Transparent transactions reveal
                    addresses and amounts; shielded transactions are designed to keep those details
                    out of public view.
                  </li>
                  <li>
                    <strong className="text-foreground">Can remain shielded:</strong> details
                    protected by the shielded transaction type you use, and any memo you send to a
                    shielded address.
                  </li>
                  <li>
                    <strong className="text-foreground">What organisers can see:</strong> funds
                    arriving at the Residency address, and any memo you voluntarily include.
                  </li>
                  <li>
                    <strong className="text-foreground">What you disclose:</strong> only the name,
                    organisation or identity you choose to share with us for recognition.
                  </li>
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">
                  Consult your wallet's documentation for the privacy properties of the transaction
                  type you use.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy options */}
        <section id="recognition" className="mx-auto max-w-6xl px-4 py-20">
          <SectionHeading
            eyebrow="Sponsor Privacy Options"
            title="You choose how — or whether — you are recognised"
            description="Privacy and consent are central to sponsor recognition. We never publish a sponsor's identity or contribution amount without permission."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {PRIVACY_OPTIONS.map((o) => (
              <article key={o.name} className="surface-panel rounded-2xl p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                  <EyeOff className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{o.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Tell us your preference by memo, or by contacting the organisers
            {config?.contact_email ? ` at ${config.contact_email}` : ""}. If we cannot confirm a
            preference, we default to no public disclosure.
          </p>
        </section>

        {/* Integration + participation */}
        <section id="integration" className="border-y border-border/60 bg-surface/40">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <SectionHeading
              eyebrow="Inside the Residency"
              title="Sponsorship is part of the programme, not a side campaign"
              description="Sponsorship plugs directly into the Residency experience the residents already go through."
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <div className="surface-panel rounded-2xl p-6">
                <h3 className="text-lg font-semibold">How sponsorship shows up</h3>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {INTEGRATION.map((i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {i}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 rounded-xl border border-border bg-background/40 p-3 text-xs leading-relaxed text-muted-foreground">
                  Safeguard: sponsors support residents; they do not control resident selection,
                  evaluation, learning outcomes or technical decisions. Anyone with a sponsorship
                  relationship is recused from judging panels and scoring where a conflict of
                  interest exists.
                </p>
              </div>

              <div className="surface-panel rounded-2xl p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                  <Users className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">Ways the community can participate</h3>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {PARTICIPATION.map((i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Governance */}
        <section id="governance" className="mx-auto max-w-6xl px-4 py-20">
          <SectionHeading
            eyebrow="Transparency & Accountability"
            title="Sponsorship governance"
            description="Sponsorship is managed under the Residency's existing governance and financial management, with additional safeguards specific to sponsored activities."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <div className="surface-panel rounded-2xl p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                <ScrollText className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">Governance commitments</h3>
              <ul className="mt-4 space-y-2">
                {GOVERNANCE.map((g) => (
                  <li key={g} className="flex gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {g}
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface-panel rounded-2xl p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                <Award className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">Residency Sponsorship Impact Report</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Published after the Residency closes, covering:
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {IMPACT_REPORT.map((i) => (
                  <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <Accordion type="single" collapsible>
              <AccordionItem value="q1">
                <AccordionTrigger className="text-left text-sm font-semibold">
                  Are the listed benefits guaranteed?
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  No. Tier benefits are proposed recognition opportunities, confirmed individually
                  with each sponsor and subject to programme scheduling. They are not contractual
                  guarantees.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger className="text-left text-sm font-semibold">
                  Does sponsorship affect who is selected or how residents are assessed?
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  No. Resident selection, evaluation and awards criteria remain with the Residency
                  organisers and facilitators. Sponsorship and assessment are kept strictly separate.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger className="text-left text-sm font-semibold">
                  How does sponsorship relate to the ZEC voting system?
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  They are separate. Votes use the voting wallet with a participant tag; sponsorship
                  uses the support address. Sponsorship contributions are never counted as votes,
                  and sponsors cannot buy votes or influence community voting outcomes.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q4">
                <AccordionTrigger className="text-left text-sm font-semibold">
                  Where is the official wallet address published?
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  The address on this page is maintained by the organisers and is the only address
                  the programme publishes. Verify it against an official ZOERD or Zcash Ghana channel
                  before sending funds, and never trust an address shared in a private message.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Sponsors + CTA */}
        <section className="border-t border-border/60 bg-surface/40">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <SectionHeading
              eyebrow="Current Sponsors"
              title="Our supporter wall"
              align="center"
            />
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-muted-foreground">
              Public sponsors are listed here as the programme progresses. Private and anonymous
              sponsors are acknowledged with equal gratitude, without disclosure.
            </p>
            <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              The supporter wall opens with the first published sponsorship update.
            </div>

            <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button asChild variant="hero" size="lg">
                <a href="#contribute">Support the Residency with ZEC</a>
              </Button>
              <Button asChild variant="accent" size="lg">
                <a href="#sponsor-a-resident">
                  <Heart /> Sponsor a Developer
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/">Back to the Residency</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter config={config} />
    </div>
  );
}

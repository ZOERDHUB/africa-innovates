import { CalendarDays, Clock, MapPin, PlayCircle, Users2, Handshake } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import type { SiteConfig } from "@/lib/residency";
import { FALLBACK_CONFIG } from "@/lib/residency";

export function Hero({ config }: { config: SiteConfig | null | undefined }) {
  const kicker = FALLBACK_CONFIG.event_kicker;
  const title = config?.event_title ?? FALLBACK_CONFIG.event_title;
  const headline = config?.headline ?? FALLBACK_CONFIG.headline;
  const livestream = config?.livestream_url ?? FALLBACK_CONFIG.livestream_url;
  const eventDate = config?.event_date?.startsWith("[") ? FALLBACK_CONFIG.event_date : config?.event_date ?? FALLBACK_CONFIG.event_date;
  const duration = config?.duration?.startsWith("[") ? FALLBACK_CONFIG.duration : config?.duration ?? FALLBACK_CONFIG.duration;

  const facts = [
    { icon: CalendarDays, label: "Date", value: eventDate },
    { icon: MapPin, label: "Location", value: config?.location ?? "[LOCATION TO BE CONFIRMED]" },
    { icon: Clock, label: "Duration", value: duration },
    {
      icon: Users2,
      label: "Organizers",
      value: config?.organizers ?? "ZOERD Privacy Blockchain & AI Innovation Hub",
    },
    { icon: Handshake, label: "Partners", value: config?.partners ?? "Zcash Ghana" },
  ];

  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
      <div className="absolute inset-0 grid-backdrop opacity-40" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-[0.22em] text-primary">
          {kicker}
        </span>

        <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.08] sm:text-6xl">
          <span className="text-gradient-brand">{title}</span>
          <span className="mt-3 block text-2xl font-semibold text-foreground sm:text-4xl">
            {headline}
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {config?.description ??
            "A residency bringing together developers, builders, researchers and innovators to learn, build, collaborate and explore privacy-focused blockchain technology."}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="hero" size="lg">
            <a href="#vote">Vote for a Participant</a>
          </Button>
          <Button asChild variant="accent" size="lg">
            <a href={livestream} target="_blank" rel="noopener noreferrer">
              <PlayCircle /> Watch Livestream
            </a>
          </Button>
          <Button asChild variant="outlineBrand" size="lg">
            <a href="#support">Support the Residency</a>
          </Button>
        </div>

        <dl className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {facts.map((fact) => (
            <div key={fact.label} className="surface-panel rounded-xl p-4">
              <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <fact.icon className="h-3.5 w-3.5 text-primary" />
                {fact.label}
              </dt>
              <dd className="mt-2 text-sm leading-snug">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

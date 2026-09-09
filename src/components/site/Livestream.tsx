import { Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import { YOUTUBE_CHANNEL_URL } from "@/lib/residency";

export function Livestream() {
  return (
    <section id="livestream" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeading
        eyebrow="YouTube"
        title="Watch ZOERDHUB TV"
        description="Visit the ZOERDHUB TV channel for residency broadcasts, sessions and recordings."
      />

      <div className="mt-10 rounded-2xl border border-border bg-surface px-6 py-14 text-center sm:px-10">
        <div className="mx-auto flex max-w-xl flex-col items-center">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Youtube className="h-8 w-8" aria-hidden="true" />
          </span>
          <h3 className="mt-5 text-2xl font-semibold">ZOERDHUB TV</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Open our YouTube channel to watch the latest broadcasts and catch up on residency
            recordings.
          </p>
          <Button asChild variant="hero" size="lg" className="mt-7">
            <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
              <Youtube aria-hidden="true" /> Visit ZOERDHUB TV on YouTube
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

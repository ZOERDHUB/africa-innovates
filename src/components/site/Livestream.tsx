import { PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import type { SiteConfig } from "@/lib/residency";
import { FALLBACK_CONFIG } from "@/lib/residency";

function embedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com") && parsed.pathname.startsWith("/@")) {
      const handle = parsed.pathname.replace("/", "").split("/")[0];
      return `https://www.youtube.com/embed/live_stream?channel=&user=&${new URLSearchParams({ handle: handle ?? "" }).toString()}`;
    }
    const videoId = parsed.searchParams.get("v");
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    if (parsed.hostname === "youtu.be") return `https://www.youtube.com/embed${parsed.pathname}`;
    return null;
  } catch {
    return null;
  }
}

export function Livestream({ config }: { config: SiteConfig | null | undefined }) {
  const url = config?.livestream_url || FALLBACK_CONFIG.livestream_url;
  const embed = embedUrl(url);

  return (
    <section id="livestream" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeading
        eyebrow="Livestream"
        title="Watch the Residency Live"
        description="Sessions are streamed on ZOERD Hub TV. Open the channel for the live broadcast and recordings."
      />

      <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="aspect-video w-full">
          {embed ? (
            <iframe
              src={embed}
              title="Residency livestream"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          ) : (
            <div className="grid h-full w-full place-items-center px-6 text-center">
              <p className="text-sm text-muted-foreground">
                Livestream will appear here when the event begins.
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3 border-t border-border p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            If the player is empty, the stream has not started yet.
          </p>
          <Button asChild variant="hero" size="lg">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <PlayCircle /> Watch Live on YouTube
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

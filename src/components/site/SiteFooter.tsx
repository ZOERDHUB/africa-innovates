import { Link } from "@tanstack/react-router";
import { Youtube } from "lucide-react";
import type { SiteConfig } from "@/lib/residency";
import { FALLBACK_CONFIG } from "@/lib/residency";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#programme", label: "Programme" },
  { href: "#participants", label: "Participants" },
  { href: "#vote", label: "Vote" },
  { href: "#livestream", label: "Livestream" },
  { href: "#support", label: "Support" },
  { href: "#faq", label: "FAQ" },
];

export function SiteFooter({ config }: { config: SiteConfig | null | undefined }) {
  const youtube = config?.youtube_url || FALLBACK_CONFIG.livestream_url;

  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <p className="text-base font-semibold">ZOERD Privacy Blockchain &amp; AI Innovation Hub</p>
          <p className="mt-2 text-sm text-muted-foreground">in collaboration with Zcash Ghana</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A residency for developers, builders, researchers and innovators working on privacy and
            blockchain technology in Africa.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Quick Links
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-muted-foreground hover:text-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Follow
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Youtube className="h-4 w-4" /> ZOERD Hub TV
              </a>
            </li>
            <li className="text-muted-foreground">
              {config?.x_url ? (
                <a href={config.x_url} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  X / Twitter
                </a>
              ) : (
                "X / Twitter — [LINK TO BE ADDED]"
              )}
            </li>
            <li className="text-muted-foreground">
              {config?.telegram_url ? (
                <a href={config.telegram_url} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  Telegram
                </a>
              ) : (
                "Telegram — [LINK TO BE ADDED]"
              )}
            </li>
            <li className="text-muted-foreground">
              {config?.contact_email ? (
                <a href={`mailto:${config.contact_email}`} className="hover:text-foreground">
                  {config.contact_email}
                </a>
              ) : (
                "Email — [CONTACT TO BE ADDED]"
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ZOERD. All rights reserved.</p>
          <Link to="/admin" className="hover:text-foreground">
            Organiser dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
}

import { Link } from "@tanstack/react-router";
import { Youtube } from "lucide-react";
import type { SiteConfig } from "@/lib/residency";
import { FALLBACK_CONFIG } from "@/lib/residency";

const LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#programme", label: "Programme" },
  { href: "/#participants", label: "Participants" },
  { href: "/#vote", label: "Vote" },
  { href: "/#livestream", label: "Livestream" },
  { href: "/sponsorship", label: "Sponsorship" },
  { href: "/#support", label: "Support" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteFooter({ config }: { config: SiteConfig | null | undefined }) {
  const youtube = config?.youtube_url || FALLBACK_CONFIG.livestream_url;
  const contactEmail = config?.contact_email || "contact@zoerd.com";

  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <p className="text-base font-semibold">ZOERDHUB Privacy Blockchain &amp; AI Innovation Hub</p>
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
                <Youtube className="h-4 w-4" /> ZOERDHUB TV
              </a>
            </li>
            <li><a href="https://x.com/zoerdhub" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">X / Twitter — @zoerdhub</a></li>
            <li><a href="https://x.com/zcashgh" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">X / Twitter — @ZcashGH</a></li>
            <li><a href="https://t.me/ZOERDHUBCOMMUNITY" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">Telegram — ZOERDHUB</a></li>
            <li><a href="https://t.me/+hR4ac246XuVjNzI0" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">Telegram — Zcash Ghana</a></li>
            <li className="text-muted-foreground">
              <a href={`mailto:${contactEmail}`} className="hover:text-foreground">
                {contactEmail}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ZOERDHUB. All rights reserved.</p>
          <Link to="/admin" className="hover:text-foreground">
            Organiser dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
}

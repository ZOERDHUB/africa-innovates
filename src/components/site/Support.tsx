import { HeartHandshake, AlertTriangle } from "lucide-react";
import { CopyField } from "@/components/CopyField";
import { SectionHeading } from "./SectionHeading";
import type { SiteConfig } from "@/lib/residency";

export function Support({ config }: { config: SiteConfig | null | undefined }) {
  return (
    <section id="support" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeading
        eyebrow="Support"
        title="Support the Residency"
        description="Want to support the residency beyond voting? You can contribute directly to the event using Zcash."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <div className="surface-panel rounded-2xl p-6">
          <CopyField
            label="Event Support Wallet"
            value={config?.support_wallet ?? ""}
            successMessage="Support wallet copied."
            buttonLabel="Copy Wallet Address"
            tone="accent"
          />
          <p className="mt-4 flex gap-2 rounded-xl border border-warning/40 bg-warning/10 p-3 text-sm text-warning">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            This is the SUPPORT wallet. It is not the voting wallet — payments sent here do not
            count as votes.
          </p>
        </div>

        <div className="surface-panel rounded-2xl p-6">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
            <HeartHandshake className="h-5 w-5" />
          </span>
          <h3 className="mt-5 text-lg font-semibold">Why support matters</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Your support helps us create opportunities for developers, innovators, researchers and
            builders participating in the residency.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Contributions are voluntary. Detailed allocation of funds is published by the
            organisers. [TO BE CONFIRMED]
          </p>
        </div>
      </div>
    </section>
  );
}

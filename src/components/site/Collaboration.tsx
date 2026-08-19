import { SectionHeading } from "./SectionHeading";

const SHARED = [
  "Privacy",
  "Blockchain",
  "Developer education",
  "Open-source technology",
  "Innovation",
  "Community",
  "African technology development",
];

export function Collaboration() {
  return (
    <section className="border-y border-border bg-surface/40 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Collaboration"
          title="ZOERDHUB × Zcash Ghana"
          description="The residency is organised through an equal collaboration between two organisations working on privacy, blockchain and developer capacity in Africa."
          align="center"
        />

        <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
          <article className="surface-panel rounded-2xl p-8">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-lg font-bold text-primary-foreground">
              Z
            </div>
            <h3 className="mt-5 text-xl font-semibold">
              ZOERDHUB Privacy Blockchain &amp; AI Innovation Hub
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              An innovation hub working at the intersection of privacy technology, blockchain systems
              and applied AI research, supporting builders and researchers across the ecosystem.
            </p>
          </article>

          <div className="grid place-items-center">
            <span className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-muted-foreground">
              ×
            </span>
          </div>

          <article className="surface-panel rounded-2xl p-8">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-lg font-bold text-accent-foreground">
              ⓩ
            </div>
            <h3 className="mt-5 text-xl font-semibold">Zcash Ghana</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A community advancing Zcash and privacy-preserving technology in Ghana through
              education, meetups and developer engagement.
            </p>
          </article>
        </div>

        <ul className="mt-10 flex flex-wrap justify-center gap-2">
          {SHARED.map((item) => (
            <li
              key={item}
              className="rounded-full border border-border bg-background px-4 py-1.5 text-xs font-medium text-muted-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

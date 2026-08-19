import { Trophy, Medal, Star, Award, Crown, Gem } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import type { ScheduleItem } from "@/lib/residency";

const WEEKS = [
  {
    label: "WEEK 1",
    theme: "Foundations",
    emoji: "🧱",
    description: "Blockchain basics, financial privacy, Zcash architecture, dev environments and wallet development.",
    days: [
      "Sept. 2: Blockchain Fundamentals + Residency Orientation — 7:00 PM WAT",
      "Sept. 3: Financial Privacy + Privacy Challenge — 7:00 PM WAT",
      "Sept. 4: Zcash Architecture + Architecture Challenge — 7:00 PM WAT",
      "Sept. 5: Development Environment + Setup Challenge — 7:00 PM WAT",
      "Sept. 6: Wallet Development + Wallet Task — 7:00 PM WAT",
      "Sept. 7: Weekly Build Challenge + Community Voting",
      "Sept. 8: Rest / Community Engagement Day",
    ],
  },
  {
    label: "WEEK 2",
    theme: "Building",
    emoji: "🛠️",
    description: "Shielded payments, SDKs, backend, full-stack, privacy apps, security and testing.",
    days: [
      "Sept. 9: Shielded Payments + Shielded Transaction Challenge — 7:00 PM WAT",
      "Sept. 10: Zcash SDKs + SDK Integration Task — 7:00 PM WAT",
      "Sept. 11: Backend Development + API/Backend Challenge — 1:00 PM WAT",
      "Sept. 12: Full Stack Development + Full-Stack Task — 7:00 PM WAT",
      "Sept. 13: Privacy Payment Applications + Privacy App Challenge — 1:00 PM WAT",
      "Sept. 14: Security + Security Review Challenge — 1:00 PM WAT",
      "Sept. 15: Testing + Testing Challenge — 1:00 PM WAT",
    ],
  },
  {
    label: "WEEK 3",
    theme: "Ship, Open Source & Demo",
    emoji: "🚀",
    description: "Production deployment, open-source contributions, startup and grant writing, pitch prep and demo day.",
    days: [
      "Sept. 16: Production Development + Deployment Challenge — 1:00 PM WAT",
      "Sept. 17: Open Source Development + Contribution Challenge — 1:00 PM WAT",
      "Sept. 18: Startup & Grant Writing + Project Pitch Challenge — 1:00 PM WAT",
      "Sept. 19: Demo Day Preparation + Final Project Review — 1:00 PM WAT",
      "Sept. 20: Demo Day + Gala Night",
    ],
  },
];

const AWARDS = [
  { icon: Trophy, label: "Best Overall Project" },
  { icon: Medal, label: "Best Privacy Solution" },
  { icon: Gem, label: "Best Technical Implementation" },
  { icon: Award, label: "Best Daily Task Performance" },
  { icon: Star, label: "Outstanding Resident Developer" },
  { icon: Crown, label: "Community Choice Award" },
];

const FALLBACK_TIMETABLE = [
  ["Sept. 2", "7:00 PM WAT", "Blockchain Fundamentals + Residency Orientation", "zkSquirrel", "Week 1 — Foundations"],
  ["Sept. 3", "7:00 PM WAT", "Financial Privacy + Privacy Challenge", "zkSquirrel", "Week 1 — Foundations"],
  ["Sept. 4", "7:00 PM WAT", "Zcash Architecture + Architecture Challenge", "zkSquirrel", "Week 1 — Foundations"],
  ["Sept. 5", "7:00 PM WAT", "Development Environment + Setup Challenge", "zkSquirrel", "Week 1 — Foundations"],
  ["Sept. 6", "7:00 PM WAT", "Wallet Development + Wallet Task", "Lowo", "Week 1 — Foundations"],
  ["Sept. 7", "", "Weekly Build Challenge + Community Voting", "", "Week 1 — Foundations"],
  ["Sept. 8", "", "Rest / Community Engagement Day", "", "Week 1 — Foundations"],
  ["Sept. 9", "7:00 PM WAT", "Shielded Payments + Shielded Transaction Challenge", "Dismad", "Week 2 — Building"],
  ["Sept. 10", "7:00 PM WAT", "Zcash SDKs + SDK Integration Task", "Lowo", "Week 2 — Building"],
  ["Sept. 11", "1:00 PM WAT", "Backend Development + API/Backend Challenge", "Gilmore", "Week 2 — Building"],
  ["Sept. 12", "7:00 PM WAT", "Full Stack Development + Full-Stack Task", "Lowo", "Week 2 — Building"],
  ["Sept. 13", "1:00 PM WAT", "Privacy Payment Applications + Privacy App Challenge", "Inspire_s", "Week 2 — Building"],
  ["Sept. 14", "1:00 PM WAT", "Security + Security Review Challenge", "ZOERD", "Week 2 — Building"],
  ["Sept. 15", "1:00 PM WAT", "Testing + Testing Challenge", "ZOERD", "Week 2 — Building"],
  ["Sept. 16", "1:00 PM WAT", "Production Development + Deployment Challenge", "ZOERD", "Week 3 — Ship, Open Source & Demo"],
  ["Sept. 17", "1:00 PM WAT", "Open Source Development + Contribution Challenge", "Vancube", "Week 3 — Ship, Open Source & Demo"],
  ["Sept. 18", "1:00 PM WAT", "Startup & Grant Writing + Project Pitch Challenge", "Gilmore", "Week 3 — Ship, Open Source & Demo"],
  ["Sept. 19", "1:00 PM WAT", "Demo Day Preparation + Final Project Review", "ZOERD", "Week 3 — Ship, Open Source & Demo"],
  ["Sept. 20", "", "Demo Day + Gala Night", "", "Final presentations, awards, recognition, networking and celebration."],
].map(([day_label, time_label, session_title, facilitator, description]) => ({
  day_label,
  time_label,
  session_title,
  facilitator,
  description,
}));

export function Schedule({ items }: { items: ScheduleItem[] | undefined }) {
  const timetableItems =
    !items?.length || items.some((item) => item.day_label.startsWith("[") || item.description.startsWith("Placeholder"))
      ? FALLBACK_TIMETABLE
      : items;

  return (
    <section id="schedule" className="border-y border-border bg-surface/40 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Event Schedule"
          title="Three weeks of building"
          description="The residency combines education, practical development, daily challenges, community interaction, project building and friendly competition."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {WEEKS.map((week) => (
            <article key={week.label} className="surface-panel rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{week.emoji}</span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">{week.label}</p>
                  <h3 className="text-lg font-semibold">{week.theme}</h3>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{week.description}</p>
              <ul className="mt-5 space-y-2">
                {week.days.map((day) => (
                  <li key={day} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{day}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <SectionHeading
            eyebrow="Awards"
            title="Recognition on Demo Day + Gala Night"
            description="Residents present the projects they've built. The Zcash community follows the presentations, celebrates the builders and participates in the final recognition and voting process."
            align="center"
          />

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {AWARDS.map((award) => (
              <div
                key={award.label}
                className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground"
              >
                <award.icon className="h-4 w-4 text-primary" />
                {award.label}
              </div>
            ))}
          </div>
        </div>

        {timetableItems.length > 0 ? (
          <div className="mt-16">
            <h3 className="text-lg font-semibold">Detailed timetable</h3>
            <div className="mt-4 overflow-hidden rounded-2xl border border-border">
              <div className="max-h-[360px] overflow-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="sticky top-0 z-10 bg-background/95 text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Time</th>
                      <th className="px-4 py-3">Session</th>
                      <th className="px-4 py-3">Facilitator</th>
                      <th className="px-4 py-3">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timetableItems.map((item) => (
                      <tr key={`${item.day_label}-${item.session_title}`} className="border-t border-border bg-surface/60">
                        <td className="px-4 py-3 font-medium">{item.day_label}</td>
                        <td className="px-4 py-3 text-muted-foreground">{item.time_label}</td>
                        <td className="px-4 py-3 font-medium">{item.session_title}</td>
                        <td className="px-4 py-3 text-muted-foreground">{item.facilitator}</td>
                        <td className="px-4 py-3 text-muted-foreground">{item.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-3 flex flex-col gap-1 text-xs text-muted-foreground lg:hidden">
              <p>Scroll horizontally to see all columns.</p>
              <p>Scroll vertically to see rows beyond the first 7.</p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

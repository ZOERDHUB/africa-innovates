import { SectionHeading } from "./SectionHeading";
import type { ScheduleItem } from "@/lib/residency";

export function Schedule({ items }: { items: ScheduleItem[] | undefined }) {
  return (
    <section id="schedule" className="border-y border-border bg-surface/40 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Event Schedule"
          title="Programme timetable"
          description="Placeholder sessions are shown until the official schedule is published."
        />

        <div className="mt-10 overflow-hidden rounded-2xl border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-background/70 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Session</th>
                <th className="px-4 py-3">Facilitator</th>
                <th className="px-4 py-3">Description</th>
              </tr>
            </thead>
            <tbody>
              {(items ?? []).map((item) => (
                <tr key={item.id} className="border-t border-border bg-surface/60">
                  <td className="px-4 py-3 font-medium">{item.day_label}</td>
                  <td className="px-4 py-3 text-muted-foreground">{item.time_label}</td>
                  <td className="px-4 py-3 font-medium">{item.session_title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{item.facilitator}</td>
                  <td className="px-4 py-3 text-muted-foreground">{item.description}</td>
                </tr>
              ))}
              {!items?.length ? (
                <tr className="border-t border-border">
                  <td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">
                    Schedule to be published.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground lg:hidden">Scroll the table horizontally to see all columns.</p>
      </div>
    </section>
  );
}

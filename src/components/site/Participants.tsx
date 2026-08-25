import placeholder from "@/assets/participant-placeholder.jpg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "./SectionHeading";
import type { Participant, VotingDay } from "@/lib/residency";

type Props = {
  participants: Participant[] | undefined;
  loading: boolean;
  votingDay: VotingDay | null;
  onVote: (participant: Participant) => void;
};

export function Participants({ participants, loading, votingDay, onVote }: Props) {
  return (
    <section id="participants" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHeading
        eyebrow="Participants"
        title="Meet the Residents"
        description="Meet the builders taking part in the residency. Each resident has a unique public ID."
      />

      {loading ? (
        <p className="mt-10 text-sm text-muted-foreground">Loading residents…</p>
      ) : !participants?.length ? (
        <p className="mt-10 text-sm text-muted-foreground">
          Residents will be published here soon.
        </p>
      ) : (
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {participants.map((p) => {
            const open = Boolean(votingDay?.is_open) && p.voting_enabled;
            return (
              <article
                key={p.id}
                className="surface-panel flex flex-col overflow-hidden rounded-2xl transition-colors hover:border-primary/50"
              >
                <img
                  src={p.image_url || placeholder}
                  alt={p.full_name}
                  loading="lazy"
                  width={640}
                  height={640}
                  className="aspect-square w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-semibold leading-tight">{p.full_name}</h3>
                    {p.is_demo ? <Badge variant="secondary">Demo</Badge> : null}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {p.participant_code} · {p.username || "—"}
                  </p>
                  <p className="break-anywhere mt-2 font-mono text-[11px] text-primary">
                    {p.participant_tag}
                  </p>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {p.bio}
                  </p>
                  <p className="mt-3 text-xs font-medium text-accent">{p.specialization}</p>

                  <div className="mt-4 flex items-center gap-2 text-xs">
                    <span
                      className={`h-2 w-2 rounded-full ${open ? "bg-success" : "bg-muted-foreground"}`}
                    />
                    <span className="text-muted-foreground">
                      {open ? "Voting open" : "Voting closed"}
                    </span>
                  </div>

                  <Button
                    variant="hero"
                    className="mt-4 w-full"
                    onClick={() => onVote(p)}
                    disabled={!open}
                  >
                    Vote
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

import placeholder from "@/assets/participant-placeholder.jpg";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import {
  formatDateTime,
  useLeaderboard,
  type Participant,
  type SiteConfig,
  type VotingDay,
} from "@/lib/residency";

type Props = {
  config: SiteConfig | null | undefined;
  votingDay: VotingDay | null;
  votingDays: VotingDay[] | undefined;
  participants: Participant[] | undefined;
  onVote: (participant: Participant) => void;
};

export function VotingSection({ config, votingDay, votingDays, participants, onVote }: Props) {
  const { data: leaderboard, isLoading } = useLeaderboard(votingDay?.day_number ?? null);
  const price = votingDay?.vote_price_zec || config?.vote_price_zec || "[TO BE CONFIRMED]";
  const totalVotes = (leaderboard ?? []).reduce((sum, row) => sum + Number(row.verified_votes), 0);
  const previousDays = (votingDays ?? []).filter((d) => d.id !== votingDay?.id);

  return (
    <section id="vote" className="border-y border-border bg-surface/40 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Daily Participant Voting"
          title="Support your resident with Zcash"
          description="Send the specified amount of ZEC to the official voting wallet with the participant tag in the memo. Votes appear on the leaderboard only once the transaction is verified."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1.2fr]">
          <div className="surface-panel rounded-2xl p-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold">Today&apos;s Voting</h3>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  votingDay?.is_open
                    ? "bg-success/15 text-success"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {votingDay?.is_open ? "Open" : "Closed"}
              </span>
            </div>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-border pb-3">
                <dt className="text-muted-foreground">Voting day</dt>
                <dd className="font-medium">
                  {votingDay ? votingDay.label || `Day ${votingDay.day_number}` : "Not scheduled"}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-border pb-3">
                <dt className="text-muted-foreground">Current date</dt>
                <dd className="font-medium">{new Date().toLocaleDateString()}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-border pb-3">
                <dt className="text-muted-foreground">Opens</dt>
                <dd className="text-right font-medium">{formatDateTime(votingDay?.opens_at ?? null)}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-border pb-3">
                <dt className="text-muted-foreground">Closes</dt>
                <dd className="text-right font-medium">{formatDateTime(votingDay?.closes_at ?? null)}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-border pb-3">
                <dt className="text-muted-foreground">Price per vote</dt>
                <dd className="font-medium">{price} ZEC</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Verified votes today</dt>
                <dd className="font-medium">{totalVotes}</dd>
              </div>
            </dl>

            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              A vote is never counted by clicking a button. Every vote is tied to a Zcash payment
              that is checked against the voting wallet, amount, memo tag, confirmations and voting
              day before it is counted.
            </p>
          </div>

          <div className="surface-panel rounded-2xl p-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold">Leaderboard</h3>
              <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Verified Votes
              </span>
            </div>

            {isLoading ? (
              <p className="mt-6 text-sm text-muted-foreground">Loading results…</p>
            ) : !leaderboard?.length ? (
              <p className="mt-6 text-sm text-muted-foreground">No results yet.</p>
            ) : (
              <ol className="mt-5 space-y-2">
                {leaderboard.map((row, index) => {
                  const participant = participants?.find((p) => p.id === row.participant_id);
                  return (
                    <li
                      key={row.participant_id}
                      className="flex items-center gap-3 rounded-xl border border-border bg-background/60 p-3"
                    >
                      <span className="w-6 text-center text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                      <img
                        src={row.image_url || placeholder}
                        alt={row.full_name}
                        loading="lazy"
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{row.full_name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {row.participant_code}
                        </p>
                      </div>
                      <span className="text-sm font-semibold">{row.verified_votes}</span>
                      {participant && votingDay?.is_open && participant.voting_enabled ? (
                        <Button size="sm" variant="subtle" onClick={() => onVote(participant)}>
                          Vote
                        </Button>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-semibold">Previous Results</h3>
          {!previousDays.length ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Previous voting days will appear here once they close.
            </p>
          ) : (
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {previousDays.map((day) => (
                <li key={day.id} className="surface-panel rounded-xl p-4">
                  <p className="font-semibold">{day.label || `Day ${day.day_number}`}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatDateTime(day.opens_at)} → {formatDateTime(day.closes_at)}
                  </p>
                  <p className="mt-2 text-xs font-medium text-muted-foreground">
                    {day.is_open ? "Open" : "Closed"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

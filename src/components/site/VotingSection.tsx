import placeholder from "@/assets/participant-placeholder.jpg";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SectionHeading } from "./SectionHeading";
import {
  FALLBACK_CONFIG,
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
  const configuredPrice = config?.vote_price_zec;
  const price = votingDay?.vote_price_zec === "0.001" ? FALLBACK_CONFIG.vote_price_zec : votingDay?.vote_price_zec || (configuredPrice?.startsWith("[") || configuredPrice === "0.001" ? FALLBACK_CONFIG.vote_price_zec : configuredPrice) || FALLBACK_CONFIG.vote_price_zec;
  const leaderboardEntries = (participants ?? [])
    .map((participant) => ({
      participant,
      verifiedVotes: Number(
        leaderboard?.find((row) => row.participant_id === participant.id)?.verified_votes ?? 0,
      ),
    }))
    .sort(
      (a, b) =>
        b.verifiedVotes - a.verifiedVotes ||
        a.participant.sort_order - b.participant.sort_order,
    );
  const totalVotes = leaderboardEntries.reduce((sum, entry) => sum + entry.verifiedVotes, 0);
  const previousDays = (votingDays ?? []).filter((d) => d.id !== votingDay?.id);

  return (
    <section id="vote" className="border-y border-border bg-surface/40 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Zcash Community Choice"
          title="Support a resident with Zcash"
          description={`Make a ${price} ZEC community-support contribution with a resident's memo tag. Valid contributions become verified Community Choice votes.`}
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1.2fr]">
          <div className="surface-panel flex h-full flex-col rounded-2xl p-6">
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
                <dt className="text-muted-foreground">Support contribution</dt>
                <dd className="font-medium">{price} ZEC / vote</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Verified votes today</dt>
                <dd className="font-medium">{totalVotes}</dd>
              </div>
            </dl>

            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              Community Choice is not decided by a web click. Every contribution is checked against
              the voting wallet, amount, memo tag, confirmations and voting day before it is counted.
            </p>
          </div>

          <div className="surface-panel rounded-2xl p-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold">Community Choice Leaderboard</h3>
              <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Verified Votes
              </span>
            </div>

            {isLoading ? (
              <p className="mt-6 text-sm text-muted-foreground">Loading results…</p>
            ) : !leaderboardEntries.length ? (
              <p className="mt-6 text-sm text-muted-foreground">Participants will appear here soon.</p>
            ) : (
              <ScrollArea className="mt-5 h-[460px] rounded-xl pr-2">
                <ol className="space-y-2">
                  {leaderboardEntries.map(({ participant, verifiedVotes }, index) => {
                  return (
                    <li
                      key={participant.id}
                      className="flex items-center gap-3 rounded-xl border border-border bg-background/60 p-3"
                    >
                      <span className="w-6 text-center text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                      <img
                        src={participant.image_url || placeholder}
                        alt={participant.full_name}
                        loading="lazy"
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{participant.full_name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {participant.participant_code} · {participant.username || "—"}
                        </p>
                      </div>
                      <span className="text-sm font-semibold">{verifiedVotes}</span>
                      {votingDay?.is_open && participant.voting_enabled ? (
                        <Button size="sm" variant="subtle" onClick={() => onVote(participant)}>
                          Support
                        </Button>
                      ) : null}
                    </li>
                  );
                })}
                </ol>
              </ScrollArea>
            )}
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <article className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Community Choice</p>
            <h3 className="mt-2 text-lg font-semibold">Powered by verified ZEC transactions</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The leaderboard above determines the Community Choice Award only. Each valid {price} ZEC
              contribution equals one vote, subject to a maximum of 10 verified votes per wallet,
              resident and voting day.
            </p>
          </article>
          <article className="surface-panel rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-accent">Technical recognition</p>
            <h3 className="mt-2 text-lg font-semibold">Assessed by facilitators and judges</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Major technical awards are assessed independently through project quality, technical
              implementation, daily challenges, open-source contribution and presentation/demo.
              Community contributions cannot determine these awards.
            </p>
          </article>
        </div>

        <div className="mt-5 rounded-2xl border border-border bg-background/60 p-6">
          <h3 className="text-lg font-semibold">Community Choice rules</h3>
          <ul className="mt-4 grid gap-x-8 gap-y-3 text-sm leading-relaxed text-muted-foreground sm:grid-cols-2">
            <li><span className="font-medium text-foreground">Value:</span> {price} ZEC equals one verified vote.</li>
            <li><span className="font-medium text-foreground">Daily limit:</span> 10 votes per wallet, resident and voting day.</li>
            <li><span className="font-medium text-foreground">Memo:</span> use the participant tag exactly as displayed.</li>
            <li><span className="font-medium text-foreground">Verification:</span> wallet, amount, memo, confirmations and day are checked.</li>
            <li><span className="font-medium text-foreground">Invalid transactions:</span> do not count and are not refundable.</li>
            <li><span className="font-medium text-foreground">Fees:</span> network or exchange fees never count as votes.</li>
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Voting dates and opening times are published in the panel above. In a tie, the resident
            whose final verified vote was confirmed first ranks higher. The official voting wallet is
            shown in the voting flow; the organisers will publish the use of verified contributions
            before voting opens.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="aspect-video w-full">
            <iframe
              src="https://www.youtube.com/embed/bbfv28wS7hc"
              title="How to use a Zcash wallet to vote"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
          <p className="border-t border-border px-5 py-4 text-sm text-muted-foreground">
            Watch this guide to learn how to use a Zcash wallet when casting your vote.
          </p>
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

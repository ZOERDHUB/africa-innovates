import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Info, ShieldAlert } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyField } from "@/components/CopyField";
import placeholder from "@/assets/participant-placeholder.jpg";
import {
  submitVoteTransaction,
  type Participant,
  type SiteConfig,
  type VotingDay,
} from "@/lib/residency";

const txSchema = z
  .string()
  .trim()
  .min(16, { message: "Transaction ID looks too short." })
  .max(200, { message: "Transaction ID looks too long." })
  .regex(/^[A-Za-z0-9:_-]+$/, { message: "Transaction ID contains invalid characters." });

const amountSchema = z
  .string()
  .trim()
  .max(40, { message: "Amount is too long." })
  .regex(/^[0-9]*\.?[0-9]*$/, { message: "Enter a numeric amount." });

type Props = {
  participant: Participant | null;
  config: SiteConfig | null | undefined;
  votingDay: VotingDay | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-background/60 p-5">
      <h3 className="flex items-center gap-3 text-sm font-semibold">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {n}
        </span>
        {title}
      </h3>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export function VoteDialog({ participant, config, votingDay, open, onOpenChange }: Props) {
  const [txid, setTxid] = useState("");
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<"idle" | "pending">("idle");

  if (!participant) return null;

  const configuredPrice = config?.vote_price_zec;
  const price = votingDay?.vote_price_zec === "0.001" ? "0.01" : votingDay?.vote_price_zec || (configuredPrice?.startsWith("[") || configuredPrice === "0.001" ? "0.01" : configuredPrice) || "0.01";
  const votingOpen = Boolean(votingDay?.is_open) && participant.voting_enabled;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!participant) return;
    const tx = txSchema.safeParse(txid);
    if (!tx.success) {
      toast.error(tx.error.issues[0]?.message ?? "Invalid transaction ID.");
      return;
    }
    const amt = amountSchema.safeParse(amount);
    if (!amt.success) {
      toast.error(amt.error.issues[0]?.message ?? "Invalid amount.");
      return;
    }

    setSubmitting(true);
    const response = await submitVoteTransaction({
      participantId: participant.id,
      txid: tx.data,
      amount: amt.data,
    });
    setSubmitting(false);

    if (!response.ok) {
      toast.error(response.error ?? "Transaction could not be submitted.");
      return;
    }
    setResult("pending");
    setTxid("");
    setAmount("");
    toast.success("Transaction submitted. Vote verification pending.");
  }

  function handleOpenChange(next: boolean) {
    if (!next) setResult("idle");
    onOpenChange(next);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Vote for {participant.full_name}</DialogTitle>
          <DialogDescription>
            Votes are cast with Zcash and counted only after the transaction is verified.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Step n={1} title="Selected participant">
            <div className="flex items-center gap-4">
              <img
                src={participant.image_url || placeholder}
                alt={participant.full_name}
                loading="lazy"
                width={80}
                height={80}
                className="h-20 w-20 rounded-xl border border-border object-cover"
              />
              <div className="min-w-0">
                <p className="truncate font-semibold">{participant.full_name}</p>
                <p className="text-xs text-muted-foreground">ID: {participant.participant_code}</p>
                <p className="break-anywhere font-mono text-xs text-primary">
                  {participant.participant_tag}
                </p>
              </div>
            </div>
          </Step>

          <Step n={2} title="How the vote works">
            <p className="text-sm leading-relaxed text-muted-foreground">
              To cast a vote for this participant, send the required amount of Zcash to the voting
              wallet below and include the participant tag in the transaction memo.
            </p>
            <p className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary">
              1 vote = {price} ZEC
            </p>
          </Step>

          <Step n={3} title="Voting wallet">
            <CopyField
              label="Official voting wallet (not the support wallet)"
              value={config?.voting_wallet ?? ""}
              successMessage="Voting wallet copied."
              buttonLabel="Copy Address"
            />
          </Step>

          <Step n={4} title="Memo / message">
            <p className="text-sm leading-relaxed text-muted-foreground">
              When sending your vote, include the participant&apos;s tag in the wallet
              message/memo field. The tag is how the team associates your vote with the right
              participant.
            </p>
            <CopyField
              label="Memo / Message"
              value={participant.participant_tag}
              successMessage="Participant tag copied."
              buttonLabel="Copy Participant Tag"
              tone="accent"
            />
          </Step>

          <Step n={5} title="Cast your vote">
            <dl className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-border p-3">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Wallet</dt>
                <dd className="break-anywhere mt-1 font-mono text-[11px]">
                  {(config?.voting_wallet ?? "").slice(0, 28)}…
                </dd>
              </div>
              <div className="rounded-lg border border-border p-3">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  Amount per vote
                </dt>
                <dd className="mt-1 text-sm font-semibold">{price} ZEC</dd>
              </div>
              <div className="rounded-lg border border-border p-3">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Memo/Tag</dt>
                <dd className="break-anywhere mt-1 font-mono text-[11px]">
                  {participant.participant_tag}
                </dd>
              </div>
            </dl>
            <p className="flex gap-2 text-sm text-muted-foreground">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              Send the required amount of ZEC to the voting wallet and include the participant
              ID/tag in the transaction memo/message.
            </p>
          </Step>

          <Step n={6} title="Vote verification">
            {!votingOpen ? (
              <p className="flex gap-2 rounded-lg border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
                Voting is currently closed for this participant. Submissions are disabled.
              </p>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Label htmlFor="txid">Transaction ID (TxID)</Label>
                <Input
                  id="txid"
                  value={txid}
                  onChange={(e) => setTxid(e.target.value)}
                  placeholder="Paste your Zcash transaction ID"
                  maxLength={200}
                  disabled={!votingOpen || submitting}
                  className="mt-1.5 font-mono text-xs"
                />
              </div>
              <div>
                <Label htmlFor="amount">Amount sent in ZEC (optional)</Label>
                <Input
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 0.05"
                  inputMode="decimal"
                  maxLength={40}
                  disabled={!votingOpen || submitting}
                  className="mt-1.5"
                />
              </div>
              <Button type="submit" variant="hero" className="w-full" disabled={!votingOpen || submitting}>
                {submitting ? "Submitting…" : "I've Sent My Vote"}
              </Button>
            </form>

            <p className="text-xs leading-relaxed text-muted-foreground">
              Your vote transaction will be verified before the vote is counted. Submitting a transaction ID
              does not count a vote on its own.
            </p>

            {result === "pending" ? (
              <p className="rounded-lg border border-accent/40 bg-accent/10 p-3 text-sm text-accent">
                Vote verification pending — the organisers will confirm your transaction against the
                voting wallet, amount, memo tag and confirmations.
              </p>
            ) : null}
          </Step>
        </div>
      </DialogContent>
    </Dialog>
  );
}

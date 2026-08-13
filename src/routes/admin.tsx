import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin, useSession } from "@/lib/use-admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useParticipants,
  useSiteConfig,
  useVotingDays,
  type Participant,
  type SiteConfig,
  type VotingDay,
  type VoteSubmission,
} from "@/lib/residency";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Residency Admin | ZOERD × Zcash Ghana" },
      { name: "description", content: "Manage residency participants, voting days and votes." },
      { property: "og:title", content: "Residency Admin | ZOERD × Zcash Ghana" },
      { property: "og:description", content: "Organiser dashboard for the residency programme." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const { session, loading } = useSession();
  const isAdmin = useIsAdmin(session);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!loading && !session) navigate({ to: "/auth", replace: true });
  }, [loading, session, navigate]);

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (loading || !session) {
    return <main className="grid min-h-screen place-items-center px-4 text-sm text-muted-foreground">Loading…</main>;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Residency Admin</h1>
          <p className="text-sm text-muted-foreground">{session.user.email}</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="subtle" size="sm">
            <Link to="/">View site</Link>
          </Button>
          <Button variant="outlineBrand" size="sm" onClick={signOut}>
            Sign out
          </Button>
        </div>
      </header>

      {isAdmin === false ? (
        <div className="surface-panel mt-8 rounded-2xl p-6">
          <h2 className="text-lg font-semibold">Admin access required</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This account is signed in but has no admin role yet. An existing admin must grant the
            admin role before the dashboard unlocks.
          </p>
        </div>
      ) : isAdmin === null ? (
        <p className="mt-8 text-sm text-muted-foreground">Checking permissions…</p>
      ) : (
        <Tabs defaultValue="participants" className="mt-8">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="voting">Voting days</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="event">Event &amp; wallets</TabsTrigger>
          </TabsList>
          <TabsContent value="participants" className="mt-6">
            <ParticipantsAdmin />
          </TabsContent>
          <TabsContent value="voting" className="mt-6">
            <VotingDaysAdmin />
          </TabsContent>
          <TabsContent value="transactions" className="mt-6">
            <TransactionsAdmin />
          </TabsContent>
          <TabsContent value="event" className="mt-6">
            <EventAdmin />
          </TabsContent>
        </Tabs>
      )}
    </main>
  );
}

function ParticipantsAdmin() {
  const queryClient = useQueryClient();
  const { data: participants } = useParticipants();
  const [draft, setDraft] = useState({
    participant_code: "",
    participant_tag: "",
    full_name: "",
    username: "",
    bio: "",
    specialization: "",
    image_url: "",
  });

  async function refresh() {
    await queryClient.invalidateQueries({ queryKey: ["participants"] });
  }

  async function addParticipant(event: React.FormEvent) {
    event.preventDefault();
    if (!draft.full_name.trim() || !draft.participant_code.trim() || !draft.participant_tag.trim()) {
      toast.error("Name, participant ID and tag are required.");
      return;
    }
    const { error } = await supabase.from("participants").insert({
      ...draft,
      sort_order: (participants?.length ?? 0) + 1,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Participant added.");
    setDraft({
      participant_code: "",
      participant_tag: "",
      full_name: "",
      username: "",
      bio: "",
      specialization: "",
      image_url: "",
    });
    await refresh();
  }

  async function updateParticipant(id: string, patch: Partial<Participant>) {
    const { error } = await supabase.from("participants").update(patch).eq("id", id);
    if (error) toast.error(error.message);
    else await refresh();
  }

  async function removeParticipant(id: string) {
    const { error } = await supabase.from("participants").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Participant removed.");
      await refresh();
    }
  }

  async function uploadImage(id: string, file: File) {
    const path = `${id}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "")}`;
    const { error } = await supabase.storage.from("participants").upload(path, file, {
      upsert: true,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    const { data } = await supabase.storage
      .from("participants")
      .createSignedUrl(path, 60 * 60 * 24 * 365);
    if (data?.signedUrl) {
      await updateParticipant(id, { image_url: data.signedUrl });
      toast.success("Image uploaded.");
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={addParticipant} className="surface-panel grid gap-3 rounded-2xl p-6 sm:grid-cols-2">
        <h2 className="text-lg font-semibold sm:col-span-2">Add participant</h2>
        <Field label="Full name" value={draft.full_name} onChange={(v) => setDraft({ ...draft, full_name: v })} />
        <Field label="Participant ID" value={draft.participant_code} onChange={(v) => setDraft({ ...draft, participant_code: v })} />
        <Field label="Participant tag (memo)" value={draft.participant_tag} onChange={(v) => setDraft({ ...draft, participant_tag: v })} />
        <Field label="Username / tag name" value={draft.username} onChange={(v) => setDraft({ ...draft, username: v })} />
        <Field label="Specialization" value={draft.specialization} onChange={(v) => setDraft({ ...draft, specialization: v })} />
        <Field label="Image URL (optional)" value={draft.image_url} onChange={(v) => setDraft({ ...draft, image_url: v })} />
        <div className="sm:col-span-2">
          <Label>Bio</Label>
          <Textarea
            value={draft.bio}
            onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
            className="mt-1.5"
            maxLength={1000}
          />
        </div>
        <Button type="submit" variant="hero" className="sm:col-span-2">
          Add participant
        </Button>
      </form>

      <div className="space-y-3">
        {(participants ?? []).map((p) => (
          <div key={p.id} className="surface-panel rounded-2xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold">
                  {p.full_name} {p.is_demo ? <span className="text-xs text-muted-foreground">(demo)</span> : null}
                </p>
                <p className="text-xs text-muted-foreground">
                  {p.participant_code} · {p.participant_tag}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2 text-xs">
                  <Switch
                    checked={p.voting_enabled}
                    onCheckedChange={(v) => updateParticipant(p.id, { voting_enabled: v })}
                  />
                  Voting
                </label>
                <label className="flex items-center gap-2 text-xs">
                  <Switch
                    checked={p.is_active}
                    onCheckedChange={(v) => updateParticipant(p.id, { is_active: v })}
                  />
                  Active
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  className="h-9 w-48 text-xs"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void uploadImage(p.id, file);
                  }}
                />
                <Button variant="destructive" size="sm" onClick={() => removeParticipant(p.id)}>
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VotingDaysAdmin() {
  const queryClient = useQueryClient();
  const { data: days } = useVotingDays();

  async function refresh() {
    await queryClient.invalidateQueries({ queryKey: ["voting_days"] });
  }

  async function addDay() {
    const next = (days?.length ? Math.max(...days.map((d) => d.day_number)) : 0) + 1;
    const { error } = await supabase
      .from("voting_days")
      .insert({ day_number: next, label: `Day ${next}` });
    if (error) toast.error(error.message);
    else await refresh();
  }

  async function update(id: string, patch: Partial<VotingDay>) {
    const { error } = await supabase.from("voting_days").update(patch).eq("id", id);
    if (error) toast.error(error.message);
    else await refresh();
  }

  return (
    <div className="space-y-4">
      <Button variant="hero" onClick={addDay}>
        Create voting day
      </Button>
      {(days ?? []).map((day) => (
        <div key={day.id} className="surface-panel grid gap-3 rounded-2xl p-5 sm:grid-cols-2">
          <p className="text-sm font-semibold sm:col-span-2">Day {day.day_number}</p>
          <Field label="Label" value={day.label} onChange={(v) => update(day.id, { label: v })} debounce />
          <Field
            label="ZEC per vote (day override)"
            value={day.vote_price_zec}
            onChange={(v) => update(day.id, { vote_price_zec: v })}
            debounce
          />
          <div>
            <Label>Opens at</Label>
            <Input
              type="datetime-local"
              className="mt-1.5"
              defaultValue={day.opens_at ? day.opens_at.slice(0, 16) : ""}
              onBlur={(e) =>
                update(day.id, { opens_at: e.target.value ? new Date(e.target.value).toISOString() : null })
              }
            />
          </div>
          <div>
            <Label>Closes at</Label>
            <Input
              type="datetime-local"
              className="mt-1.5"
              defaultValue={day.closes_at ? day.closes_at.slice(0, 16) : ""}
              onBlur={(e) =>
                update(day.id, { closes_at: e.target.value ? new Date(e.target.value).toISOString() : null })
              }
            />
          </div>
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <Switch checked={day.is_open} onCheckedChange={(v) => update(day.id, { is_open: v })} />
            Voting open
          </label>
        </div>
      ))}
    </div>
  );
}

function TransactionsAdmin() {
  const queryClient = useQueryClient();
  const { data: submissions } = useQuery({
    queryKey: ["vote_submissions"],
    queryFn: async (): Promise<VoteSubmission[]> => {
      const { data, error } = await supabase
        .from("vote_submissions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return data ?? [];
    },
  });

  async function review(id: string, status: "verified" | "rejected" | "duplicate", votes: number) {
    const { error } = await supabase
      .from("vote_submissions")
      .update({
        status,
        votes: status === "verified" ? votes : 0,
        verified_at: status === "verified" ? new Date().toISOString() : null,
      })
      .eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(status === "verified" ? "Vote verified." : "Transaction updated.");
    await queryClient.invalidateQueries({ queryKey: ["vote_submissions"] });
    await queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
  }

  return (
    <div className="space-y-3">
      {!submissions?.length ? (
        <p className="text-sm text-muted-foreground">No transaction submissions yet.</p>
      ) : null}
      {(submissions ?? []).map((s) => (
        <TransactionRow key={s.id} submission={s} onReview={review} />
      ))}
    </div>
  );
}

function TransactionRow({
  submission,
  onReview,
}: {
  submission: VoteSubmission;
  onReview: (id: string, status: "verified" | "rejected" | "duplicate", votes: number) => void;
}) {
  const [votes, setVotes] = useState(submission.votes || 1);

  return (
    <div className="surface-panel rounded-2xl p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="break-anywhere font-mono text-xs">{submission.txid}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Tag: {submission.participant_tag} · Claimed: {submission.claimed_amount_zec || "—"} ZEC ·{" "}
            {new Date(submission.created_at).toLocaleString()}
          </p>
        </div>
        <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold capitalize">
          {submission.status}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Input
          type="number"
          min={1}
          value={votes}
          onChange={(e) => setVotes(Number(e.target.value))}
          className="h-9 w-24"
        />
        <Button size="sm" variant="hero" onClick={() => onReview(submission.id, "verified", votes)}>
          Verify
        </Button>
        <Button size="sm" variant="subtle" onClick={() => onReview(submission.id, "duplicate", 0)}>
          Duplicate
        </Button>
        <Button size="sm" variant="destructive" onClick={() => onReview(submission.id, "rejected", 0)}>
          Reject
        </Button>
      </div>
    </div>
  );
}

function EventAdmin() {
  const queryClient = useQueryClient();
  const { data: config } = useSiteConfig();
  const [draft, setDraft] = useState<SiteConfig | null>(null);
  const current = useMemo(() => draft ?? config ?? null, [draft, config]);

  async function save() {
    if (!current) return;
    const { id: _id, updated_at: _updated, ...patch } = current;
    const { error } = await supabase.from("site_config").update(patch).eq("id", 1);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Event settings saved.");
    await queryClient.invalidateQueries({ queryKey: ["site_config"] });
  }

  if (!current) return <p className="text-sm text-muted-foreground">Loading…</p>;

  const set = (key: keyof SiteConfig, value: string) =>
    setDraft({ ...(current as SiteConfig), [key]: value });

  return (
    <div className="surface-panel grid gap-3 rounded-2xl p-6 sm:grid-cols-2">
      <Field label="Event kicker" value={current.event_kicker} onChange={(v) => set("event_kicker", v)} />
      <Field label="Event title" value={current.event_title} onChange={(v) => set("event_title", v)} />
      <div className="sm:col-span-2">
        <Label>Headline</Label>
        <Input value={current.headline} onChange={(e) => set("headline", e.target.value)} className="mt-1.5" />
      </div>
      <div className="sm:col-span-2">
        <Label>Description</Label>
        <Textarea
          value={current.description}
          onChange={(e) => set("description", e.target.value)}
          className="mt-1.5"
          maxLength={1000}
        />
      </div>
      <Field label="Date" value={current.event_date} onChange={(v) => set("event_date", v)} />
      <Field label="Location" value={current.location} onChange={(v) => set("location", v)} />
      <Field label="Duration" value={current.duration} onChange={(v) => set("duration", v)} />
      <Field label="Organizers" value={current.organizers} onChange={(v) => set("organizers", v)} />
      <Field label="Partners" value={current.partners} onChange={(v) => set("partners", v)} />
      <Field label="Livestream URL" value={current.livestream_url} onChange={(v) => set("livestream_url", v)} />
      <Field label="ZEC per vote" value={current.vote_price_zec} onChange={(v) => set("vote_price_zec", v)} />
      <Field label="YouTube URL" value={current.youtube_url} onChange={(v) => set("youtube_url", v)} />
      <Field label="X / Twitter URL" value={current.x_url} onChange={(v) => set("x_url", v)} />
      <Field label="Telegram URL" value={current.telegram_url} onChange={(v) => set("telegram_url", v)} />
      <Field label="Contact email" value={current.contact_email} onChange={(v) => set("contact_email", v)} />

      <div className="sm:col-span-2">
        <Label>Voting wallet (votes only)</Label>
        <Textarea
          value={current.voting_wallet}
          onChange={(e) => set("voting_wallet", e.target.value)}
          className="mt-1.5 font-mono text-xs"
        />
      </div>
      <div className="sm:col-span-2">
        <Label>Support wallet (donations only)</Label>
        <Textarea
          value={current.support_wallet}
          onChange={(e) => set("support_wallet", e.target.value)}
          className="mt-1.5 font-mono text-xs"
        />
      </div>

      <Button variant="hero" className="sm:col-span-2" onClick={save}>
        Save settings
      </Button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  debounce = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  debounce?: boolean;
}) {
  const [local, setLocal] = useState(value);
  useEffect(() => setLocal(value), [value]);

  return (
    <div>
      <Label>{label}</Label>
      <Input
        value={local}
        maxLength={500}
        onChange={(e) => {
          setLocal(e.target.value);
          if (!debounce) onChange(e.target.value);
        }}
        onBlur={() => {
          if (debounce && local !== value) onChange(local);
        }}
        className="mt-1.5"
      />
    </div>
  );
}

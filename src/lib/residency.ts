import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type SiteConfig = Tables<"site_config">;
export type Participant = Tables<"participants">;
export type VotingDay = Tables<"voting_days">;
export type ScheduleItem = Tables<"schedule_items">;
export type FaqItem = Tables<"faq_items">;
export type VoteSubmission = Tables<"vote_submissions">;

const RESIDENT_ROSTER_UPDATED_AT = "2026-08-26T00:00:00.000Z";

// Keep the published roster available while the Supabase participant records are
// being updated. Image filenames deliberately match each resident's username.
const RESIDENT_ROSTER: Participant[] = [
  ["00000000-0000-4000-8000-000000000001", "RES-001", "RES001", "Scofield", "@Scofield", "/residents/Scofield.jpeg"],
  ["00000000-0000-4000-8000-000000000002", "RES-002", "RES002", "Mustapha QAUNT", "@Mustapha_QAUNT", "/residents/Mustapha_QAUNT.jpg"],
  ["00000000-0000-4000-8000-000000000003", "RES-003", "RES003", "Jemmy", "@Jemmy", "/residents/Jemmy.jpeg"],
  ["00000000-0000-4000-8000-000000000004", "RES-004", "RES004", "IKE", "@IKE", "/residents/IKE.jpg"],
  ["00000000-0000-4000-8000-000000000005", "RES-005", "RES005", "Hybridthegeek", "@Hybridthegeek", "/residents/Hybridthegeek.jpg"],
  ["00000000-0000-4000-8000-000000000006", "RES-006", "RES006", "Gwill", "@Gwill", "/residents/Gwill.jpeg"],
  ["00000000-0000-4000-8000-000000000007", "RES-007", "RES007", "angelnath", "@angelnath", "/residents/angelnath.jpg"],
  ["00000000-0000-4000-8000-000000000008", "RES-008", "RES008", "Akwenuke Daniel", "@Akwenuke Daniel", "/residents/Akwenuke%20Daniel.jpeg"],
  ["00000000-0000-4000-8000-000000000009", "RES-009", "RES009", "Dark Blanche", "@Dark_Blanche", "/residents/%40Dark_Blanche.jpg"],
  ["00000000-0000-4000-8000-000000000010", "RES-010", "RES010", "0xWeb3DevRel", "@0xWeb3DevRel", "/residents/%400xWeb3DevRel.jpg"],
].map(([id, participant_code, participant_tag, full_name, username, image_url], index) => ({
  id,
  participant_code,
  participant_tag,
  full_name,
  username,
  image_url,
  bio: "",
  specialization: "",
  is_demo: false,
  is_active: true,
  // Voting is enabled by the database migration, which supplies real record IDs.
  voting_enabled: false,
  sort_order: index + 1,
  created_at: RESIDENT_ROSTER_UPDATED_AT,
  updated_at: RESIDENT_ROSTER_UPDATED_AT,
}));

export const FALLBACK_CONFIG = {
  event_kicker: "ZOERDHUB × Zcash Ghana",
  event_title: "Technology Residency",
  headline: "Building the Future of Privacy, Blockchain & Innovation in Africa",
  event_date: "1–21 September 2026",
  duration: "3 Weeks",
  location: "ZOERDHUB Nigeria",
  livestream_url: "https://www.youtube.com/@ZOERDHubTV",
  vote_price_zec: "0.01",
} as const;

export function useSiteConfig() {
  return useQuery({
    queryKey: ["site_config"],
    queryFn: async (): Promise<SiteConfig | null> => {
      const { data, error } = await supabase.from("site_config").select("*").eq("id", 1).maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

export function useParticipants() {
  return useQuery({
    queryKey: ["participants"],
    queryFn: async (): Promise<Participant[]> => {
      const { data, error } = await supabase
        .from("participants")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      const publishedParticipants = data ?? [];
      return !publishedParticipants.length || publishedParticipants.every((participant) => participant.is_demo)
        ? RESIDENT_ROSTER
        : publishedParticipants;
    },
  });
}

export function useVotingDays() {
  return useQuery({
    queryKey: ["voting_days"],
    queryFn: async (): Promise<VotingDay[]> => {
      const { data, error } = await supabase
        .from("voting_days")
        .select("*")
        .order("day_number", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export type LeaderboardRow = {
  participant_id: string;
  full_name: string;
  participant_code: string;
  participant_tag: string;
  image_url: string;
  verified_votes: number;
};

export function useLeaderboard(dayNumber: number | null) {
  return useQuery({
    queryKey: ["leaderboard", dayNumber],
    queryFn: async (): Promise<LeaderboardRow[]> => {
      const args = dayNumber === null ? {} : { _day_number: dayNumber };
      const { data, error } = await supabase.rpc("get_leaderboard", args);


      if (error) throw error;
      return (data ?? []) as LeaderboardRow[];
    },
  });
}

export function useSchedule() {
  return useQuery({
    queryKey: ["schedule_items"],
    queryFn: async (): Promise<ScheduleItem[]> => {
      const { data, error } = await supabase
        .from("schedule_items")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useFaq() {
  return useQuery({
    queryKey: ["faq_items"],
    queryFn: async (): Promise<FaqItem[]> => {
      const { data, error } = await supabase
        .from("faq_items")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export async function submitVoteTransaction(input: {
  participantId: string;
  txid: string;
  amount: string;
}): Promise<{ ok: boolean; error?: string }> {
  const { data, error } = await supabase.rpc("submit_vote_transaction", {
    _participant_id: input.participantId,
    _txid: input.txid,
    _amount: input.amount,
  });
  if (error) return { ok: false, error: "We could not submit your transaction. Please try again." };
  const result = data as { ok: boolean; error?: string } | null;
  return result ?? { ok: false, error: "Unexpected response." };
}

export function activeVotingDay(days: VotingDay[] | undefined): VotingDay | null {
  if (!days?.length) return null;
  const open = days.filter((d) => d.is_open).sort((a, b) => b.day_number - a.day_number);
  return open[0] ?? days[days.length - 1] ?? null;
}

export function formatDateTime(value: string | null): string {
  if (!value) return "Not scheduled";
  try {
    return new Date(value).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return value;
  }
}

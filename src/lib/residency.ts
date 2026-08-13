import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type SiteConfig = Tables<"site_config">;
export type Participant = Tables<"participants">;
export type VotingDay = Tables<"voting_days">;
export type ScheduleItem = Tables<"schedule_items">;
export type FaqItem = Tables<"faq_items">;
export type VoteSubmission = Tables<"vote_submissions">;

export const FALLBACK_CONFIG = {
  event_kicker: "ZOERD × ZCASH GHANA",
  event_title: "Technology Residency",
  headline: "Building the Future of Privacy, Blockchain & Innovation in Africa",
  livestream_url: "https://www.youtube.com/@ZOERDHubTV",
  vote_price_zec: "[TO BE CONFIRMED]",
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
      return data ?? [];
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
      const { data, error } = await supabase.rpc("get_leaderboard", {
        _day_number: dayNumber ?? undefined,
      });

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
  if (!value) return "[TO BE CONFIRMED]";
  try {
    return new Date(value).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return value;
  }
}

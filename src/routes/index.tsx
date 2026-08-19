import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Collaboration } from "@/components/site/Collaboration";
import { Highlights } from "@/components/site/Highlights";
import { Participants } from "@/components/site/Participants";
import { VotingSection } from "@/components/site/VotingSection";
import { Livestream } from "@/components/site/Livestream";
import { Schedule } from "@/components/site/Schedule";
import { Support } from "@/components/site/Support";
import { Sponsorship } from "@/components/site/Sponsorship";
import { Faq } from "@/components/site/Faq";
import { SiteFooter } from "@/components/site/SiteFooter";
import { VoteDialog } from "@/components/site/VoteDialog";
import {
  activeVotingDay,
  useFaq,
  useParticipants,
  useSchedule,
  useSiteConfig,
  useVotingDays,
  type Participant,
} from "@/lib/residency";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZOERDHUB × Zcash Ghana Technology Residency" },
      {
        name: "description",
        content:
          "Privacy, blockchain and innovation residency by ZOERD and Zcash Ghana. Watch the livestream, vote for residents with Zcash and support the programme.",
      },
      { property: "og:title", content: "ZOERDHUB × Zcash Ghana Technology Residency" },
      {
        property: "og:description",
        content:
          "Meet the residents, vote daily with Zcash, watch the livestream and support Africa's privacy and blockchain builders.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { data: config } = useSiteConfig();
  const { data: participants, isLoading } = useParticipants();
  const { data: votingDays } = useVotingDays();
  const { data: schedule } = useSchedule();
  const { data: faq } = useFaq();

  const votingDay = activeVotingDay(votingDays);
  const [selected, setSelected] = useState<Participant | null>(null);
  const [open, setOpen] = useState(false);

  function handleVote(participant: Participant) {
    setSelected(participant);
    setOpen(true);
  }

  return (
    <div className="min-h-screen">
      <SiteNav />
      <main>
        <Hero config={config} />
        <About />
        <Collaboration />
        <Highlights />
        <Participants
          participants={participants}
          loading={isLoading}
          votingDay={votingDay}
          onVote={handleVote}
        />
        <VotingSection
          config={config}
          votingDay={votingDay}
          votingDays={votingDays}
          participants={participants}
          onVote={handleVote}
        />
        <Livestream config={config} />
        <Schedule items={schedule} />
        <Sponsorship />
        <Support config={config} />
        <Faq items={faq} />
      </main>
      <SiteFooter config={config} />
      <VoteDialog
        participant={selected}
        config={config}
        votingDay={votingDay}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
}

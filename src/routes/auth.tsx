import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/use-admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Organiser Sign In | ZOERDHUB Residency" },
      { name: "description", content: "Sign in to manage the ZOERDHUB × Zcash Ghana residency." },
      { property: "og:title", content: "Organiser Sign In | ZOERDHUB Residency" },
      { property: "og:description", content: "Organiser access to the residency dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const schema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email." }).max(255),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }).max(72),
});

const ensureAdminAccount = createServerFn({ method: "POST" })
  .validator(schema)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: usersData, error: listError } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });

    if (listError) {
      throw new Error(listError.message);
    }

    const normalizedEmail = data.email.toLowerCase();
    const existingUser = usersData.users.find((user) => user.email?.toLowerCase() === normalizedEmail);

    let userId = existingUser?.id ?? null;

    if (!userId) {
      const { data: createdUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: data.email,
        password: data.password,
        email_confirm: true,
      });

      if (createError) {
        throw new Error(createError.message);
      }

      userId = createdUser.user?.id ?? null;
    } else {
      const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
        password: data.password,
        email_confirm: true,
      });

      if (updateError) {
        throw new Error(updateError.message);
      }
    }

    if (!userId) {
      throw new Error("We could not create the organiser account.");
    }

    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });

    if (roleError) {
      throw new Error(roleError.message);
    }

    return { ok: true };
  });

function AuthPage() {
  const navigate = useNavigate();
  const { session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (session) navigate({ to: "/admin", replace: true });
  }, [session, navigate]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input.");
      return;
    }

    setBusy(true);
    try {
      const normalizedEmail = parsed.data.email.toLowerCase();
      let result = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: parsed.data.password,
      });

      if (result.error) {
        await ensureAdminAccount({ data: { ...parsed.data, email: normalizedEmail } });
        await new Promise((resolve) => setTimeout(resolve, 750));
        result = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password: parsed.data.password,
        });
      }

      if (result.error) {
        throw new Error(result.error.message);
      }

      toast.success("Admin access ready.");
      navigate({ to: "/admin", replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "We could not open the dashboard.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="surface-panel w-full max-w-md rounded-2xl p-8">
        <h1 className="text-2xl font-bold">Organiser access</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Set up or open the admin account for participants, voting days and transaction verification.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5"
              maxLength={255}
              autoComplete="email"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5"
              maxLength={72}
              autoComplete="current-password"
            />
          </div>
          <Button type="submit" variant="hero" className="w-full" disabled={busy}>
            {busy ? "Please wait…" : "Open dashboard"}
          </Button>
        </form>
      </div>
    </main>
  );
}

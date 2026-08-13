import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CopyFieldProps = {
  label: string;
  value: string;
  successMessage: string;
  buttonLabel?: string;
  mono?: boolean;
  tone?: "default" | "accent";
  className?: string;
};

export function CopyField({
  label,
  value,
  successMessage,
  buttonLabel = "Copy",
  mono = true,
  tone = "default",
  className,
}: CopyFieldProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(successMessage);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Copy failed. Please select and copy the value manually.");
    }
  }

  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        tone === "accent" ? "border-accent/40 bg-accent/5" : "border-border bg-surface",
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "mt-2 break-anywhere text-sm leading-relaxed",
          mono ? "font-mono text-xs sm:text-sm" : "",
        )}
      >
        {value}
      </p>
      <Button
        type="button"
        onClick={handleCopy}
        variant={tone === "accent" ? "accent" : "hero"}
        size="sm"
        className="mt-3 w-full sm:w-auto"
      >
        {copied ? <Check /> : <Copy />}
        {copied ? "Copied" : buttonLabel}
      </Button>
    </div>
  );
}

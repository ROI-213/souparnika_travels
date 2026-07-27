import { Send } from "lucide-react";
import { openEnquiryDialog, type EnquiryDialogOptions } from "@/lib/enquiry-dialog";
import { cn } from "@/lib/utils";

type Variant = "gold" | "navy" | "outline" | "white";

const variants: Record<Variant, string> = {
  gold:
    "bg-[color:var(--brand-gold)] text-[color:var(--brand-navy)] hover:brightness-95",
  navy:
    "bg-[color:var(--brand-navy)] text-white hover:bg-[color:var(--brand-blue)]",
  outline:
    "border border-border bg-white text-[color:var(--brand-navy)] hover:bg-secondary",
  white:
    "bg-white text-[color:var(--brand-navy)] hover:bg-secondary",
};

export function EnquireButton({
  options,
  label = "Enquire Now",
  variant = "gold",
  size = "md",
  className,
  icon = true,
}: {
  options?: EnquiryDialogOptions;
  label?: string;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: boolean;
}) {
  const sz =
    size === "sm"
      ? "px-3 py-2 text-xs"
      : size === "lg"
        ? "px-5 py-3 text-sm"
        : "px-4 py-2.5 text-sm";
  return (
    <button
      type="button"
      onClick={() => openEnquiryDialog(options)}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-lg font-semibold transition-colors",
        sz,
        variants[variant],
        className,
      )}
    >
      {icon && <Send className="h-3.5 w-3.5" />} {label}
    </button>
  );
}

import { useEffect } from "react";
import { X } from "lucide-react";
import { closeEnquiryDialog, useEnquiryDialogState } from "@/lib/enquiry-dialog";
import { EnquiryForm } from "./EnquiryForm";

export function EnquiryDialog() {
  const { open, options } = useEnquiryDialogState();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeEnquiryDialog();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-[color:var(--brand-navy)]/70 backdrop-blur-sm p-3 sm:p-6"
      onClick={closeEnquiryDialog}
    >
      <div
        className="relative w-full max-w-3xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={closeEnquiryDialog}
          className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 z-10 h-9 w-9 rounded-full bg-white text-[color:var(--brand-navy)] shadow-lg grid place-items-center hover:bg-secondary"
        >
          <X className="h-4 w-4" />
        </button>
        <EnquiryForm
          title={options.title ?? "Send us an enquiry"}
          source={options.source ?? "website"}
          lockedVehicle={options.lockedVehicle}
          lockedPackage={options.lockedPackage}
          defaultTripType={options.defaultTripType}
          showPax={options.showPax}
        />
      </div>
    </div>
  );
}

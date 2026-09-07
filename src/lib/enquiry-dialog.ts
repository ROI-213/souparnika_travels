import { useSyncExternalStore } from "react";

export type EnquiryDialogOptions = {
  title?: string;
  source?: string;
  lockedVehicle?: string;
  lockedPackage?: string;
  defaultTripType?: string;
  showPax?: boolean;
  vehicleType?: string;
  defaultService?: string;
  destination?: string;
  message?: string;
  defaultVehicle?: string;
  vehiclePreference?: string;
  pickup?: string;
};

type State = { open: boolean; options: EnquiryDialogOptions };

let state: State = { open: false, options: {} };
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

export function openEnquiryDialog(options: EnquiryDialogOptions = {}) {
  state = { open: true, options };
  emit();
}

export function closeEnquiryDialog() {
  state = { open: false, options: {} };
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  return state;
}

export function useEnquiryDialogState() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

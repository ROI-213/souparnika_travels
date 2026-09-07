import { UrbaniaFleetRate } from "@/lib/data/urbania-pricing";
import { VehiclePricingFormatCard } from "./VehiclePricingFormatCard";
import { Button } from "@/components/ui/button";

interface UrbaniaCardProps {
  fleet: UrbaniaFleetRate;
  pricingMode: "local" | "outstation";
  handleBookVehicle: (fleet: UrbaniaFleetRate, modeName: string, rateString: string) => void;
}

export function UrbaniaCard({ fleet, pricingMode, handleBookVehicle }: UrbaniaCardProps) {
  const modeName = pricingMode === "local" ? "Local" : "Outstation";
  const rateString = pricingMode === "local" ? "Package" : "Per KM";

  return (
    <div className="flex flex-col gap-4">
      <VehiclePricingFormatCard fleet={fleet} variant="dark" />
      <Button
        onClick={() => handleBookVehicle(fleet, modeName, rateString)}
        className="self-start"
      >
        Book {fleet.name}
      </Button>
    </div>
  );
}

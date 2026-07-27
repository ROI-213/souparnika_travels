import { FleetSliderSection } from "./FleetSliderSection";
import { FleetCardProps } from "./FleetCard";

const carFleets: FleetCardProps[] = [
  {
    name: "Hatchback",
    passengers: "4",
    useCase: "Economical and perfect for quick city rides.",
    image: "/images/fleets/cars/hatchback-new.png",
  },
  {
    name: "Sedan",
    passengers: "4",
    useCase: "Ideal for city travel and quick airport drops.",
    image: "/images/fleets/cars/sedan-new.png",
  },
  {
    name: "SUV",
    passengers: "6",
    useCase: "Spacious and comfortable for family outstation trips.",
    image: "/images/fleets/cars/suv-new.png",
  },
  {
    name: "Innova Crysta",
    passengers: "7",
    useCase: "Premium comfort for long journeys and corporate travel.",
    image: "/images/fleets/cars/innova-new.png",
  },
  {
    name: "Ertiga",
    passengers: "6",
    useCase: "Economical and reliable for mid-sized groups.",
    image: "/images/fleets/cars/ertiga.webp",
  }
];

const tempoTravellers: FleetCardProps[] = [
  {
    name: "12 Seater Tempo Traveller",
    passengers: "12",
    useCase: "Perfect for family tours and weekend getaways.",
    image: "/images/fleets/tempo/tempo-12-new.png",
  },
  {
    name: "17 Seater Tempo Traveller",
    passengers: "17",
    useCase: "Great for larger groups and pilgrimage trips.",
    image: "/images/fleets/tempo/tempo-17-new.png",
  },
  {
    name: "Luxury Tempo Traveller",
    passengers: "10-15",
    useCase: "Plush push-back seats and premium interiors.",
    image: "/images/fleets/tempo/tempo-luxury-new.png",
  }
];

const buses: FleetCardProps[] = [
  {
    name: "Mini Bus",
    passengers: "18-24",
    useCase: "Compact group travel and corporate outings.",
    image: "/images/fleets/buses/mini-bus.webp",
  },
  {
    name: "21 Seater Bus",
    passengers: "21",
    useCase: "Comfortable seating for school or office trips.",
    image: "/images/fleets/buses/bus-21.webp",
  },
  {
    name: "32 Seater Bus",
    passengers: "32",
    useCase: "Ideal for weddings and large family events.",
    image: "/images/fleets/buses/bus-32.webp",
  },
  {
    name: "50 Seater Bus",
    passengers: "50",
    useCase: "Heavy duty transport for large tours and staff movement.",
    image: "/images/fleets/buses/bus-50.webp",
  }
];

export function FleetsSection() {
  return (
    <section className="py-20 lg:py-28 bg-[color:var(--brand-soft)] border-t border-border/60">
      <div className="max-w-7xl mx-auto container-p">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[color:var(--brand-gold)]">
            OUR FLEETS
          </span>
          <h2 className="mt-4 font-display font-bold text-3xl md:text-5xl text-[color:var(--brand-navy)] leading-tight">
            Choose the Right Ride for Every Journey
          </h2>
          <p className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed">
            From city travel and airport transfers to group tours and bus bookings, explore our well-maintained fleet designed for comfort, safety, and convenience.
          </p>
        </div>

        <FleetSliderSection 
          title="Car Fleets" 
          description="Comfortable and reliable vehicles for city travel, airport pickup, and outstation rides."
          items={carFleets} 
        />
        
        <FleetSliderSection 
          title="Tempo Travellers" 
          description="Spacious travel options for families, group outings, and pilgrimage trips."
          items={tempoTravellers} 
        />
      </div>
    </section>
  );
}

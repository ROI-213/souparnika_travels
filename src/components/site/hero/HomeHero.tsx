
import { HeroContent } from "./HeroContent";
import { HeroArtwork } from "./HeroArtwork";
import { TripSearchPanel } from "./TripSearchPanel";
import { HeroServiceCards } from "./HeroServiceCards";
import { HeroTrustStrip } from "./HeroTrustStrip";

export function HomeHero() {
  return (
    <section className="hero-section">


      <div className="hero-main">
        <HeroContent />
        <HeroArtwork />
      </div>

      <TripSearchPanel />
      <HeroServiceCards />
      <HeroTrustStrip />
    </section>
  );
}

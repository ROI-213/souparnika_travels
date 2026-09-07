import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import { MapPin, Search, MessageSquare } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SiteLayout } from '@/components/site/SiteLayout'
import { openEnquiryDialog } from '@/lib/enquiry-dialog'

const HIGHLIGHTED = ['whitefield','koramangala','electronic-city','hsr-layout','indiranagar','marathahalli','hebbal','jayanagar','btm-layout','jp-nagar','mg-road','bannerghatta-road','yelahanka','kalyan-nagar','banaswadi','domlur','sarjapur-road','bellandur','varthur','kr-puram','mahadevapura','nagarbhavi','rajajinagar','malleshwaram','vijayanagar','banashankari','kengeri','devanahalli']

const AREA_DESCRIPTIONS: Record<string, { desc: string; dist: string }> = {
  whitefield: { desc: 'Premium Force Urbania rentals in Whitefield for corporate events, airport transfers and outstation trips.', dist: '~37 km' },
  koramangala: { desc: 'Chauffeur driven tempo travellers and Urbania rentals in Koramangala for family trips and business travel.', dist: '~41 km' },
  'electronic-city': { desc: 'Reliable tempo traveller and Urbania rentals in Electronic City for IT corridor commutes and outstation travel.', dist: '~55 km' },
  'hsr-layout': { desc: 'Affordable Force Urbania rentals in HSR Layout for local and outstation trips with professional drivers.', dist: '~44 km' },
  indiranagar: { desc: 'Luxury tempo traveller rentals in Indiranagar for weddings, corporate events and airport transfers.', dist: '~38 km' },
  marathahalli: { desc: 'Quick and easy Force Urbania bookings in Marathahalli for local sightseeing and outstation journeys.', dist: '~35 km' },
  hebbal: { desc: 'Premium Urbania rentals near Hebbal for airport transfers, corporate travel and weekend getaways.', dist: '~30 km' },
  jayanagar: { desc: 'Trusted tempo traveller services in Jayanagar for family outings, temple visits and outstation trips.', dist: '~40 km' },
  'btm-layout': { desc: 'Force Urbania rentals in BTM Layout for corporate travel, airport drops and outstation journeys.', dist: '~42 km' },
  'jp-nagar': { desc: 'Comfortable Urbania rentals in JP Nagar for local and outstation trips with experienced drivers.', dist: '~41 km' },
  madiwala: { desc: 'Affordable tempo traveller rentals in Madiwala for local pickups and outstation travel.', dist: '~40 km' },
  bannerghatta: { desc: 'Force Urbania rentals in Bannerghatta for weekend getaways, zoo visits and outstation trips.', dist: '~48 km' },
  yelahanka: { desc: 'Tempo traveller and Urbania rentals in Yelahanka for airport transfers and North Bengaluru outstation trips.', dist: '~28 km' },
  rajajinagar: { desc: 'Premium Urbania rentals in Rajajinagar for corporate travel, weddings and outstation journeys.', dist: '~33 km' },
  malleshwaram: { desc: 'Chauffeur driven Force Urbania rentals in Malleshwaram for family trips and airport transfers.', dist: '~34 km' },
  basavanagudi: { desc: 'Reliable tempo traveller rentals in Basavanagudi for local travel and outstation trips.', dist: '~38 km' },
  domlur: { desc: 'Quick Urbania bookings in Domlur for IT corridor commutes and airport transfers.', dist: '~36 km' },
  'electronic-city-phase-1': { desc: 'Force Urbania rentals in Electronic City Phase 1 for IT professionals and outstation travel.', dist: '~56 km' },
  sarjapur: { desc: 'Tempo traveller rentals in Sarjapur for corporate travel and weekend outings.', dist: '~50 km' },
  bellandur: { desc: 'Urbania rentals in Bellandur for lake-side outings and outstation trips from East Bengaluru.', dist: '~43 km' },
  kundalahalli: { desc: 'Premium Force Urbania rentals in Kundalahalli for IT professionals and family outings.', dist: '~38 km' },
  mahadevapura: { desc: 'Tempo traveller rentals in Mahadevapura for local commutes and outstation journeys.', dist: '~36 km' },
  varthur: { desc: 'Force Urbania rentals in Varthur for local sightseeing and outstation trips.', dist: '~40 km' },
  hal: { desc: 'Urbania rentals near HAL for corporate and defence personnel travel needs.', dist: '~35 km' },
  'cv-raman-nagar': { desc: 'Reliable tempo traveller rentals in CV Raman Nagar for local and outstation travel.', dist: '~34 km' },
  banaswadi: { desc: 'Force Urbania rentals in Banaswadi for airport transfers and outstation trips.', dist: '~32 km' },
  'kalyan-nagar': { desc: 'Tempo traveller rentals in Kalyan Nagar for family outings and outstation journeys.', dist: '~31 km' },
  horamavu: { desc: 'Urbania rentals in Horamavu for local commutes and weekend outstation trips.', dist: '~30 km' },
  'brigade-road': { desc: 'Premium tempo traveller rentals on Brigade Road for luxury travel and outstation journeys.', dist: '~36 km' },
  'mg-road': { desc: 'Force Urbania rentals on MG Road for corporate travel and luxury outstation trips.', dist: '~35 km' },
  ulsoor: { desc: 'Urbania rentals in Ulsoor for local sightseeing and outstation travel from Central Bengaluru.', dist: '~33 km' },
  'cox-town': { desc: 'Reliable tempo traveller rentals in Cox Town for family trips and outstation journeys.', dist: '~33 km' },
  'frazer-town': { desc: 'Force Urbania rentals in Frazer Town for local pickups and outstation travel.', dist: '~32 km' },
  'richmond-town': { desc: 'Tempo traveller rentals in Richmond Town for comfortable outstation journeys.', dist: '~34 km' },
  'sahakara-nagar': { desc: 'Urbania rentals in Sahakara Nagar for local commutes and outstation trips.', dist: '~29 km' },
  'koramangala-1st-block': { desc: 'Premium Force Urbania rentals in Koramangala 1st Block for corporate events and airport transfers.', dist: '~41 km' },
  banashankari: { desc: 'Tempo traveller rentals in Banashankari for family outings and outstation journeys.', dist: '~38 km' },
  'kumaraswamy-layout': { desc: 'Urbania rentals in Kumaraswamy Layout for local and outstation travel.', dist: '~39 km' },
  padmanabhanagar: { desc: 'Reliable Force Urbania rentals in Padmanabhanagar for local trips and outstation journeys.', dist: '~40 km' },
  vijayanagar: { desc: 'Tempo traveller rentals in Vijayanagar for local sightseeing and outstation trips.', dist: '~35 km' },
  peenya: { desc: 'Force Urbania rentals in Peenya for industrial commutes and outstation travel.', dist: '~32 km' },
  yeshwanthpur: { desc: 'Urbania rentals in Yeshwanthpur for local and outstation trips with professional drivers.', dist: '~31 km' },
  'tumkur-road': { desc: 'Tempo traveller rentals on Tumkur Road for outstation trips and airport transfers.', dist: '~35 km' },
  'mysore-road': { desc: 'Force Urbania rentals on Mysore Road for outstation trips to Mysore and beyond.', dist: '~38 km' },
  'hosur-road': { desc: 'Urbania rentals on Hosur Road for local commutes and outstation travel.', dist: '~45 km' },
  'outer-ring-road': { desc: 'Tempo traveller rentals on ORR for IT corridor commutes and outstation trips.', dist: '~42 km' },
  kengeri: { desc: 'Affordable Force Urbania rentals in Kengeri for local trips and outstation travel.', dist: '~48 km' },
  rajakrupa: { desc: 'Tempo traveller rentals in Rajakrupa for local pickups and outstation journeys.', dist: '~38 km' },
  'nandini-layout': { desc: 'Urbania rentals in Nandini Layout for local and outstation trips.', dist: '~33 km' },
  'sanjay-nagar': { desc: 'Force Urbania rentals in Sanjay Nagar for local and outstation travel.', dist: '~30 km' },
  'hennur-road': { desc: 'Tempo traveller and Urbania rentals on Hennur Road for airport transfers and outstation travel.', dist: '~30 km' },
  sadashivanagar: { desc: 'Premium Urbania rentals in Sadashivanagar for family trips, corporate travel and outstation journeys.', dist: '~35 km' },
  basaveshwaranagar: { desc: 'Force Urbania rentals in Basaveshwaranagar for local commutes and outstation trips.', dist: '~37 km' },
  'rr-nagar': { desc: 'Tempo traveller rentals in RR Nagar for local commutes and outstation journeys.', dist: '~38 km' },
  'kanakapura-road': { desc: 'Affordable Force Urbania rentals on Kanakapura Road for outstation trips to Mysore and beyond.', dist: '~42 km' },
  anekal: { desc: 'Tempo traveller rentals in Anekal for outstation trips to Hosur and beyond.', dist: '~50 km' },
  devanahalli: { desc: 'Premium Urbania rentals in Devanahalli for airport transfers and outstation travel.', dist: '~8 km' },
  hoodi: { desc: 'Luxury tempo traveller rentals in Hoodi for IT professionals and outstation trips.', dist: '~33 km' },
  'old-madras-road': { desc: 'Urbania rentals on Old Madras Road for local commutes and outstation travel.', dist: '~30 km' },
  'cunningham-road': { desc: 'Premium tempo traveller rentals on Cunningham Road for corporate travel and luxury outstation trips.', dist: '~36 km' },
  shivajinagar: { desc: 'Force Urbania rentals in Shivajinagar for local sightseeing and outstation travel from Central Bengaluru.', dist: '~35 km' },
}

const SLUG_TO_NAME: Record<string, string> = {
  whitefield: 'Whitefield', koramangala: 'Koramangala', 'electronic-city': 'Electronic City', 'hsr-layout': 'HSR Layout',
  indiranagar: 'Indiranagar', marathahalli: 'Marathahalli', hebbal: 'Hebbal', jayanagar: 'Jayanagar',
  'btm-layout': 'BTM Layout', 'jp-nagar': 'JP Nagar', madiwala: 'Madiwala', bannerghatta: 'Bannerghatta',
  yelahanka: 'Yelahanka', rajajinagar: 'Rajajinagar', malleshwaram: 'Malleshwaram', basavanagudi: 'Basavanagudi',
  domlur: 'Domlur', 'electronic-city-phase-1': 'Electronic City Phase 1', sarjapur: 'Sarjapur', bellandur: 'Bellandur',
  kundalahalli: 'Kundalahalli', mahadevapura: 'Mahadevapura', varthur: 'Varthur', hal: 'HAL', 'cv-raman-nagar': 'CV Raman Nagar',
  banaswadi: 'Banaswadi', 'kalyan-nagar': 'Kalyan Nagar', horamavu: 'Horamavu', 'brigade-road': 'Brigade Road',
  'mg-road': 'MG Road', ulsoor: 'Ulsoor', 'cox-town': 'Cox Town', 'frazer-town': 'Frazer Town',
  'richmond-town': 'Richmond Town', 'sahakara-nagar': 'Sahakara Nagar', 'koramangala-1st-block': 'Koramangala 1st Block',
  banashankari: 'Banashankari', 'kumaraswamy-layout': 'Kumaraswamy Layout', padmanabhanagar: 'Padmanabhanagar',
  vijayanagar: 'Vijayanagar', peenya: 'Peenya', yeshwanthpur: 'Yeshwanthpur', 'tumkur-road': 'Tumkur Road',
  'mysore-road': 'Mysore Road', 'hosur-road': 'Hosur Road', 'outer-ring-road': 'Outer Ring Road', kengeri: 'Kengeri',
  rajakrupa: 'Rajakrupa', 'nandini-layout': 'Nandini Layout', 'sanjay-nagar': 'Sanjay Nagar', 'hennur-road': 'Hennur Road',
  sadashivanagar: 'Sadashivanagar', basaveshwaranagar: 'Basaveshwaranagar', 'rr-nagar': 'RR Nagar',
  'kanakapura-road': 'Kanakapura Road', anekal: 'Anekal', devanahalli: 'Devanahalli', hoodi: 'Hoodi',
  'old-madras-road': 'Old Madras Road', 'cunningham-road': 'Cunningham Road', shivajinagar: 'Shivajinagar'
}

const MOCK_AREAS = Object.keys(SLUG_TO_NAME).map((slug, i) => ({
  id: String(i + 1),
  name: SLUG_TO_NAME[slug],
  slug,
  state: 'Karnataka',
  city: 'Bengaluru',
  description: AREA_DESCRIPTIONS[slug]?.desc || `Force Urbania rentals in ${SLUG_TO_NAME[slug]} for local and outstation trips.`,
  airport_distance: AREA_DESCRIPTIONS[slug]?.dist || '~35 km',
  starting_price: 6500,
  fleet_available: '9–16 Seater',
}))

function AreaCard({ area, index }: { area: typeof MOCK_AREAS[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 30)
    return () => clearTimeout(timer)
  }, [index])

  const isHighlighted = HIGHLIGHTED.includes(area.slug)

  const handleBook = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    openEnquiryDialog({ lockedVehicle: `${area.name} Taxi Service` })
  }

  return (
    <Link
      to="/areas/$slug"
      params={{ slug: area.slug }}
      className={`group relative block rounded-xl border overflow-hidden transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${
        isHighlighted
          ? 'bg-blue-600 border-blue-500 shadow-md shadow-blue-500/20 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5'
          : 'bg-white border-slate-200 shadow-sm hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-lg hover:shadow-slate-200/60 hover:-translate-y-0.5'
      }`}
    >
      <div className="px-4 py-3.5">
        {/* Top row: area name + badge */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2 min-w-0">
            <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isHighlighted ? 'bg-white/80' : 'bg-blue-500 group-hover:bg-blue-600'}`} />
            <h3 className={`font-bold text-sm truncate transition-colors duration-300 ${isHighlighted ? 'text-white' : 'text-slate-900 group-hover:text-blue-700'}`}>
              {area.name}
            </h3>
          </div>
          {isHighlighted && (
            <span className="flex-shrink-0 text-[9px] font-extrabold uppercase tracking-widest bg-white/20 text-white px-2 py-0.5 rounded-full">
              Popular
            </span>
          )}
        </div>

        {/* Airport distance */}
        <div className={`flex items-center gap-1 mb-3 transition-colors duration-300 ${isHighlighted ? 'text-white/70' : 'text-slate-400'}`}>
          <MapPin className="w-3 h-3" />
          <span className="text-[11px] font-medium">{area.airport_distance} from BLR Airport</span>
        </div>

        {/* Buttons row */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleBook}
            className={`flex-1 h-8 rounded-lg text-[11px] font-bold transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 bg-white text-blue-600 hover:bg-blue-50 ${
              isHighlighted ? '' : 'border border-blue-200'
            }`}
          >
            Book Now
          </button>
          <Link
            to="/areas/$slug"
            params={{ slug: area.slug }}
            className={`flex items-center justify-center h-8 px-3 rounded-lg text-[11px] font-bold transition-all duration-200 active:scale-95 bg-white hover:bg-slate-50 ${
              isHighlighted ? 'text-blue-600' : 'text-slate-600 border border-slate-200 hover:text-blue-600'
            }`}
          >
            View
          </Link>
        </div>
      </div>
    </Link>
  )
}

function AreasIndexComponent() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAreas = MOCK_AREAS.filter(area => {
    const matchesSearch = area.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <SiteLayout>
      <div className="min-h-screen bg-slate-50 pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <MapPin className="w-3.5 h-3.5" /> Service Network
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Areas We Serve</h1>
          <p className="text-lg text-slate-500 mb-8 max-w-2xl mx-auto">Pickup and drop-off anywhere in Bengaluru with our 60+ service locations.</p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            </div>
            <Input
              type="text"
              placeholder="Search your pickup location..."
              className="pl-11 h-14 rounded-full border-slate-200 bg-white shadow-lg shadow-slate-200/50 text-base focus-visible:ring-blue-600 focus-visible:shadow-blue-200/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        {/* Areas Grid Section */}
        <section className="container mx-auto px-4">
          {filteredAreas.length > 0 ? (
            <div className="mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredAreas.map((area, i) => (
                  <AreaCard key={area.id} area={area} index={i} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No areas found</h3>
              <p className="text-slate-500 mb-4">We couldn't find any service areas matching "{searchQuery}"</p>
              <Button variant="outline" onClick={() => setSearchQuery('')} className="rounded-full">Clear Search</Button>
            </div>
          )}
        </section>

        {/* Don't see your area CTA */}
        <section className="container mx-auto px-4 mt-16">
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 text-center overflow-hidden">
            {/* Animated background orbs */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Don't see your area?</h2>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto text-base">We're constantly expanding across Bengaluru. Reach out and we'll arrange a ride from your location.</p>
              <Button
                size="lg"
                className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full px-8 h-14 text-base font-bold shadow-xl hover:shadow-2xl hover:shadow-green-500/20 hover:scale-105 transition-all duration-300"
                onClick={() => window.open('https://wa.me/919008644559?text=Hi, I would like to check if you serve my area in Bengaluru.', '_blank')}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Check Availability
              </Button>
            </div>
          </div>
        </section>

        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </SiteLayout>
  )
}

export const Route = createFileRoute('/areas/')({
  component: AreasIndexComponent,
})

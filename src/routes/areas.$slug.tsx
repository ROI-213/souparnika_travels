import { createFileRoute, Link } from '@tanstack/react-router'
import { MapPin, Phone, MessageSquare, Check, Car, Route as RouteIcon, Info, Plane, ChevronRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SiteLayout } from '@/components/site/SiteLayout'
import { openEnquiryDialog } from '@/lib/enquiry-dialog'

const AREAS_DATA: Record<string, {
  name: string
  slug: string
  city: string
  state: string
  description: string
  airport_distance: string
  image: string
  landmarks: string[]
}> = {
  whitefield: {
    name: 'Whitefield',
    slug: 'whitefield',
    city: 'Bengaluru',
    state: 'Karnataka',
    description: 'Book premium Force Urbania rentals in Whitefield Bengaluru with professional drivers for airport transfers, corporate travel, weddings and outstation trips.',
    airport_distance: '~37 km',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&q=80',
    landmarks: ['ITPL', 'Prestige Tech Park', 'Brigade Metropolis', 'Phoenix Marketcity', 'VR Bengaluru', 'Kadugodi', 'Hope Farm Junction', 'Whitefield Metro Station']
  },
  koramangala: {
    name: 'Koramangala',
    slug: 'koramangala',
    city: 'Bengaluru',
    state: 'Karnataka',
    description: 'Chauffeur driven tempo travellers and Urbania rentals in Koramangala for family trips and business travel.',
    airport_distance: '~41 km',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=80',
    landmarks: ['Koramangala Forum', 'National Games Village', 'Sony Signal', 'Koramangala Police Station', 'St. John\'s Hospital']
  },
  'electronic-city': {
    name: 'Electronic City',
    slug: 'electronic-city',
    city: 'Bengaluru',
    state: 'Karnataka',
    description: 'Reliable tempo traveller and Urbania rentals in Electronic City for IT corridor commutes and outstation travel.',
    airport_distance: '~55 km',
    image: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=1920&q=80',
    landmarks: ['Infosys Campus', 'Wipro Campus', 'HP Office', 'Bharat Electronics', 'Zeitgeist Building']
  },
  'hsr-layout': {
    name: 'HSR Layout',
    slug: 'hsr-layout',
    city: 'Bengaluru',
    state: 'Karnataka',
    description: 'Affordable Force Urbania rentals in HSR Layout for local and outstation trips with professional drivers.',
    airport_distance: '~44 km',
    image: 'https://images.unsplash.com/photo-1477959858617-3f65e2c4f2a0?w=1920&q=80',
    landmarks: ['HSR BDA Complex', 'BDA Ground', 'Central Mall', 'Food Street', 'Agara Lake']
  },
  indiranagar: {
    name: 'Indiranagar',
    slug: 'indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    description: 'Luxury tempo traveller rentals in Indiranagar for weddings, corporate events and airport transfers.',
    airport_distance: '~38 km',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df2?w=1920&q=80',
    landmarks: ['Indiranagar 100ft Road', 'CMH Road', 'Jeevanbheemanagar', 'Indiranagar Club', 'Domlur Flyover']
  },
  marathahalli: {
    name: 'Marathahalli',
    slug: 'marathahalli',
    city: 'Bengaluru',
    state: 'Karnataka',
    description: 'Quick and easy Force Urbania bookings in Marathahalli for local sightseeing and outstation journeys.',
    airport_distance: '~35 km',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80',
    landmarks: ['Marathahalli Bridge', 'Kundalahalli Gate', 'Brookefield Mall', 'Saketh Restaurant', 'ITPL Main Road']
  },
  hebbal: {
    name: 'Hebbal',
    slug: 'hebbal',
    city: 'Bengaluru',
    state: 'Karnataka',
    description: 'Premium Urbania rentals near Hebbal for airport transfers, corporate travel and weekend getaways.',
    airport_distance: '~30 km',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80',
    landmarks: ['Hebbal Lake', 'Manyata Tech Park', 'Hebbal Flyover', 'Ganesha Temple', 'R.T. Nagar Main Road']
  },
  jayanagar: {
    name: 'Jayanagar',
    slug: 'jayanagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    description: 'Trusted tempo traveller services in Jayanagar for family outings, temple visits and outstation trips.',
    airport_distance: '~40 km',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1920&q=80',
    landmarks: ['Jayanagar 4th Block', 'Lalbagh', 'LIC Colony', 'Yediyur', 'Banashankari 1st Stage']
  },
  'hennur-road': {
    name: 'Hennur Road',
    slug: 'hennur-road',
    city: 'Bengaluru',
    state: 'Karnataka',
    description: 'Tempo traveller and Urbania rentals on Hennur Road for airport transfers and outstation travel.',
    airport_distance: '~30 km',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80',
    landmarks: ['Hennur Cross', 'Geddalahalli', 'Kacharakanahalli', 'HBR Layout', 'Kalyan Nagar']
  },
  'kalyan-nagar': {
    name: 'Kalyan Nagar',
    slug: 'kalyan-nagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    description: 'Affordable Force Urbania rentals in Kalyan Nagar for local trips and outstation travel.',
    airport_distance: '~35 km',
    image: 'https://images.unsplash.com/photo-1477959858617-3f65e2c4f2a0?w=1920&q=80',
    landmarks: ['Kalyan Nagar Main Rd', 'Horamavu', 'HBR Layout', 'Banaswadi', 'Kasturi Nagar']
  },
  banaswadi: {
    name: 'Banaswadi',
    slug: 'banaswadi',
    city: 'Bengaluru',
    state: 'Karnataka',
    description: 'Reliable tempo traveller services in Banaswadi for local and outstation travel.',
    airport_distance: '~32 km',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=80',
    landmarks: ['Banaswadi Main Rd', 'HRBR Layout', 'Kalyan Nagar', 'Ogmabvi', 'Ramamurthy Nagar']
  },
  domlur: {
    name: 'Domlur',
    slug: 'domlur',
    city: 'Bengaluru',
    state: 'Karnataka',
    description: 'Luxury tempo traveller and Urbania rentals in Domlur for corporate travel and airport transfers.',
    airport_distance: '~38 km',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&q=80',
    landmarks: ['Domlur Flyover', 'Kodihalli', 'Jeevanbheemanagar', 'Indiranagar', 'HAL']
  },
  'sarjapur-road': {
    name: 'Sarjapur Road',
    slug: 'sarjapur-road',
    city: 'Bengaluru',
    state: 'Karnataka',
    description: 'Modern tempo traveller rentals in Sarjapur Road for IT corridor travel and outstation trips.',
    airport_distance: '~42 km',
    image: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=1920&q=80',
    landmarks: ['Sarjapur Signal', 'Wipro Sarjapur', 'Carmelaram', 'Bellandur', 'HSR Layout']
  },
  bellandur: {
    name: 'Bellandur',
    slug: 'bellandur',
    city: 'Bengaluru',
    state: 'Karnataka',
    description: 'Force Urbania rentals in Bellandur for corporate commutes, airport transfers and outstation travel.',
    airport_distance: '~40 km',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df2?w=1920&q=80',
    landmarks: ['Bellandur Lake', 'Bellandur Signal', 'Kaikondrahalli', 'Harlur', 'Sarjapur Road']
  },
  varthur: {
    name: 'Varthur',
    slug: 'varthur',
    city: 'Bengaluru',
    state: 'Karnataka',
    description: 'Affordable tempo traveller and Urbania rentals in Varthur for local and outstation trips.',
    airport_distance: '~43 km',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80',
    landmarks: ['Varthur Main Rd', 'Varthur Lake', 'Kundalahalli', 'Brookefield', 'ITPL']
  },
  'kr-puram': {
    name: 'KR Puram',
    slug: 'kr-puram',
    city: 'Bengaluru',
    state: 'Karnataka',
    description: 'Reliable tempo traveller and Urbania rentals in KR Puram for local and outstation travel.',
    airport_distance: '~36 km',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80',
    landmarks: ['KR Puram Bridge', 'Hoodi', 'ITPL', 'Whitefield', 'Mahadevapura']
  },
  mahadevapura: {
    name: 'Mahadevapura',
    slug: 'mahadevapura',
    city: 'Bengaluru',
    state: 'Karnataka',
    description: 'Luxury Urbania rentals in Mahadevapura for IT corridor commutes and outstation trips.',
    airport_distance: '~35 km',
    image: 'https://images.unsplash.com/photo-1477959858617-3f65e2c4f2a0?w=1920&q=80',
    landmarks: ['Mahadevapura Bridge', 'ITPL Main Rd', 'Kundalahalli', 'Whitefield', 'Brookefield']
  },
  nagarbhavi: {
    name: 'Nagarbhavi',
    slug: 'nagarbhavi',
    city: 'Bengaluru',
    state: 'Karnataka',
    description: 'Tempo traveller rentals in Nagarbhavi for local sightseeing and outstation journeys.',
    airport_distance: '~45 km',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=80',
    landmarks: ['Nagarbhavi Circle', 'BMTC Depot', 'Magadi Road', 'Vijayanagar', 'Mysore Road']
  },
  rajajinagar: {
    name: 'Rajajinagar',
    slug: 'rajajinagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    description: 'Premium Urbania and tempo traveller rentals in Rajajinagar for family trips and outstation travel.',
    airport_distance: '~38 km',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1920&q=80',
    landmarks: ['Rajajinagar 1st Block', 'Rajajinagar LIC', 'Navarang Circle', 'Malleshwaram', 'Mahalakshmi']
  },
  malleshwaram: {
    name: 'Malleshwaram', slug: 'malleshwaram', city: 'Bengaluru', state: 'Karnataka',
    description: 'Chauffeur driven Force Urbania rentals in Malleshwaram for family trips and airport transfers.',
    airport_distance: '~34 km', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80',
    landmarks: ['Malleshwaram 1st Block', 'Malleshwaram LIC', 'Cantonment Railway Station', 'Sri Krishna Rajendra Market']
  },
  basavanagudi: {
    name: 'Basavanagudi', slug: 'basavanagudi', city: 'Bengaluru', state: 'Karnataka',
    description: 'Reliable tempo traveller rentals in Basavanagudi for local travel and outstation trips.',
    airport_distance: '~38 km', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80',
    landmarks: ['Bull Temple', 'Lalbagh', 'Vidhana Soudha', 'KR Market', 'Gandhi Bazaar']
  },
  sadashivanagar: {
    name: 'Sadashivanagar', slug: 'sadashivanagar', city: 'Bengaluru', state: 'Karnataka',
    description: 'Premium Urbania rentals in Sadashivanagar for family trips and outstation journeys.',
    airport_distance: '~35 km', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80',
    landmarks: ['Sadashivanagar 1st Stage', 'Peenya', 'Yeshwanthpur', 'Malleshwaram', 'Rajajinagar']
  },
  basaveshwaranagar: {
    name: 'Basaveshwaranagar', slug: 'basaveshwaranagar', city: 'Bengaluru', state: 'Karnataka',
    description: 'Force Urbania rentals in Basaveshwaranagar for local commutes and outstation trips.',
    airport_distance: '~37 km', image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f8?w=1920&q=80',
    landmarks: ['Basaveshwaranagar Main Rd', 'Vijayanagar', 'Rajajinagar', 'Magadi Road', 'Mysore Road']
  },
  vijayanagar: {
    name: 'Vijayanagar', slug: 'vijayanagar', city: 'Bengaluru', state: 'Karnataka',
    description: 'Tempo traveller rentals in Vijayanagar for local sightseeing and outstation trips.',
    airport_distance: '~35 km', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80',
    landmarks: ['Vijayanagar 1st Stage', 'Vijayanagar 2nd Stage', 'Magadi Road', 'Mysore Road', 'RR Nagar']
  },
  banashankari: {
    name: 'Banashankari', slug: 'banashankari', city: 'Bengaluru', state: 'Karnataka',
    description: 'Tempo traveller rentals in Banashankari for family outings and outstation journeys.',
    airport_distance: '~38 km', image: 'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?w=1920&q=80',
    landmarks: ['Banashankari 1st Stage', 'Banashankari 2nd Stage', 'JP Nagar', 'Kumaraswamy Layout', 'Uttarahalli']
  },
  kengeri: {
    name: 'Kengeri', slug: 'kengeri', city: 'Bengaluru', state: 'Karnataka',
    description: 'Affordable Force Urbania rentals in Kengeri for local trips and outstation travel.',
    airport_distance: '~48 km', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
    landmarks: ['Kengeri Bus Stand', 'Kengeri Railway Station', 'Mysore Road', 'Uttarahalli', 'Vijayanagar']
  },
  'rr-nagar': {
    name: 'RR Nagar', slug: 'rr-nagar', city: 'Bengaluru', state: 'Karnataka',
    description: 'Tempo traveller rentals in RR Nagar for local commutes and outstation journeys.',
    airport_distance: '~38 km', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80',
    landmarks: ['RR Nagar 1st Block', 'RR Nagar 2nd Block', 'Vijayanagar', 'Kengeri', 'Mysore Road']
  },
  'kanakapura-road': {
    name: 'Kanakapura Road', slug: 'kanakapura-road', city: 'Bengaluru', state: 'Karnataka',
    description: 'Affordable Force Urbania rentals on Kanakapura Road for outstation trips to Mysore and beyond.',
    airport_distance: '~42 km', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80',
    landmarks: ['Kanakapura Junction', 'Art of Living', 'Thalli', 'Bidadi', 'Magadi']
  },
  anekal: {
    name: 'Anekal', slug: 'anekal', city: 'Bengaluru', state: 'Karnataka',
    description: 'Tempo traveller rentals in Anekal for outstation trips to Hosur and beyond.',
    airport_distance: '~50 km', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80',
    landmarks: ['Anekal Town', 'Chandapura', 'Attibele', 'Sarjapur', 'Electronic City']
  },
  devanahalli: {
    name: 'Devanahalli', slug: 'devanahalli', city: 'Bengaluru', state: 'Karnataka',
    description: 'Premium Urbania rentals in Devanahalli for airport transfers and outstation travel.',
    airport_distance: '~8 km', image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f8?w=1920&q=80',
    landmarks: ['Devanahalli Town', 'Airport Road', 'Nandi Hills', 'Bagalur', 'Chikkaballapur']
  },
  hoodi: {
    name: 'Hoodi', slug: 'hoodi', city: 'Bengaluru', state: 'Karnataka',
    description: 'Luxury tempo traveller rentals in Hoodi for IT professionals and outstation trips.',
    airport_distance: '~33 km', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80',
    landmarks: ['Hoodi Junction', 'ITPL Main Road', 'Whitefield', 'Kundalahalli', 'KR Puram']
  },
  'old-madras-road': {
    name: 'Old Madras Road', slug: 'old-madras-road', city: 'Bengaluru', state: 'Karnataka',
    description: 'Urbania rentals on Old Madras Road for local commutes and outstation travel.',
    airport_distance: '~30 km', image: 'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?w=1920&q=80',
    landmarks: ['Krishnarajapuram', 'Hoodi', 'Marathahalli', 'ITPL', 'Whitefield']
  },
  'cunningham-road': {
    name: 'Cunningham Road', slug: 'cunningham-road', city: 'Bengaluru', state: 'Karnataka',
    description: 'Premium tempo traveller rentals on Cunningham Road for corporate travel and luxury outstation trips.',
    airport_distance: '~36 km', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
    landmarks: ['Cunningham Road', 'Vasanth Nagar', 'Shivajinagar', 'MG Road', 'Brigade Road']
  },
  shivajinagar: {
    name: 'Shivajinagar', slug: 'shivajinagar', city: 'Bengaluru', state: 'Karnataka',
    description: 'Force Urbania rentals in Shivajinagar for local sightseeing and outstation travel from Central Bengaluru.',
    airport_distance: '~35 km', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80',
    landmarks: ['Shivajinagar Bus Stand', 'Cantonment', 'Frazer Town', 'Richmond Town', 'Cubbon Park']
  }
}

const ALL_AREAS = [
  'Whitefield', 'Koramangala', 'Electronic City', 'HSR Layout', 'Indiranagar',
  'Marathahalli', 'Hebbal', 'Jayanagar', 'BTM Layout', 'JP Nagar',
  'Madiwala', 'Bannerghatta', 'Yelahanka', 'Rajajinagar', 'Malleshwaram',
  'Basavanagudi', 'Domlur', 'Electronic City Phase 1', 'Sarjapur', 'Bellandur',
  'Kundalahalli', 'Mahadevapura', 'Varthur', 'HAL', 'CV Raman Nagar',
  'Banaswadi', 'Kalyan Nagar', 'Horamavu', 'Brigade Road', 'MG Road',
  'Ulsoor', 'Cox Town', 'Frazer Town', 'Richmond Town', 'Sahakara Nagar',
  'Koramangala 1st Block', 'Banashankari', 'Kumaraswamy Layout', 'Padmanabhanagar', 'Vijayanagar',
  'Peenya', 'Yeshwanthpur', 'Tumkur Road', 'Mysore Road', 'Hosur Road',
  'Outer Ring Road', 'Kengeri', 'Rajakrupa', 'Nandini Layout', 'Sanjay Nagar',
  'Sadashivanagar', 'Basaveshwaranagar', 'RR Nagar', 'Kanakapura Road', 'Anekal',
  'Devanahalli', 'Hoodi', 'Old Madras Road', 'Cunningham Road', 'Shivajinagar'
]

const FLEET_DATA = [
  {
    id: '1',
    name: '9 Seater Urbania Maharaja',
    category: 'LUXURY / MAHARAJA',
    capacity: 9,
    image: '/images/fleets/urbania-9-seater-luxury.jpg',
    description: 'Ultra-luxury Pushback Maharaja Seats with premium interiors and ample legroom for VIP travel.',
    pricing: {
      local: [
        { package: '8 Hours / 80 KM', price: 4800 },
        { package: '12 Hours / 100 KM', price: 6000 }
      ],
      extra_km: 32,
      extra_hour: 450,
      driver_bata: 500,
      outstation_per_km: 32
    }
  },
  {
    id: '2',
    name: '10 Seater Urbania Maharaja',
    category: 'LUXURY / MAHARAJA',
    capacity: 10,
    image: '/images/fleets/urbania-maharaja-10-seater.jpg',
    description: 'Premium luxury seating with pushback comfort, ideal for corporate and family VIP travel.',
    pricing: {
      local: [
        { package: '8 Hours / 80 KM', price: 6000 },
        { package: '12 Hours / 100 KM', price: 7500 }
      ],
      extra_km: 38,
      extra_hour: 500,
      driver_bata: 500,
      outstation_per_km: 38
    }
  },
  {
    id: '3',
    name: '12 Seater Urbania Maharaja',
    category: 'LUXURY / MAHARAJA',
    capacity: 12,
    image: '/images/fleets/urbania-maharaja-12-seater.jpg',
    description: 'Flagship luxury Force Urbania with 12 pushback maharaja seats, premium interiors, and executive comfort.',
    pricing: {
      local: [
        { package: '8 Hours / 80 KM', price: 6800 },
        { package: '12 Hours / 100 KM', price: 8500 }
      ],
      extra_km: 42,
      extra_hour: 550,
      driver_bata: 550,
      outstation_per_km: 42
    }
  },
  {
    id: '4',
    name: '10 Seater Urbania Premium',
    category: 'PREMIUM',
    capacity: 10,
    image: '/images/fleets/urbania-10-seater.jpg',
    description: 'Comfortable premium seating with modern amenities, perfect for corporate groups and family trips.',
    pricing: {
      local: [
        { package: '8 Hours / 80 KM', price: 5000 },
        { package: '12 Hours / 100 KM', price: 6500 }
      ],
      extra_km: 33,
      extra_hour: 500,
      driver_bata: 500,
      outstation_per_km: 33
    }
  },
  {
    id: '5',
    name: '12 Seater Urbania Premium',
    category: 'PREMIUM',
    capacity: 12,
    image: '/images/fleets/urbania-12-seater.jpg',
    description: 'Spacious premium seating with extra legroom and modern comfort for group travel.',
    pricing: {
      local: [
        { package: '8 Hours / 80 KM', price: 5500 },
        { package: '12 Hours / 100 KM', price: 7000 }
      ],
      extra_km: 36,
      extra_hour: 550,
      driver_bata: 550,
      outstation_per_km: 36
    }
  },
  {
    id: '6',
    name: '16 Seater Urbania Modified',
    category: 'PREMIUM',
    capacity: 16,
    image: '/images/fleets/urbania-16-seater.jpg',
    description: 'Maximum capacity with comfortable 16-seater configuration, ideal for large groups and outstation trips.',
    pricing: {
      local: [
        { package: '8 Hours / 80 KM', price: 6500 },
        { package: '12 Hours / 100 KM', price: 8000 }
      ],
      extra_km: 40,
      extra_hour: 650,
      driver_bata: 600,
      outstation_per_km: 40
    }
  },
  {
    id: '7',
    name: 'Toyota Fortuner',
    category: 'PREMIUM LUXURY SUV',
    capacity: 7,
    image: '/images/fleets/cars/fortuner.jpg',
    description: 'The ultimate high-commanding 6+1 seater luxury SUV offering imposing road presence, premium leather interior, and unstoppable capability.',
    pricing: {
      local: [
        { package: '8 Hours / 80 KM', price: 6500 },
        { package: '12 Hours / 120 KM', price: 9000 }
      ],
      extra_km: 65,
      extra_hour: 650,
      driver_bata: 500,
      outstation_per_km: 65
    }
  }
]

const OUTSTATION_ROUTES_BY_AREA: Record<string, Array<{ destination: string; distance: number; time: string; prices: Record<string, number> }>> = {
  whitefield: [
    { destination: 'Mysore',     distance: 171, time: '3.2 hrs',  prices: { '1': 8908,  '2': 8566,  '3': 8395,  '4': 6514, '5': 6685, '6': 6856  } },
    { destination: 'Ooty',       distance: 296, time: '7 hrs',    prices: { '1': 14908, '2': 14316, '3': 14020, '4': 10764,'5': 11060,'6': 11356 } },
    { destination: 'Coorg',      distance: 269, time: '6 hrs',    prices: { '1': 13612, '2': 13074, '3': 12805, '4': 9846, '5': 10115,'6': 10384 } },
    { destination: 'Tirupati',   distance: 220, time: '4 hrs',    prices: { '1': 11260, '2': 10820, '3': 10600, '4': 8180, '5': 8400, '6': 8620  } },
    { destination: 'Pondicherry',distance: 301, time: '6 hrs',    prices: { '1': 15148, '2': 14546, '3': 14245, '4': 10934,'5': 11235,'6': 11536 } },
    { destination: 'Chennai',    distance: 333, time: '5.8 hrs',  prices: { '1': 16684, '2': 16018, '3': 15685, '4': 12022,'5': 12355,'6': 12688 } }
  ],
  koramangala: [
    { destination: 'Mysore',     distance: 159, time: '2.75 hrs', prices: { '1': 8332,  '2': 8014,  '3': 7855,  '4': 6106, '5': 6265, '6': 6424  } },
    { destination: 'Ooty',       distance: 298, time: '7 hrs',    prices: { '1': 15004, '2': 14408, '3': 14110, '4': 10832,'5': 11130,'6': 11428 } },
    { destination: 'Coorg',      distance: 254, time: '5.5 hrs',  prices: { '1': 12892, '2': 12384, '3': 12130, '4': 9336, '5': 9590, '6': 9844  } },
    { destination: 'Tirupati',   distance: 248, time: '4.1 hrs',  prices: { '1': 12604, '2': 12108, '3': 11860, '4': 9132, '5': 9380, '6': 9628  } },
    { destination: 'Pondicherry',distance: 312, time: '5.83 hrs', prices: { '1': 15676, '2': 15052, '3': 14740, '4': 11308,'5': 11620,'6': 11932 } },
    { destination: 'Chennai',    distance: 346, time: '6.1 hrs',  prices: { '1': 17308, '2': 16616, '3': 16270, '4': 12464,'5': 12810,'6': 13156 } }
  ],
  'electronic-city': [
    { destination: 'Mysore',     distance: 150, time: '2.4 hrs',  prices: { '1': 7900,  '2': 7600,  '3': 7450,  '4': 5800, '5': 5950, '6': 6100  } },
    { destination: 'Ooty',       distance: 305, time: '7 hrs',    prices: { '1': 15340, '2': 14730, '3': 14425, '4': 11070,'5': 11375,'6': 11680 } },
    { destination: 'Coorg',      distance: 261, time: '5.5 hrs',  prices: { '1': 13228, '2': 12706, '3': 12445, '4': 9574, '5': 9835, '6': 10096 } },
    { destination: 'Tirupati',   distance: 281, time: '4.55 hrs', prices: { '1': 14188, '2': 13626, '3': 13345, '4': 10254,'5': 10535,'6': 10816 } },
    { destination: 'Pondicherry',distance: 300, time: '5.57 hrs', prices: { '1': 15100, '2': 14500, '3': 14200, '4': 10900,'5': 11200,'6': 11500 } },
    { destination: 'Chennai',    distance: 367, time: '6.4 hrs',  prices: { '1': 18316, '2': 17582, '3': 17215, '4': 13178,'5': 13545,'6': 13912 } }
  ],
  'hsr-layout': [
    { destination: 'Mysore',     distance: 157, time: '2.65 hrs', prices: { '1': 8236,  '2': 7922,  '3': 7765,  '4': 6038, '5': 6195, '6': 6352  } },
    { destination: 'Ooty',       distance: 285, time: '6.5 hrs',  prices: { '1': 14380, '2': 13810, '3': 13525, '4': 10390,'5': 10675,'6': 10960 } },
    { destination: 'Coorg',      distance: 253, time: '5.5 hrs',  prices: { '1': 12844, '2': 12338, '3': 12085, '4': 9302, '5': 9555, '6': 9808  } },
    { destination: 'Tirupati',   distance: 245, time: '4.2 hrs',  prices: { '1': 12460, '2': 11970, '3': 11725, '4': 9030, '5': 9275, '6': 9520  } },
    { destination: 'Pondicherry',distance: 299, time: '6 hrs',    prices: { '1': 15052, '2': 14454, '3': 14155, '4': 10866,'5': 11165,'6': 11464 } },
    { destination: 'Chennai',    distance: 354, time: '6.2 hrs',  prices: { '1': 17692, '2': 16984, '3': 16630, '4': 12736,'5': 13090,'6': 13444 } }
  ],
  indiranagar: [
    { destination: 'Mysore',     distance: 151, time: '2.8 hrs',  prices: { '1': 7948,  '2': 7646,  '3': 7495,  '4': 5834, '5': 5985, '6': 6136  } },
    { destination: 'Ooty',       distance: 275, time: '6.4 hrs',  prices: { '1': 13900, '2': 13350, '3': 13075, '4': 10050,'5': 10325,'6': 10600 } },
    { destination: 'Coorg',      distance: 256, time: '5.5 hrs',  prices: { '1': 12988, '2': 12476, '3': 12220, '4': 9404, '5': 9660, '6': 9916  } },
    { destination: 'Tirupati',   distance: 249, time: '4.5 hrs',  prices: { '1': 12652, '2': 12154, '3': 11905, '4': 9166, '5': 9415, '6': 9664  } },
    { destination: 'Pondicherry',distance: 318, time: '6.05 hrs', prices: { '1': 15964, '2': 15328, '3': 15010, '4': 11512,'5': 11830,'6': 12148 } },
    { destination: 'Chennai',    distance: 340, time: '5.9 hrs',  prices: { '1': 17020, '2': 16340, '3': 16000, '4': 12260,'5': 12600,'6': 12940 } }
  ],
  marathahalli: [
    { destination: 'Mysore',     distance: 168, time: '3 hrs',    prices: { '1': 8764,  '2': 8428,  '3': 8260,  '4': 6412, '5': 6580, '6': 6748  } },
    { destination: 'Ooty',       distance: 281, time: '6.5 hrs',  prices: { '1': 14188, '2': 13626, '3': 13345, '4': 10254,'5': 10535,'6': 10816 } },
    { destination: 'Coorg',      distance: 262, time: '5.5 hrs',  prices: { '1': 13276, '2': 12752, '3': 12490, '4': 9608, '5': 9870, '6': 10132 } },
    { destination: 'Tirupati',   distance: 235, time: '4 hrs',    prices: { '1': 11980, '2': 11510, '3': 11275, '4': 8690, '5': 8925, '6': 9160  } },
    { destination: 'Pondicherry',distance: 306, time: '6.25 hrs', prices: { '1': 15388, '2': 14776, '3': 14470, '4': 11104,'5': 11410,'6': 11716 } },
    { destination: 'Chennai',    distance: 343, time: '5.9 hrs',  prices: { '1': 17164, '2': 16478, '3': 16135, '4': 12362,'5': 12705,'6': 13048 } }
  ],
  hebbal: [
    { destination: 'Mysore',     distance: 159, time: '2.8 hrs',  prices: { '1': 8332,  '2': 8014,  '3': 7855,  '4': 6106, '5': 6265, '6': 6424  } },
    { destination: 'Ooty',       distance: 283, time: '6.4 hrs',  prices: { '1': 14284, '2': 13718, '3': 13435, '4': 10322,'5': 10605,'6': 10888 } },
    { destination: 'Coorg',      distance: 268, time: '5.4 hrs',  prices: { '1': 13564, '2': 13028, '3': 12760, '4': 9812, '5': 10080,'6': 10348 } },
    { destination: 'Tirupati',   distance: 248, time: '4.3 hrs',  prices: { '1': 12604, '2': 12108, '3': 11860, '4': 9132, '5': 9380, '6': 9628  } },
    { destination: 'Pondicherry',distance: 326, time: '6.52 hrs', prices: { '1': 16348, '2': 15696, '3': 15370, '4': 11784,'5': 12110,'6': 12436 } },
    { destination: 'Chennai',    distance: 347, time: '6.1 hrs',  prices: { '1': 17356, '2': 16662, '3': 16315, '4': 12498,'5': 12845,'6': 13192 } }
  ],
  jayanagar: [
    { destination: 'Mysore',     distance: 144, time: '2.55 hrs', prices: { '1': 7612,  '2': 7324,  '3': 7180,  '4': 5596, '5': 5740, '6': 5884  } },
    { destination: 'Ooty',       distance: 269, time: '6.1 hrs',  prices: { '1': 13612, '2': 13074, '3': 12805, '4': 9846, '5': 10115,'6': 10384 } },
    { destination: 'Coorg',      distance: 253, time: '5.1 hrs',  prices: { '1': 12844, '2': 12338, '3': 12085, '4': 9302, '5': 9555, '6': 9808  } },
    { destination: 'Tirupati',   distance: 263, time: '4.42 hrs', prices: { '1': 13324, '2': 12798, '3': 12535, '4': 9642, '5': 9905, '6': 10168 } },
    { destination: 'Pondicherry',distance: 315, time: '5.9 hrs',  prices: { '1': 15820, '2': 15190, '3': 14875, '4': 11410,'5': 11725,'6': 12040 } },
    { destination: 'Chennai',    distance: 350, time: '6.3 hrs',  prices: { '1': 17500, '2': 16800, '3': 16450, '4': 12600,'5': 12950,'6': 13300 } }
  ],
  'btm-layout': [
    { destination: 'Mysore',     distance: 148, time: '2.6 hrs',  prices: { '1': 7804,  '2': 7508,  '3': 7360,  '4': 5732, '5': 5880, '6': 6028  } },
    { destination: 'Ooty',       distance: 272, time: '6.2 hrs',  prices: { '1': 13756, '2': 13212, '3': 12940, '4': 9948, '5': 10220,'6': 10492 } },
    { destination: 'Coorg',      distance: 250, time: '5.5 hrs',  prices: { '1': 12700, '2': 12200, '3': 11950, '4': 9200, '5': 9450, '6': 9700  } },
    { destination: 'Tirupati',   distance: 243, time: '4.3 hrs',  prices: { '1': 12364, '2': 11878, '3': 11635, '4': 8962, '5': 9205, '6': 9448  } },
    { destination: 'Pondicherry',distance: 311, time: '5.82 hrs', prices: { '1': 15628, '2': 15006, '3': 14695, '4': 11274,'5': 11585,'6': 11896 } },
    { destination: 'Chennai',    distance: 357, time: '6.3 hrs',  prices: { '1': 17836, '2': 17122, '3': 16765, '4': 12838,'5': 13195,'6': 13552 } }
  ],
  'jp-nagar': [
    { destination: 'Mysore',     distance: 144, time: '2.6 hrs',  prices: { '1': 7612,  '2': 7324,  '3': 7180,  '4': 5596, '5': 5740, '6': 5884  } },
    { destination: 'Ooty',       distance: 268, time: '6.2 hrs',  prices: { '1': 13564, '2': 13028, '3': 12760, '4': 9812, '5': 10080,'6': 10348 } },
    { destination: 'Coorg',      distance: 253, time: '5.2 hrs',  prices: { '1': 12844, '2': 12338, '3': 12085, '4': 9302, '5': 9555, '6': 9808  } },
    { destination: 'Tirupati',   distance: 274, time: '4.47 hrs', prices: { '1': 13852, '2': 13304, '3': 13030, '4': 10016,'5': 10290,'6': 10564 } },
    { destination: 'Pondicherry',distance: 308, time: '6.25 hrs', prices: { '1': 15484, '2': 14868, '3': 14560, '4': 11172,'5': 11480,'6': 11788 } },
    { destination: 'Chennai',    distance: 360, time: '6.3 hrs',  prices: { '1': 17980, '2': 17260, '3': 16900, '4': 12940,'5': 13300,'6': 13660 } }
  ],
  'mg-road': [
    { destination: 'Mysore',     distance: 148, time: '2.7 hrs',  prices: { '1': 7804,  '2': 7508,  '3': 7360,  '4': 5732, '5': 5880, '6': 6028  } },
    { destination: 'Ooty',       distance: 272, time: '6.2 hrs',  prices: { '1': 13756, '2': 13212, '3': 12940, '4': 9948, '5': 10220,'6': 10492 } },
    { destination: 'Coorg',      distance: 256, time: '5.2 hrs',  prices: { '1': 12988, '2': 12476, '3': 12220, '4': 9404, '5': 9660, '6': 9916  } },
    { destination: 'Tirupati',   distance: 249, time: '4.5 hrs',  prices: { '1': 12652, '2': 12154, '3': 11905, '4': 9166, '5': 9415, '6': 9664  } },
    { destination: 'Pondicherry',distance: 316, time: '6.07 hrs', prices: { '1': 15868, '2': 15236, '3': 14920, '4': 11444,'5': 11760,'6': 12076 } },
    { destination: 'Chennai',    distance: 344, time: '6 hrs',    prices: { '1': 17212, '2': 16524, '3': 16180, '4': 12396,'5': 12740,'6': 13084 } }
  ],
  'bannerghatta-road': [
    { destination: 'Mysore',     distance: 150, time: '2.5 hrs',  prices: { '1': 7900,  '2': 7600,  '3': 7450,  '4': 5800, '5': 5950, '6': 6100  } },
    { destination: 'Ooty',       distance: 260, time: '5.9 hrs',  prices: { '1': 13180, '2': 12660, '3': 12400, '4': 9540, '5': 9800, '6': 10060 } },
    { destination: 'Coorg',      distance: 259, time: '5.1 hrs',  prices: { '1': 13132, '2': 12614, '3': 12355, '4': 9506, '5': 9765, '6': 10024 } },
    { destination: 'Tirupati',   distance: 288, time: '4.98 hrs', prices: { '1': 14524, '2': 13948, '3': 13660, '4': 10492,'5': 10780,'6': 11068 } },
    { destination: 'Pondicherry',distance: 305, time: '5.63 hrs', prices: { '1': 15340, '2': 14730, '3': 14425, '4': 11070,'5': 11375,'6': 11680 } },
    { destination: 'Chennai',    distance: 341, time: '6.6 hrs',  prices: { '1': 17068, '2': 16386, '3': 16045, '4': 12294,'5': 12635,'6': 12976 } }
  ],
  yelahanka: [
    { destination: 'Mysore',     distance: 168, time: '3 hrs',    prices: { '1': 8764,  '2': 8428,  '3': 8260,  '4': 6412, '5': 6580, '6': 6748  } },
    { destination: 'Ooty',       distance: 283, time: '6.5 hrs',  prices: { '1': 14284, '2': 13718, '3': 13435, '4': 10322,'5': 10605,'6': 10888 } },
    { destination: 'Coorg',      distance: 264, time: '5.5 hrs',  prices: { '1': 13372, '2': 12844, '3': 12580, '4': 9676, '5': 9940, '6': 10204 } },
    { destination: 'Tirupati',   distance: 243, time: '4.2 hrs',  prices: { '1': 12364, '2': 11878, '3': 11635, '4': 8962, '5': 9205, '6': 9448  } },
    { destination: 'Pondicherry',distance: 330, time: '7 hrs',    prices: { '1': 16540, '2': 15880, '3': 15550, '4': 11920,'5': 12250,'6': 12580 } },
    { destination: 'Chennai',    distance: 349, time: '6 hrs',    prices: { '1': 17452, '2': 16754, '3': 16405, '4': 12566,'5': 12915,'6': 13264 } }
  ],
  'hennur-road': [
    { destination: 'Mysore',     distance: 164, time: '3 hrs',    prices: { '1': 8572,  '2': 8244,  '3': 8080,  '4': 6276, '5': 6440, '6': 6604  } },
    { destination: 'Ooty',       distance: 288, time: '6.6 hrs',  prices: { '1': 14524, '2': 13948, '3': 13660, '4': 10492,'5': 10780,'6': 11068 } },
    { destination: 'Coorg',      distance: 278, time: '5.5 hrs',  prices: { '1': 14044, '2': 13488, '3': 13210, '4': 10152,'5': 10430,'6': 10708 } },
    { destination: 'Tirupati',   distance: 256, time: '3.98 hrs', prices: { '1': 12988, '2': 12476, '3': 12220, '4': 9404, '5': 9660, '6': 9916  } },
    { destination: 'Pondicherry',distance: 326, time: '6.25 hrs', prices: { '1': 16348, '2': 15696, '3': 15370, '4': 11784,'5': 12110,'6': 12436 } },
    { destination: 'Chennai',    distance: 342, time: '5.9 hrs',  prices: { '1': 17116, '2': 16432, '3': 16090, '4': 12328,'5': 12670,'6': 13012 } }
  ],
  'kalyan-nagar': [
    { destination: 'Mysore',     distance: 163, time: '2.9 hrs',  prices: { '1': 8524,  '2': 8198,  '3': 8035,  '4': 6242, '5': 6405, '6': 6568  } },
    { destination: 'Ooty',       distance: 287, time: '6.5 hrs',  prices: { '1': 14476, '2': 13902, '3': 13615, '4': 10458,'5': 10745,'6': 11032 } },
    { destination: 'Coorg',      distance: 245, time: '5.5 hrs',  prices: { '1': 12460, '2': 11970, '3': 11725, '4': 9030, '5': 9275, '6': 9520  } },
    { destination: 'Tirupati',   distance: 255, time: '3.9 hrs',  prices: { '1': 12940, '2': 12430, '3': 12175, '4': 9370, '5': 9625, '6': 9880  } },
    { destination: 'Pondicherry',distance: 325, time: '6.18 hrs', prices: { '1': 16300, '2': 15650, '3': 15325, '4': 11750,'5': 12075,'6': 12400 } },
    { destination: 'Chennai',    distance: 341, time: '5.9 hrs',  prices: { '1': 17068, '2': 16386, '3': 16045, '4': 12294,'5': 12635,'6': 12976 } }
  ],
  banaswadi: [
    { destination: 'Mysore',     distance: 154, time: '3 hrs',    prices: { '1': 8092,  '2': 7784,  '3': 7630,  '4': 5936, '5': 6090, '6': 6244  } },
    { destination: 'Ooty',       distance: 278, time: '6.6 hrs',  prices: { '1': 14044, '2': 13488, '3': 13210, '4': 10152,'5': 10430,'6': 10708 } },
    { destination: 'Coorg',      distance: 279, time: '5.5 hrs',  prices: { '1': 14092, '2': 13534, '3': 13255, '4': 10186,'5': 10465,'6': 10744 } },
    { destination: 'Tirupati',   distance: 254, time: '3.9 hrs',  prices: { '1': 12892, '2': 12384, '3': 12130, '4': 9336, '5': 9590, '6': 9844  } },
    { destination: 'Pondicherry',distance: 324, time: '6.18 hrs', prices: { '1': 16252, '2': 15604, '3': 15280, '4': 11716,'5': 12040,'6': 12364 } },
    { destination: 'Chennai',    distance: 340, time: '5.9 hrs',  prices: { '1': 17020, '2': 16340, '3': 16000, '4': 12260,'5': 12600,'6': 12940 } }
  ],
  domlur: [
    { destination: 'Mysore',     distance: 150, time: '2.8 hrs',  prices: { '1': 7900,  '2': 7600,  '3': 7450,  '4': 5800, '5': 5950, '6': 6100  } },
    { destination: 'Ooty',       distance: 275, time: '6 hrs',    prices: { '1': 13900, '2': 13350, '3': 13075, '4': 10050,'5': 10325,'6': 10600 } },
    { destination: 'Coorg',      distance: 259, time: '5.3 hrs',  prices: { '1': 13132, '2': 12614, '3': 12355, '4': 9506, '5': 9765, '6': 10024 } },
    { destination: 'Tirupati',   distance: 256, time: '4.07 hrs', prices: { '1': 12988, '2': 12476, '3': 12220, '4': 9404, '5': 9660, '6': 9916  } },
    { destination: 'Pondicherry',distance: 316, time: '6.02 hrs', prices: { '1': 15868, '2': 15236, '3': 14920, '4': 11444,'5': 11760,'6': 12076 } },
    { destination: 'Chennai',    distance: 342, time: '6 hrs',    prices: { '1': 17116, '2': 16432, '3': 16090, '4': 12328,'5': 12670,'6': 13012 } }
  ],
  'sarjapur-road': [
    { destination: 'Mysore',     distance: 158, time: '2.8 hrs',  prices: { '1': 8284,  '2': 7968,  '3': 7810,  '4': 6072, '5': 6230, '6': 6388  } },
    { destination: 'Ooty',       distance: 282, time: '6.4 hrs',  prices: { '1': 14236, '2': 13672, '3': 13390, '4': 10288,'5': 10570,'6': 10852 } },
    { destination: 'Coorg',      distance: 267, time: '5.4 hrs',  prices: { '1': 13516, '2': 12982, '3': 12715, '4': 9778, '5': 10045,'6': 10312 } },
    { destination: 'Tirupati',   distance: 265, time: '4.23 hrs', prices: { '1': 13420, '2': 12890, '3': 12625, '4': 9710, '5': 9975, '6': 10240 } },
    { destination: 'Pondicherry',distance: 311, time: '5.7 hrs',  prices: { '1': 15628, '2': 15006, '3': 14695, '4': 11274,'5': 11585,'6': 11896 } },
    { destination: 'Chennai',    distance: 351, time: '6.2 hrs',  prices: { '1': 17548, '2': 16846, '3': 16495, '4': 12634,'5': 12985,'6': 13336 } }
  ],
  bellandur: [
    { destination: 'Mysore',     distance: 162, time: '2.8 hrs',  prices: { '1': 8476,  '2': 8152,  '3': 7990,  '4': 6208, '5': 6370, '6': 6532  } },
    { destination: 'Ooty',       distance: 300, time: '7 hrs',    prices: { '1': 15100, '2': 14500, '3': 14200, '4': 10900,'5': 11200,'6': 11500 } },
    { destination: 'Coorg',      distance: 259, time: '5.5 hrs',  prices: { '1': 13132, '2': 12614, '3': 12355, '4': 9506, '5': 9765, '6': 10024 } },
    { destination: 'Tirupati',   distance: 236, time: '4 hrs',    prices: { '1': 12028, '2': 11556, '3': 11320, '4': 8724, '5': 8960, '6': 9196  } },
    { destination: 'Pondicherry',distance: 296, time: '6 hrs',    prices: { '1': 14908, '2': 14316, '3': 14020, '4': 10764,'5': 11060,'6': 11356 } },
    { destination: 'Chennai',    distance: 348, time: '6 hrs',    prices: { '1': 17404, '2': 16708, '3': 16360, '4': 12532,'5': 12880,'6': 13228 } }
  ],
  varthur: [
    { destination: 'Mysore',     distance: 170, time: '3.1 hrs',  prices: { '1': 8860,  '2': 8520,  '3': 8350,  '4': 6480, '5': 6650, '6': 6820  } },
    { destination: 'Ooty',       distance: 292, time: '6.6 hrs',  prices: { '1': 14716, '2': 14132, '3': 13840, '4': 10628,'5': 10920,'6': 11212 } },
    { destination: 'Coorg',      distance: 277, time: '5.7 hrs',  prices: { '1': 13996, '2': 13442, '3': 13165, '4': 10118,'5': 10395,'6': 10672 } },
    { destination: 'Tirupati',   distance: 251, time: '3.98 hrs', prices: { '1': 12748, '2': 12246, '3': 11995, '4': 9234, '5': 9485, '6': 9736  } },
    { destination: 'Pondicherry',distance: 307, time: '5.58 hrs', prices: { '1': 15436, '2': 14822, '3': 14515, '4': 11138,'5': 11445,'6': 11752 } },
    { destination: 'Chennai',    distance: 337, time: '5.9 hrs',  prices: { '1': 16876, '2': 16202, '3': 15865, '4': 12158,'5': 12495,'6': 12832 } }
  ],
  'kr-puram': [
    { destination: 'Mysore',     distance: 159, time: '3.2 hrs',  prices: { '1': 8332,  '2': 8014,  '3': 7855,  '4': 6106, '5': 6265, '6': 6424  } },
    { destination: 'Ooty',       distance: 283, time: '6.8 hrs',  prices: { '1': 14284, '2': 13718, '3': 13435, '4': 10322,'5': 10605,'6': 10888 } },
    { destination: 'Coorg',      distance: 263, time: '5.5 hrs',  prices: { '1': 13324, '2': 12798, '3': 12535, '4': 9642, '5': 9905, '6': 10168 } },
    { destination: 'Tirupati',   distance: 246, time: '3.63 hrs', prices: { '1': 12508, '2': 12016, '3': 11770, '4': 9064, '5': 9310, '6': 9556  } },
    { destination: 'Pondicherry',distance: 339, time: '6.22 hrs', prices: { '1': 16972, '2': 16294, '3': 15955, '4': 12226,'5': 12565,'6': 12904 } },
    { destination: 'Chennai',    distance: 333, time: '5.6 hrs',  prices: { '1': 16684, '2': 16018, '3': 15685, '4': 12022,'5': 12355,'6': 12688 } }
  ],
  mahadevapura: [
    { destination: 'Mysore',     distance: 171, time: '3.1 hrs',  prices: { '1': 8908,  '2': 8566,  '3': 8395,  '4': 6514, '5': 6685, '6': 6856  } },
    { destination: 'Ooty',       distance: 293, time: '6.6 hrs',  prices: { '1': 14764, '2': 14178, '3': 13885, '4': 10662,'5': 10955,'6': 11248 } },
    { destination: 'Coorg',      distance: 278, time: '5.6 hrs',  prices: { '1': 14044, '2': 13488, '3': 13210, '4': 10152,'5': 10430,'6': 10708 } },
    { destination: 'Tirupati',   distance: 232, time: '3.9 hrs',  prices: { '1': 11836, '2': 11372, '3': 11140, '4': 8588, '5': 8820, '6': 9052  } },
    { destination: 'Pondicherry',distance: 318, time: '5.98 hrs', prices: { '1': 15964, '2': 15328, '3': 15010, '4': 11512,'5': 11830,'6': 12148 } },
    { destination: 'Chennai',    distance: 340, time: '5.8 hrs',  prices: { '1': 17020, '2': 16340, '3': 16000, '4': 12260,'5': 12600,'6': 12940 } }
  ],
  nagarbhavi: [
    { destination: 'Mysore',     distance: 134, time: '2.3 hrs',  prices: { '1': 7132,  '2': 6864,  '3': 6730,  '4': 5256, '5': 5390, '6': 5524  } },
    { destination: 'Ooty',       distance: 258, time: '5.9 hrs',  prices: { '1': 13084, '2': 12568, '3': 12310, '4': 9472, '5': 9730, '6': 9988  } },
    { destination: 'Coorg',      distance: 243, time: '4.9 hrs',  prices: { '1': 12364, '2': 11878, '3': 11635, '4': 8962, '5': 9205, '6': 9448  } },
    { destination: 'Tirupati',   distance: 277, time: '4.63 hrs', prices: { '1': 13996, '2': 13442, '3': 13165, '4': 10118,'5': 10395,'6': 10672 } },
    { destination: 'Pondicherry',distance: 335, time: '6.17 hrs', prices: { '1': 16780, '2': 16110, '3': 15775, '4': 12090,'5': 12425,'6': 12760 } },
    { destination: 'Chennai',    distance: 362, time: '6.5 hrs',  prices: { '1': 18076, '2': 17352, '3': 16990, '4': 13008,'5': 13370,'6': 13732 } }
  ],
  rajajinagar: [
    { destination: 'Mysore',     distance: 146, time: '2.5 hrs',  prices: { '1': 7708,  '2': 7416,  '3': 7270,  '4': 5664, '5': 5810, '6': 5956  } },
    { destination: 'Ooty',       distance: 294, time: '6.5 hrs',  prices: { '1': 14812, '2': 14224, '3': 13930, '4': 10696,'5': 10990,'6': 11284 } },
    { destination: 'Coorg',      distance: 259, time: '5.5 hrs',  prices: { '1': 13132, '2': 12614, '3': 12355, '4': 9506, '5': 9765, '6': 10024 } },
    { destination: 'Tirupati',   distance: 254, time: '4.5 hrs',  prices: { '1': 12892, '2': 12384, '3': 12130, '4': 9336, '5': 9590, '6': 9844  } },
    { destination: 'Pondicherry',distance: 323, time: '6.43 hrs', prices: { '1': 16204, '2': 15558, '3': 15235, '4': 11682,'5': 12005,'6': 12328 } },
    { destination: 'Chennai',    distance: 351, time: '6.4 hrs',  prices: { '1': 17548, '2': 16846, '3': 16495, '4': 12634,'5': 12985,'6': 13336 } }
  ],
  malleshwaram: [
    { destination: 'Mysore',     distance: 148, time: '2.6 hrs',  prices: { '1': 7804,  '2': 7508,  '3': 7360,  '4': 5732, '5': 5880, '6': 6028  } },
    { destination: 'Ooty',       distance: 279, time: '6.5 hrs',  prices: { '1': 14092, '2': 13534, '3': 13255, '4': 10186,'5': 10465,'6': 10744 } },
    { destination: 'Coorg',      distance: 252, time: '5.5 hrs',  prices: { '1': 12796, '2': 12292, '3': 12040, '4': 9268, '5': 9520, '6': 9772  } },
    { destination: 'Tirupati',   distance: 250, time: '4.4 hrs',  prices: { '1': 12700, '2': 12200, '3': 11950, '4': 9200, '5': 9450, '6': 9700  } },
    { destination: 'Pondicherry',distance: 323, time: '6.48 hrs', prices: { '1': 16204, '2': 15558, '3': 15235, '4': 11682,'5': 12005,'6': 12328 } },
    { destination: 'Chennai',    distance: 354, time: '6.2 hrs',  prices: { '1': 17692, '2': 16984, '3': 16630, '4': 12736,'5': 13090,'6': 13444 } }
  ],
  sadashivanagar: [
    { destination: 'Mysore',     distance: 155, time: '2.7 hrs',  prices: { '1': 8140,  '2': 7830,  '3': 7675,  '4': 5970, '5': 6125, '6': 6280  } },
    { destination: 'Ooty',       distance: 279, time: '6.2 hrs',  prices: { '1': 14092, '2': 13534, '3': 13255, '4': 10186,'5': 10465,'6': 10744 } },
    { destination: 'Coorg',      distance: 260, time: '5.2 hrs',  prices: { '1': 13180, '2': 12660, '3': 12400, '4': 9540, '5': 9800, '6': 10060 } },
    { destination: 'Tirupati',   distance: 266, time: '4.27 hrs', prices: { '1': 13468, '2': 12936, '3': 12670, '4': 9744, '5': 10010,'6': 10276 } },
    { destination: 'Pondicherry',distance: 323, time: '6.43 hrs', prices: { '1': 16204, '2': 15558, '3': 15235, '4': 11682,'5': 12005,'6': 12328 } },
    { destination: 'Chennai',    distance: 352, time: '6.2 hrs',  prices: { '1': 17596, '2': 16892, '3': 16540, '4': 12668,'5': 13020,'6': 13372 } }
  ],
  basaveshwaranagar: [
    { destination: 'Mysore',     distance: 147, time: '2.45 hrs', prices: { '1': 7756,  '2': 7462,  '3': 7315,  '4': 5698, '5': 5845, '6': 5992  } },
    { destination: 'Ooty',       distance: 263, time: '6.1 hrs',  prices: { '1': 13324, '2': 12798, '3': 12535, '4': 9642, '5': 9905, '6': 10168 } },
    { destination: 'Coorg',      distance: 248, time: '5.0 hrs',  prices: { '1': 12604, '2': 12108, '3': 11860, '4': 9132, '5': 9380, '6': 9628  } },
    { destination: 'Tirupati',   distance: 267, time: '4.57 hrs', prices: { '1': 13516, '2': 12982, '3': 12715, '4': 9778, '5': 10045,'6': 10312 } },
    { destination: 'Pondicherry',distance: 339, time: '6.28 hrs', prices: { '1': 16972, '2': 16294, '3': 15955, '4': 12226,'5': 12565,'6': 12904 } },
    { destination: 'Chennai',    distance: 353, time: '6.4 hrs',  prices: { '1': 17644, '2': 16938, '3': 16585, '4': 12702,'5': 13055,'6': 13408 } }
  ],
  vijayanagar: [
    { destination: 'Mysore',     distance: 143, time: '2.4 hrs',  prices: { '1': 7564,  '2': 7278,  '3': 7135,  '4': 5562, '5': 5705, '6': 5848  } },
    { destination: 'Ooty',       distance: 261, time: '6.0 hrs',  prices: { '1': 13228, '2': 12706, '3': 12445, '4': 9574, '5': 9835, '6': 10096 } },
    { destination: 'Coorg',      distance: 246, time: '5.0 hrs',  prices: { '1': 12508, '2': 12016, '3': 11770, '4': 9064, '5': 9310, '6': 9556  } },
    { destination: 'Tirupati',   distance: 269, time: '4.62 hrs', prices: { '1': 13612, '2': 13074, '3': 12805, '4': 9846, '5': 10115,'6': 10384 } },
    { destination: 'Pondicherry',distance: 336, time: '6.25 hrs', prices: { '1': 16828, '2': 16156, '3': 15820, '4': 12124,'5': 12460,'6': 12796 } },
    { destination: 'Chennai',    distance: 355, time: '6.5 hrs',  prices: { '1': 17740, '2': 17030, '3': 16675, '4': 12770,'5': 13125,'6': 13480 } }
  ],
  banashankari: [
    { destination: 'Mysore',     distance: 140, time: '2.3 hrs',  prices: { '1': 7420,  '2': 7140,  '3': 7000,  '4': 5460, '5': 5600, '6': 5740  } },
    { destination: 'Ooty',       distance: 264, time: '5.9 hrs',  prices: { '1': 13372, '2': 12844, '3': 12580, '4': 9676, '5': 9940, '6': 10204 } },
    { destination: 'Coorg',      distance: 249, time: '4.9 hrs',  prices: { '1': 12652, '2': 12154, '3': 11905, '4': 9166, '5': 9415, '6': 9664  } },
    { destination: 'Tirupati',   distance: 250, time: '4.4 hrs',  prices: { '1': 12700, '2': 12200, '3': 11950, '4': 9200, '5': 9450, '6': 9700  } },
    { destination: 'Pondicherry',distance: 316, time: '6.13 hrs', prices: { '1': 15868, '2': 15236, '3': 14920, '4': 11444,'5': 11760,'6': 12076 } },
    { destination: 'Chennai',    distance: 354, time: '6.5 hrs',  prices: { '1': 17692, '2': 16984, '3': 16630, '4': 12736,'5': 13090,'6': 13444 } }
  ],
  kengeri: [
    { destination: 'Mysore',     distance: 128, time: '2.1 hrs',  prices: { '1': 6844,  '2': 6588,  '3': 6460,  '4': 5052, '5': 5180, '6': 5308  } },
    { destination: 'Ooty',       distance: 257, time: '5.6 hrs',  prices: { '1': 13036, '2': 12522, '3': 12265, '4': 9438, '5': 9695, '6': 9952  } },
    { destination: 'Coorg',      distance: 235, time: '5 hrs',    prices: { '1': 11980, '2': 11510, '3': 11275, '4': 8690, '5': 8925, '6': 9160  } },
    { destination: 'Tirupati',   distance: 265, time: '4.8 hrs',  prices: { '1': 13420, '2': 12890, '3': 12625, '4': 9710, '5': 9975, '6': 10240 } },
    { destination: 'Pondicherry',distance: 325, time: '5.97 hrs', prices: { '1': 16300, '2': 15650, '3': 15325, '4': 11750,'5': 12075,'6': 12400 } },
    { destination: 'Chennai',    distance: 365, time: '6.8 hrs',  prices: { '1': 18220, '2': 17490, '3': 17125, '4': 13110,'5': 13475,'6': 13840 } }
  ],
  'rr-nagar': [
    { destination: 'Mysore',     distance: 131, time: '2.3 hrs',  prices: { '1': 6988,  '2': 6726,  '3': 6595,  '4': 5154, '5': 5285, '6': 5416  } },
    { destination: 'Ooty',       distance: 286, time: '6.5 hrs',  prices: { '1': 14428, '2': 13856, '3': 13570, '4': 10424,'5': 10710,'6': 10996 } },
    { destination: 'Coorg',      distance: 240, time: '5 hrs',    prices: { '1': 12220, '2': 11740, '3': 11500, '4': 8860, '5': 9100, '6': 9340  } },
    { destination: 'Tirupati',   distance: 272, time: '4.83 hrs', prices: { '1': 13756, '2': 13212, '3': 12940, '4': 9948, '5': 10220,'6': 10492 } },
    { destination: 'Pondicherry',distance: 329, time: '6.07 hrs', prices: { '1': 16492, '2': 15834, '3': 15505, '4': 11886,'5': 12215,'6': 12544 } },
    { destination: 'Chennai',    distance: 359, time: '6.7 hrs',  prices: { '1': 17932, '2': 17214, '3': 16855, '4': 12906,'5': 13265,'6': 13624 } }
  ],
  'kanakapura-road': [
    { destination: 'Mysore',     distance: 125, time: '2.2 hrs',  prices: { '1': 6700,  '2': 6450,  '3': 6325,  '4': 4950, '5': 5075, '6': 5200  } },
    { destination: 'Ooty',       distance: 280, time: '6.5 hrs',  prices: { '1': 14140, '2': 13580, '3': 13300, '4': 10220,'5': 10500,'6': 10780 } },
    { destination: 'Coorg',      distance: 234, time: '4.8 hrs',  prices: { '1': 11932, '2': 11464, '3': 11230, '4': 8656, '5': 8890, '6': 9124  } },
    { destination: 'Tirupati',   distance: 272, time: '4.45 hrs', prices: { '1': 13756, '2': 13212, '3': 12940, '4': 9948, '5': 10220,'6': 10492 } },
    { destination: 'Pondicherry',distance: 332, time: '6.12 hrs', prices: { '1': 16636, '2': 15972, '3': 15640, '4': 11988,'5': 12320,'6': 12652 } },
    { destination: 'Chennai',    distance: 366, time: '7.2 hrs',  prices: { '1': 18268, '2': 17536, '3': 17170, '4': 13144,'5': 13510,'6': 13876 } }
  ],
  anekal: [
    { destination: 'Mysore',     distance: 167, time: '2.9 hrs',  prices: { '1': 8716,  '2': 8382,  '3': 8215,  '4': 6378, '5': 6545, '6': 6712  } },
    { destination: 'Ooty',       distance: 285, time: '6.5 hrs',  prices: { '1': 14380, '2': 13810, '3': 13525, '4': 10390,'5': 10675,'6': 10960 } },
    { destination: 'Coorg',      distance: 273, time: '6 hrs',    prices: { '1': 13804, '2': 13258, '3': 12985, '4': 9982, '5': 10255,'6': 10528 } },
    { destination: 'Tirupati',   distance: 265, time: '4.8 hrs',  prices: { '1': 13420, '2': 12890, '3': 12625, '4': 9710, '5': 9975, '6': 10240 } },
    { destination: 'Pondicherry',distance: 278, time: '5.75 hrs', prices: { '1': 14044, '2': 13488, '3': 13210, '4': 10152,'5': 10430,'6': 10708 } },
    { destination: 'Chennai',    distance: 327, time: '6.2 hrs',  prices: { '1': 16396, '2': 15742, '3': 15415, '4': 11818,'5': 12145,'6': 12472 } }
  ],
  devanahalli: [
    { destination: 'Mysore',     distance: 184, time: '3.3 hrs',  prices: { '1': 9532,  '2': 9164,  '3': 8980,  '4': 6956, '5': 7140, '6': 7324  } },
    { destination: 'Ooty',       distance: 331, time: '7.5 hrs',  prices: { '1': 16588, '2': 15926, '3': 15595, '4': 11954,'5': 12285,'6': 12616 } },
    { destination: 'Coorg',      distance: 284, time: '6 hrs',    prices: { '1': 14332, '2': 13764, '3': 13480, '4': 10356,'5': 10640,'6': 10924 } },
    { destination: 'Tirupati',   distance: 220, time: '3.8 hrs',  prices: { '1': 11260, '2': 10820, '3': 10600, '4': 8180, '5': 8400, '6': 8620  } },
    { destination: 'Pondicherry',distance: 353, time: '7.25 hrs', prices: { '1': 17644, '2': 16938, '3': 16585, '4': 12702,'5': 13055,'6': 13408 } },
    { destination: 'Chennai',    distance: 338, time: '5.6 hrs',  prices: { '1': 16924, '2': 16248, '3': 15910, '4': 12192,'5': 12530,'6': 12868 } }
  ],
  hoodi: [
    { destination: 'Mysore',     distance: 169, time: '3.1 hrs',  prices: { '1': 8812,  '2': 8474,  '3': 8305,  '4': 6446, '5': 6615, '6': 6784  } },
    { destination: 'Ooty',       distance: 293, time: '6.6 hrs',  prices: { '1': 14764, '2': 14178, '3': 13885, '4': 10662,'5': 10955,'6': 11248 } },
    { destination: 'Coorg',      distance: 278, time: '5.7 hrs',  prices: { '1': 14044, '2': 13488, '3': 13210, '4': 10152,'5': 10430,'6': 10708 } },
    { destination: 'Tirupati',   distance: 251, time: '3.88 hrs', prices: { '1': 12748, '2': 12246, '3': 11995, '4': 9234, '5': 9485, '6': 9736  } },
    { destination: 'Pondicherry',distance: 316, time: '5.87 hrs', prices: { '1': 15868, '2': 15236, '3': 14920, '4': 11444,'5': 11760,'6': 12076 } },
    { destination: 'Chennai',    distance: 337, time: '5.8 hrs',  prices: { '1': 16876, '2': 16202, '3': 15865, '4': 12158,'5': 12495,'6': 12832 } }
  ],
  'old-madras-road': [
    { destination: 'Mysore',     distance: 156, time: '3.15 hrs', prices: { '1': 8188,  '2': 7876,  '3': 7720,  '4': 6004, '5': 6160, '6': 6316  } },
    { destination: 'Ooty',       distance: 280, time: '6.7 hrs',  prices: { '1': 14140, '2': 13580, '3': 13300, '4': 10220,'5': 10500,'6': 10780 } },
    { destination: 'Coorg',      distance: 283, time: '5.7 hrs',  prices: { '1': 14284, '2': 13718, '3': 13435, '4': 10322,'5': 10605,'6': 10888 } },
    { destination: 'Tirupati',   distance: 254, time: '3.95 hrs', prices: { '1': 12892, '2': 12384, '3': 12130, '4': 9336, '5': 9590, '6': 9844  } },
    { destination: 'Pondicherry',distance: 293, time: '5.53 hrs', prices: { '1': 14764, '2': 14178, '3': 13885, '4': 10662,'5': 10955,'6': 11248 } },
    { destination: 'Chennai',    distance: 338, time: '5.8 hrs',  prices: { '1': 16924, '2': 16248, '3': 15910, '4': 12192,'5': 12530,'6': 12868 } }
  ],
  'cunningham-road': [
    { destination: 'Mysore',     distance: 148, time: '2.65 hrs', prices: { '1': 7804,  '2': 7508,  '3': 7360,  '4': 5732, '5': 5880, '6': 6028  } },
    { destination: 'Ooty',       distance: 272, time: '6.2 hrs',  prices: { '1': 13756, '2': 13212, '3': 12940, '4': 9948, '5': 10220,'6': 10492 } },
    { destination: 'Coorg',      distance: 257, time: '5.2 hrs',  prices: { '1': 13036, '2': 12522, '3': 12265, '4': 9438, '5': 9695, '6': 9952  } },
    { destination: 'Tirupati',   distance: 249, time: '4.5 hrs',  prices: { '1': 12652, '2': 12154, '3': 11905, '4': 9166, '5': 9415, '6': 9664  } },
    { destination: 'Pondicherry',distance: 319, time: '6.18 hrs', prices: { '1': 16012, '2': 15374, '3': 15055, '4': 11546,'5': 11865,'6': 12184 } },
    { destination: 'Chennai',    distance: 346, time: '6.1 hrs',  prices: { '1': 17308, '2': 16616, '3': 16270, '4': 12464,'5': 12810,'6': 13156 } }
  ],
  shivajinagar: [
    { destination: 'Mysore',     distance: 148, time: '2.65 hrs', prices: { '1': 7804,  '2': 7508,  '3': 7360,  '4': 5732, '5': 5880, '6': 6028  } },
    { destination: 'Ooty',       distance: 272, time: '6.2 hrs',  prices: { '1': 13756, '2': 13212, '3': 12940, '4': 9948, '5': 10220,'6': 10492 } },
    { destination: 'Coorg',      distance: 257, time: '5.2 hrs',  prices: { '1': 13036, '2': 12522, '3': 12265, '4': 9438, '5': 9695, '6': 9952  } },
    { destination: 'Tirupati',   distance: 248, time: '4.5 hrs',  prices: { '1': 12604, '2': 12108, '3': 11860, '4': 9132, '5': 9380, '6': 9628  } },
    { destination: 'Pondicherry',distance: 318, time: '6.15 hrs', prices: { '1': 15964, '2': 15328, '3': 15010, '4': 11512,'5': 11830,'6': 12148 } },
    { destination: 'Chennai',    distance: 345, time: '6.1 hrs',  prices: { '1': 17260, '2': 16570, '3': 16225, '4': 12430,'5': 12775,'6': 13120 } }
  ]
}

const DEFAULT_ROUTES = OUTSTATION_ROUTES_BY_AREA['whitefield']

const WHY_BOOK_ITEMS = [
  { num: '01', title: '2026 Latest Fleet' },
  { num: '02', title: 'Powerful AC' },
  { num: '03', title: 'Professional Drivers' },
  { num: '04', title: 'Airport Specialists' },
  { num: '05', title: 'GST Invoice' },
  { num: '06', title: 'Transparent Pricing' },
  { num: '07', title: 'Local Pickup Expertise' },
  { num: '08', title: '24/7 Availability' },
  { num: '09', title: 'Since 2013' }
]

const FAQ_ITEMS = [
  { q: 'Are Urbania rentals available for airport transfers?', a: 'Yes, we provide airport pickup and drop services to/from Kempegowda International Airport (BLR) from all service areas across Bengaluru. Pre-booking is recommended.' },
  { q: 'What is the starting price for Force Urbania rentals?', a: 'Local rentals start from ₹6,500 for 8 hours / 80 km with our 9-16 seater fleet. Outstation fares vary by destination and vehicle type.' },
  { q: 'Do you provide drivers with the vehicles?', a: 'Yes, all our rentals come with experienced, background-verified drivers. Driver bata is included in our package pricing.' },
  { q: 'Can I book for outstation trips?', a: 'Absolutely. We offer one-way and round-trip outstation services to destinations like Mysore, Ooty, Coorg, Tirupati, Pondicherry, and Chennai.' },
  { q: 'Is GST invoice provided?', a: 'Yes, we provide a valid GST invoice for all bookings. This is especially useful for corporate clients.' },
  { q: 'What are the payment options?', a: 'We accept cash, UPI, bank transfers, and card payments. Advance booking requires a small deposit, and the balance can be paid after the trip.' },
  { q: 'How far in advance should I book?', a: 'We recommend booking at least 1-2 days in advance. For peak seasons, weekends and airport transfers, book 3-5 days ahead for guaranteed availability.' },
  { q: 'Do you offer wedding car rentals?', a: 'Yes, we provide premium Urbania and tempo travellers for wedding ceremonies, sangeet functions, and related events across Bengaluru.' }
]

function getOtherAreas(currentSlug: string) {
  return ALL_AREAS.filter(name => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+(?:-[a-z0-9]+)*/g, '-').replace(/^-|-$/g, '')
    return slug !== currentSlug
  }).slice(0, 17)
}

export const Route = createFileRoute('/areas/$slug')({
  component: AreaDetailComponent,
})

function AreaDetailComponent() {
  const { slug } = Route.useParams()
  const area = AREAS_DATA[slug] || AREAS_DATA['whitefield']
  const [activeTab, setActiveTab] = useState('local')
  const otherAreas = getOtherAreas(slug)
  const areaRoutes = OUTSTATION_ROUTES_BY_AREA[slug] || DEFAULT_ROUTES

  const handleBooking = (vehicleName: string) => {
    openEnquiryDialog({ lockedVehicle: vehicleName })
  }

  const handleOutstationBooking = (dest: string) => {
    openEnquiryDialog({ 
      source: `outstation_table`,
      destination: dest,
      defaultTripType: 'Outstation'
    })
  }

  return (
    <SiteLayout>
      <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Section */}
      <section className="relative mx-4 mt-4 sm:mx-6 sm:mt-6">
        <div className="relative h-56 sm:h-72 md:h-80 rounded-3xl overflow-hidden">
          <img src="/images/fleets/urbania-maharaja-12-seater.jpg" alt="Force Urbania" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/30" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6 sm:px-10">
              <div className="max-w-2xl text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-medium mb-4">
                  <MapPin className="w-4 h-4" />
                  Service Area · {area.city}
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 leading-tight">
                  Force Urbania in {area.name}, {area.city}.
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-xl">
                  {area.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-sm hidden md:block">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase">Fleet Range</p>
                  <p className="text-sm font-bold text-slate-900">9 - 16 Seater</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <Plane className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase">Airport Distance</p>
                  <p className="text-sm font-bold text-slate-900">{area.airport_distance}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase">Availability</p>
                  <p className="text-sm font-bold text-slate-900">24/7 Service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-16">

            {/* Key Places */}
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Key Places We Serve in {area.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {area.landmarks.map((landmark, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-medium text-slate-700">{landmark}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Fleet & Pricing */}
            <section>
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
                  <Car className="w-3.5 h-3.5" /> Our Fleet & Pricing
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Pick Your Vehicle. See Your Rate.</h2>
                <p className="text-slate-500 text-base max-w-2xl mx-auto">Transparent pricing for local and outstation trips from {area.name}. No hidden charges.</p>
              </div>

              <Tabs defaultValue="local" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-200/50 p-1 rounded-xl">
                  <TabsTrigger value="local" className="rounded-lg text-base data-[state=active]:bg-white data-[state=active]:shadow-sm">Local Rentals</TabsTrigger>
                  <TabsTrigger value="outstation" className="rounded-lg text-base data-[state=active]:bg-white data-[state=active]:shadow-sm">Outstation Routes</TabsTrigger>
                </TabsList>

                <TabsContent value="local">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {FLEET_DATA.map(vehicle => (
                      <div key={vehicle.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                        <div className="relative h-52 bg-slate-100 overflow-hidden">
                          <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <div className="absolute top-3 left-3">
                            <span className="inline-block px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-black uppercase tracking-wider text-slate-800 shadow">
                              {vehicle.category}
                            </span>
                          </div>
                          <div className="absolute bottom-3 left-3 right-3">
                            <h3 className="text-white font-bold text-base leading-tight drop-shadow-md">{vehicle.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wide">
                                <Car className="w-3 h-3 mr-1" />{vehicle.capacity} Seats
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 flex flex-col flex-1">
                          <p className="text-slate-500 text-xs mb-3 line-clamp-2 leading-relaxed">{vehicle.description}</p>

                          <div className="grid grid-cols-2 gap-2 mb-3">
                            {vehicle.pricing.local.map((pkg, idx) => (
                              <div key={idx} className="rounded-xl border border-slate-100 bg-slate-50/80 p-2.5 text-center">
                                <div className="text-[10px] text-slate-500 font-bold uppercase mb-0.5">{pkg.package}</div>
                                <div className="text-lg font-black text-slate-900 tracking-tight">₹{pkg.price.toLocaleString('en-IN')}</div>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-slate-500 mb-3 pb-3 border-b border-slate-100">
                            <span className="font-medium">KM: <span className="text-slate-800 font-bold">₹{vehicle.pricing.extra_km}</span></span>
                            <span className="font-medium">Hr: <span className="text-slate-800 font-bold">₹{vehicle.pricing.extra_hour}</span></span>
                            <span className="font-medium">Bata: <span className="text-slate-800 font-bold">₹{vehicle.pricing.driver_bata}</span></span>
                          </div>

                          <Button className="w-full rounded-xl bg-[#071525] hover:bg-[#155EEF] text-white font-bold text-sm h-10 transition-colors" onClick={() => handleBooking(vehicle.name)}>
                            Book {vehicle.name}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="outstation">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
                    <div className="p-6 md:p-8 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700">
                      <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                          <RouteIcon className="w-5 h-5 text-blue-400" />
                        </div>
                        Popular Outstation Routes from {area.name}
                      </h3>
                      <p className="text-sm text-slate-300 mt-2 ml-[52px]">One-way indicative fares. Round-trip and multi-day rates on request.</p>
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                            <th className="p-3.5 text-left font-extrabold text-slate-800 text-xs uppercase tracking-wider">Destination</th>
                            <th className="p-3.5 text-center font-extrabold text-slate-800 text-xs uppercase tracking-wider">Distance</th>
                            <th className="p-3.5 text-center font-extrabold text-slate-800 text-xs uppercase tracking-wider">Time</th>
                            {FLEET_DATA.map(v => (
                              <th key={v.id} className="p-3.5 text-right font-extrabold text-slate-800 text-[10px] uppercase tracking-wider leading-tight">
                                {v.name.replace('Urbania', '').trim()}
                              </th>
                            ))}
                            <th className="p-3.5 text-center font-extrabold text-slate-800 text-xs uppercase tracking-wider">Book Now</th>
                          </tr>
                        </thead>
                        <tbody>
                          {areaRoutes.map((route, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-blue-50/60' : 'bg-slate-50/50 hover:bg-blue-50/60'} style={{ transition: 'background-color 150ms' }}>
                              <td className="p-3.5 border-b border-slate-100 font-bold text-slate-900 text-sm">
                                <div className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                  {route.destination}
                                </div>
                              </td>
                              <td className="p-3.5 border-b border-slate-100 text-center">
                                <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold">{route.distance} km</span>
                              </td>
                              <td className="p-3.5 border-b border-slate-100 text-center">
                                <span className="inline-flex items-center gap-1 text-slate-500 text-xs font-medium">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                  {route.time}
                                </span>
                              </td>
                              {FLEET_DATA.map(v => (
                                <td key={v.id} className="p-3.5 border-b border-slate-100 text-right font-extrabold text-slate-900 whitespace-nowrap text-sm">
                                  ₹{(route.distance * v.pricing.outstation_per_km).toLocaleString('en-IN')}
                                </td>
                              ))}
                              <td className="p-3.5 border-b border-slate-100 text-center">
                                <Button size="sm" className="rounded-full bg-[#071525] hover:bg-[#155EEF] text-white text-[11px] font-bold h-8 px-4 shadow-sm hover:shadow-md transition-all" onClick={() => handleOutstationBooking(route.destination)}>
                                  Book Now
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden flex flex-col divide-y divide-slate-100">
                      {areaRoutes.map((route, idx) => (
                        <div key={idx} className="p-4 hover:bg-slate-50 transition-colors">
                          <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                              <h4 className="text-base font-bold text-slate-900">{route.destination}</h4>
                            </div>
                            <span className="text-[11px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg font-medium">{route.distance} km · {route.time}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            {FLEET_DATA.map(v => (
                              <div key={v.id} className="flex flex-col items-center justify-center text-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                                <span className="text-[10px] text-slate-500 font-semibold mb-0.5 leading-tight">{v.name.replace('Urbania', '').trim()}</span>
                                <span className="text-sm font-extrabold text-slate-900">₹{(route.distance * v.pricing.outstation_per_km).toLocaleString('en-IN')}</span>
                              </div>
                            ))}
                          </div>
                          <Button size="sm" className="w-full rounded-lg bg-[#071525] hover:bg-[#155EEF] text-white text-xs font-bold h-9 mt-1" onClick={() => handleOutstationBooking(route.destination)}>
                            Book Now — {route.destination}
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="p-5 bg-gradient-to-r from-slate-50 to-blue-50/50 border-t border-slate-200">
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                        * One-way indicative fares. Round-trip and multi-day rates (min 300 km/day) on request; toll, parking, state permit and GST extra as applicable.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </section>

            {/* Why Book With Us */}
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Why Book With Us</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {WHY_BOOK_ITEMS.map((item) => (
                  <div key={item.num} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <span className="text-lg font-bold text-blue-600 w-8">{item.num}</span>
                    <span className="font-medium text-slate-700 text-sm">{item.title}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Complete Guide */}
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Complete Guide to Force Urbania Rentals in {area.name}</h2>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6 text-slate-600 leading-relaxed">
                <p>
                  Planning a trip from {area.name}? Our premium Force Urbania fleet with 9 to 16 seats is perfect for family vacations, corporate outings, airport transfers, and wedding functions. With experienced drivers, transparent pricing, and 24/7 availability, we make every journey comfortable and stress-free.
                </p>
                <p>
                  Whether you need a quick airport transfer or a multi-day outstation trip to Mysore, Coorg, Ooty, or beyond — our {area.name} service ensures you travel in style. Book online or via WhatsApp for instant confirmation.
                </p>
              </div>
            </section>

            {/* FAQs */}
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="bg-white rounded-2xl border border-slate-200 shadow-sm">
                {FAQ_ITEMS.map((item, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`}>
                    <AccordionTrigger className="px-6 text-left font-semibold text-slate-900 hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 text-slate-600">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Also Serving */}
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Also Serving</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {otherAreas.map((areaName) => {
                  const areaSlug = areaName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '')
                  return (
                    <Link
                      key={areaSlug}
                      to="/areas/$slug"
                      params={{ slug: areaSlug }}
                      className="inline-flex items-center gap-1.5 py-2 px-3 bg-white rounded-lg border border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all duration-200 text-sm font-medium"
                    >
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                      {areaName}
                    </Link>
                  )
                })}
              </div>
              <div className="mt-4">
                <a
                  href="/areas/"
                  className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  View all 50+ areas <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </section>

        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 flex gap-3">
        <Button variant="outline" className="flex-1 h-12 rounded-xl border-slate-300">
          <Phone className="w-5 h-5 mr-2" />
          Call
        </Button>
        <Button className="flex-1 h-12 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white border-none">
          <MessageSquare className="w-5 h-5 mr-2" />
          WhatsApp
        </Button>
      </div>
    </div>
    </SiteLayout>
  )
}

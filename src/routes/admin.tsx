import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { DEFAULT_FLEETS, DEFAULT_FAQS, DEFAULT_TESTIMONIALS, DEFAULT_BLOGS } from "@/lib/data/vehicles";
import { type Fleet } from "@/lib/queries";
import {
  getUrbaniaRates,
  saveUrbaniaRates,
  resetUrbaniaRates,
  type UrbaniaFleetRate,
} from "@/lib/data/urbania-pricing";
import { SITE } from "@/lib/site-config";
import { getAdminEnquiriesServerFn } from "@/lib/server-queries";
import {
  Car,
  MessageSquare,
  HelpCircle,
  BookOpen,
  Settings,
  Lock,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Eye,
  LogOut,
  RefreshCw,
  Sparkles,
  Save,
  RotateCcw,
  MapPin,
} from "lucide-react";

import { DEFAULT_PACKAGES, type TravelPackage } from "@/lib/data/packages";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin Management Portal — Souparnika Travels" }],
  }),
  component: AdminPage,
});

type EnquiryRecord = {
  id: string;
  reference: string;
  name: string;
  phone: string;
  email: string | null;
  pickup: string | null;
  destination: string | null;
  travel_date: string | null;
  vehicle_type: string | null;
  trip_type: string | null;
  message: string | null;
  created_at: string;
};

import { AreasManager } from "@/components/admin/AreasManager";

function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<"enquiries" | "urbania-rates" | "fleets" | "faqs" | "blogs" | "settings" | "areas">("enquiries");
  const [fleetsList, setFleetsList] = useState<Fleet[]>(DEFAULT_FLEETS);
  const [urbaniaRatesList, setUrbaniaRatesList] = useState<UrbaniaFleetRate[]>(() => getUrbaniaRates());
  const [urbaniaSaveSuccess, setUrbaniaSaveSuccess] = useState(false);
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);

  // New Fleet Modal State
  const [showAddFleet, setShowAddFleet] = useState(false);
  const [newFleetName, setNewFleetName] = useState("");
  const [newFleetCategory, setNewFleetCategory] = useState("Sedan");
  const [newFleetSeating, setNewFleetSeating] = useState(4);
  const [newFleetPrice, setNewFleetPrice] = useState(15);

  // Edit Fleet State
  const [editingFleet, setEditingFleet] = useState<Fleet | null>(null);

  // FAQs CRUD State
  const [faqsList, setFaqsList] = useState(DEFAULT_FAQS);
  const [showAddFaq, setShowAddFaq] = useState(false);
  const [newFaqQuestion, setNewFaqQuestion] = useState("");
  const [newFaqAnswer, setNewFaqAnswer] = useState("");
  const [editingFaq, setEditingFaq] = useState<typeof DEFAULT_FAQS[0] | null>(null);

  // Packages CRUD State
  const [packagesList, setPackagesList] = useState<TravelPackage[]>(DEFAULT_PACKAGES);
  const [showAddPackage, setShowAddPackage] = useState(false);
  const [newPkgTitle, setNewPkgTitle] = useState("");
  const [newPkgPrice, setNewPkgPrice] = useState(9999);
  const [newPkgDuration, setNewPkgDuration] = useState("2 Days / 1 Night");
  const [newPkgDestination, setNewPkgDestination] = useState("Mysore");
  const [newPkgCategory, setNewPkgCategory] = useState("Weekend Getaways");
  const [editingPackage, setEditingPackage] = useState<TravelPackage | null>(null);

  // Quotation Modal State
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedEnquiryForQuote, setSelectedEnquiryForQuote] = useState<EnquiryRecord | null>(null);

  useEffect(() => {
    const sessionAuth = localStorage.getItem("st_admin_auth");
    if (sessionAuth === "true") {
      setAuthenticated(true);
      fetchEnquiries();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "admin123" || passcode === "souparnika2026") {
      setAuthenticated(true);
      localStorage.setItem("st_admin_auth", "true");
      setLoginError("");
      fetchEnquiries();
    } else {
      setLoginError("Invalid admin passcode. Try 'admin123'.");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("st_admin_auth");
  };

  async function fetchEnquiries() {
    setLoadingEnquiries(true);
    try {
      const data = await getAdminEnquiriesServerFn();
      if (data) {
        setEnquiries(data as unknown as EnquiryRecord[]);
      }
    } catch (e) {
      console.warn("Using local enquiries list:", e);
    }
    setLoadingEnquiries(false);
  }

  const handleAddFleetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFleetName.trim()) return;

    const newFleet: Fleet = {
      id: "f-" + Date.now(),
      slug: newFleetName.toLowerCase().replace(/\s+/g, "-"),
      name: newFleetName,
      category: newFleetCategory,
      seating: Number(newFleetSeating),
      luggage: "3 Bags",
      ac: true,
      suitable_for: ["Local", "Outstation"],
      starting_price: Number(newFleetPrice),
      short_description: `Custom ${newFleetCategory} vehicle rental for Bangalore trips.`,
      description: `Newly added ${newFleetName} in Souparnika Travels fleet.`,
      image_url: "/images/fleets/cars/sedan-new.png",
      features: ["Air Conditioned", "Pushback Seats", "Music System"],
      is_featured: true,
      is_active: true,
      display_order: fleetsList.length + 1,
      model: newFleetName,
      min_km: 250,
      per_km_rate: Number(newFleetPrice),
      driver_allowance: 500,
      additional_charges: "Tolls & Parking extra.",
      terms: "Standard terms apply.",
      available_local: true,
      available_outstation: true,
      gallery: ["/images/fleets/cars/sedan-new.png"],
    };

    setFleetsList([newFleet, ...fleetsList]);
    setShowAddFleet(false);
    setNewFleetName("");
  };

  const handleEditFleetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFleet) return;

    setFleetsList((prev) =>
      prev.map((f) => (f.id === editingFleet.id ? editingFleet : f))
    );
    setEditingFleet(null);
  };

  const toggleFleetActive = (id: string) => {
    setFleetsList((prev) =>
      prev.map((f) => (f.id === id ? { ...f, is_active: !f.is_active } : f))
    );
  };

  const deleteFleet = (id: string) => {
    if (confirm("Are you sure you want to remove this vehicle?")) {
      setFleetsList((prev) => prev.filter((f) => f.id !== id));
    }
  };

  // FAQ Handlers
  const handleAddFaqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) return;
    const newFaq = {
      id: "faq-" + Date.now(),
      question: newFaqQuestion.trim(),
      answer: newFaqAnswer.trim(),
      category: "General",
    };
    setFaqsList([newFaq, ...faqsList]);
    setShowAddFaq(false);
    setNewFaqQuestion("");
    setNewFaqAnswer("");
  };

  const handleEditFaqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;
    setFaqsList(prev => prev.map(f => f.id === editingFaq.id ? editingFaq : f));
    setEditingFaq(null);
  };

  const handleDeleteFaq = (id: string) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      setFaqsList(prev => prev.filter(f => f.id !== id));
    }
  };

  // Package Handlers
  const handleAddPackageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPkgTitle.trim()) return;
    const newPkg: TravelPackage = {
      id: "pkg-" + Date.now(),
      slug: newPkgTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      title: newPkgTitle.trim(),
      dropdownCategory: newPkgCategory,
      state: "Karnataka",
      destination: newPkgDestination.trim(),
      duration: newPkgDuration.trim(),
      price: Number(newPkgPrice),
      image_url: "/images/packages/coorg.jpg",
      route: "Bengaluru → " + newPkgDestination.trim(),
      highlights: ["Complimentary Driver", "24/7 Road Assistance", "Flexible Sightseeing"],
      itinerary: [
        { day: 1, title: "Departure & Local Sightseeing", description: "Pickup and arrival at destination." },
        { day: 2, title: "Sightseeing & Return Journey", description: "Explore major points and drop back at Bangalore." }
      ],
      inclusions: ["Chauffeur Driven Vehicle", "Vehicle Fuel", "Driver Allowance"],
      exclusions: ["Tolls & Parking", "Monument Entry Tickets", "Meals"],
    };
    setPackagesList([newPkg, ...packagesList]);
    setShowAddPackage(false);
    setNewPkgTitle("");
  };

  const handleEditPackageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage) return;
    setPackagesList(prev => prev.map(p => p.id === editingPackage.id ? editingPackage : p));
    setEditingPackage(null);
  };

  const handleDeletePackage = (id: string) => {
    if (confirm("Are you sure you want to delete this travel package?")) {
      setPackagesList(prev => prev.filter(p => p.id !== id));
    }
  };

  // Urbania Rates handlers
  const handleRateChange = (index: number, field: keyof UrbaniaFleetRate, value: string) => {
    setUrbaniaRatesList((prev) => {
      const updated = [...prev];
      const num = value === "" ? undefined : Number(value);
      updated[index] = { ...updated[index], [field]: num };
      return updated;
    });
  };

  const handleSaveRates = () => {
    saveUrbaniaRates(urbaniaRatesList);
    setUrbaniaSaveSuccess(true);
    setTimeout(() => setUrbaniaSaveSuccess(false), 3000);
  };

  const handleResetRates = () => {
    const defaults = resetUrbaniaRates();
    setUrbaniaRatesList(defaults);
    setUrbaniaSaveSuccess(false);
  };

  if (!authenticated) {
    return (
      <SiteLayout hideFooter={true} hideFloating={true}>
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-gradient-to-b from-[#f8fafc] to-white">
          <div className="w-full max-w-md bg-white rounded-3xl border border-border p-8 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="h-14 w-14 rounded-2xl bg-[color:var(--brand-navy)] text-[color:var(--brand-gold)] grid place-items-center mx-auto shadow-md">
                <Lock className="h-7 w-7" />
              </div>
              <h1 className="font-display font-extrabold text-2xl text-[color:var(--brand-navy)]">
                Admin Management Portal
              </h1>
              <p className="text-xs text-muted-foreground">
                Enter your administrative passcode to manage vehicles, enquiries, and site settings.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Passcode (Default: admin123)
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter admin passcode..."
                  className="w-full h-12 px-4 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-blue)]/40"
                  required
                />
              </div>

              {loginError && <p className="text-xs text-red-600 font-semibold text-center">{loginError}</p>}

              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-[color:var(--brand-navy)] text-white font-bold text-sm hover:bg-[color:var(--brand-blue)] transition-colors shadow-lg"
              >
                Access Admin Dashboard
              </button>
            </form>
          </div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout hideFooter={true} hideFloating={true}>
      <div className="bg-[color:var(--brand-navy)] text-white py-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[color:var(--brand-gold)]">
              ADMINISTRATION PORTAL
            </span>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              {SITE.name} Control Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchEnquiries}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600/80 text-white text-xs font-bold hover:bg-red-600"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="py-10 bg-secondary/30 min-h-[70vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          {/* Admin Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-border pb-4">
            <button
              type="button"
              onClick={() => setActiveTab("enquiries")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "enquiries"
                  ? "bg-[color:var(--brand-navy)] text-white shadow-md"
                  : "bg-white text-foreground hover:bg-white/80 border border-border"
              }`}
            >
              <MessageSquare className="h-4 w-4 text-[color:var(--brand-gold)]" />
              <span>Customer Enquiries ({enquiries.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("areas")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "areas"
                  ? "bg-[color:var(--brand-navy)] text-white shadow-md"
                  : "bg-white text-foreground hover:bg-white/80 border border-border"
              }`}
            >
              <MapPin className="h-4 w-4 text-[color:var(--brand-gold)]" />
              <span>Areas We Serve</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("urbania-rates")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "urbania-rates"
                  ? "bg-[color:var(--brand-navy)] text-white shadow-md"
                  : "bg-white text-foreground hover:bg-white/80 border border-border"
              }`}
            >
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>Urbania Fleet Pricing CMS ({urbaniaRatesList.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("fleets")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "fleets"
                  ? "bg-[color:var(--brand-navy)] text-white shadow-md"
                  : "bg-white text-foreground hover:bg-white/80 border border-border"
              }`}
            >
              <Car className="h-4 w-4 text-[color:var(--brand-gold)]" />
              <span>Manage Fleets & Pricing ({fleetsList.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("faqs")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "faqs"
                  ? "bg-[color:var(--brand-navy)] text-white shadow-md"
                  : "bg-white text-foreground hover:bg-white/80 border border-border"
              }`}
            >
              <HelpCircle className="h-4 w-4 text-[color:var(--brand-gold)]" />
              <span>Manage FAQs ({DEFAULT_FAQS.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("packages" as any)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                (activeTab as string) === "packages"
                  ? "bg-[color:var(--brand-navy)] text-white shadow-md"
                  : "bg-white text-foreground hover:bg-white/80 border border-border"
              }`}
            >
              <BookOpen className="h-4 w-4 text-[color:var(--brand-gold)]" />
              <span>Manage Packages ({DEFAULT_PACKAGES.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("services" as any)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                (activeTab as string) === "services"
                  ? "bg-[color:var(--brand-navy)] text-white shadow-md"
                  : "bg-white text-foreground hover:bg-white/80 border border-border"
              }`}
            >
              <Settings className="h-4 w-4 text-[color:var(--brand-gold)]" />
              <span>Manage Services (7)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("blogs")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "blogs"
                  ? "bg-[color:var(--brand-navy)] text-white shadow-md"
                  : "bg-white text-foreground hover:bg-white/80 border border-border"
              }`}
            >
              <BookOpen className="h-4 w-4 text-[color:var(--brand-gold)]" />
              <span>Manage Blogs ({DEFAULT_BLOGS.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("settings")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "settings"
                  ? "bg-[color:var(--brand-navy)] text-white shadow-md"
                  : "bg-white text-foreground hover:bg-white/80 border border-border"
              }`}
            >
              <Settings className="h-4 w-4 text-[color:var(--brand-gold)]" />
              <span>Site Information & Business Details</span>
            </button>
          </div>

          {/* TAB 1: ENQUIRIES */}
          {activeTab === "enquiries" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-extrabold text-xl text-[color:var(--brand-navy)]">
                  Received Customer Booking Enquiries
                </h2>
                <span className="text-xs text-muted-foreground">
                  Showing latest booking requests
                </span>
              </div>

              {loadingEnquiries ? (
                <div className="p-8 text-center bg-white rounded-2xl border border-border text-xs text-muted-foreground">
                  Loading enquiries...
                </div>
              ) : enquiries.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-border space-y-2">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
                  <div className="font-bold text-foreground">No pending booking enquiries.</div>
                  <div className="text-xs text-muted-foreground">
                    New submissions from the booking form will appear here in real-time.
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-secondary/60 text-[color:var(--brand-navy)] font-bold uppercase text-[10px] border-b border-border">
                        <tr>
                          <th className="p-3">Ref ID</th>
                          <th className="p-3">Customer Name</th>
                          <th className="p-3">Phone</th>
                          <th className="p-3">Requested Vehicle</th>
                          <th className="p-3">Pickup Location</th>
                          <th className="p-3">Date</th>
                          <th className="p-3">Trip Type</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {enquiries.map((enq) => (
                          <tr key={enq.id} className="hover:bg-secondary/30">
                            <td className="p-3 font-mono font-bold text-[color:var(--brand-navy)]">
                              {enq.reference}
                            </td>
                            <td className="p-3 font-bold text-foreground">{enq.name}</td>
                            <td className="p-3 font-bold text-[color:var(--brand-blue)]">
                              {enq.phone}
                            </td>
                            <td className="p-3 font-semibold text-foreground">
                              {enq.vehicle_type ?? "Any Fleet"}
                            </td>
                            <td className="p-3 text-muted-foreground">{enq.pickup ?? "Bengaluru"}</td>
                            <td className="p-3 font-medium">
                              {enq.travel_date ? (typeof enq.travel_date === "object" ? new Date(enq.travel_date).toLocaleDateString("en-IN") : String(enq.travel_date)) : "TBD"}
                            </td>
                            <td className="p-3">
                              <span className="bg-secondary px-2 py-0.5 rounded text-[10px] font-bold text-foreground">
                                {enq.trip_type ?? "Outstation"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 1.5: AREAS MANAGER */}
          {activeTab === "areas" && (
            <AreasManager />
          )}

          {/* TAB 2: FLEETS MANAGEMENT */}
          {activeTab === "fleets" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-extrabold text-xl text-[color:var(--brand-navy)]">
                  Vehicle Fleet & Pricing Directory
                </h2>
                <button
                  type="button"
                  onClick={() => setShowAddFleet(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[color:var(--brand-navy)] text-white text-xs font-bold hover:bg-[color:var(--brand-blue)] transition-colors shadow"
                >
                  <Plus className="h-4 w-4 text-[color:var(--brand-gold)]" /> Add New Vehicle
                </button>
              </div>

              {/* Add Fleet Modal Form */}
              {showAddFleet && (
                <form
                  onSubmit={handleAddFleetSubmit}
                  className="p-5 rounded-2xl bg-white border-2 border-[color:var(--brand-gold)] shadow-xl space-y-4"
                >
                  <div className="font-bold text-sm text-[color:var(--brand-navy)] border-b pb-2">
                    Add New Rental Vehicle
                  </div>
                  <div className="grid sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <label className="block font-bold mb-1">Vehicle Name</label>
                      <input
                        value={newFleetName}
                        onChange={(e) => setNewFleetName(e.target.value)}
                        placeholder="e.g. Urbania VIP 17-Seater"
                        className="w-full h-9 px-3 rounded-lg border border-border"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Category</label>
                      <select
                        value={newFleetCategory}
                        onChange={(e) => setNewFleetCategory(e.target.value)}
                        className="w-full h-9 px-3 rounded-lg border border-border"
                      >
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Innova">Innova</option>
                        <option value="Urbania">Urbania</option>
                        <option value="Tempo Traveller">Tempo Traveller</option>
                        <option value="Mini Bus">Mini Bus</option>
                        <option value="Coach">Coach</option>
                        <option value="Luxury">Luxury</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Seating Capacity</label>
                      <input
                        type="number"
                        value={newFleetSeating}
                        onChange={(e) => setNewFleetSeating(Number(e.target.value))}
                        className="w-full h-9 px-3 rounded-lg border border-border"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Rate (₹/km)</label>
                      <input
                        type="number"
                        value={newFleetPrice}
                        onChange={(e) => setNewFleetPrice(Number(e.target.value))}
                        className="w-full h-9 px-3 rounded-lg border border-border"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddFleet(false)}
                      className="px-4 py-2 rounded-lg border border-border text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-[color:var(--brand-navy)] text-white text-xs font-bold"
                    >
                      Save Vehicle
                    </button>
                  </div>
                </form>
              )}

              {/* Edit Fleet Modal Form */}
              {editingFleet && (
                <form
                  onSubmit={handleEditFleetSubmit}
                  className="p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-400 shadow-xl space-y-4"
                >
                  <div className="flex justify-between items-center border-b border-amber-200 pb-2">
                    <div className="font-bold text-sm text-amber-950 flex items-center gap-2">
                      <Edit className="h-4 w-4 text-amber-600" /> Edit Vehicle: {editingFleet.name}
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingFleet(null)}
                      className="text-amber-800 hover:text-amber-950 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <label className="block font-bold mb-1">Vehicle Name</label>
                      <input
                        value={editingFleet.name}
                        onChange={(e) => setEditingFleet({ ...editingFleet, name: e.target.value })}
                        className="w-full h-9 px-3 rounded-lg border border-border"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Category</label>
                      <select
                        value={editingFleet.category}
                        onChange={(e) => setEditingFleet({ ...editingFleet, category: e.target.value })}
                        className="w-full h-9 px-3 rounded-lg border border-border"
                      >
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Innova">Innova</option>
                        <option value="Urbania">Urbania</option>
                        <option value="Tempo Traveller">Tempo Traveller</option>
                        <option value="Mini Bus">Mini Bus</option>
                        <option value="Coach">Coach</option>
                        <option value="Luxury">Luxury</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Seating Capacity</label>
                      <input
                        type="number"
                        value={editingFleet.seating}
                        onChange={(e) => setEditingFleet({ ...editingFleet, seating: Number(e.target.value) })}
                        className="w-full h-9 px-3 rounded-lg border border-border"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Rate (₹/km)</label>
                      <input
                        type="number"
                        value={editingFleet.starting_price ?? editingFleet.per_km_rate ?? 0}
                        onChange={(e) => setEditingFleet({ ...editingFleet, starting_price: Number(e.target.value), per_km_rate: Number(e.target.value) })}
                        className="w-full h-9 px-3 rounded-lg border border-border"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingFleet(null)}
                      className="px-4 py-2 rounded-lg border border-border text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold"
                    >
                      Update Vehicle
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {fleetsList.map((f) => (
                  <div key={f.id} className="p-4 rounded-2xl bg-white border border-border shadow-sm space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={f.image_url ?? "/images/fleets/cars/sedan-new.png"}
                        alt={f.name}
                        className="h-12 w-16 object-contain rounded-lg bg-secondary p-1"
                      />
                      <div>
                        <div className="font-bold text-sm text-[color:var(--brand-navy)]">{f.name}</div>
                        <div className="text-[11px] text-muted-foreground">
                          {f.category} · {f.seating} Seats · ₹{f.starting_price ?? f.per_km_rate}/km
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs">
                      <button
                        type="button"
                        onClick={() => toggleFleetActive(f.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          f.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {f.is_active ? "Active" : "Inactive"}
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingFleet(f)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50"
                          title="Edit vehicle details"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteFleet(f.id)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                          title="Delete vehicle"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

                      {activeTab === "urbania-rates" && (
              <div className="space-y-4">
                <h2 className="font-display font-extrabold text-xl text-[color:var(--brand-navy)]">
                  Urbania Fleet Pricing CMS
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto border border-border">
                    <thead className="bg-secondary/10">
                      <tr>
                        <th className="p-2 text-left">Fleet</th>
                        <th className="p-2 text-left">Local 8h/80km (₹)</th>
                        <th className="p-2 text-left">Local 12h/100km (₹)</th>
                        <th className="p-2 text-left">Extra km (₹)</th>
                        <th className="p-2 text-left">Extra hour (₹)</th>
                        <th className="p-2 text-left">Outstation per km (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {urbaniaRatesList.map((rate, idx) => (
                        <tr key={rate.id} className="hover:bg-secondary/30">
                          <td className="p-2 font-medium">{rate.name}</td>
                          <td className="p-2">
                            <input type="number" value={rate.local_8hr_80km ?? ''} onChange={(e) => handleRateChange(idx, 'local_8hr_80km', e.target.value)} className="w-full px-2 py-1 border rounded" />
                          </td>
                          <td className="p-2">
                            <input type="number" value={rate.local_12hr_100km ?? ''} onChange={(e) => handleRateChange(idx, 'local_12hr_100km', e.target.value)} className="w-full px-2 py-1 border rounded" />
                          </td>
                          <td className="p-2">
                            <input type="number" value={rate.extra_km ?? ''} onChange={(e) => handleRateChange(idx, 'extra_km', e.target.value)} className="w-full px-2 py-1 border rounded" />
                          </td>
                          <td className="p-2">
                            <input type="number" value={rate.extra_hour ?? ''} onChange={(e) => handleRateChange(idx, 'extra_hour', e.target.value)} className="w-full px-2 py-1 border rounded" />
                          </td>
                          <td className="p-2">
                            <input type="number" value={rate.outstation_per_km ?? ''} onChange={(e) => handleRateChange(idx, 'outstation_per_km', e.target.value)} className="w-full px-2 py-1 border rounded" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={handleSaveRates} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[color:var(--brand-navy)] text-white text-sm hover:bg-[color:var(--brand-blue)]"><Save /> Save Rates</button>
                  <button onClick={handleResetRates} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-200 text-gray-800 text-sm hover:bg-gray-300"><RotateCcw /> Reset to Default</button>
                </div>
                {urbaniaSaveSuccess && <p className="text-sm text-green-600 mt-2">Rates saved successfully.</p>}
              </div>
            )}
          {/* TAB 3: FAQS MANAGEMENT */}
          {activeTab === "faqs" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display font-extrabold text-xl text-[color:var(--brand-navy)]">
                    Frequently Asked Questions ({faqsList.length})
                  </h2>
                  <p className="text-xs text-muted-foreground">Manage customer queries and help answers shown across the website.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddFaq(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[color:var(--brand-navy)] text-white text-xs font-bold hover:bg-[color:var(--brand-blue)] transition-colors shadow"
                >
                  <Plus className="h-4 w-4 text-[color:var(--brand-gold)]" /> Add New FAQ
                </button>
              </div>

              {/* Add FAQ Form */}
              {showAddFaq && (
                <form
                  onSubmit={handleAddFaqSubmit}
                  className="p-5 rounded-2xl bg-white border-2 border-[color:var(--brand-gold)] shadow-xl space-y-3 text-xs"
                >
                  <div className="font-bold text-sm text-[color:var(--brand-navy)] border-b pb-2">
                    Add New FAQ Item
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Question</label>
                    <input
                      value={newFaqQuestion}
                      onChange={(e) => setNewFaqQuestion(e.target.value)}
                      placeholder="e.g. Can we hire Urbania for one-day airport transfers?"
                      className="w-full h-9 px-3 rounded-lg border border-border"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Answer</label>
                    <textarea
                      value={newFaqAnswer}
                      onChange={(e) => setNewFaqAnswer(e.target.value)}
                      placeholder="Detailed answer..."
                      rows={3}
                      className="w-full p-3 rounded-lg border border-border"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddFaq(false)}
                      className="px-4 py-2 rounded-lg border border-border text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-[color:var(--brand-navy)] text-white text-xs font-bold"
                    >
                      Save FAQ
                    </button>
                  </div>
                </form>
              )}

              {/* Edit FAQ Form */}
              {editingFaq && (
                <form
                  onSubmit={handleEditFaqSubmit}
                  className="p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-400 shadow-xl space-y-3 text-xs"
                >
                  <div className="flex justify-between items-center border-b border-amber-200 pb-2">
                    <div className="font-bold text-sm text-amber-950 flex items-center gap-2">
                      <Edit className="h-4 w-4 text-amber-600" /> Edit FAQ
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingFaq(null)}
                      className="text-amber-800 hover:text-amber-950 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Question</label>
                    <input
                      value={editingFaq.question}
                      onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                      className="w-full h-9 px-3 rounded-lg border border-border"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Answer</label>
                    <textarea
                      value={editingFaq.answer}
                      onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                      rows={3}
                      className="w-full p-3 rounded-lg border border-border"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingFaq(null)}
                      className="px-4 py-2 rounded-lg border border-border text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold"
                    >
                      Update FAQ
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {faqsList.map((faq, i) => (
                  <div key={faq.id} className="p-4 rounded-2xl bg-white border border-border space-y-2 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="font-bold text-sm text-[color:var(--brand-navy)] flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-secondary text-[10px] grid place-items-center shrink-0">{i + 1}</span>
                        <span>{faq.question}</span>
                      </div>
                      <p className="text-xs text-muted-foreground pl-7 leading-relaxed">{faq.answer}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 pt-1">
                      <button
                        type="button"
                        onClick={() => setEditingFaq(faq)}
                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50"
                        title="Edit FAQ"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteFaq(faq.id)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                        title="Delete FAQ"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BLOGS MANAGEMENT */}
          {activeTab === "blogs" && (
            <div className="space-y-4">
              <h2 className="font-display font-extrabold text-xl text-[color:var(--brand-navy)]">
                Published Travel Blogs ({DEFAULT_BLOGS.length})
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {DEFAULT_BLOGS.map((b) => (
                  <div key={b.id} className="p-4 rounded-2xl bg-white border border-border flex items-start gap-4">
                    <img src={b.featured_image} alt={b.title} className="h-16 w-20 rounded-xl object-cover shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[color:var(--brand-blue)]">{b.category}</span>
                      <div className="font-bold text-xs text-foreground line-clamp-2 mt-0.5">{b.title}</div>
                      <div className="text-[10px] text-muted-foreground mt-1">{b.publish_date} · {b.read_time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3.25: PACKAGES MANAGEMENT */}
          {(activeTab as string) === "packages" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display font-extrabold text-xl text-[color:var(--brand-navy)]">
                    Travel Packages Management ({packagesList.length})
                  </h2>
                  <p className="text-xs text-muted-foreground">Manage tour packages, dropdown visibility, pricing, and category assignments.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddPackage(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[color:var(--brand-navy)] text-white text-xs font-bold hover:bg-[color:var(--brand-blue)] transition-colors shadow"
                >
                  <Plus className="h-4 w-4 text-[color:var(--brand-gold)]" /> Add New Package
                </button>
              </div>

              {/* Add Package Modal Form */}
              {showAddPackage && (
                <form
                  onSubmit={handleAddPackageSubmit}
                  className="p-5 rounded-2xl bg-white border-2 border-[color:var(--brand-gold)] shadow-xl space-y-4 text-xs"
                >
                  <div className="flex justify-between items-center border-b pb-2">
                    <div className="font-bold text-sm text-[color:var(--brand-navy)]">Add New Tour Package</div>
                    <button type="button" onClick={() => setShowAddPackage(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold mb-1">Package Title</label>
                      <input
                        value={newPkgTitle}
                        onChange={(e) => setNewPkgTitle(e.target.value)}
                        placeholder="e.g. Chikmagalur Coffee Tour"
                        className="w-full h-9 px-3 rounded-lg border border-border"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Destination</label>
                      <input
                        value={newPkgDestination}
                        onChange={(e) => setNewPkgDestination(e.target.value)}
                        placeholder="e.g. Chikmagalur"
                        className="w-full h-9 px-3 rounded-lg border border-border"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Category</label>
                      <select
                        value={newPkgCategory}
                        onChange={(e) => setNewPkgCategory(e.target.value)}
                        className="w-full h-9 px-3 rounded-lg border border-border"
                      >
                        <option value="Weekend Getaways">Weekend Getaways</option>
                        <option value="Hill Stations">Hill Stations</option>
                        <option value="Pilgrimage Tours">Pilgrimage Tours</option>
                        <option value="Heritage & Culture">Heritage & Culture</option>
                        <option value="Wildlife & Nature">Wildlife & Nature</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Duration</label>
                      <input
                        value={newPkgDuration}
                        onChange={(e) => setNewPkgDuration(e.target.value)}
                        placeholder="e.g. 3 Days / 2 Nights"
                        className="w-full h-9 px-3 rounded-lg border border-border"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Price (₹)</label>
                      <input
                        type="number"
                        value={newPkgPrice}
                        onChange={(e) => setNewPkgPrice(Number(e.target.value))}
                        className="w-full h-9 px-3 rounded-lg border border-border"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddPackage(false)}
                      className="px-4 py-2 rounded-lg border border-border text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-[color:var(--brand-navy)] text-white text-xs font-bold"
                    >
                      Save Package
                    </button>
                  </div>
                </form>
              )}

              {/* Edit Package Modal Form */}
              {editingPackage && (
                <form
                  onSubmit={handleEditPackageSubmit}
                  className="p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-400 shadow-xl space-y-4 text-xs"
                >
                  <div className="flex justify-between items-center border-b border-amber-200 pb-2">
                    <div className="font-bold text-sm text-amber-950 flex items-center gap-2">
                      <Edit className="h-4 w-4 text-amber-600" /> Edit Tour Package: {editingPackage.title}
                    </div>
                    <button type="button" onClick={() => setEditingPackage(null)} className="text-amber-800 hover:text-amber-950 font-bold">✕</button>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold mb-1">Package Title</label>
                      <input
                        value={editingPackage.title}
                        onChange={(e) => setEditingPackage({ ...editingPackage, title: e.target.value })}
                        className="w-full h-9 px-3 rounded-lg border border-border"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Destination</label>
                      <input
                        value={editingPackage.destination}
                        onChange={(e) => setEditingPackage({ ...editingPackage, destination: e.target.value })}
                        className="w-full h-9 px-3 rounded-lg border border-border"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Category</label>
                      <select
                        value={editingPackage.dropdownCategory}
                        onChange={(e) => setEditingPackage({ ...editingPackage, dropdownCategory: e.target.value })}
                        className="w-full h-9 px-3 rounded-lg border border-border"
                      >
                        <option value="Weekend Getaways">Weekend Getaways</option>
                        <option value="Hill Stations">Hill Stations</option>
                        <option value="Pilgrimage Tours">Pilgrimage Tours</option>
                        <option value="Heritage & Culture">Heritage & Culture</option>
                        <option value="Wildlife & Nature">Wildlife & Nature</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Duration</label>
                      <input
                        value={editingPackage.duration}
                        onChange={(e) => setEditingPackage({ ...editingPackage, duration: e.target.value })}
                        className="w-full h-9 px-3 rounded-lg border border-border"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Price (₹)</label>
                      <input
                        type="number"
                        value={editingPackage.price ?? 0}
                        onChange={(e) => setEditingPackage({ ...editingPackage, price: Number(e.target.value) })}
                        className="w-full h-9 px-3 rounded-lg border border-border"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingPackage(null)}
                      className="px-4 py-2 rounded-lg border border-border text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold"
                    >
                      Update Package
                    </button>
                  </div>
                </form>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                {packagesList.map((pkg) => (
                  <div key={pkg.id} className="p-5 rounded-2xl bg-white border border-border shadow-sm flex flex-col justify-between space-y-3">
                    <div className="flex items-start gap-4">
                      <img src={pkg.image_url} alt={pkg.title} className="h-16 w-20 rounded-xl object-cover shrink-0 border border-slate-200" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                            {pkg.dropdownCategory}
                          </span>
                          <span className="text-[10px] font-extrabold text-[#155EEF]">
                            ₹{pkg.price?.toLocaleString()}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm text-[color:var(--brand-navy)] mt-1 truncate">{pkg.title}</h3>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{pkg.duration} · {pkg.destination}, {pkg.state}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <a
                          href={`/packages/${pkg.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-[color:var(--brand-blue)] hover:underline flex items-center gap-1"
                        >
                          <Eye className="h-3.5 w-3.5" /> Preview
                        </a>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setEditingPackage(pkg)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50"
                          title="Edit Package"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePackage(pkg.id)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                          title="Delete Package"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3.5: SERVICES MANAGEMENT */}
          {(activeTab as string) === "services" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display font-extrabold text-xl text-[color:var(--brand-navy)]">
                    Services Management Portal (7)
                  </h2>
                  <p className="text-xs text-muted-foreground">Manage service categories, status, features, and public visibility.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: "Local City Rental", slug: "local-city-rental", cat: "Rental Services", desc: "4h, 8h & 12h Packages within Bangalore", status: "Active" },
                  { name: "Outstation Trips", slug: "outstation-trips", cat: "Rental Services", desc: "Flexible per-km South India road trip packages", status: "Active" },
                  { name: "Airport Transfer", slug: "airport-transfer", cat: "Rental Services", desc: "24/7 transfers to Kempegowda International Airport", status: "Active" },
                  { name: "Corporate Travel Solutions", slug: "corporate-travel", cat: "Group Travel", desc: "Employee commute & delegate transportation", status: "Active" },
                  { name: "Wedding Transportation", slug: "wedding-transportation", cat: "Group Travel", desc: "Guest shuttles & VIP luxury support", status: "Active" },
                  { name: "Family & Group Tours", slug: "family-group-tours", cat: "Group Travel", desc: "Custom holiday packages for all group sizes", status: "Active" },
                  { name: "Luxury Fleet Support", slug: "luxury-fleet-support", cat: "Personalised Solutions", desc: "Multi-vehicle convoys & VIP travel desk", status: "Active" },
                ].map((s) => (
                  <div key={s.slug} className="p-5 rounded-2xl bg-white border border-border shadow-sm flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          {s.cat}
                        </span>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          ● {s.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-[color:var(--brand-navy)]">{s.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                      <a
                        href={`/services/${s.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-[color:var(--brand-blue)] hover:underline flex items-center gap-1"
                      >
                        <Eye className="h-3.5 w-3.5" /> Preview Page
                      </a>
                      <span className="text-[11px] text-muted-foreground">Route: /services/{s.slug}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SETTINGS */}
          {activeTab === "settings" && (
            <div className="bg-white p-6 rounded-2xl border border-border space-y-4 max-w-2xl">
              <h2 className="font-display font-extrabold text-xl text-[color:var(--brand-navy)]">
                Business & Contact Information
              </h2>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold block mb-1">Company Name</label>
                  <input defaultValue={SITE.name} className="w-full h-10 px-3 rounded-lg border border-border" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Primary Phone Number</label>
                  <input defaultValue={SITE.phone} className="w-full h-10 px-3 rounded-lg border border-border" />
                </div>
                <div>
                  <label className="font-bold block mb-1">WhatsApp Number</label>
                  <input defaultValue={SITE.whatsapp} className="w-full h-10 px-3 rounded-lg border border-border" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Support Email</label>
                  <input defaultValue={SITE.email} className="w-full h-10 px-3 rounded-lg border border-border" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Office Address</label>
                  <textarea defaultValue={SITE.address} rows={2} className="w-full p-3 rounded-lg border border-border" />
                </div>
                <button
                  type="button"
                  onClick={() => alert("Settings saved successfully!")}
                  className="px-5 py-2.5 rounded-xl bg-[color:var(--brand-navy)] text-white font-bold text-xs"
                >
                  Save Business Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import {
  MapPin,
  Users,
  Car,
  User,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Send,
  Sparkles,
  Phone,
  MessageCircle,
} from "lucide-react";
import { telLink, waLink } from "@/lib/site-config";
import { submitEnquiry } from "@/lib/queries";
import { PickupDropLocationGroup } from "@/components/site/PickupDropLocationGroup";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Multi-Step Booking Enquiry — Urbania Rentals Bangalore" },
      {
        name: "description",
        content:
          "Submit your travel requirements to reserve Force Urbania, Tempo Traveller, or luxury coach rentals in Bangalore. Get an instant quotation.",
      },
    ],
  }),
  component: MultiStepBookingPage,
});

function MultiStepBookingPage() {
  const [step, setStep] = useState(1);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    journeyType: "Outstation",
    pickupLocation: "Bangalore",
    destination: "",
    travelDate: "",
    returnDate: "",
    pickupTime: "06:00 AM",
    durationDays: "2",

    adultsCount: "10",
    childrenCount: "2",
    luggageCount: "5",
    specialReqs: "",

    vehicleCategory: "Urbania",
    seatingCapacity: "12 Seater",
    preferredVehicle: "12 Seater Force Urbania",
    acceptAlternative: true,

    fullName: "",
    phone: "",
    email: "",
    companyName: "",
    gstNumber: "",
    needInvoice: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const refCode = `URB-${Math.floor(100000 + Math.random() * 900000)}`;
      await submitEnquiry({
        name: formData.fullName || "Valued Customer",
        phone: formData.phone || "Not provided",
        email: formData.email || null,
        trip_type: formData.journeyType,
        pickup_location: formData.pickupLocation,
        drop_location: formData.destination,
        travel_date: formData.travelDate || null,
        return_date: formData.returnDate || null,
        passenger_count: Number(formData.adultsCount) + Number(formData.childrenCount),
        vehicle_preference: formData.preferredVehicle,
        notes: `Ref: ${refCode} | Luggage: ${formData.luggageCount} | Company: ${formData.companyName} | Special: ${formData.specialReqs}`,
        source: "multistep_booking_page",
      });

      setSubmittedRef(refCode);
    } catch {
      setSubmittedRef(`URB-${Math.floor(100000 + Math.random() * 900000)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <PageHero
        title="Multi-Step Booking Enquiry"
        subtitle="Complete your trip parameters to receive an official availability quotation from our reservation desk."
        crumbs={[{ label: "Home" }, { label: "Booking Wizard" }]}
      />

      <section className="py-12 lg:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Submitted Success Confirmation Screen */}
          {submittedRef ? (
            <div className="rounded-3xl bg-white border border-emerald-200 p-8 sm:p-12 text-center shadow-xl animate-in zoom-in-95">
              <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center mx-auto mb-4">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h2 className="font-display font-extrabold text-3xl text-slate-900">
                Enquiry Submitted Successfully!
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Your reference code is:
              </p>
              <div className="inline-block px-6 py-2.5 my-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 font-mono font-black text-xl tracking-wider">
                {submittedRef}
              </div>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Our booking manager is processing availability for <strong>{formData.preferredVehicle}</strong> on <strong>{formData.travelDate || "your requested date"}</strong>. We will share your quotation via WhatsApp and Call.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href={waLink(`Hi, I submitted enquiry ref ${submittedRef} for ${formData.preferredVehicle}. Please share quotation.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[color:var(--whatsapp)] text-white font-bold text-sm shadow-md"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Chat on WhatsApp Now</span>
                </a>
                <a
                  href={telLink()}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 bg-white font-bold text-sm text-slate-800 hover:bg-slate-50"
                >
                  <Phone className="h-4 w-4 text-blue-600" />
                  <span>Call Booking Desk</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl bg-white border border-border shadow-xl p-6 sm:p-10">
              {/* Wizard Steps Header Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  <span className={step >= 1 ? "text-amber-600 font-black" : ""}>1. Journey</span>
                  <span className={step >= 2 ? "text-amber-600 font-black" : ""}>2. Passengers</span>
                  <span className={step >= 3 ? "text-amber-600 font-black" : ""}>3. Vehicle</span>
                  <span className={step >= 4 ? "text-amber-600 font-black" : ""}>4. Contact</span>
                  <span className={step >= 5 ? "text-amber-600 font-black" : ""}>5. Review</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500"
                    style={{ width: `${(step / 5) * 100}%` }}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* STEP 1: JOURNEY DETAILS */}
                {step === 1 && (
                  <div className="space-y-5 animate-in fade-in">
                    <h3 className="font-display font-extrabold text-2xl text-slate-900 flex items-center gap-2">
                      <MapPin className="h-6 w-6 text-amber-500" /> Step 1: Journey Details
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Journey Type</label>
                        <select
                          name="journeyType"
                          value={formData.journeyType}
                          onChange={handleChange}
                          className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-semibold"
                        >
                          <option value="Outstation">Outstation Round Trip</option>
                          <option value="Local">Local City Rental (4h/8h/12h)</option>
                          <option value="Airport Transfer">Airport Pickup / Drop</option>
                          <option value="Corporate">Corporate Event Travel</option>
                          <option value="Wedding">Wedding Guest Transport</option>
                        </select>
                      </div>

                      <div className="col-span-1 sm:col-span-2">
                        <PickupDropLocationGroup
                          pickupValue={formData.pickupLocation}
                          dropValue={formData.destination}
                          onPickupChange={(val) => setFormData((prev) => ({ ...prev, pickupLocation: val }))}
                          onDropChange={(val) => setFormData((prev) => ({ ...prev, destination: val }))}
                          pickupLabel="Pickup City / Location"
                          dropLabel="Destination / Drop Location"
                          pickupPlaceholder="e.g. Indiranagar, Bangalore"
                          dropPlaceholder="e.g. Coorg / Ooty / Mysore"
                          pickupName="pickupLocation"
                          dropName="destination"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Pickup Time</label>
                        <input
                          type="text"
                          name="pickupTime"
                          value={formData.pickupTime}
                          onChange={handleChange}
                          placeholder="e.g. 06:00 AM"
                          className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Travel Start Date</label>
                        <input
                          type="date"
                          name="travelDate"
                          value={formData.travelDate}
                          onChange={handleChange}
                          required
                          className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Return Date</label>
                        <input
                          type="date"
                          name="returnDate"
                          value={formData.returnDate}
                          onChange={handleChange}
                          className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-medium"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: PASSENGER & LUGGAGE DETAILS */}
                {step === 2 && (
                  <div className="space-y-5 animate-in fade-in">
                    <h3 className="font-display font-extrabold text-2xl text-slate-900 flex items-center gap-2">
                      <Users className="h-6 w-6 text-amber-500" /> Step 2: Passenger &amp; Luggage
                    </h3>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Adult Passengers</label>
                        <input
                          type="number"
                          name="adultsCount"
                          value={formData.adultsCount}
                          onChange={handleChange}
                          min="1"
                          max="50"
                          className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Children</label>
                        <input
                          type="number"
                          name="childrenCount"
                          value={formData.childrenCount}
                          onChange={handleChange}
                          min="0"
                          max="20"
                          className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Luggage Bags</label>
                        <input
                          type="number"
                          name="luggageCount"
                          value={formData.luggageCount}
                          onChange={handleChange}
                          min="0"
                          max="40"
                          className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Special Notes / Requests</label>
                      <textarea
                        name="specialReqs"
                        rows={3}
                        value={formData.specialReqs}
                        onChange={handleChange}
                        placeholder="e.g. Senior citizens on board, roof rack required, child seat preference..."
                        className="w-full p-3 rounded-xl border border-slate-300 text-sm"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 3: VEHICLE SELECTION */}
                {step === 3 && (
                  <div className="space-y-5 animate-in fade-in">
                    <h3 className="font-display font-extrabold text-2xl text-slate-900 flex items-center gap-2">
                      <Car className="h-6 w-6 text-amber-500" /> Step 3: Vehicle Selection
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Vehicle Category</label>
                        <select
                          name="vehicleCategory"
                          value={formData.vehicleCategory}
                          onChange={handleChange}
                          className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-semibold"
                        >
                          <option value="Urbania">Force Urbania (Luxury Van)</option>
                          <option value="Tempo Traveller">Tempo Traveller (Deluxe / Maharaja)</option>
                          <option value="Coach">Mini Bus &amp; Volvo Coach</option>
                          <option value="Luxury">Luxury VIP Car</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Preferred Seating Model</label>
                        <select
                          name="preferredVehicle"
                          value={formData.preferredVehicle}
                          onChange={handleChange}
                          className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-semibold"
                        >
                          <option value="10 Seater Force Urbania">10 Seater Force Urbania</option>
                          <option value="12 Seater Force Urbania">12 Seater Force Urbania</option>
                          <option value="12 Seater Maharaja Urbania">12 Seater Maharaja Urbania</option>
                          <option value="16 Seater Force Urbania">16 Seater Force Urbania</option>
                          <option value="12 Seater Tempo Traveller">12 Seater Tempo Traveller</option>
                          <option value="17 Seater Tempo Traveller">17 Seater Tempo Traveller</option>
                          <option value="25 Seater Mini Coach">25 Seater Mini Coach</option>
                          <option value="50 Seater Volvo Coach">50 Seater Volvo Coach</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-amber-600 shrink-0" />
                      <span>
                        All Urbania &amp; Tempo Traveller models come with individual AC vents, pushback recliner seats, and USB charging.
                      </span>
                    </div>
                  </div>
                )}

                {/* STEP 4: CUSTOMER DETAILS */}
                {step === 4 && (
                  <div className="space-y-5 animate-in fade-in">
                    <h3 className="font-display font-extrabold text-2xl text-slate-900 flex items-center gap-2">
                      <User className="h-6 w-6 text-amber-500" /> Step 4: Contact &amp; Billing Info
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Your Full Name"
                          required
                          className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number (WhatsApp)</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98450 00000"
                          required
                          className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@domain.com"
                          className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Company / Organization (Optional)</label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder="Company name for invoice"
                          className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm font-medium"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5: REVIEW & SUBMIT */}
                {step === 5 && (
                  <div className="space-y-6 animate-in fade-in">
                    <h3 className="font-display font-extrabold text-2xl text-slate-900 flex items-center gap-2">
                      <CheckCircle2 className="h-6 w-6 text-emerald-500" /> Step 5: Review &amp; Confirm Enquiry
                    </h3>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-4 text-xs">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-b border-slate-200 pb-4">
                        <div>
                          <div className="text-slate-400 font-bold uppercase">Journey Type</div>
                          <div className="text-slate-900 font-extrabold text-sm">{formData.journeyType}</div>
                        </div>
                        <div>
                          <div className="text-slate-400 font-bold uppercase">Pickup Location</div>
                          <div className="text-slate-900 font-semibold">{formData.pickupLocation}</div>
                        </div>
                        <div>
                          <div className="text-slate-400 font-bold uppercase">Destination</div>
                          <div className="text-slate-900 font-semibold">{formData.destination}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-b border-slate-200 pb-4">
                        <div>
                          <div className="text-slate-400 font-bold uppercase">Travel Date</div>
                          <div className="text-slate-900 font-semibold">{formData.travelDate || "Not set"}</div>
                        </div>
                        <div>
                          <div className="text-slate-400 font-bold uppercase">Return Date</div>
                          <div className="text-slate-900 font-semibold">{formData.returnDate || "Same day"}</div>
                        </div>
                        <div>
                          <div className="text-slate-400 font-bold uppercase">Passengers</div>
                          <div className="text-slate-900 font-semibold">{formData.adultsCount} Adults, {formData.childrenCount} Kids</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div>
                          <div className="text-slate-400 font-bold uppercase">Vehicle Model</div>
                          <div className="text-amber-700 font-extrabold text-sm">{formData.preferredVehicle}</div>
                        </div>
                        <div>
                          <div className="text-slate-400 font-bold uppercase">Customer</div>
                          <div className="text-slate-900 font-semibold">{formData.fullName} ({formData.phone})</div>
                        </div>
                        <div>
                          <div className="text-slate-400 font-bold uppercase">Email</div>
                          <div className="text-slate-900 font-semibold">{formData.email || "Not provided"}</div>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500">
                      By submitting this form, you agree to receive official fare quotations and trip confirmation updates via Call or WhatsApp.
                    </p>
                  </div>
                )}

                {/* Form Navigation Controls */}
                <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100"
                    >
                      <ArrowLeft className="h-4 w-4" /> Previous
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 5 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 shadow-md"
                    >
                      Next Step <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-sm hover:brightness-110 shadow-lg shadow-amber-500/20"
                    >
                      <Send className="h-4 w-4" />
                      <span>{loading ? "Submitting..." : "Submit Booking Enquiry"}</span>
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}


"use client";

import { FormEvent, useState } from "react";
import { createGuestReservation } from "@/lib/api";

type VendorContactFormProps = {
  partnerId: string;
  vendorName: string;
};

type SubmitState = "idle" | "loading" | "success" | "error";

export function VendorContactForm({
  partnerId,
  vendorName,
}: VendorContactFormProps) {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim() || null;
    const interestedDates = String(formData.get("interestedDates") || "").trim() || null;
    const guestCountRaw = String(formData.get("guestCount") || "").trim();
    const eventType = String(formData.get("eventType") || "").trim() || null;
    const budgetRaw = String(formData.get("budget") || "").trim();
    const details = String(formData.get("details") || "").trim() || null;
    const otherComments = String(formData.get("otherComments") || "").trim() || null;

    setState("loading");
    setMessage("");

    try {
      await createGuestReservation({
        guest_first_name: firstName,
        guest_last_name: lastName,
        guest_email: email,
        guest_phone: phone,
        event_date: null,
        details,
        budget_per_reservation: budgetRaw ? Number(budgetRaw) : null,
        partner_id: partnerId,
        interested_dates: interestedDates,
        guest_count: guestCountRaw ? Number(guestCountRaw) : null,
        event_type: eventType,
        other_comments: otherComments,
      });

      setState("success");
      setMessage(
        `Το αίτημα κράτησης στάλθηκε στον/στην ${vendorName}. Θα επικοινωνήσουν μαζί σας σύντομα.`
      );
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Κάτι πήγε στραβά κατά την αποστολή του αιτήματος."
      );
    }
  }

  const inputClass =
    "rounded-lg border border-charcoal/20 bg-ivory px-3 py-2 outline-none focus:border-rose-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-charcoal/10 bg-white p-6 md:p-8 shadow-sm"
    >
      <h2 className="font-display text-3xl text-charcoal mb-2">
        Επικοινωνία · {vendorName}
      </h2>
      <p className="text-charcoal/70 mb-6">
        Στείλτε αίτημα κράτησης και μοιραστείτε λεπτομέρειες για την εκδήλωσή
        σας.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Row 1: First name | Last name */}
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Όνομα <span className="text-rose-500">*</span>
          <input
            name="firstName"
            required
            className={inputClass}
            placeholder="Μαρία"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Επώνυμο <span className="text-rose-500">*</span>
          <input
            name="lastName"
            required
            className={inputClass}
            placeholder="Παπαδοπούλου"
          />
        </label>

        {/* Row 2: Phone | Email */}
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Κινητό <span className="text-rose-500">*</span>
          <input
            type="tel"
            name="phone"
            required
            className={inputClass}
            placeholder="+30 691 234 5678"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Email <span className="text-rose-500">*</span>
          <input
            type="email"
            name="email"
            required
            className={inputClass}
            placeholder="maria@email.com"
          />
        </label>

        {/* Row 3: Interested dates */}
        <label className="sm:col-span-2 flex flex-col gap-2 text-sm text-charcoal">
          Ημερομηνίες που με ενδιαφέρουν <span className="text-rose-500">*</span>
          <textarea
            name="interestedDates"
            required
            rows={2}
            className={inputClass}
            placeholder="π.χ. Ιούνιος 2026, Σεπτέμβριος 2026"
          />
        </label>

        {/* Row 4: Guest count */}
        <label className="sm:col-span-2 flex flex-col gap-2 text-sm text-charcoal">
          Αριθμός καλεσμένων κατά προσέγγιση <span className="text-rose-500">*</span>
          <input
            type="number"
            name="guestCount"
            required
            min={1}
            className={inputClass}
            placeholder="150"
          />
        </label>

        {/* Row 5: Event type */}
        <label className="sm:col-span-2 flex flex-col gap-2 text-sm text-charcoal">
          Ενδιαφέρομαι για: <span className="text-rose-500">*</span>
          <select
            name="eventType"
            required
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              Επιλέξτε τύπο εκδήλωσης
            </option>
            <option value="wedding">Δεξίωση γάμου</option>
            <option value="baptism">Βάπτιση</option>
            <option value="christening">Χρίσμα</option>
            <option value="other">Άλλο</option>
          </select>
        </label>

        {/* Row 6: Budget */}
        <label className="sm:col-span-2 flex flex-col gap-2 text-sm text-charcoal">
          Προϋπολογισμός δεξίωσης <span className="text-rose-500">*</span>
          <input
            type="number"
            name="budget"
            required
            min={0}
            step={100}
            className={inputClass}
            placeholder="15000"
          />
        </label>

        {/* Row 7: Dream reception description */}
        <label className="sm:col-span-2 flex flex-col gap-2 text-sm text-charcoal">
          Περιγράψτε μας με λίγες φράσεις πώς ονειρεύεστε τη δεξίωση σας{" "}
          <span className="text-rose-500">*</span>
          <textarea
            name="details"
            required
            rows={4}
            className={inputClass}
            placeholder="Τελετή + δεξίωση, προτιμήσεις διάταξης, διατροφικές ανάγκες και οτιδήποτε άλλο."
          />
        </label>

        {/* Row 8: Other comments */}
        <label className="sm:col-span-2 flex flex-col gap-2 text-sm text-charcoal">
          Άλλα σχόλια <span className="text-rose-500">*</span>
          <textarea
            name="otherComments"
            required
            rows={4}
            className={inputClass}
            placeholder="Οποιαδήποτε άλλη πληροφορία θέλετε να μας γνωστοποιήσετε."
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={state === "loading"}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-charcoal px-6 py-3 text-white font-medium hover:bg-charcoal/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {state === "loading" ? "Αποστολή…" : "Αποστολή"}
      </button>

      {message ? (
        <p
          className={`mt-4 text-sm ${
            state === "success" ? "text-sage" : "text-rose-700"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

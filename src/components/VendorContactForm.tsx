"use client";

import { FormEvent, useState } from "react";
import { createGuestReservation } from "@/lib/api";
import { MultiDatePicker } from "@/components/MultiDatePicker";

type VendorContactFormProps = {
  partnerId: string;
  vendorName: string;
};

type SubmitState = "idle" | "loading" | "success" | "error";

/** Labels for «Ενδιαφέρομαι για:» — order matches product spec. */
const EVENT_TYPE_OPTIONS: string[] = [
  "Δεξίωση γάμου",
  "Δεξίωση βάπτισης",
  "Παιδικό πάρτι",
  "Σχολική εκδρομή",
  "Χριστιανικός Γάμος",
  "Πολιτικός Γάμος",
  "Συμβολικός Γάμος",
  "Αγγλικανικός Γάμος",
  "Γάμος για ζευγάρια του ίδιου φύλου",
  "Ανανέωση όρκων",
  "Αθλητικές δραστηριότητες",
  "Εταιρικές εκδηλώσεις",
  "Πολιτιστικές εκδηλώσεις",
  "Συναυλίες",
  "Πάρτι γενεθλίων",
  "Χορευτικές εκδηλώσεις",
  "Παρουσιάσεις βιβλίων",
  "Άλλο",
];

/** Integer guest count only — avoids `type="number"` float/spinner quirks and `Number("…e…")` edge cases. */
function parsePositiveGuestCount(raw: string): number | null {
  const digitsOnly = raw.replace(/\s/g, "").replace(/,/g, "");
  if (!/^\d+$/.test(digitsOnly)) return null;
  const n = Number.parseInt(digitsOnly, 10);
  if (n < 1 || !Number.isSafeInteger(n)) return null;
  return n;
}

export function VendorContactForm({
  partnerId,
  vendorName,
}: VendorContactFormProps) {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [interestedDateISOs, setInterestedDateISOs] = useState<string[]>([]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim() || null;
    const interestedDates =
      interestedDateISOs.length > 0
        ? interestedDateISOs.slice().sort().join(", ")
        : null;
    const guestCountRaw = String(formData.get("guestCount") || "").trim();
    const guestCount = parsePositiveGuestCount(guestCountRaw);
    const eventType = String(formData.get("eventType") || "").trim() || null;
    const budgetRaw = String(formData.get("budget") || "").trim();
    const details = String(formData.get("details") || "").trim() || null;
    const otherComments = String(formData.get("otherComments") || "").trim() || null;

    if (!interestedDates) {
      setState("error");
      setMessage("Επιλέξτε τουλάχιστον μία ημερομηνία στο ημερολόγιο.");
      return;
    }

    if (guestCount === null) {
      setState("error");
      setMessage(
        "Δώστε έγκυρο αριθμό καλεσμένων (μόνο ψηφία, χωρίς κόμμα ή δεκαδικά)."
      );
      return;
    }

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
        guest_count: guestCount,
        event_type: eventType,
        other_comments: otherComments,
      });

      setState("success");
      setMessage(
        `Το αίτημα κράτησης στάλθηκε στον/στην ${vendorName}. Θα επικοινωνήσουν μαζί σας σύντομα.`
      );
      form.reset();
      setInterestedDateISOs([]);
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
          Όνομα
          <input
            name="firstName"
            required
            className={inputClass}
            placeholder="Μαρία"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Επώνυμο
          <input
            name="lastName"
            required
            className={inputClass}
            placeholder="Παπαδοπούλου"
          />
        </label>

        {/* Row 2: Phone | Email */}
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Κινητό
          <input
            type="tel"
            name="phone"
            required
            className={inputClass}
            placeholder="+30 691 234 5678"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Email
          <input
            type="email"
            name="email"
            required
            className={inputClass}
            placeholder="maria@email.com"
          />
        </label>

        {/* Row 3: Interested dates — multi-select calendar */}
        <div className="sm:col-span-2 flex flex-col gap-2 text-sm text-charcoal">
          <span>Ημερομηνίες που με ενδιαφέρουν</span>
          <MultiDatePicker
            selected={interestedDateISOs}
            onChange={setInterestedDateISOs}
          />
        </div>

        {/* Row 4: Guest count — text + numeric keypad avoids browser number-input rounding/spinner issues */}
        <label className="sm:col-span-2 flex flex-col gap-2 text-sm text-charcoal">
          Αριθμός καλεσμένων κατά προσέγγιση
          <input
            type="text"
            name="guestCount"
            required
            inputMode="numeric"
            autoComplete="off"
            className={inputClass}
            placeholder="150"
          />
        </label>

        {/* Row 5: Event type */}
        <label className="sm:col-span-2 flex flex-col gap-2 text-sm text-charcoal">
          Ενδιαφέρομαι για:
          <select
            name="eventType"
            required
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              Επιλέξτε τύπο εκδήλωσης
            </option>
            {EVENT_TYPE_OPTIONS.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        </label>

        {/* Row 6: Budget */}
        <label className="sm:col-span-2 flex flex-col gap-2 text-sm text-charcoal">
          Προϋπολογισμός δεξίωσης
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
          Περιγράψτε μας με λίγες φράσεις πώς ονειρεύεστε τη δεξίωση σας
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
          Άλλα σχόλια
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

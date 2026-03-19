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
    const eventDate = String(formData.get("eventDate") || "").trim();
    const details = String(formData.get("details") || "").trim() || null;
    const budgetRaw = String(formData.get("budget") || "").trim();

    setState("loading");
    setMessage("");

    try {
      await createGuestReservation({
        guest_first_name: firstName,
        guest_last_name: lastName,
        guest_email: email,
        guest_phone: phone,
        event_date: eventDate ? new Date(eventDate).toISOString() : null,
        details,
        budget_per_reservation: budgetRaw ? Number(budgetRaw) : null,
        partner_id: partnerId,
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
        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Όνομα
          <input
            name="firstName"
            required
            className="rounded-lg border border-charcoal/20 bg-ivory px-3 py-2 outline-none focus:border-rose-500"
            placeholder="Μαρία"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Επώνυμο
          <input
            name="lastName"
            required
            className="rounded-lg border border-charcoal/20 bg-ivory px-3 py-2 outline-none focus:border-rose-500"
            placeholder="Παπαδοπούλου"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Email
          <input
            type="email"
            name="email"
            required
            className="rounded-lg border border-charcoal/20 bg-ivory px-3 py-2 outline-none focus:border-rose-500"
            placeholder="maria@email.com"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Τηλέφωνο
          <input
            type="tel"
            name="phone"
            className="rounded-lg border border-charcoal/20 bg-ivory px-3 py-2 outline-none focus:border-rose-500"
            placeholder="+30 691 234 5678"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Ημερομηνία εκδήλωσης
          <input
            type="date"
            name="eventDate"
            className="rounded-lg border border-charcoal/20 bg-ivory px-3 py-2 outline-none focus:border-rose-500"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-charcoal">
          Προϋπολογισμός (προαιρετικό)
          <input
            type="number"
            name="budget"
            min={0}
            step={100}
            className="rounded-lg border border-charcoal/20 bg-ivory px-3 py-2 outline-none focus:border-rose-500"
            placeholder="15000"
          />
        </label>

        <label className="sm:col-span-2 flex flex-col gap-2 text-sm text-charcoal">
          Λεπτομέρειες
          <textarea
            name="details"
            rows={4}
            className="rounded-lg border border-charcoal/20 bg-ivory px-3 py-2 outline-none focus:border-rose-500"
            placeholder="Τελετή + δεξίωση, προτιμήσεις διάταξης, διατροφικές ανάγκες και οτιδήποτε άλλο."
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={state === "loading"}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-charcoal px-6 py-3 text-white font-medium hover:bg-charcoal/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {state === "loading"
          ? "Αποστολή…"
          : "Αποστολή αιτήματος κράτησης"}
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

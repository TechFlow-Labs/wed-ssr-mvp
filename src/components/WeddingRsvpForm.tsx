"use client";

import { FormEvent, useState } from "react";
import { submitWeddingRsvp } from "@/lib/api";

type WeddingRsvpFormProps = {
  slug: string;
};

export function WeddingRsvpForm({ slug }: WeddingRsvpFormProps) {
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState(true);
  const [guestCount, setGuestCount] = useState(1);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await submitWeddingRsvp(slug, {
        guest_name: guestName.trim(),
        email: email.trim(),
        attending,
        guest_count: guestCount,
        notes: notes.trim() || null,
      });
      setSuccess(res.message || "Thanks — your RSVP was saved.");
      setGuestName("");
      setEmail("");
      setAttending(true);
      setGuestCount(1);
      setNotes("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit RSVP.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 space-y-4 rounded-xl border border-charcoal/10 bg-cream/40 p-5"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm text-charcoal/80">
          Your name
          <input
            className="mt-1 w-full rounded-lg border border-charcoal/20 bg-white px-3 py-2 text-charcoal"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            required
            autoComplete="name"
          />
        </label>
        <label className="block text-sm text-charcoal/80">
          Email
          <input
            type="email"
            className="mt-1 w-full rounded-lg border border-charcoal/20 bg-white px-3 py-2 text-charcoal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </label>
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-charcoal">Will you attend?</legend>
        <label className="flex cursor-pointer items-center gap-2 text-charcoal">
          <input
            type="radio"
            name="attending"
            checked={attending}
            onChange={() => setAttending(true)}
          />
          Joyfully accepts
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-charcoal">
          <input
            type="radio"
            name="attending"
            checked={!attending}
            onChange={() => setAttending(false)}
          />
          Regretfully declines
        </label>
      </fieldset>

      <label className="block text-sm text-charcoal/80">
        Number in your party (including you)
        <input
          type="number"
          min={1}
          max={20}
          className="mt-1 w-full max-w-[12rem] rounded-lg border border-charcoal/20 bg-white px-3 py-2 text-charcoal"
          value={guestCount}
          onChange={(e) => setGuestCount(Number(e.target.value) || 1)}
        />
      </label>

      <label className="block text-sm text-charcoal/80">
        Dietary notes or message (optional)
        <textarea
          className="mt-1 w-full rounded-lg border border-charcoal/20 bg-white px-3 py-2 text-charcoal"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          maxLength={500}
        />
      </label>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      )}
      {success && (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-charcoal px-6 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Sending…" : "Submit RSVP"}
      </button>
    </form>
  );
}

"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import {
  generateWeddingWebsite,
  WeddingWebsiteResponse,
  WebsiteFaqItem,
  WebsiteScheduleItem,
} from "@/lib/api";

function slugify(input: string): string {
  const raw = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 48)
    .replace(/^-+|-+$/g, "");
  if (raw.length >= 3) return raw;
  return "wedding-site";
}

function emptySchedule(): WebsiteScheduleItem {
  return { time: "", title: "", description: "" };
}

function emptyFaq(): WebsiteFaqItem {
  return { question: "", answer: "" };
}

export default function WebsiteGeneratorPage() {
  const [coupleNames, setCoupleNames] = useState("");
  const [venue, setVenue] = useState("");
  const [weddingDate, setWeddingDate] = useState("");
  const [story, setStory] = useState("");
  const [scheduleRows, setScheduleRows] = useState<WebsiteScheduleItem[]>([
    emptySchedule(),
  ]);
  const [faqRows, setFaqRows] = useState<WebsiteFaqItem[]>([emptyFaq()]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<WeddingWebsiteResponse | null>(null);
  const slug = useMemo(() => slugify(coupleNames || "wedding-website"), [coupleNames]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const schedule = scheduleRows
        .filter((r) => r.time.trim() && r.title.trim())
        .map((r) => ({
          time: r.time.trim(),
          title: r.title.trim(),
          description: r.description?.trim() || null,
        }));
      const faq = faqRows
        .filter((r) => r.question.trim() && r.answer.trim())
        .map((r) => ({
          question: r.question.trim(),
          answer: r.answer.trim(),
        }));

      const data = await generateWeddingWebsite({
        slug,
        couple_names: coupleNames,
        venue,
        wedding_date: weddingDate,
        story,
        schedule,
        faq,
      });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-cream px-6 py-12">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="font-display text-4xl text-charcoal">
          Wedding Website Generator
        </h1>
        <form
          onSubmit={submit}
          className="space-y-6 rounded-2xl border border-charcoal/10 bg-white p-6"
        >
          <div className="space-y-4">
            <input
              className="w-full rounded-lg border border-charcoal/20 px-3 py-2"
              placeholder="Couple names"
              value={coupleNames}
              onChange={(e) => setCoupleNames(e.target.value)}
              required
            />
            <input
              className="w-full rounded-lg border border-charcoal/20 px-3 py-2"
              placeholder="Venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              required
            />
            <input
              className="w-full rounded-lg border border-charcoal/20 px-3 py-2"
              type="date"
              value={weddingDate}
              onChange={(e) => setWeddingDate(e.target.value)}
              required
            />
            <textarea
              className="w-full rounded-lg border border-charcoal/20 px-3 py-2"
              placeholder="Story"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              rows={4}
            />
          </div>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl text-charcoal">Schedule</h2>
              <button
                type="button"
                className="text-sm text-rose-700 hover:underline"
                onClick={() => setScheduleRows((rows) => [...rows, emptySchedule()])}
              >
                Add row
              </button>
            </div>
            <p className="text-sm text-charcoal/60">
              Leave blank to use a sensible default timeline. Fill rows to customize.
            </p>
            <ul className="space-y-3">
              {scheduleRows.map((row, i) => (
                <li
                  key={`sched-${i}`}
                  className="grid gap-2 rounded-xl border border-charcoal/10 p-3 sm:grid-cols-3"
                >
                  <input
                    className="rounded-lg border border-charcoal/20 px-2 py-1.5 text-sm"
                    placeholder="Time (e.g. 16:30)"
                    value={row.time}
                    onChange={(e) => {
                      const v = e.target.value;
                      setScheduleRows((rows) =>
                        rows.map((r, j) => (j === i ? { ...r, time: v } : r))
                      );
                    }}
                  />
                  <input
                    className="rounded-lg border border-charcoal/20 px-2 py-1.5 text-sm sm:col-span-2"
                    placeholder="Title"
                    value={row.title}
                    onChange={(e) => {
                      const v = e.target.value;
                      setScheduleRows((rows) =>
                        rows.map((r, j) => (j === i ? { ...r, title: v } : r))
                      );
                    }}
                  />
                  <input
                    className="rounded-lg border border-charcoal/20 px-2 py-1.5 text-sm sm:col-span-3"
                    placeholder="Description (optional)"
                    value={row.description ?? ""}
                    onChange={(e) => {
                      const v = e.target.value;
                      setScheduleRows((rows) =>
                        rows.map((r, j) => (j === i ? { ...r, description: v } : r))
                      );
                    }}
                  />
                  {scheduleRows.length > 1 && (
                    <button
                      type="button"
                      className="text-left text-sm text-charcoal/50 hover:text-red-700 sm:col-span-3"
                      onClick={() =>
                        setScheduleRows((rows) => rows.filter((_, j) => j !== i))
                      }
                    >
                      Remove
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl text-charcoal">FAQ</h2>
              <button
                type="button"
                className="text-sm text-rose-700 hover:underline"
                onClick={() => setFaqRows((rows) => [...rows, emptyFaq()])}
              >
                Add question
              </button>
            </div>
            <p className="text-sm text-charcoal/60">
              Leave blank for default FAQs. Add pairs to publish your own.
            </p>
            <ul className="space-y-3">
              {faqRows.map((row, i) => (
                <li key={`faq-${i}`} className="space-y-2 rounded-xl border border-charcoal/10 p-3">
                  <input
                    className="w-full rounded-lg border border-charcoal/20 px-2 py-1.5 text-sm"
                    placeholder="Question"
                    value={row.question}
                    onChange={(e) => {
                      const v = e.target.value;
                      setFaqRows((rows) =>
                        rows.map((r, j) => (j === i ? { ...r, question: v } : r))
                      );
                    }}
                  />
                  <textarea
                    className="w-full rounded-lg border border-charcoal/20 px-2 py-1.5 text-sm"
                    placeholder="Answer"
                    rows={2}
                    value={row.answer}
                    onChange={(e) => {
                      const v = e.target.value;
                      setFaqRows((rows) =>
                        rows.map((r, j) => (j === i ? { ...r, answer: v } : r))
                      );
                    }}
                  />
                  {faqRows.length > 1 && (
                    <button
                      type="button"
                      className="text-sm text-charcoal/50 hover:text-red-700"
                      onClick={() => setFaqRows((rows) => rows.filter((_, j) => j !== i))}
                    >
                      Remove
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-charcoal px-6 py-2 text-white disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>

        {error && (
          <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && !result && (
          <div className="rounded-xl border border-dashed border-charcoal/30 p-4 text-charcoal/60">
            No website generated yet.
          </div>
        )}

        {result && (
          <div className="space-y-2 rounded-2xl border border-charcoal/10 bg-white p-6">
            <p className="font-semibold text-charcoal">{result.couple_names}</p>
            <p className="text-charcoal/80">
              {result.venue} — {result.wedding_date}
            </p>
            <p className="text-sm text-charcoal/70">
              RSVP deadline: {result.rsvp_deadline ?? "—"}
            </p>
            <Link className="text-rose-700 hover:underline" href={result.public_path}>
              Open public website
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

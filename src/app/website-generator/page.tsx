'use client';
import { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import { generateWeddingWebsite, WeddingWebsiteResponse } from '@/lib/api';

function slugify(input: string): string {
  return input.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 48);
}

export default function WebsiteGeneratorPage() {
  const [coupleNames, setCoupleNames] = useState('');
  const [venue, setVenue] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<WeddingWebsiteResponse | null>(null);
  const slug = useMemo(() => slugify(coupleNames || 'wedding-website'), [coupleNames]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await generateWeddingWebsite({ slug, couple_names: coupleNames, venue, wedding_date: weddingDate, story, schedule: [], faq: [] });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  return <main className="min-h-screen bg-cream px-6 py-12"><div className="max-w-3xl mx-auto space-y-6"><h1 className="font-display text-4xl text-charcoal">Wedding Website Generator</h1><form onSubmit={submit} className="rounded-2xl border border-charcoal/10 bg-white p-6 space-y-4"><input className="w-full rounded-lg border border-charcoal/20 px-3 py-2" placeholder="Couple names" value={coupleNames} onChange={(e) => setCoupleNames(e.target.value)} required /><input className="w-full rounded-lg border border-charcoal/20 px-3 py-2" placeholder="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} required /><input className="w-full rounded-lg border border-charcoal/20 px-3 py-2" type="date" value={weddingDate} onChange={(e) => setWeddingDate(e.target.value)} required /><textarea className="w-full rounded-lg border border-charcoal/20 px-3 py-2" placeholder="Story" value={story} onChange={(e) => setStory(e.target.value)} rows={4} /><button type="submit" disabled={loading} className="rounded-full bg-charcoal px-6 py-2 text-white disabled:opacity-50">{loading ? 'Generating...' : 'Generate'}</button></form>{error && <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-red-700">{error}</div>}{!loading && !error && !result && <div className="rounded-xl border border-dashed border-charcoal/30 p-4 text-charcoal/60">No website generated yet.</div>}{result && <div className="rounded-2xl border border-charcoal/10 bg-white p-6 space-y-2"><p className="font-semibold text-charcoal">{result.couple_names}</p><p className="text-charcoal/80">{result.venue} - {result.wedding_date}</p><Link className="text-rose-700 hover:underline" href={result.public_path}>Open public website</Link></div>}</div></main>;
}

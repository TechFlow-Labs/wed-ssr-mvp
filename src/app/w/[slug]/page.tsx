import { notFound } from 'next/navigation';
import { fetchWeddingWebsite } from '@/lib/api';
import { WeddingRsvpForm } from '@/components/WeddingRsvpForm';

export const dynamic = 'force-dynamic';

export default async function WeddingWebsitePage({ params }: { params: { slug: string } }) {
  try {
    const website = await fetchWeddingWebsite(params.slug);
    return (
      <main className="min-h-screen bg-cream px-6 py-12">
        <section className="mx-auto max-w-4xl rounded-2xl border border-charcoal/10 bg-white p-8">
          <h1 className="font-display text-5xl text-charcoal">{website.couple_names}</h1>
          <p className="mt-3 text-lg text-charcoal/80">{website.wedding_date} • {website.venue}</p>
          {website.story && <p className="mt-4 text-charcoal/80">{website.story}</p>}
          <h2 className="mt-10 font-display text-3xl text-charcoal">Schedule</h2>
          {website.schedule.length === 0 ? <p className="mt-3 text-charcoal/60">No schedule published yet.</p> : <ul className="mt-4 space-y-3">{website.schedule.map((item, idx) => <li key={`${item.time}-${idx}`} className="rounded-xl border border-charcoal/10 p-3"><p className="font-semibold text-charcoal">{item.time} - {item.title}</p>{item.description && <p className="text-charcoal/70">{item.description}</p>}</li>)}</ul>}
          <h2 className="mt-10 font-display text-3xl text-charcoal">FAQ</h2>
          {website.faq.length === 0 ? <p className="mt-3 text-charcoal/60">No FAQs published yet.</p> : <ul className="mt-4 space-y-3">{website.faq.map((item, idx) => <li key={`${item.question}-${idx}`} className="rounded-xl border border-charcoal/10 p-3"><p className="font-semibold text-charcoal">{item.question}</p><p className="text-charcoal/70">{item.answer}</p></li>)}</ul>}
          {website.rsvp_enabled && (
            <>
              <h2 className="mt-10 font-display text-3xl text-charcoal">RSVP</h2>
              <p className="mt-2 text-charcoal/75">
                {website.rsvp_deadline
                  ? `Please let us know by ${website.rsvp_deadline}.`
                  : 'We would love to know if you can celebrate with us.'}
              </p>
              <WeddingRsvpForm slug={params.slug} />
            </>
          )}
        </section>
      </main>
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Not found';
    if (msg.includes('404')) notFound();
    throw err;
  }
}

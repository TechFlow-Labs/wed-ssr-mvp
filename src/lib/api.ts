const DEFAULT_API = "http://localhost:8060";

/**
 * Browser: always same-origin `/public-api` (Next rewrite/nginx → backend).
 * SSR: API_INTERNAL_URL / Docker network to the API container.
 */
export function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/public-api`;
  }
  return (
    process.env.API_INTERNAL_URL?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
    DEFAULT_API
  );
}

export type VendorPublic = {
  partner_id: string;
  business_name: string;
  category: string | null;
  description: string | null;
};

export type VendorListResponse = {
  total: number;
  items: VendorPublic[];
};

export type ReservationGuestRequest = {
  guest_first_name: string;
  guest_last_name: string;
  guest_email: string;
  guest_phone?: string | null;
  event_date?: string | null;
  details?: string | null;
  budget_per_reservation?: number | string | null;
  interested_dates?: string | null;
  guest_count?: number | null;
  event_type?: string | null;
  other_comments?: string | null;
  partner_id: string;
};

export type ReservationItemResponse = {
  id: string;
  partner_id: string;
  couple_id?: string | null;
  guest_first_name?: string | null;
  guest_last_name?: string | null;
  guest_email?: string | null;
  guest_phone?: string | null;
  status?: string | null;
  event_date?: string | null;
  details?: string | null;
  budget_per_reservation?: string | null;
};

export async function fetchVendors(
  limit = 50,
  skip = 0
): Promise<VendorListResponse> {
  const url = new URL(`${getApiBaseUrl()}/vendors/`);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("skip", String(skip));

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error("Αποτυχία φόρτωσης προμηθευτών");
  return res.json();
}

export async function createGuestReservation(
  data: ReservationGuestRequest
): Promise<ReservationItemResponse> {
  const res = await fetch(`${getApiBaseUrl()}/reservations/guest`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(
      error?.detail?.[0]?.msg ||
      error?.message ||
      "Αποτυχία δημιουργίας κράτησης"
    );
  }

  return res.json();
}


export type WebsiteFaqItem = { question: string; answer: string };
export type WebsiteScheduleItem = { time: string; title: string; description?: string | null };
export type WeddingWebsitePayload = {
  slug: string;
  couple_names: string;
  wedding_date: string;
  venue: string;
  story?: string;
  schedule: WebsiteScheduleItem[];
  faq: WebsiteFaqItem[];
};
export type WeddingWebsiteResponse = WeddingWebsitePayload & {
  rsvp_enabled: boolean;
  rsvp_deadline?: string | null;
  public_path: string;
  created_at: string;
  updated_at: string;
};

export async function generateWeddingWebsite(payload: WeddingWebsitePayload): Promise<WeddingWebsiteResponse> {
  const res = await fetch(`${getApiBaseUrl()}/websites/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Generate failed (${res.status}): ${error}`);
  }
  return res.json();
}

export async function fetchWeddingWebsite(slug: string): Promise<WeddingWebsiteResponse> {
  const safeSlug = slug.replace(/^\/+|\/+$/g, "");
  const res = await fetch(`${getApiBaseUrl()}/websites/${safeSlug}`, { cache: "no-store" });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Fetch failed (${res.status}): ${error}`);
  }
  return res.json();
}

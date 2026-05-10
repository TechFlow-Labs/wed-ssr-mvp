const DEFAULT_API = "http://localhost:8060";

/**
 * Browser: same-origin `/public-api` (nginx or Next rewrites → backend) so wedapp.gr never calls localhost:8060.
 * SSR: API_INTERNAL_URL / Docker network to the API container.
 */
export function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    const explicit = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    if (explicit) return explicit;
    return `${window.location.origin}/public-api`;
  }
  return (
    process.env.API_INTERNAL_URL?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
    DEFAULT_API
  );
}

function joinApiPath(base: string, path: string): string {
  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

export type VendorPublic = {
  partner_id: string;
  business_name: string;
  category: string | null;
  description: string | null;
};

export type GiftItem = {
  id: string;
  item_name: string;
  category: string | null;
  short_description: string | null;
  long_description: string | null;
  main_image_url: string | null;
  gallery_image_urls: string[];
};

export type GiftListResponse = {
  total: number;
  items: GiftItem[];
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
  const url = new URL(joinApiPath(getApiBaseUrl(), "/vendors/"));
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("skip", String(skip));

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error("Αποτυχία φόρτωσης προμηθευτών");
  return res.json();
}

export async function createGuestReservation(
  data: ReservationGuestRequest
): Promise<ReservationItemResponse> {
  const res = await fetch(joinApiPath(getApiBaseUrl(), "/reservations/guest"), {
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

export async function fetchGiftLists(): Promise<GiftListResponse> {
  const res = await fetch(joinApiPath(getApiBaseUrl(), "/gifts/lists"), {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Αποτυχία φόρτωσης λίστας δώρων");
  return res.json();
}

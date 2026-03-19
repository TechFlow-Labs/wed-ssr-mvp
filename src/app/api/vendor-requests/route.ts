import { NextResponse } from "next/server";
import { getVendorById } from "@/data/vendors";

type ReservationRequestPayload = {
  vendorId?: string;
  vendorName?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  eventDate?: string;
  guestCount?: number;
  notes?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const body = (await request.json()) as ReservationRequestPayload;

  const requiredTextFields: Array<keyof ReservationRequestPayload> = [
    "vendorId",
    "fullName",
    "email",
    "phone",
    "eventDate",
    "notes",
  ];

  for (const field of requiredTextFields) {
    if (!body[field] || String(body[field]).trim().length === 0) {
      return NextResponse.json(
        { message: `Λείπει υποχρεωτικό πεδίο: ${field}.` },
        { status: 400 }
      );
    }
  }

  if (!isValidEmail(String(body.email))) {
    return NextResponse.json(
      { message: "Δώστε έγκυρη διεύθυνση email." },
      { status: 400 }
    );
  }

  if (!body.guestCount || Number.isNaN(Number(body.guestCount))) {
    return NextResponse.json(
      { message: "Δώστε έγκυρο αριθμό καλεσμένων." },
      { status: 400 }
    );
  }

  const guestCount = Number(body.guestCount);
  if (guestCount < 1 || guestCount > 1200) {
    return NextResponse.json(
      { message: "Ο αριθμός καλεσμένων πρέπει να είναι μεταξύ 1 και 1200." },
      { status: 400 }
    );
  }

  const vendor = getVendorById(String(body.vendorId));
  if (!vendor) {
    return NextResponse.json(
      { message: "Ο προμηθευτής δεν βρέθηκε." },
      { status: 404 }
    );
  }

  console.log("New vendor reservation request", {
    vendorId: vendor.id,
    vendorName: vendor.name,
    fullName: String(body.fullName),
    email: String(body.email),
    phone: String(body.phone),
    eventDate: String(body.eventDate),
    guestCount,
    notes: String(body.notes),
    submittedAt: new Date().toISOString(),
  });

  return NextResponse.json({
    message: `Το αίτημά σας στάλθηκε στον/στην ${vendor.name}. Θα επικοινωνήσουν μαζί σας σύντομα.`,
  });
}

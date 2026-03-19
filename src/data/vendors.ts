export type Vendor = {
  id: string;
  name: string;
  rating: number;
  city: string;
  guestCapacity: string;
  serviceModel: "All-inclusive" | "Select services";
  setting: "Indoor" | "Outdoor" | "Indoor & outdoor";
  startingPrice: string;
  description: string;
  highlights: string[];
  considerations: string[];
};

export const vendors: Vendor[] = [
  {
    id: "the-sanctuary-ri",
    name: "The Sanctuary RI",
    rating: 4.8,
    city: "New York, NY",
    guestCapacity: "Up to 300 guests",
    serviceModel: "All-inclusive",
    setting: "Indoor & outdoor",
    startingPrice: "$15,000",
    description:
      "A restored former church blending historic details with a modern event experience and East River views.",
    highlights: [
      "Accommodates over 200 guests",
      "Private area for wedding party",
      "Full-service amenities",
    ],
    considerations: [
      "Can feel large for smaller guest lists",
      "Not wheelchair accessible",
      "No free parking",
    ],
  },
  {
    id: "sound-river-studios",
    name: "Sound River Studios",
    rating: 5.0,
    city: "New York, NY",
    guestCapacity: "Up to 275 guests",
    serviceModel: "Select services",
    setting: "Indoor & outdoor",
    startingPrice: "$8,000",
    description:
      "A waterfront venue with contemporary style, flexible event flow, and strong sunset views.",
    highlights: [
      "Wheelchair accessible",
      "Indoor and outdoor options",
      "Warm, connected atmosphere",
    ],
    considerations: [
      "No built-in audiovisual options",
      "No all-inclusive dining options",
      "Does not allow pets",
    ],
  },
  {
    id: "deity-events",
    name: "Deity Events",
    rating: 4.9,
    city: "Brooklyn, NY",
    guestCapacity: "Up to 150 guests",
    serviceModel: "All-inclusive",
    setting: "Indoor",
    startingPrice: "$7,500",
    description:
      "An eclectic all-inclusive space with in-house catering, planning support, and private-use wedding packages.",
    highlights: [
      "Dedicated on-site team",
      "Full in-house catering menu",
      "Dressing room available",
    ],
    considerations: [
      "Not wheelchair accessible",
      "No on-site parking",
      "Indoor-only layout",
    ],
  },
  {
    id: "renaissance-event-hall",
    name: "Renaissance Event Hall",
    rating: 5.0,
    city: "Long Island City, NY",
    guestCapacity: "Up to 250 guests",
    serviceModel: "All-inclusive",
    setting: "Indoor & outdoor",
    startingPrice: "$15,000",
    description:
      "A polished, chandelier-forward venue with customizable lighting and in-house catering for larger celebrations.",
    highlights: [
      "Versatile for many event styles",
      "Dance floor included",
      "Lighting and sound available",
    ],
    considerations: [
      "Not wheelchair accessible",
      "Best suited to larger guest counts",
      "Less ideal for unconventional themes",
    ],
  },
  {
    id: "33-hotel-seaport",
    name: "33 Hotel New York City Seaport",
    rating: 5.0,
    city: "New York, NY",
    guestCapacity: "Up to 40 guests",
    serviceModel: "All-inclusive",
    setting: "Indoor",
    startingPrice: "$3,500",
    description:
      "A boutique hotel option for intimate city weddings with personalized service and East River surroundings.",
    highlights: [
      "Great for micro-weddings",
      "Multiple event spaces",
      "In-house catering services",
    ],
    considerations: [
      "No free parking",
      "No dedicated getting-ready suites",
      "Additional event staff may be required",
    ],
  },
  {
    id: "chinese-tuxedo",
    name: "Chinese Tuxedo",
    rating: 5.0,
    city: "New York, NY",
    guestCapacity: "Up to 300 guests",
    serviceModel: "All-inclusive",
    setting: "Indoor",
    startingPrice: "Custom quote",
    description:
      "A historic Chinatown venue with distinctive architecture, modern Chinese banquet menus, and multi-space flexibility.",
    highlights: [
      "Accommodates large events",
      "All-inclusive packages",
      "Book one or multiple spaces",
    ],
    considerations: [
      "Limited setup and cleanup services",
      "Dance floor not included",
      "Not wheelchair accessible",
    ],
  },
  {
    id: "manhatta",
    name: "Manhatta",
    rating: 4.0,
    city: "New York, NY",
    guestCapacity: "Up to 250 guests",
    serviceModel: "Select services",
    setting: "Indoor",
    startingPrice: "$7,500",
    description:
      "A high-floor Manhattan venue with skyline views, modern interiors, and premium dining experiences.",
    highlights: [
      "Wheelchair accessible",
      "Luxury with a modern atmosphere",
      "Works for larger celebrations",
    ],
    considerations: [
      "Outside catering requirements vary by package",
      "No dedicated getting-ready area",
      "Dance floor limitations",
    ],
  },
  {
    id: "threes-brewing-governors-island",
    name: "Threes Brewing Governors Island",
    rating: 5.0,
    city: "New York, NY",
    guestCapacity: "Up to 100 guests",
    serviceModel: "All-inclusive",
    setting: "Outdoor",
    startingPrice: "$5,000",
    description:
      "A casual outdoor option reached by ferry, with skyline views and a flexible celebration format.",
    highlights: [
      "Wheelchair accessible",
      "Dedicated on-site team",
      "Food and beverage support",
    ],
    considerations: [
      "No free parking",
      "No built-in dance floor",
      "No in-house lighting/sound package",
    ],
  },
  {
    id: "gran-morsi",
    name: "Gran Morsi",
    rating: 5.0,
    city: "New York, NY",
    guestCapacity: "Up to 125 guests",
    serviceModel: "All-inclusive",
    setting: "Indoor",
    startingPrice: "Custom quote",
    description:
      "A Tribeca restaurant venue known for intimate upscale vibes, Italian cuisine, and hands-on coordination.",
    highlights: [
      "Wheelchair accessible",
      "Catering services included",
      "Lighting and sound support",
    ],
    considerations: [
      "No on-site parking",
      "No overnight accommodations",
      "Does not allow pets",
    ],
  },
  {
    id: "the-lofts-at-prince",
    name: "The Lofts At Prince",
    rating: 5.0,
    city: "New York, NY",
    guestCapacity: "Up to 50 guests",
    serviceModel: "Select services",
    setting: "Indoor & outdoor",
    startingPrice: "Custom quote",
    description:
      "A stylish SoHo loft and rooftop option designed for intimate weddings with strong customization potential.",
    highlights: [
      "Great for smaller guest lists",
      "Private area for wedding party",
      "Flexible setup options",
    ],
    considerations: [
      "Not ideal for large events",
      "No on-premise lodging",
      "No free parking",
    ],
  },
  {
    id: "houston-hall",
    name: "Houston Hall",
    rating: 5.0,
    city: "New York, NY",
    guestCapacity: "Up to 250 guests",
    serviceModel: "All-inclusive",
    setting: "Indoor",
    startingPrice: "Custom quote",
    description:
      "A converted historic beer hall featuring a warm industrial interior and room for high-energy receptions.",
    highlights: [
      "Large open-plan space",
      "Private dressing room available",
      "Strong event staff support",
    ],
    considerations: [
      "No built-in audiovisual options",
      "No on-site guest accommodations",
      "Best for medium to large guest counts",
    ],
  },
  {
    id: "leslie-nyc",
    name: "Leslie NYC",
    rating: 5.0,
    city: "New York, NY",
    guestCapacity: "Up to 65 guests",
    serviceModel: "All-inclusive",
    setting: "Indoor",
    startingPrice: "$5,000",
    description:
      "A warm Midtown East venue with exposed brick style, in-house food service, and an intimate party layout.",
    highlights: [
      "All-inclusive venue packages",
      "Setup and cleanup support",
      "Good fit for intimate celebrations",
    ],
    considerations: [
      "Not wheelchair accessible",
      "No free parking",
      "Limited on-site event staffing options",
    ],
  },
];

export function getVendorById(vendorId: string) {
  return vendors.find((vendor) => vendor.id === vendorId);
}

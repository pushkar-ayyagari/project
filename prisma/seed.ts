import { PrismaClient, Role, PropertyType, ListingStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

type SeedListing = {
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  propertyType: PropertyType;
  listingStatus: ListingStatus;
  yearBuilt: number;
  lotSize?: number;
  images: string[];
};

const LISTINGS: SeedListing[] = [
  {
    title: "Sunny mid-century in Hyde Park",
    description:
      "Bright three-bedroom mid-century home with a tree-shaded backyard, original oak floors, and a fully renovated kitchen. Walk to coffee shops and parks. Easy commute downtown.",
    address: "201 W 32nd St",
    city: "Austin",
    state: "TX",
    zipCode: "78705",
    latitude: 30.3047,
    longitude: -97.7375,
    price: 825000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1750,
    propertyType: PropertyType.HOUSE,
    listingStatus: ListingStatus.FOR_SALE,
    yearBuilt: 1962,
    lotSize: 6500,
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
    ],
  },
  {
    title: "Modern downtown loft with skyline views",
    description:
      "Open-concept loft in a converted warehouse. Floor-to-ceiling windows, polished concrete, in-unit laundry, and a private balcony overlooking the city.",
    address: "44 Pike St",
    city: "Seattle",
    state: "WA",
    zipCode: "98101",
    latitude: 47.6086,
    longitude: -122.3403,
    price: 615000,
    bedrooms: 1,
    bathrooms: 1.5,
    squareFeet: 980,
    propertyType: PropertyType.CONDO,
    listingStatus: ListingStatus.FOR_SALE,
    yearBuilt: 2014,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1600&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1600&q=80",
    ],
  },
  {
    title: "Brownstone garden apartment in Park Slope",
    description:
      "Charming two-bedroom rental in a classic Park Slope brownstone. Private garden, exposed brick, decorative fireplace, washer/dryer in unit. Steps to Prospect Park.",
    address: "317 6th Ave",
    city: "Brooklyn",
    state: "NY",
    zipCode: "11215",
    latitude: 40.671,
    longitude: -73.978,
    price: 4200,
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 1100,
    propertyType: PropertyType.APARTMENT,
    listingStatus: ListingStatus.FOR_RENT,
    yearBuilt: 1899,
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1600&q=80",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=1600&q=80",
    ],
  },
  {
    title: "Spanish revival with pool in Silver Lake",
    description:
      "1920s Spanish revival lovingly restored with arched doorways, original tile, and a saltwater pool. Open kitchen, primary suite with walk-in closet, and a detached studio.",
    address: "2231 Sunset Plaza Dr",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90026",
    latitude: 34.0869,
    longitude: -118.2702,
    price: 1495000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2400,
    propertyType: PropertyType.HOUSE,
    listingStatus: ListingStatus.FOR_SALE,
    yearBuilt: 1928,
    lotSize: 7200,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80",
      "https://images.unsplash.com/photo-1613553474179-e1eda3ea5734?w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80",
    ],
  },
  {
    title: "Townhouse near Trinity College",
    description:
      "Three-story brick townhouse in walkable Back Bay. Two-car garage, roof deck with skyline views, gourmet kitchen, and three full baths.",
    address: "84 Marlborough St",
    city: "Boston",
    state: "MA",
    zipCode: "02116",
    latitude: 42.3508,
    longitude: -71.0768,
    price: 2950000,
    bedrooms: 3,
    bathrooms: 3.5,
    squareFeet: 2850,
    propertyType: PropertyType.TOWNHOUSE,
    listingStatus: ListingStatus.PENDING,
    yearBuilt: 1880,
    images: [
      "https://images.unsplash.com/photo-1605114130498-8a96b507dabd?w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80",
    ],
  },
  {
    title: "Cozy studio in Capitol Hill",
    description:
      "Bright studio with hardwood floors, large bay window, secured entry, and on-site laundry. Walk to coffee, restaurants, and the light rail.",
    address: "1521 E Olive Way",
    city: "Seattle",
    state: "WA",
    zipCode: "98122",
    latitude: 47.617,
    longitude: -122.318,
    price: 1850,
    bedrooms: 0,
    bathrooms: 1,
    squareFeet: 480,
    propertyType: PropertyType.APARTMENT,
    listingStatus: ListingStatus.FOR_RENT,
    yearBuilt: 1968,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1600&q=80",
    ],
  },
  {
    title: "Lakefront cabin with dock",
    description:
      "Two-bed log cabin on five acres of lakefront. Vaulted ceilings, stone fireplace, hot tub, and a private dock. A peaceful weekend escape.",
    address: "120 Pine Lake Rd",
    city: "Asheville",
    state: "NC",
    zipCode: "28804",
    latitude: 35.6228,
    longitude: -82.5538,
    price: 575000,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1380,
    propertyType: PropertyType.HOUSE,
    listingStatus: ListingStatus.FOR_SALE,
    yearBuilt: 1995,
    lotSize: 217800,
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1600&q=80",
      "https://images.unsplash.com/photo-1542359649-31e03cd4d909?w=1600&q=80",
      "https://images.unsplash.com/photo-1499696786230-bb47a8aa2a6e?w=1600&q=80",
    ],
  },
  {
    title: "Luxury high-rise condo on the bay",
    description:
      "Two-bedroom corner unit on the 38th floor with floor-to-ceiling windows, smart home wiring, doorman, gym, rooftop pool, and dedicated parking.",
    address: "1080 Brickell Ave",
    city: "Miami",
    state: "FL",
    zipCode: "33131",
    latitude: 25.7617,
    longitude: -80.1918,
    price: 1295000,
    bedrooms: 2,
    bathrooms: 2.5,
    squareFeet: 1620,
    propertyType: PropertyType.CONDO,
    listingStatus: ListingStatus.FOR_SALE,
    yearBuilt: 2019,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1600&q=80",
    ],
  },
  {
    title: "Sold — Renovated farmhouse on 12 acres",
    description:
      "Fully restored farmhouse with new mechanicals, modern kitchen, claw-foot tubs, restored barn, and twelve acres of pasture. Sold above asking.",
    address: "1456 Old Mill Rd",
    city: "Burlington",
    state: "VT",
    zipCode: "05401",
    latitude: 44.4759,
    longitude: -73.2121,
    price: 685000,
    bedrooms: 4,
    bathrooms: 2,
    squareFeet: 2200,
    propertyType: PropertyType.HOUSE,
    listingStatus: ListingStatus.SOLD,
    yearBuilt: 1892,
    lotSize: 522720,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1600&q=80",
    ],
  },
  {
    title: "Buildable lot near hiking trails",
    description:
      "Half-acre buildable lot in a quiet cul-de-sac. Cleared, level, with utilities at the street. Walk to the trailhead, ten minutes to downtown.",
    address: "12 Trail View Ln",
    city: "Boulder",
    state: "CO",
    zipCode: "80302",
    latitude: 40.015,
    longitude: -105.2705,
    price: 295000,
    bedrooms: 0,
    bathrooms: 0,
    squareFeet: 0,
    propertyType: PropertyType.LAND,
    listingStatus: ListingStatus.FOR_SALE,
    yearBuilt: 0,
    lotSize: 21780,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80",
    ],
  },
];

async function main() {
  console.log("Resetting tables...");
  await prisma.inquiry.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.listingImage.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.user.deleteMany();

  console.log("Creating users...");
  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@homestead.dev",
      passwordHash: await bcrypt.hash("admin1234", 10),
      role: Role.ADMIN,
    },
  });

  await prisma.user.create({
    data: {
      name: "Demo User",
      email: "demo@homestead.dev",
      passwordHash: await bcrypt.hash("password", 10),
    },
  });

  console.log(`Creating ${LISTINGS.length} listings...`);
  for (const listing of LISTINGS) {
    const { images, yearBuilt, ...rest } = listing;
    await prisma.listing.create({
      data: {
        ...rest,
        yearBuilt: yearBuilt > 0 ? yearBuilt : null,
        createdById: admin.id,
        images: {
          create: images.map((url, i) => ({
            imageUrl: url,
            altText: `${listing.title} – photo ${i + 1}`,
            sortOrder: i,
          })),
        },
      },
    });
  }

  console.log("Seed complete.");
  console.log("  Admin login: admin@homestead.dev / admin1234");
  console.log("  Demo user:   demo@homestead.dev / password");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
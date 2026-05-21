# Project 1 Plan: Real Estate Listing Platform

## Project Goal
Build a full-stack real estate listing platform where users can browse, search, filter, save, and view detailed property listings. Admin users can create, edit, and delete listings from a protected dashboard.

This project is meant to help practice a modern frontend tech stack, backend API design, authentication, database modeling, file uploads, and real estate-specific user flows.

## Recommended Tech Stack

### Frontend
- Next.js 14+ with App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod validation
- TanStack Query or server actions
- Mapbox or Google Maps API for property map view

### Backend
- Next.js API routes or Express.js API
- Node.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT/session-based authentication with NextAuth/Auth.js

### Storage
- Cloudinary, UploadThing, or AWS S3 for listing images

### Deployment
- Vercel for frontend/backend
- Supabase, Neon, or Railway for PostgreSQL

## Core Features

### Public User Features
- View all available property listings
- Search listings by city, ZIP code, or address
- Filter listings by:
  - Price range
  - Bedrooms
  - Bathrooms
  - Property type
  - Listing status: for sale, for rent, pending, sold
- Sort listings by price, newest, or square footage
- View a detailed listing page
- View listing images in a gallery
- View property location on a map
- Save favorite listings
- Submit an inquiry/contact form for a property

### Admin Features
- Admin login
- Create a new listing
- Edit existing listing information
- Upload listing images
- Delete/archive a listing
- View submitted inquiries
- Mark inquiries as contacted or closed

## Suggested Database Models

### User
- id
- name
- email
- passwordHash or authProviderId
- role: USER or ADMIN
- createdAt
- updatedAt

### Listing
- id
- title
- description
- address
- city
- state
- zipCode
- latitude
- longitude
- price
- bedrooms
- bathrooms
- squareFeet
- propertyType
- listingStatus
- yearBuilt
- lotSize
- createdById
- createdAt
- updatedAt

### ListingImage
- id
- listingId
- imageUrl
- altText
- sortOrder
- createdAt

### Favorite
- id
- userId
- listingId
- createdAt

### Inquiry
- id
- listingId
- name
- email
- phone
- message
- status: NEW, CONTACTED, CLOSED
- createdAt

## Main Pages

### Public Pages
- `/` — homepage with featured listings and search bar
- `/listings` — searchable/filterable listing grid
- `/listings/[id]` — listing detail page
- `/favorites` — saved properties for logged-in users
- `/login` — user/admin login
- `/register` — account creation

### Admin Pages
- `/admin` — admin overview dashboard
- `/admin/listings` — manage listings
- `/admin/listings/new` — create listing
- `/admin/listings/[id]/edit` — edit listing
- `/admin/inquiries` — view property inquiries

## API Routes

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

### Listings
- `GET /api/listings`
- `GET /api/listings/:id`
- `POST /api/listings`
- `PATCH /api/listings/:id`
- `DELETE /api/listings/:id`

### Images
- `POST /api/listings/:id/images`
- `DELETE /api/listings/:id/images/:imageId`

### Favorites
- `GET /api/favorites`
- `POST /api/favorites/:listingId`
- `DELETE /api/favorites/:listingId`

### Inquiries
- `POST /api/listings/:id/inquiries`
- `GET /api/admin/inquiries`
- `PATCH /api/admin/inquiries/:id`

## UI Components To Build
- Navbar
- SearchBar
- ListingCard
- ListingGrid
- FilterSidebar
- PriceRangeFilter
- PropertyImageGallery
- PropertyMap
- FavoriteButton
- InquiryForm
- AdminListingTable
- ListingForm
- ImageUploader
- StatusBadge

## Development Milestones

### Milestone 1: Project Setup
- Initialize Next.js app with TypeScript
- Install Tailwind CSS and shadcn/ui
- Set up Prisma and PostgreSQL
- Create base layout, navbar, and theme

### Milestone 2: Database and Seed Data
- Create Prisma schema
- Add listing-related models
- Seed database with sample properties
- Verify listings display from the database

### Milestone 3: Public Listing Experience
- Build listing grid page
- Add search and filtering
- Add sorting
- Build listing detail page
- Add image gallery and map section

### Milestone 4: Authentication
- Add user registration and login
- Add protected routes
- Add admin role support
- Add logged-in user session handling

### Milestone 5: Admin Dashboard
- Build admin dashboard layout
- Create listing CRUD forms
- Add image uploads
- Add listing status management

### Milestone 6: Favorites and Inquiries
- Add favorite/saved listing functionality
- Add inquiry form on listing detail page
- Add admin inquiry management page

### Milestone 7: Polish and Deployment
- Add loading states and empty states
- Add form validation with Zod
- Add responsive mobile design
- Add error handling
- Deploy to Vercel
- Add README with setup instructions

## Claude Code Build Instructions
When implementing this project, build incrementally. First create the base app, database schema, and seed data. Then implement public listing pages. After that, add authentication, admin CRUD tools, favorites, and inquiries. Keep components reusable and strongly typed.

## Acceptance Criteria
- Users can browse real estate listings
- Users can search, filter, and sort listings
- Users can view a detailed listing page
- Logged-in users can save favorite listings
- Users can submit property inquiries
- Admins can create, edit, and delete listings
- Admins can upload listing images
- Admins can view and update inquiry statuses
- App is responsive on desktop and mobile
- App uses a real database, not only mock data

## Optional Stretch Features
- Mortgage payment calculator
- Recently viewed listings
- Similar properties section
- Advanced map search
- Agent profile pages
- Email notifications for new inquiries
- Analytics dashboard for listing views
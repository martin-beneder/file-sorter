# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` (Uses turbopack)
- **Build for production**: `npm run build`
- **Start production server**: `npm run start`
- **Lint code**: `npm run lint`
- **Generate Prisma client**: `npx prisma generate`
- **Update database schema**: `npx prisma migrate dev --name <migration-name>`

## Architecture Overview

This is a file sorting application built with Next.js, Prisma, Tailwind CSS, and Clerk for authentication.

### Key Components

1. **Authentication**: Uses Clerk for user authentication and management
   - Public routes defined in middleware.ts
   - Login/signup pages in src/app/login and src/app/signup

2. **File Management**:
   - EdgeStore integration for file uploads (src/app/lib/edgestore.ts)
   - Files are uploaded to EdgeStore via the MultiFileDropzone component
   - File sorting via external API (SORTAI_API_URL)

3. **Subscription Model**:
   - Implemented via Stripe for payments
   - Different subscription tiers limit the number of files users can upload
   - Subscription data stored in user metadata via Clerk

4. **API Routes**:
   - `/api/sort` - Sends files to external sorting API
   - `/api/sortdata` - Retrieves sorting results
   - `/api/download` - Downloads sorted files as a zip archive
   - `/api/edgestore/[...edgestore]` - File storage routes
   - `/api/stripe` - Payment processing routes

### Database

PostgreSQL database managed via Prisma with the following models:
- user - Stores user authentication data
- Key - Password keys for users
- Session - User session data
- emailVerificationToken - For email verification
- passwordResetToken - For password resets

### Environment Variables

The application requires several environment variables:
- `POSTGRES_PRISMA_URL` - PostgreSQL connection string
- `POSTGRES_URL_NON_POOLING` - Direct PostgreSQL connection
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe public key
- `SORTAI_API_URL` - URL for the external sorting API 
- `SORTAI_API_KEY` - API key for the external sorting service
- Various Clerk authentication variables

## Important Workflows

1. **File Upload Process**:
   - Files are uploaded using the MultiFileDropzone component
   - Uploaded to EdgeStore via the publicFiles bucket
   - Sent to external AI service for sorting
   - Results displayed in a FileBrowser component

2. **User Subscription Flow**:
   - Users select a subscription plan on the pricing page
   - Process payment via Stripe
   - Subscription ID stored in user metadata
   - Subscription limits enforced when uploading files

## Notes

- File size limit is set to 512MB (536870912 bytes)
- Rate limiting is implemented to prevent frequent uploads (30 seconds between uploads)
- The system supports multiple file formats including images, documents, spreadsheets, and text files
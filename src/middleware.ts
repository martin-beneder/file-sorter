import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
 
// Create a matcher for public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/login(.*)', 
  '/sign-up(.*)', 
  '/forgot-password(.*)', 
  '/reset-password(.*)', 
  '/verify-email(.*)', 
  '/api/edgestore/(.*)', 
  '/get-token(.*)',
  '/pricing(.*)'
]);

// Create a matcher for routes to ignore completely
const isIgnoredRoute = createRouteMatcher(['/api/webhooks(.*)']);

// This middleware protects routes including api routes
// Configures routes that can be accessed without authentication
export default clerkMiddleware(async (auth, req) => {
  // Skip ignored routes completely
  if (isIgnoredRoute(req)) return;
  
  // Public routes don't need authentication
  if (!isPublicRoute(req)) {
    // Protect all other routes
    await auth.protect();
  }
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
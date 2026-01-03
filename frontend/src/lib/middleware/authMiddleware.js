import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export function authMiddleware(request) {
  const token = request.cookies.get('access_token')?.value;
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ['/login', '/register', '/'];
  
  // Check if path is public
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // If no token and trying to access protected route, redirect to login
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // Check if token is expired
    if (decoded.exp < currentTime) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('expired', 'true');
      return NextResponse.redirect(loginUrl);
    }

    // Role-based access control
    const userRole = decoded.role;

    // Admin only routes
    const adminRoutes = ['/admin', '/super-admin'];
    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
    
    if (isAdminRoute && !['super_admin', 'admin'].includes(userRole)) {
      return NextResponse.redirect(new URL('/user/dashboard', request.url));
    }

    // Super admin only routes
    const superAdminRoutes = ['/super-admin'];
    const isSuperAdminRoute = superAdminRoutes.some(route => pathname.startsWith(route));
    
    if (isSuperAdminRoute && userRole !== 'super_admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    // User routes - redirect admins trying to access user dashboard
    const userRoutes = ['/user/dashboard'];
    const isUserRoute = userRoutes.some(route => pathname.startsWith(route));
    
    if (isUserRoute && userRole === 'super_admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    // Clear invalid token and redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('access_token');
    return response;
  }
}

// Export config for Next.js middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g., /favicon.ico)
     */
    '/((?!api|_next|_static|favicon.ico).*)',
  ],
};
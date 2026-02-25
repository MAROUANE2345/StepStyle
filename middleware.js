import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Read admin token
  const isLoggedIn = request.cookies.get("adminToken");

  // ✅ ONLY protect admin routes
  const isAdminRoute = pathname.startsWith("/admin") &&
                       pathname !== "/admin"; // allow login page

  // If trying to access admin pages without token → redirect to login
  if (isAdminRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Otherwise allow access
  return NextResponse.next();
}

// ✅ Run middleware ONLY on admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
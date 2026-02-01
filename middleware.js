import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Read auth cookie
  const isLoggedIn = request.cookies.get("adminToken");

  // List of routes to protect (excluding /admin)
  const protectedRoutes = [
    "/catalogue",
    "/aboutus",
    "/admin/adminadd",
    "/admin/adminmanage",
    "/admin/adminorder",
    "/aihelp",
    "/contact",
    "/order",
    "/wishlist",
    "/" // home page
  ];

  // Check if current path matches any protected route
  const isProtected = protectedRoutes.some(route => pathname === route || pathname.startsWith(route + "/"));

  // Redirect to login if not logged in and route is protected
  if (!isLoggedIn && isProtected) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

// Which routes the middleware should run on
export const config = {
  matcher: [
    "/catalogue/:path*",
    "/aboutus/:path*",
    "/admin/adminadd/:path*",
    "/admin/adminmanage/:path*",
    "/admin/adminorder/:path*",
    "/aihelp/:path*",
    "/contact/:path*",
    "/order/:path*",
    "/wishlist/:path*",
    "/" // protect home
  ],
};

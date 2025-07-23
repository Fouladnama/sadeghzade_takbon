import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/Admin") && pathname !== "/Admin/login") {
    const token = request.cookies.get("auth-token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/Admin/login", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/Admin/:path*"],
};

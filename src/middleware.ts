import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log("DEBUG:::: middleware is called");
    // NOTE: tokenがない場合はログインページにリダイレクト
    if (!req.nextUrl.pathname.startsWith("/login") && !req.nextauth.token) {
      return NextResponse.rewrite(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
    // Matches the pages config in `[...nextauth]`
    pages: {
      signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET!,
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

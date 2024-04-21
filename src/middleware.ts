import {
  NextMiddlewareWithAuth,
  NextRequestWithAuth,
  withAuth,
} from "next-auth/middleware";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

// // ミドルウェア１
// function middleware_1(middleware: NextMiddleware) {
//   return async (request: NextRequest, event: NextFetchEvent) => {
//     console.log("middleware1 is called");
//     return middleware(request, event);
//   };
// }

// // ミドルウェア2
// function middleware_2(middleware: NextMiddleware) {
//   return async (request: NextRequest, event: NextFetchEvent) => {
//     console.log("middleware2 is called");
//     return middleware(request, event);
//   };
// }

/**
 * 分割したmiddlewareをまとめるファクトリー関数
 */
const middlewareFactory = (
  middlewares: ((middleware: NextMiddleware) => NextMiddleware)[],
  index = 0
): NextMiddleware => {
  const currentMiddleware = middlewares[index];
  if (!currentMiddleware) {
    return () => {
      NextResponse.next();
    };
  }
  return currentMiddleware(middlewareFactory(middlewares, index + 1));
};

/**
 * 未認証でも閲覧できるページのパス配列
 */
const PUBLIC_PATHS = ["/login", "/"];

// function widthLogin(middleware?: NextMiddleware) {
// NextAuth.jsの認証ミドルウェアを実行
export const middleware = withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function _middleware(req, event) {
    // 認証ミドルウェアの処理
    console.log("withAuth is called");
    // 連結したmiddlewareをまとめて実行
    middlewareFactory([])(req, event);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (PUBLIC_PATHS.includes(req.nextUrl.pathname)) return true;
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

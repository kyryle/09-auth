import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parseSetCookie } from "cookie";
import { checkServerSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!accessToken) {
    if (refreshToken) {
      try {
      const data = await checkServerSession();
      const setCookie = data.headers["set-cookie"];

      let response: NextResponse;
      if (isPublicRoute) {
        response = NextResponse.redirect(new URL("/", request.url));
      } else if (isPrivateRoute) {
        response = NextResponse.next();
      } else {
        response = NextResponse.next();
      }

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parseSetCookie(cookieStr);

          if (
            parsed.value ||
            parsed.expires ||
            parsed.secure ||
            parsed.sameSite
          ) {
            const { name, value, ...options } = parsed;
            cookieStore.set(name, value ?? "", options);
            response.cookies.set(name, value ?? "", options);
            request.cookies.set(name, value ?? "");
          }
        }

        if (isPublicRoute) {
          return NextResponse.redirect(new URL("/", request.url));
        }

        if (isPrivateRoute) {
          return NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
        }
      }
      return response
      } catch (error) {
        console.log(error);
        return NextResponse.redirect(new URL("/", request.url));
    }
  } 

    if (isPublicRoute) {
      return NextResponse.next();
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isPrivateRoute) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};

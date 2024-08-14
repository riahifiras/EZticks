import { type NextRequest, NextResponse } from "next/server";
import { authenticatedUser } from "./app/utils/amplify-server-utils";

export async function middleware(request: NextRequest) {
    console.log("Middleware invoked:", request.nextUrl.pathname);
    
    const response = NextResponse.next();
    const user = await authenticatedUser({ request, response });

    console.log("Authenticated User:", user);

    const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
    const isOnTickets = request.nextUrl.pathname.startsWith("/tickets");

    if (isOnTickets ) {
        if (!user) {
            console.log("User not authenticated, redirecting to login.");
            return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
        }
        return response;
    }

    if (isOnDashboard ) {
        if (!user) {
            console.log("User not authenticated, redirecting to login.");
            return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
        }

        if (!user.isAdmin) {
            console.log("User is not admin, redirecting to dashboard.");
            return NextResponse.redirect(new URL("/", request.nextUrl));
        }

        console.log("User authenticated, proceeding to dashboard.");
        return response;
    }

    if (user) {
        const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
        if (isAuthPage) {
            console.log("User already authenticated, redirecting to home.");
            return NextResponse.redirect(new URL("/", request.nextUrl));
        }
    }

    console.log("No special handling, proceeding normally.");
    return response;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

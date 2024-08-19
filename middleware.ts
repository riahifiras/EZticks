import { type NextRequest, NextResponse } from "next/server";
import { authenticatedUser } from "./app/utils/amplify-server-utils";

export async function middleware(request: NextRequest) {
    
    const response = NextResponse.next();
    const user = await authenticatedUser({ request, response });


    const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
    const isOnTickets = request.nextUrl.pathname.startsWith("/tickets");

    if (isOnTickets ) {
        if (!user) {
            return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
        }
        return response;
    }

    if (isOnDashboard ) {
        if (!user) {
            return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
        }

        if (!user.isAdmin) {
            return NextResponse.redirect(new URL("/", request.nextUrl));
        }

        return response;
    }

    if (user) {
        const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
        if (isAuthPage) {
            return NextResponse.redirect(new URL("/", request.nextUrl));
        }
    }

    return response;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

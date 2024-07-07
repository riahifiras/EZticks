import { type NextRequest, NextResponse } from "next/server";
import { authenticatedUser } from "./app/utils/amplify-server-utils";

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const user = await authenticatedUser({request, response});

    const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
    const isOnAdminArea = request.nextUrl.pathname.startsWith("/dashboard/admins");
    

    if(isOnDashboard){
        if(!user) return NextResponse.redirect(new URL("/auth/login", request.nextUrl));

        if(isOnAdminArea && !user.isAdmin) return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
        return response;
    } else if (user) {
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }

}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
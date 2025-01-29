import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function middleware(request: Request) {

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-url', request.url);

    const token = (await cookies()).get("anilist_token")?.value;
    if (!token && (request.url.includes("profile") || request.url.includes("settings"))) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        }
    });
}
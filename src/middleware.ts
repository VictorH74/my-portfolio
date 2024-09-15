import { type NextRequest } from 'next/server';
import { authMiddleware } from './middleware/authMiddleware';
import { intlMiddleware } from './middleware/intlMiddleware';

export function middleware(req: NextRequest) {
    const authResponse = authMiddleware(req);
    if (authResponse) {
        return authResponse; // redirect response
    }

    return intlMiddleware(req);
}

export const config = {
    matcher: ['/', '/(pt-br|en)/:path*', '/admin/:path*'],
};

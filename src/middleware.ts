import { intlMiddleware } from './middlewares/intlMiddleware';
import { NextRequest } from 'next/server';
import { authMiddleware } from './middlewares/authMiddleware';

export default async function middleware(req: NextRequest) {
    const authResponse = await authMiddleware(req);
    if (authResponse) {
        return authResponse; // redirect response
    }

    return intlMiddleware(req);
}

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(pt-br|en)/:path*'],
};

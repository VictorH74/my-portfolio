import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const ProtectedRoutes = ['/admin'];

export const authMiddleware = (req: NextRequest) => {
    const recoveredToken = cookies().get('firebase_token')?.value;

    if (!!recoveredToken && req.nextUrl.pathname.includes('/admin/login'))
        return Response.redirect(new URL(ProtectedRoutes[0], req.url));
    if (
        !recoveredToken &&
        ProtectedRoutes.some(
            (pathName) =>
                req.url.includes(pathName) && !req.url.includes('/login')
        )
    ) {
        return Response.redirect(new URL('admin/login', req.url));
    }

    return undefined;
};

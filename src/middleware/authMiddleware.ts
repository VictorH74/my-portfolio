import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const ProtectedRoutes = ['/admin'];

export const authMiddleware = (req: NextRequest) => {
    const recoveredToken = cookies().get('recoveredToken')?.value;

    if (!!recoveredToken && req.nextUrl.pathname.startsWith('/admin/login'))
        return Response.redirect(new URL(ProtectedRoutes[0], req.url));
    if (
        !recoveredToken &&
        ProtectedRoutes.some((path) => req.url.startsWith(path))
    )
        return Response.redirect(new URL('/login', req.url));

    return undefined;
};

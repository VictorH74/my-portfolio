import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
const ProtectedRoutes = ['/admin'];
const LogOutRoutes = ['/admin/login'];

export const authMiddleware = (req: NextRequest) => {
    const token = cookies().get('token')?.value;

    if (
        token &&
        LogOutRoutes.some((path) => req.nextUrl.pathname.startsWith(path))
    )
        return Response.redirect(new URL(ProtectedRoutes[0], req.url));
    if (!token && ProtectedRoutes.some((path) => req.url.startsWith(path)))
        return Response.redirect(new URL('/login', req.url));

    return undefined;
};

import { defineRouting } from 'next-intl/routing';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { LANGUAGES } from '@/utils/server-constants';
export const routing = defineRouting({
    // A list of all locales that are supported
    locales: LANGUAGES,

    // Used when no locale matches
    defaultLocale: 'en',
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
    createSharedPathnamesNavigation(routing);

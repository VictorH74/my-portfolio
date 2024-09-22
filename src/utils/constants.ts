'use client';
import {
    MuiIconType,
    ProfileContactsType,
    RGBType,
    ThemeColorType,
} from '@/types';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export const BRAZIL_PHONE_PATTERN = '\\d{13}';

export const THEME_COLOR_KEY = 'theme-color';

export const EMAILJS_SERVICE_ID =
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
    (() => {
        throw new Error('EMAILJS_SERVICE_ID not defined');
    })();

export const EMAILJS_TEMPLATE_ID =
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
    (() => {
        throw new Error('EMAILJS_TEMPLATE_ID not defined');
    })();

export const EMAILJS_PUBLIC_KEY =
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ||
    (() => {
        throw new Error('EMAILJS_PUBLIC_KEY not defined');
    })();

const RGBValuesArray: RGBType[] = [
    [53, 167, 119],
    [0, 153, 255],
    [255, 102, 0],
    [253, 78, 78],
];

export const THEME_COLORS: ThemeColorType[] = RGBValuesArray.map((v) => ({
    RGBValues: v,
    color: `rgb(${v[0]}, ${v[1]}, ${v[2]})`,
}));

export const contactIcon: Record<keyof ProfileContactsType, MuiIconType> = {
    email: EmailIcon,
    github_url: GitHubIcon,
    linkedin_url: LinkedInIcon,
    phone: WhatsAppIcon,
};

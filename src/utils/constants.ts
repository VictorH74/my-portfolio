export const THEME_COLOR_KEY = "theme-color"

export const EMAILJS_SERVICE_ID =
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
    (() => {
        throw new Error("EMAILJS_SERVICE_ID not defined");
    })();

export const EMAILJS_TEMPLATE_ID =
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
    (() => {
        throw new Error("EMAILJS_TEMPLATE_ID not defined");
    })();

export const EMAILJS_PUBLIC_KEY =
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ||
    (() => {
        throw new Error("EMAILJS_PUBLIC_KEY not defined");
    })();
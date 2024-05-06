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

// rgb(78, 84, 253)
// rgb(53, 167, 119)
// rgb(253, 78, 78)
const RGBValuesArray: [number, number, number][] = [
    [78, 84, 253],
    [53, 167, 119],
    [253, 78, 78],
]

export const THEME_COLORS = RGBValuesArray.map(v => ({
    RGBValues: v,
    color: `rgb(${v[0]}, ${v[1]}, ${v[2]})`
}))
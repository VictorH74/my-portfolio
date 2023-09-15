export const TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || (() => {throw new Error("NEXT_PUBLIC_GITHUB_TOKEN not defined")})()

export const THEME_COLOR_KEY = "vh_portfolio-theme_color"
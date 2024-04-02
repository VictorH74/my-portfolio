import { TechIcons } from "@/types";

const gistId = "ee56f0e7ddea13681b411f97b7f20fe5";
export const fetchTechnologies = async (cb?: (d: TechIcons[]) => void) => {
    const res = await fetch(`https://api.github.com/gists/${gistId}`);
    const data = await res.json()

    if (!data.files) return undefined;

    const content = JSON.parse(data.files["skills.json"].content) as TechIcons[];
    if (cb) cb(content)
    return content
}
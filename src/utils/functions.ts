import { TechIcons } from "@/types";

const gistId = "ee56f0e7ddea13681b411f97b7f20fe5";
export const fetchTechnologies = async (cb?: (d: TechIcons[]) => void) => {
    const data = await fetchTechnologiesGist()

    if (!data.files) return undefined;

    const content = JSON.parse(data.files["skills.json"].content) as TechIcons[];
    if (cb) cb(content)
    return content
}

export const fetchTechnologiesGist = async () => {
    const res = await fetch(`https://api.github.com/gists/${gistId}`);
    const data = await res.json()
    return data
}
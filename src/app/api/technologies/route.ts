import { TechIcons } from "@/types";

export const GIST_ID = process.env.GIST_ID || 
 (() => { throw new Error("No Gist Id provided") })()

 export const GIST_URL = process.env.GIST_URL || 
 (() => { throw new Error("No Gist URL provided") })()

export const GITHUB_GIST_TOKEN = process.env.GITHUB_GIST_TOKEN ||
 (() => { throw new Error("No Gist Token provided") })()

const gistUrl = `${GIST_URL}/${GIST_ID}`

export async function GET(req: Request) {
    const res = await fetch(gistUrl);
    const gist = await res.json()

    if (!gist.files) return Response.json({ "message": "error" });

    const content = JSON.parse(gist.files["skills.json"].content) as TechIcons[];
    return Response.json(content)
}

export async function POST(req: Request) {
    const res = await fetch(gistUrl);
    const data = await res.json()

    if (!data.files) return Response.error();

    const contentData = req.body as any;

    await fetch(gistUrl, {
        method: "PATCH",
        headers: {
            Authorization: `token ${GITHUB_GIST_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            files: {
                "skills.json": {
                    ...data.files["skills.json"],
                    content: JSON.stringify(contentData),
                },
            },
        }),
    })

    return Response.json({ "message": "ok", "status": 201 })
}
"use client"

import { useTheme } from "@/hooks/UseTheme";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
    const { pending } = useFormStatus()
    const { themeColor } = useTheme();

    return (
        <button
            className='p-2 rounded-md font-semibold hover:scale-[101%] hover:shadow-md duration-200'
            style={{ backgroundColor: themeColor.color }}
            type="submit"
            disabled={pending}
        >{pending ? "Submitting..." : "Submit"}</button>
    )
}
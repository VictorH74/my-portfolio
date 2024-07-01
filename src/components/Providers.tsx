import SkillsProvider from "@/contexts/SkillsContext";
import { ThemeProvider } from "@/contexts/ThemeColor";
import { PropsWithChildren } from "react";

export default function Providers(props: PropsWithChildren) {
    return (
        <SkillsProvider>
            <ThemeProvider>
                {props.children}
            </ThemeProvider>
        </SkillsProvider>

    )
}
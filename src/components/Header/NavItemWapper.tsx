import { useTheme } from "@/hooks/UseTheme";

export type WapperDimensionsType = {
    width: number;
    height: number;
    left: number;
}

interface NavItemWapperProps {
    wrapperDimensions: WapperDimensionsType
    wrapperDisplay: string
}

export default function NavItemWapper(props: NavItemWapperProps) {
    const { themeColor } = useTheme();
    return (
        <div
            className={`absolute rounded-[20px] duration-200 pointer-events-none z-[3]`}
            style={{
                ...props.wrapperDimensions,
                backgroundColor: themeColor.color,
                display: props.wrapperDisplay || "none",
            }}
        />
    )
}
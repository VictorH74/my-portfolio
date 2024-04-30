import { useTheme } from "@/hooks/UseTheme";
import React from "react";

interface ButtonProps {
    onClick(): void;
    children: React.ReactElement;
}

export default function Button(props: ButtonProps) {
    const { themeColor } = useTheme();

    return (<button style={{ backgroundColor: themeColor }} className="p-2 rounded-md hover:scale-105 duration-200" onClick={props.onClick}>{props.children}</button>)
}
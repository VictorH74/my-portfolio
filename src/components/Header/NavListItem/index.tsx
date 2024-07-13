import React from "react"
import { twMerge } from "tailwind-merge"

export interface NavListItemProps {
    className?: string
    id: string
    onClick?: () => void
    onMouseOver?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
    children?: React.ReactNode
    onPageTop: boolean
    onFocused: boolean
}

export default function NavListItem(props: NavListItemProps) {
    return (
        <li
            className={twMerge("cursor-pointer list-none italic text-sm uppercase select-none duration-150", props.className, props.onPageTop
                ? props.onFocused
                    ? "text-[#ececec]"
                    : "primary-font-color"
                : "text-[#ececec]")}
            id={props.id}
            onClick={props.onClick}
            onMouseOver={props.onMouseOver}
        >
            {props.children}
        </li>
    )
}
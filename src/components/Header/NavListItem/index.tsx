import React from "react"
import { twMerge } from "tailwind-merge"

interface NavListItemProps {
    className?: string
    id: string
    onClick?: () => void
    onMouseOver?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
    children: React.ReactNode

}

export default function NavListItem(props: NavListItemProps) {
    return (
        <li
            className={twMerge("cursor-pointer list-none italic text-sm uppercase select-none duration-150", props.className)}
            id={props.id}
            onClick={props.onClick}
            onMouseOver={props.onMouseOver}
        >
            {props.children}
        </li>
    )
}
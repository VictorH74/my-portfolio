"use client"
import React from "react"

const ModalContainer: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    React.useEffect(() => {
        const paddingRight = window.innerWidth - document.documentElement.clientWidth
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${paddingRight}px`;
        return () => {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        }
    }, [])

    return (
        <div className="fixed inset-0 bg-black/70 grid place-items-center">
            {children}
        </div>
    )
}

export default ModalContainer
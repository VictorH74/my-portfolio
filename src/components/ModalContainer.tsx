import React from "react"

const ModalContainer: React.FC<{ children: React.ReactElement }> = ({ children }) => (<div className="absolute inset-0 bg-black/70 grid place-items-center">
    {children}
</div>)

export default ModalContainer
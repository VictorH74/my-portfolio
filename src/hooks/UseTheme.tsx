import React from "react"
import { ThemeContext } from "@/contexts/ThemeColor"

export const useTheme = () => React.useContext(ThemeContext)
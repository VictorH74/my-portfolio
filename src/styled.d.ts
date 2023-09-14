import 'styled-components';

interface IPalette {
  bg: string
  text: string
  text_2: string | undefined
}

declare module 'styled-components' {
  export interface DefaultTheme {
    dark: IPalette
    light: IPalette
   }
}
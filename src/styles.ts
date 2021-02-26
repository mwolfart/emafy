import { mainPalette, Palette } from 'palette'

export type Styles = {
  shadowDimensionsDefault: string
  shadowDimensionsLarge: string
  shadowDefault: string
  shadowAccent: string
  borderRadiusDefault: string
  borderRadiusSmall: string
  fontStyle: string
  fontBoldOne: string
  fontBoldTwo: string
  fontBoldThree: string
  fontSizeTiny: string
  fontSizeParagraph: string
  fontSizeTitle: string
  lineHeightSimple: string
  imageSizeSmall: string
  imageSizeMedium: string
  transitionQuick: string
  palette: Palette
}

export const mainStyles: Styles = {
  shadowDimensionsDefault: '0px 60px 80px',
  shadowDimensionsLarge: '0px 80px 100px',
  shadowDefault: '#0000002a',
  shadowAccent: '#00000045',
  borderRadiusDefault: '16px',
  borderRadiusSmall: '12px',
  fontStyle: "Montserrat, 'Trebuchet MS', Arial, sans-serif",
  fontBoldOne: '400',
  fontBoldTwo: '600',
  fontBoldThree: '700',
  fontSizeTiny: '12px',
  fontSizeParagraph: '16px',
  fontSizeTitle: '24px',
  imageSizeSmall: '100px',
  imageSizeMedium: '200px',
  lineHeightSimple: '28px',
  transitionQuick: '0.3s ease',
  palette: mainPalette,
}
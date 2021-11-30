import { mainPalette, Palette } from 'palette'

export type Styles = {
  shadowDimensionsDefault: string
  shadowDimensionsLarge: string
  shadowDefault: string
  shadowAccent: string
  borderRadiusDefault: string
  borderRadiusSmall: string
  borderRadiusMedium: string
  borderRadiusLarge: string
  fontStyle: string
  fontBoldOne: string
  fontBoldTwo: string
  fontBoldThree: string
  fontSizeTiny: string
  fontSizeParagraph: string
  fontSizeTitle: string
  fontSizeGiant: string
  fontSizeIcon: string
  imageSizeIcon: string
  imageSizeSmall: string
  imageSizeMedium: string
  lineHeightSimple: string
  divSpacingSmall: string
  divSpacingMedium: string
  divSpacingBig: string
  divSpacingExtraBig: string
  transitionQuick: string
  transitionQuickDelayed: string
  palette: Palette
}

export const mainStyles: Styles = {
  shadowDimensionsDefault: '0px 60px 80px',
  shadowDimensionsLarge: '0px 80px 100px',
  shadowDefault: '#0000002a',
  shadowAccent: '#00000045',
  borderRadiusDefault: '16px',
  borderRadiusSmall: '12px',
  borderRadiusMedium: '24px',
  borderRadiusLarge: '32px',
  fontStyle: "Montserrat, 'Trebuchet MS', Arial, sans-serif",
  fontBoldOne: '400',
  fontBoldTwo: '600',
  fontBoldThree: '700',
  fontSizeTiny: '12px',
  fontSizeParagraph: '16px',
  fontSizeIcon: '20px',
  fontSizeTitle: '24px',
  fontSizeGiant: '36px',
  imageSizeIcon: '48px',
  imageSizeSmall: '100px',
  imageSizeMedium: '200px',
  lineHeightSimple: '28px',
  divSpacingSmall: '10px',
  divSpacingMedium: '20px',
  divSpacingBig: '30px',
  divSpacingExtraBig: '50px',
  transitionQuick: '0.3s ease',
  transitionQuickDelayed: '0.3s ease 0.2s',
  palette: mainPalette,
}

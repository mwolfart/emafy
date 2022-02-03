import { mainPalette } from 'palette'
import { DefaultTheme } from 'styled-components'

export const defaultTheme: DefaultTheme = {
  shadowDimensionsDefault: '0px 60px 80px',
  shadowDimensionsLarge: '0px 80px 100px',
  shadowDimensionsSmall: '0px 40px 60px',
  shadowDimensionsTiny: '0px 20px 40px',
  shadowDefault: '#0000002a',
  shadowAccent: '#00000045',
  borderRadiusDefault: '16px',
  borderRadiusSmall: '12px',
  borderRadiusMedium: '24px',
  borderRadiusLarge: '32px',
  borderRadiusImage: '96px',
  fontStyle: "Montserrat, 'Trebuchet MS', Arial, sans-serif",
  fontBoldOne: '400',
  fontBoldTwo: '600',
  fontBoldThree: '700',
  fontSizeTiny: '12px',
  fontSizeParagraph: '16px',
  fontSizeIcon: '20px',
  fontSizeTitle: '24px',
  fontSizeGiant: '36px',
  fontSizeTitleResponsive: '20px',
  fontSizeParagraphResponsive: '14px',
  imageSizeIcon: '48px',
  imageSizeSmall: '100px',
  imageSizeMedium: '200px',
  sidebarIconBig: '27px',
  sidebarIconMedium: '20px',
  sidebarIconSmall: '14px',
  lineHeightSimple: '28px',
  divSpacingSmall: '10px',
  divSpacingMedium: '20px',
  divSpacingBig: '30px',
  divSpacingExtraBig: '50px',
  transitionQuick: '0.3s ease',
  transitionQuickDelayed: '0.3s ease 0.2s',
  sidebarWidth: '67px',
  topbarHeight: '90px',
  palette: mainPalette,
}

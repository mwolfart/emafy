import 'styled-components'

interface IPalette {
  colorPrimary: string
  colorSecondary: string
  colorTertiary: string
  colorBackground: string
  colorTextTitle: string
  colorTextParagraph: string
  colorTextNegative: string
  colorTextButton: string
  colorWhite: string
  colorGray900: string
  colorGray700: string
  colorGray600: string
  colorGray500: string
  colorGray300: string
  colorGray200: string
  colorGray100: string
  gradientButton: string
  gradientBanner: string
  gradientBannerInactive: string
  gradientPlayerProgress: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    shadowDimensionsDefault: string
    shadowDimensionsLarge: string
    shadowDimensionsSmall: string
    shadowDimensionsTiny: string
    shadowDefault: string
    shadowAccent: string
    borderRadiusDefault: string
    borderRadiusSmall: string
    borderRadiusMedium: string
    borderRadiusLarge: string
    borderRadiusExtraLarge: string
    borderRadiusImage: string
    fontStyle: string
    fontBoldOne: string
    fontBoldTwo: string
    fontBoldThree: string
    fontSizeTiny: string
    fontSizeParagraph: string
    fontSizeTitle: string
    fontSizeGiant: string
    fontSizeIcon: string
    fontSizeTitleResponsive: string
    fontSizeParagraphResponsive: string
    imageSizeIcon: string
    imageSizeSmall: string
    imageSizeMedium: string
    sidebarIconBig: string
    sidebarIconMedium: string
    sidebarIconSmall: string
    lineHeightSimple: string
    divSpacingSmall: string
    divSpacingMedium: string
    divSpacingBig: string
    divSpacingExtraBig: string
    divSpacingPlayerButton: string
    divSpacingPlayerButtonLarge: string
    divDistanceSmall: string
    divDistanceMedium: string
    inputSliderHeight: string
    inputSliderBorderRadius: string
    inputSliderShadow: string
    inputSliderThumbSize: string
    transitionQuick: string
    transitionQuickDelayed: string
    sidebarWidth: string
    topbarHeight: string
    playerHeight: string
    playerQueueWidth: string
    progressBarSize: string
    palette: Palette
  }
}

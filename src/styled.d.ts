import 'styled-components'

interface IPalette {
  colorPrimary: string
  colorSecondary: string
  colorTertiary: string
  colorButtonIntermed: string
  colorTextParagraph: string
  colorTextTitle: string
  colorTextTitleLarge: string
  colorTextSubtitleLarge: string
  colorTextButton: string
  colorTextDisabled: string
  colorTextSidebar: string
  colorBackground: string
  colorBackgroundSidebar: string
  colorBackgroundDisabled: string
  colorBackgroundBannerEdge: string
  colorBackgroundBannerCenter: string
  colorBackgroundBannerText: string
  colorLinkBackground: string
  colorLinkBackgroundHover: string
  colorImageBackground: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    shadowDimensionsDefault: string
    shadowDimensionsLarge: string
    shadowDefault: string
    shadowAccent: string
    borderRadiusDefault: string
    borderRadiusSmall: string
    borderRadiusMedium: string
    borderRadiusLarge: string
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
    sidebarWidth: string
    topbarHeight: string
    palette: Palette
  }
}

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
  colorTextWhite: string
  colorBackground: string
  colorBackgroundSidebar: string
  colorBackgroundDisabled: string
  colorBackgroundBannerEdge: string
  colorBackgroundBannerCenter: string
  colorBackgroundBannerText: string
  colorLinkBackground: string
  colorLinkBackgroundHover: string
  colorImageBackground: string
  colorTrackProgress: string
  colorGray: string
  colorWhite: string
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

// Naive UI 主题配置 - 全面基于 Naive UI 的 themeOverrides 系统
import { computed, ref, watch } from 'vue'

import { darkTheme, lightTheme, type GlobalThemeOverrides, type GlobalTheme } from 'naive-ui'
import { pinia } from '../plugins/pinia'
import { useGlobalSettings } from '../stores/settings/useGlobalSettings'

// 当前主题ID
export const currentThemeId = ref<string>('light')

// 主题类型定义
export interface ThemeConfig {
  id: string
  labelKey: string
  naiveTheme: GlobalTheme | null
  themeOverrides: GlobalThemeOverrides
}

// 纯Naive UI主题配置 - 完全消除CSS依赖
export const naiveThemeConfigs: Record<string, ThemeConfig> = {
  light: {
    id: 'light',
    labelKey: 'theme.light',
    naiveTheme: lightTheme,
    themeOverrides: {
      common: {
        primaryColor: '#327c6f',
        primaryColorHover: '#3d8e80',
        primaryColorPressed: '#266358',
        primaryColorSuppl: '#4ca594',
        successColor: '#369e76',
        successColorHover: '#42af84',
        successColorPressed: '#2b8462',
        successColorSuppl: '#ebf7f2',
        errorColor: '#e05663',
        errorColorHover: '#ea6975',
        errorColorPressed: '#cb4350',
        errorColorSuppl: '#fdf0f1',
        warningColor: '#dd7d29',
        warningColorHover: '#e88d3d',
        warningColorPressed: '#c76b1c',
        warningColorSuppl: '#fdf4ec',
        infoColor: '#3b82f6',
        infoColorHover: '#60a5fa',
        infoColorPressed: '#2563eb',
        infoColorSuppl: '#eff6ff',
        bodyColor: '#f6f8f7',
        cardColor: '#ffffff',
        modalColor: '#ffffff',
        popoverColor: '#ffffff',
        tableColor: '#fafbfc',
        actionColor: '#f0f5f3',
        hoverColor: 'rgba(50, 124, 111, 0.07)',
        textColorBase: '#1e2926',
        textColor1: '#1e2926',
        textColor2: '#4d5e59',
        textColor3: '#788a85',
        textColorDisabled: 'rgba(30, 41, 38, 0.38)',
        placeholderColor: '#9fb0aa',
        placeholderColorDisabled: 'rgba(159, 176, 170, 0.55)',
        borderColor: '#e3ece7',
        dividerColor: '#ebf1ee',
        scrollbarColor: 'rgba(77, 94, 89, 0.22)',
        scrollbarColorHover: 'rgba(50, 124, 111, 0.38)',
        closeIconColor: 'rgba(77, 94, 89, 0.65)',
        closeIconColorHover: '#327c6f',
        closeIconColorPressed: '#266358',
        clearColor: 'rgba(77, 94, 89, 0.2)',
        clearColorHover: 'rgba(50, 124, 111, 0.28)',
        clearColorPressed: 'rgba(50, 124, 111, 0.4)',
        boxShadow1: '0 1px 3px rgba(22, 40, 35, 0.04), 0 4px 14px -2px rgba(22, 40, 35, 0.05)',
        boxShadow2: '0 4px 12px -1px rgba(22, 40, 35, 0.06), 0 12px 28px -4px rgba(22, 40, 35, 0.09)',
        boxShadow3: '0 12px 32px -4px rgba(22, 40, 35, 0.08), 0 24px 60px -8px rgba(22, 40, 35, 0.12)',
        borderRadius: '12px',
        borderRadiusSmall: '8px',
        lineHeight: '1.6',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif'
      },
      Button: {
        textColorPrimary: '#ffffff',
        textColorHoverPrimary: '#ffffff',
        textColorPressedPrimary: '#ffffff',
        textColorFocusPrimary: '#ffffff',
        textColorDisabledPrimary: 'rgba(255, 255, 255, 0.65)',
        colorPrimary: '#327c6f',
        colorHoverPrimary: '#3d8e80',
        colorPressedPrimary: '#266358',
        colorFocusPrimary: '#327c6f',
        colorDisabledPrimary: '#a6cfc8',
        borderPrimary: '1px solid #327c6f',
        borderHoverPrimary: '1px solid #3d8e80',
        borderPressedPrimary: '1px solid #266358',
        borderFocusPrimary: '1px solid #327c6f',
        borderDisabledPrimary: '1px solid #a6cfc8',
        rippleColorPrimary: 'rgba(50, 124, 111, 0.25)',
        textColor: '#3d4f4a',
        textColorHover: '#266358',
        textColorPressed: '#1e2926',
        color: '#f8faf9',
        colorHover: '#eef4f1',
        colorPressed: '#e3ece8',
        border: '1px solid #e1ebe6',
        borderHover: '1px solid #b8d2c9',
        borderPressed: '1px solid #9fc1b6',
        borderRadiusMedium: '10px',
        borderRadiusSmall: '8px',
        borderRadiusLarge: '12px',
        fontWeight: '500'
      },
      Input: {
        color: '#ffffff',
        colorDisabled: '#f4f7f6',
        colorFocus: '#ffffff',
        textColor: '#1e2926',
        textColorDisabled: 'rgba(30, 41, 38, 0.42)',
        placeholderColor: '#9fb0aa',
        placeholderColorDisabled: 'rgba(159, 176, 170, 0.58)',
        iconColor: '#8a9b96',
        iconColorHover: '#4d756d',
        iconColorPressed: '#327c6f',
        iconColorDisabled: 'rgba(138, 155, 150, 0.45)',
        clearColor: 'rgba(77, 94, 89, 0.22)',
        clearColorHover: 'rgba(50, 124, 111, 0.32)',
        clearColorPressed: 'rgba(50, 124, 111, 0.45)',
        border: '1px solid #dce6e1',
        borderDisabled: '1px solid rgba(220, 230, 225, 0.7)',
        borderHover: '1px solid #b2cec4',
        borderFocus: '1px solid #5fa699',
        boxShadowFocus: '0 0 0 3px rgba(50, 124, 111, 0.14)',
        caretColor: '#327c6f',
        suffixTextColor: '#6a7d77',
        prefixTextColor: '#6a7d77',
        borderRadius: '10px'
      },
      Card: {
        color: '#ffffff',
        colorModal: '#ffffff',
        colorTarget: '#ffffff',
        textColor: '#1e2926',
        titleTextColor: '#16221f',
        borderColor: '#e3ece7',
        actionColor: '#f7faf8',
        closeIconColor: '#8a9b96',
        closeIconColorHover: '#4d756d',
        closeIconColorPressed: '#327c6f',
        borderRadius: '14px',
        boxShadow: '0 1px 3px rgba(22, 40, 35, 0.04), 0 6px 18px -2px rgba(22, 40, 35, 0.06)'
      },
      Tabs: {
        tabColor: '#f3f6f4',
        tabColorActive: '#e6ede9',
        tabBorderColor: '#e3ece7',
        tabTextColorBar: '#5d706a',
        tabTextColorBarHover: '#327c6f',
        tabTextColorBarActive: '#1e2926',
        tabTextColorCard: '#5d706a',
        tabTextColorCardActive: '#1e2926',
        barColor: '#327c6f',
        borderRadius: '8px'
      },
      Radio: {
        buttonBorderColor: '#e3ece7',
        buttonBorderColorActive: '#b8d2c9',
        buttonColor: '#f6f8f7',
        buttonColorActive: '#e6ede9',
        buttonTextColor: '#5d706a',
        buttonTextColorActive: '#1e2926',
        buttonBoxShadowFocus: '0 0 0 2px rgba(50, 124, 111, 0.16)'
      },
      Dropdown: {
        color: '#ffffff',
        optionTextColor: '#4d5e59',
        optionTextColorHover: '#1e2926',
        optionTextColorActive: '#1e2926',
        optionColorHover: '#f2f6f4',
        optionColorActive: '#e6ede9',
        borderColor: '#e3ece7',
        borderRadius: '10px',
        boxShadow: '0 4px 14px -1px rgba(22, 40, 35, 0.08), 0 12px 28px -4px rgba(22, 40, 35, 0.1)'
      },
      Popover: {
        color: '#ffffff',
        textColor: '#1e2926',
        borderColor: '#e3ece7',
        borderRadius: '10px',
        boxShadow: '0 4px 14px -1px rgba(22, 40, 35, 0.08), 0 12px 28px -4px rgba(22, 40, 35, 0.1)'
      },
      Modal: {
        boxShadow: '0 12px 32px -4px rgba(22, 40, 35, 0.09), 0 24px 60px -8px rgba(22, 40, 35, 0.14)',
        borderRadius: '16px'
      },
      Dialog: {
        borderRadius: '16px',
        boxShadow: '0 12px 32px -4px rgba(22, 40, 35, 0.09), 0 24px 60px -8px rgba(22, 40, 35, 0.14)'
      },
      Tooltip: {
        borderRadius: '8px',
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.15)'
      },
      Tag: {
        borderRadius: '6px'
      }
    }
  },

  dark: {
    id: 'dark', 
    labelKey: 'theme.dark',
    naiveTheme: darkTheme,
    themeOverrides: {
      common: {
        primaryColor: '#4ea898',
        primaryColorHover: '#5ec2b1',
        primaryColorPressed: '#3b8c7e',
        primaryColorSuppl: '#2d685e',
        successColor: '#3ec98d',
        successColorHover: '#56dba2',
        successColorPressed: '#2da872',
        successColorSuppl: '#194936',
        errorColor: '#f06471',
        errorColorHover: '#f87a86',
        errorColorPressed: '#d24754',
        errorColorSuppl: '#4d1c22',
        warningColor: '#f09d43',
        warningColorHover: '#f7af5e',
        warningColorPressed: '#cf7e28',
        warningColorSuppl: '#4d2e11',
        infoColor: '#4f96fc',
        infoColorHover: '#6ba8fd',
        infoColorPressed: '#327ef2',
        infoColorSuppl: '#15315b',
        bodyColor: '#121715',
        cardColor: '#1a221f',
        modalColor: '#1e2724',
        popoverColor: '#1e2724',
        tableColor: '#161d1b',
        actionColor: '#212d29',
        hoverColor: 'rgba(78, 168, 152, 0.12)',
        textColorBase: '#e8f0ed',
        textColor1: '#e8f0ed',
        textColor2: '#a4b8b1',
        textColor3: '#738781',
        textColorDisabled: 'rgba(232, 240, 237, 0.35)',
        placeholderColor: '#60746e',
        placeholderColorDisabled: 'rgba(96, 116, 110, 0.45)',
        borderColor: '#293632',
        dividerColor: '#232d29',
        scrollbarColor: 'rgba(100, 130, 122, 0.28)',
        scrollbarColorHover: 'rgba(78, 168, 152, 0.45)',
        closeIconColor: 'rgba(164, 184, 177, 0.65)',
        closeIconColorHover: '#4ea898',
        closeIconColorPressed: '#3b8c7e',
        clearColor: 'rgba(164, 184, 177, 0.25)',
        clearColorHover: 'rgba(78, 168, 152, 0.35)',
        clearColorPressed: 'rgba(78, 168, 152, 0.48)',
        boxShadow1: '0 1px 3px rgba(0, 0, 0, 0.2), 0 4px 14px -2px rgba(0, 0, 0, 0.3)',
        boxShadow2: '0 4px 12px -1px rgba(0, 0, 0, 0.28), 0 12px 28px -4px rgba(0, 0, 0, 0.38)',
        boxShadow3: '0 12px 32px -4px rgba(0, 0, 0, 0.35), 0 24px 60px -8px rgba(0, 0, 0, 0.5)',
        borderRadius: '12px',
        borderRadiusSmall: '8px',
        lineHeight: '1.6',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif'
      },
      Button: {
        textColorPrimary: '#0f1715',
        textColorHoverPrimary: '#0f1715',
        textColorPressedPrimary: '#0f1715',
        textColorFocusPrimary: '#0f1715',
        textColorDisabledPrimary: 'rgba(15, 23, 21, 0.65)',
        colorPrimary: '#4ea898',
        colorHoverPrimary: '#5ec2b1',
        colorPressedPrimary: '#3b8c7e',
        colorFocusPrimary: '#4ea898',
        colorDisabledPrimary: '#254e46',
        borderPrimary: '1px solid #4ea898',
        borderHoverPrimary: '1px solid #5ec2b1',
        borderPressedPrimary: '1px solid #3b8c7e',
        borderFocusPrimary: '1px solid #4ea898',
        borderDisabledPrimary: '1px solid #254e46',
        rippleColorPrimary: 'rgba(78, 168, 152, 0.3)',
        textColor: '#cbd8d3',
        textColorHover: '#e8f0ed',
        textColorPressed: '#b5c6c0',
        color: '#1e2724',
        colorHover: '#26332f',
        colorPressed: '#1b2421',
        border: '1px solid #2e3d38',
        borderHover: '1px solid #41554f',
        borderPressed: '1px solid #2e3d38',
        borderRadiusMedium: '10px',
        borderRadiusSmall: '8px',
        borderRadiusLarge: '12px',
        fontWeight: '500'
      },
      Input: {
        color: '#18201d',
        colorDisabled: '#141a18',
        colorFocus: '#1b2421',
        textColor: '#e8f0ed',
        textColorDisabled: 'rgba(232, 240, 237, 0.35)',
        placeholderColor: '#60746e',
        placeholderColorDisabled: 'rgba(96, 116, 110, 0.35)',
        border: '1px solid #2e3d38',
        borderDisabled: '1px solid rgba(46, 61, 56, 0.6)',
        borderHover: '1px solid #445952',
        borderFocus: '1px solid #4ea898',
        boxShadowFocus: '0 0 0 3px rgba(78, 168, 152, 0.18)',
        caretColor: '#4ea898',
        borderRadius: '10px'
      },
      Card: {
        color: '#1a221f',
        colorModal: '#1e2724',
        colorTarget: '#1a221f',
        textColor: '#e8f0ed',
        titleTextColor: '#f3f7f5',
        borderColor: '#293632',
        actionColor: '#1f2a26',
        borderRadius: '14px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.22), 0 8px 24px -2px rgba(0, 0, 0, 0.32)'
      },
      Tabs: {
        tabColor: '#1a221f',
        tabColorActive: '#24302c',
        tabBorderColor: '#293632',
        tabTextColorBar: '#8da29b',
        tabTextColorBarHover: '#4ea898',
        tabTextColorBarActive: '#e8f0ed',
        tabTextColorCard: '#8da29b',
        tabTextColorCardActive: '#e8f0ed',
        barColor: '#4ea898',
        borderRadius: '8px'
      },
      Radio: {
        buttonBorderColor: '#293632',
        buttonBorderColorActive: '#4ea898',
        buttonColor: '#1a221f',
        buttonColorActive: '#25332e',
        buttonTextColor: '#8da29b',
        buttonTextColorActive: '#e8f0ed'
      },
      Dropdown: {
        color: '#1e2724',
        optionTextColor: '#c5d4cf',
        optionTextColorHover: '#e8f0ed',
        optionTextColorActive: '#e8f0ed',
        optionColorHover: '#273430',
        optionColorActive: '#23302c',
        borderColor: '#293632',
        borderRadius: '10px'
      },
      Popover: {
        color: '#1e2724',
        textColor: '#e8f0ed',
        borderColor: '#293632',
        borderRadius: '10px'
      },
      Modal: {
        borderRadius: '16px'
      },
      Dialog: {
        borderRadius: '16px'
      },
      Tooltip: {
        borderRadius: '8px'
      },
      Tag: {
        borderRadius: '6px'
      }
    }
  },

  blue: {
    id: 'blue',
    labelKey: 'theme.blue',
    naiveTheme: lightTheme,
    themeOverrides: {
      common: {
        primaryColor: '#2575e6',
        primaryColorHover: '#3d86ee',
        primaryColorPressed: '#1b63c8',
        primaryColorSuppl: '#60a5fa',
        bodyColor: '#f2f7fd',
        cardColor: '#ffffff',
        modalColor: '#ffffff',
        popoverColor: '#ffffff',
        tableColor: '#f8fbfe',
        inputColor: '#ffffff',
        hoverColor: 'rgba(37, 117, 230, 0.07)',
        actionColor: '#eef5fc',
        textColorBase: '#163252',
        textColor1: '#163252',
        textColor2: '#355377',
        textColor3: '#6482a5',
        placeholderColor: '#8ea7c5',
        borderColor: '#d5e3f5',
        dividerColor: '#e2eefb',
        scrollbarColor: 'rgba(53, 83, 119, 0.25)',
        scrollbarColorHover: 'rgba(37, 117, 230, 0.45)',
        closeIconColor: 'rgba(53, 83, 119, 0.65)',
        closeIconColorHover: '#2575e6',
        closeIconColorPressed: '#1b63c8',
        clearColor: 'rgba(37, 117, 230, 0.2)',
        clearColorHover: 'rgba(37, 117, 230, 0.3)',
        clearColorPressed: 'rgba(37, 117, 230, 0.42)',
        boxShadow1: '0 1px 3px rgba(18, 50, 85, 0.04), 0 4px 14px -2px rgba(18, 50, 85, 0.05)',
        boxShadow2: '0 4px 12px -1px rgba(18, 50, 85, 0.06), 0 12px 28px -4px rgba(18, 50, 85, 0.09)',
        boxShadow3: '0 12px 32px -4px rgba(18, 50, 85, 0.08), 0 24px 60px -8px rgba(18, 50, 85, 0.12)',
        borderRadius: '12px',
        borderRadiusSmall: '8px',
        lineHeight: '1.6',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif'
      },
      Button: {
        textColorPrimary: '#ffffff',
        textColorHoverPrimary: '#ffffff',
        textColorPressedPrimary: '#ffffff',
        textColorFocusPrimary: '#ffffff',
        textColorDisabledPrimary: 'rgba(255, 255, 255, 0.65)',
        colorPrimary: '#2575e6',
        colorHoverPrimary: '#3d86ee',
        colorPressedPrimary: '#1b63c8',
        colorFocusPrimary: '#2575e6',
        colorDisabledPrimary: '#9bc2f5',
        borderPrimary: '1px solid #2575e6',
        borderHoverPrimary: '1px solid #3d86ee',
        borderPressedPrimary: '1px solid #1b63c8',
        borderFocusPrimary: '1px solid #2575e6',
        borderDisabledPrimary: '1px solid #9bc2f5',
        rippleColorPrimary: 'rgba(37, 117, 230, 0.25)',
        textColor: '#264b73',
        textColorHover: '#163252',
        textColorPressed: '#10253d',
        color: '#f0f6fd',
        colorHover: '#e3effc',
        colorPressed: '#d4e5fa',
        border: '1px solid #d5e3f5',
        borderHover: '1px solid #accaf0',
        borderPressed: '1px solid #8eb7ea',
        borderRadiusMedium: '10px',
        borderRadiusSmall: '8px',
        borderRadiusLarge: '12px',
        fontWeight: '500'
      },
      Input: {
        color: '#ffffff',
        colorDisabled: '#f2f6fc',
        colorFocus: '#ffffff',
        textColor: '#163252',
        textColorDisabled: 'rgba(22, 50, 82, 0.45)',
        placeholderColor: '#8ea7c5',
        placeholderColorDisabled: 'rgba(142, 167, 197, 0.6)',
        iconColor: '#7e9cbf',
        iconColorHover: '#356399',
        iconColorPressed: '#2575e6',
        iconColorDisabled: 'rgba(126, 156, 191, 0.5)',
        clearColor: 'rgba(37, 117, 230, 0.22)',
        clearColorHover: 'rgba(37, 117, 230, 0.32)',
        clearColorPressed: 'rgba(37, 117, 230, 0.45)',
        border: '1px solid #cddff4',
        borderDisabled: '1px solid rgba(205, 223, 244, 0.6)',
        borderHover: '1px solid #a3c5f0',
        borderFocus: '1px solid #5b9ceb',
        boxShadowFocus: '0 0 0 3px rgba(37, 117, 230, 0.15)',
        caretColor: '#2575e6',
        suffixTextColor: '#5b7ea5',
        prefixTextColor: '#5b7ea5',
        borderRadius: '10px'
      },
      Card: {
        color: '#ffffff',
        colorModal: '#ffffff',
        colorTarget: '#ffffff',
        textColor: '#163252',
        titleTextColor: '#0f243c',
        borderColor: '#d5e3f5',
        actionColor: '#f4f8fd',
        closeIconColor: '#7e9cbf',
        closeIconColorHover: '#356399',
        closeIconColorPressed: '#2575e6',
        borderRadius: '14px',
        boxShadow: '0 1px 3px rgba(18, 50, 85, 0.04), 0 6px 18px -2px rgba(18, 50, 85, 0.06)'
      },
      Tabs: {
        tabColor: '#edf4fc',
        tabColorActive: '#ddecfa',
        tabBorderColor: '#d5e3f5',
        tabTextColorBar: '#4f729b',
        tabTextColorBarHover: '#2575e6',
        tabTextColorBarActive: '#163252',
        tabTextColorCard: '#4f729b',
        tabTextColorCardActive: '#163252',
        barColor: '#2575e6',
        borderRadius: '8px'
      },
      Radio: {
        buttonBorderColor: '#d5e3f5',
        buttonBorderColorActive: '#accaf0',
        buttonColor: '#f0f6fd',
        buttonColorActive: '#ddecfa',
        buttonTextColor: '#4f729b',
        buttonTextColorActive: '#163252'
      },
      Dropdown: {
        color: '#ffffff',
        optionTextColor: '#264b73',
        optionTextColorHover: '#163252',
        optionTextColorActive: '#163252',
        optionColorHover: '#edf4fc',
        optionColorActive: '#e0edfb',
        borderColor: '#d5e3f5',
        borderRadius: '10px',
        boxShadow: '0 4px 14px -1px rgba(18, 50, 85, 0.08), 0 12px 28px -4px rgba(18, 50, 85, 0.1)'
      },
      Popover: {
        color: '#ffffff',
        textColor: '#163252',
        borderColor: '#d5e3f5',
        borderRadius: '10px'
      },
      Modal: {
        borderRadius: '16px'
      },
      Dialog: {
        borderRadius: '16px'
      },
      Tooltip: {
        borderRadius: '8px'
      },
      Tag: {
        borderRadius: '6px'
      }
    }
  },

  classic: {
    id: 'classic',
    labelKey: 'theme.classic',
    naiveTheme: lightTheme,
    themeOverrides: {
      common: {
        primaryColor: '#7d6954',
        primaryColorHover: '#8e7963',
        primaryColorPressed: '#6b5845',
        primaryColorSuppl: '#c8b9a8',
        successColor: '#109368',
        successColorHover: '#16a877',
        successColorPressed: '#0c7e58',
        successColorSuppl: '#daf2e9',
        errorColor: '#d94f4f',
        errorColorHover: '#e66363',
        errorColorPressed: '#c03e3e',
        errorColorSuppl: '#fce8e8',
        bodyColor: '#f7f4ee',
        cardColor: '#ffffff',
        modalColor: '#ffffff',
        popoverColor: '#ffffff',
        tableColor: '#fbf9f5',
        inputColor: '#ffffff',
        hoverColor: 'rgba(125, 105, 84, 0.07)',
        actionColor: '#f3efe6',
        textColorBase: '#383028',
        textColor1: '#383028',
        textColor2: '#615447',
        textColor3: '#8c7d6e',
        placeholderColor: '#aba092',
        borderColor: '#e6ded3',
        dividerColor: '#efe8de',
        scrollbarColor: 'rgba(125, 105, 84, 0.26)',
        scrollbarColorHover: 'rgba(125, 105, 84, 0.44)',
        closeIconColor: 'rgba(97, 84, 71, 0.65)',
        closeIconColorHover: '#7d6954',
        closeIconColorPressed: '#6b5845',
        clearColor: 'rgba(125, 105, 84, 0.2)',
        clearColorHover: 'rgba(125, 105, 84, 0.3)',
        clearColorPressed: 'rgba(125, 105, 84, 0.4)',
        boxShadow1: '0 1px 3px rgba(70, 58, 48, 0.04), 0 4px 14px -2px rgba(70, 58, 48, 0.05)',
        boxShadow2: '0 4px 12px -1px rgba(70, 58, 48, 0.06), 0 12px 28px -4px rgba(70, 58, 48, 0.09)',
        boxShadow3: '0 12px 32px -4px rgba(70, 58, 48, 0.08), 0 24px 60px -8px rgba(70, 58, 48, 0.12)',
        borderRadius: '12px',
        borderRadiusSmall: '8px',
        lineHeight: '1.6',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif'
      },
      Button: {
        textColorPrimary: '#ffffff',
        textColorHoverPrimary: '#ffffff',
        textColorPressedPrimary: '#ffffff',
        textColorFocusPrimary: '#ffffff',
        textColorDisabledPrimary: 'rgba(255, 255, 255, 0.65)',
        colorPrimary: '#7d6954',
        colorHoverPrimary: '#8e7963',
        colorPressedPrimary: '#6b5845',
        colorFocusPrimary: '#7d6954',
        colorDisabledPrimary: '#c8b9a8',
        borderPrimary: '1px solid #7d6954',
        borderHoverPrimary: '1px solid #8e7963',
        borderPressedPrimary: '1px solid #6b5845',
        borderFocusPrimary: '1px solid #7d6954',
        borderDisabledPrimary: '1px solid #c8b9a8',
        rippleColorPrimary: 'rgba(125, 105, 84, 0.25)',
        textColor: '#473d33',
        textColorHover: '#383028',
        textColorPressed: '#2b241e',
        color: '#f8f5f0',
        colorHover: '#eee8dd',
        colorPressed: '#e3dbc9',
        border: '1px solid #e6ded3',
        borderHover: '1px solid #cec2b1',
        borderPressed: '1px solid #b5a794',
        borderRadiusMedium: '10px',
        borderRadiusSmall: '8px',
        borderRadiusLarge: '12px',
        fontWeight: '500'
      },
      Input: {
        color: '#ffffff',
        colorDisabled: '#f5f1ea',
        colorFocus: '#ffffff',
        textColor: '#383028',
        textColorDisabled: 'rgba(56, 48, 40, 0.42)',
        placeholderColor: '#aba092',
        placeholderColorDisabled: 'rgba(171, 160, 146, 0.58)',
        iconColor: '#96897b',
        iconColorHover: '#6e5f50',
        iconColorPressed: '#7d6954',
        iconColorDisabled: 'rgba(150, 137, 123, 0.45)',
        clearColor: 'rgba(125, 105, 84, 0.2)',
        clearColorHover: 'rgba(125, 105, 84, 0.3)',
        clearColorPressed: 'rgba(125, 105, 84, 0.42)',
        border: '1px solid #ded5c9',
        borderDisabled: '1px solid rgba(222, 213, 201, 0.65)',
        borderHover: '1px solid #c5b8a6',
        borderFocus: '1px solid #99836d',
        boxShadowFocus: '0 0 0 3px rgba(125, 105, 84, 0.14)',
        caretColor: '#7d6954',
        suffixTextColor: '#7a6c5e',
        prefixTextColor: '#7a6c5e',
        borderRadius: '10px'
      },
      Card: {
        color: '#ffffff',
        colorModal: '#ffffff',
        colorTarget: '#ffffff',
        textColor: '#383028',
        titleTextColor: '#2b241e',
        borderColor: '#e6ded3',
        actionColor: '#f6f3eb',
        closeIconColor: '#96897b',
        closeIconColorHover: '#6e5f50',
        closeIconColorPressed: '#7d6954',
        borderRadius: '14px',
        boxShadow: '0 1px 3px rgba(70, 58, 48, 0.04), 0 6px 18px -2px rgba(70, 58, 48, 0.06)'
      },
      Tabs: {
        tabColor: '#f1ebdF',
        tabColorActive: '#e4dcce',
        tabBorderColor: '#e6ded3',
        tabTextColorBar: '#6e6052',
        tabTextColorBarHover: '#7d6954',
        tabTextColorBarActive: '#383028',
        tabTextColorCard: '#6e6052',
        tabTextColorCardActive: '#383028',
        barColor: '#7d6954',
        borderRadius: '8px'
      },
      Radio: {
        buttonBorderColor: '#e6ded3',
        buttonBorderColorActive: '#c5b8a6',
        buttonColor: '#f8f5f0',
        buttonColorActive: '#e9e1d4',
        buttonTextColor: '#6e6052',
        buttonTextColorActive: '#383028'
      },
      Dropdown: {
        color: '#ffffff',
        optionTextColor: '#473d33',
        optionTextColorHover: '#383028',
        optionTextColorActive: '#383028',
        optionColorHover: '#f4efe7',
        optionColorActive: '#e8e0d3',
        borderColor: '#e6ded3',
        borderRadius: '10px',
        boxShadow: '0 4px 14px -1px rgba(70, 58, 48, 0.08), 0 12px 28px -4px rgba(70, 58, 48, 0.1)'
      },
      Popover: {
        color: '#ffffff',
        textColor: '#383028',
        borderColor: '#e6ded3',
        borderRadius: '10px'
      },
      Modal: {
        borderRadius: '16px'
      },
      Dialog: {
        borderRadius: '16px'
      },
      Tooltip: {
        borderRadius: '8px'
      },
      Tag: {
        borderRadius: '6px'
      }
    }
  },

  green: {
    id: 'green',
    labelKey: 'theme.green',
    naiveTheme: darkTheme,
    themeOverrides: {
      common: {
        primaryColor: '#26bfa2',
        primaryColorHover: '#37caaE',
        primaryColorPressed: '#1f9e86',
        primaryColorSuppl: '#5fe0c7',
        bodyColor: '#0f241e',
        cardColor: '#16332b',
        modalColor: '#1a3c33',
        popoverColor: '#1a3c33',
        tableColor: '#132c25',
        tableHeaderColor: '#18382f',
        inputColor: '#183a31',
        codeColor: '#18382f',
        tabColor: '#18382f',
        actionColor: '#18382f',
        textColorBase: '#e7f7f2',
        textColor1: '#e7f7f2',
        textColor2: '#9fc7bc',
        textColor3: '#6f968c',
        textColorDisabled: 'rgba(231, 247, 242, 0.35)',
        placeholderColor: '#5c8076',
        placeholderColorDisabled: 'rgba(92, 128, 118, 0.45)',
        borderColor: 'rgba(55, 140, 120, 0.32)',
        dividerColor: 'rgba(55, 140, 120, 0.2)',
        scrollbarColor: 'rgba(40, 110, 95, 0.3)',
        scrollbarColorHover: 'rgba(38, 191, 162, 0.48)',
        closeIconColor: 'rgba(159, 199, 188, 0.65)',
        closeIconColorHover: '#26bfa2',
        closeIconColorPressed: '#1f9e86',
        clearColor: 'rgba(159, 199, 188, 0.25)',
        clearColorHover: 'rgba(38, 191, 162, 0.35)',
        clearColorPressed: 'rgba(38, 191, 162, 0.48)',
        boxShadow1: '0 1px 3px rgba(0, 0, 0, 0.22), 0 4px 14px -2px rgba(0, 0, 0, 0.32)',
        boxShadow2: '0 4px 12px -1px rgba(0, 0, 0, 0.28), 0 12px 28px -4px rgba(0, 0, 0, 0.4)',
        boxShadow3: '0 12px 32px -4px rgba(0, 0, 0, 0.35), 0 24px 60px -8px rgba(0, 0, 0, 0.52)',
        borderRadius: '12px',
        borderRadiusSmall: '8px',
        lineHeight: '1.6',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif',
        successColor: '#3dd68c',
        successColorHover: '#2fb973',
        successColorPressed: '#258f59',
        successColorSuppl: '#174f3b',
        errorColor: '#ff6b6b',
        errorColorHover: '#f05252',
        errorColorPressed: '#c73f3f',
        errorColorSuppl: '#4d2020'
      },
      Button: {
        textColorPrimary: '#0a1d17',
        textColorHoverPrimary: '#0a1d17',
        textColorPressedPrimary: '#0a1d17',
        textColorFocusPrimary: '#0a1d17',
        textColorDisabledPrimary: 'rgba(10, 29, 23, 0.7)',
        colorPrimary: '#26bfa2',
        colorHoverPrimary: '#37caaE',
        colorPressedPrimary: '#1f9e86',
        colorFocusPrimary: '#26bfa2',
        colorDisabledPrimary: '#1b5a4d',
        borderPrimary: '1px solid #26bfa2',
        borderHoverPrimary: '1px solid #37caaE',
        borderPressedPrimary: '1px solid #1f9e86',
        borderFocusPrimary: '1px solid #26bfa2',
        borderDisabledPrimary: '1px solid #1b5a4d',
        rippleColorPrimary: 'rgba(38, 191, 162, 0.35)',
        textColor: '#bfe5db',
        textColorHover: '#e7f7f2',
        textColorPressed: '#9fc7bc',
        color: '#1a3c33',
        colorHover: '#214a3f',
        colorPressed: '#16352d',
        border: '1px solid rgba(55, 140, 120, 0.35)',
        borderHover: '1px solid rgba(55, 140, 120, 0.55)',
        borderPressed: '1px solid rgba(55, 140, 120, 0.7)',
        borderRadiusMedium: '10px',
        borderRadiusSmall: '8px',
        borderRadiusLarge: '12px',
        fontWeight: '500'
      },
      Input: {
        color: '#183a31',
        colorDisabled: '#132c25',
        colorFocus: '#1c4238',
        textColor: '#e7f7f2',
        textColorDisabled: 'rgba(231, 247, 242, 0.35)',
        placeholderColor: '#5c8076',
        placeholderColorDisabled: 'rgba(92, 128, 118, 0.35)',
        border: '1px solid rgba(55, 140, 120, 0.35)',
        borderDisabled: '1px solid rgba(55, 140, 120, 0.18)',
        borderHover: '1px solid rgba(55, 140, 120, 0.55)',
        borderFocus: '1px solid #26bfa2',
        boxShadowFocus: '0 0 0 3px rgba(38, 191, 162, 0.18)',
        loadingColor: '#26bfa2',
        borderRadius: '10px'
      },
      Card: {
        color: '#16332b',
        colorModal: '#1a3c33',
        colorTarget: '#16332b',
        textColor: '#e7f7f2',
        titleTextColor: '#f0faf6',
        borderColor: 'rgba(55, 140, 120, 0.32)',
        actionColor: '#1c4238',
        borderRadius: '14px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.22), 0 8px 24px -2px rgba(0, 0, 0, 0.32)'
      },
      Tabs: {
        tabColor: '#16332b',
        tabColorActive: '#1f473c',
        tabBorderColor: 'rgba(55, 140, 120, 0.32)',
        tabTextColorBar: '#8ab4a8',
        tabTextColorBarHover: '#26bfa2',
        tabTextColorBarActive: '#e7f7f2',
        tabTextColorCard: '#8ab4a8',
        tabTextColorCardActive: '#e7f7f2',
        barColor: '#26bfa2',
        borderRadius: '8px'
      },
      Radio: {
        buttonBorderColor: 'rgba(55, 140, 120, 0.32)',
        buttonBorderColorActive: '#26bfa2',
        buttonColor: '#16332b',
        buttonColorActive: '#1f473c',
        buttonTextColor: '#8ab4a8',
        buttonTextColorActive: '#e7f7f2'
      },
      Dropdown: {
        color: '#1a3c33',
        optionTextColor: '#bfe5db',
        optionTextColorHover: '#e7f7f2',
        optionTextColorActive: '#e7f7f2',
        optionColorHover: '#214a3f',
        optionColorActive: '#1d4137',
        borderColor: 'rgba(55, 140, 120, 0.35)',
        borderRadius: '10px'
      },
      Popover: {
        color: '#1a3c33',
        textColor: '#e7f7f2',
        borderColor: 'rgba(55, 140, 120, 0.35)',
        borderRadius: '10px'
      },
      Modal: {
        borderRadius: '16px'
      },
      Dialog: {
        borderRadius: '16px'
      },
      Tooltip: {
        borderRadius: '8px'
      },
      Tag: {
        borderRadius: '6px'
      }
    }
  },

  purple: {
    id: 'purple',
    labelKey: 'theme.purple',
    naiveTheme: darkTheme,
    themeOverrides: {
      common: {
        primaryColor: '#b47bff',
        primaryColorHover: '#c191ff',
        primaryColorPressed: '#9d5ef7',
        primaryColorSuppl: '#d6c3ff',
        bodyColor: '#191328',
        cardColor: '#231b38',
        modalColor: '#2a2044',
        popoverColor: '#2a2044',
        tableColor: '#1f1732',
        tableHeaderColor: '#261d3e',
        inputColor: '#281e42',
        codeColor: '#261d3e',
        tabColor: '#261d3e',
        actionColor: '#261d3e',
        textColorBase: '#f4edfc',
        textColor1: '#f4edfc',
        textColor2: '#b8a6cf',
        textColor3: '#85729c',
        textColorDisabled: 'rgba(244, 237, 252, 0.35)',
        placeholderColor: '#74628a',
        placeholderColorDisabled: 'rgba(116, 98, 138, 0.45)',
        borderColor: 'rgba(147, 111, 214, 0.32)',
        dividerColor: 'rgba(147, 111, 214, 0.18)',
        scrollbarColor: 'rgba(127, 85, 194, 0.3)',
        scrollbarColorHover: 'rgba(180, 123, 255, 0.48)',
        closeIconColor: 'rgba(184, 166, 207, 0.65)',
        closeIconColorHover: '#b47bff',
        closeIconColorPressed: '#9d5ef7',
        clearColor: 'rgba(184, 166, 207, 0.25)',
        clearColorHover: 'rgba(180, 123, 255, 0.35)',
        clearColorPressed: 'rgba(180, 123, 255, 0.48)',
        boxShadow1: '0 1px 3px rgba(0, 0, 0, 0.22), 0 4px 14px -2px rgba(0, 0, 0, 0.32)',
        boxShadow2: '0 4px 12px -1px rgba(0, 0, 0, 0.28), 0 12px 28px -4px rgba(0, 0, 0, 0.4)',
        boxShadow3: '0 12px 32px -4px rgba(0, 0, 0, 0.35), 0 24px 60px -8px rgba(0, 0, 0, 0.52)',
        borderRadius: '12px',
        borderRadiusSmall: '8px',
        lineHeight: '1.6',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif',
        successColor: '#5be0a2',
        successColorHover: '#41c488',
        successColorPressed: '#329a6a',
        successColorSuppl: '#1c4b35',
        errorColor: '#ff7aa2',
        errorColorHover: '#f25c87',
        errorColorPressed: '#c1426a',
        errorColorSuppl: '#4b1f32'
      },
      Button: {
        textColorPrimary: '#140c24',
        textColorHoverPrimary: '#140c24',
        textColorPressedPrimary: '#140c24',
        textColorFocusPrimary: '#140c24',
        textColorDisabledPrimary: 'rgba(20, 12, 36, 0.7)',
        colorPrimary: '#b47bff',
        colorHoverPrimary: '#c191ff',
        colorPressedPrimary: '#9d5ef7',
        colorFocusPrimary: '#b47bff',
        colorDisabledPrimary: '#543682',
        borderPrimary: '1px solid #b47bff',
        borderHoverPrimary: '1px solid #c191ff',
        borderPressedPrimary: '1px solid #9d5ef7',
        borderFocusPrimary: '1px solid #b47bff',
        borderDisabledPrimary: '1px solid #543682',
        rippleColorPrimary: 'rgba(180, 123, 255, 0.35)',
        textColor: '#d9cbef',
        textColorHover: '#f4edfc',
        textColorPressed: '#b8a6cf',
        color: '#2a2044',
        colorHover: '#332752',
        colorPressed: '#221937',
        border: '1px solid rgba(147, 111, 214, 0.32)',
        borderHover: '1px solid rgba(147, 111, 214, 0.52)',
        borderPressed: '1px solid rgba(147, 111, 214, 0.68)',
        borderRadiusMedium: '10px',
        borderRadiusSmall: '8px',
        borderRadiusLarge: '12px',
        fontWeight: '500'
      },
      Input: {
        color: '#281e42',
        colorDisabled: '#1f1732',
        colorFocus: '#2e224c',
        textColor: '#f4edfc',
        textColorDisabled: 'rgba(244, 237, 252, 0.35)',
        placeholderColor: '#74628a',
        placeholderColorDisabled: 'rgba(116, 98, 138, 0.35)',
        border: '1px solid rgba(147, 111, 214, 0.35)',
        borderDisabled: '1px solid rgba(147, 111, 214, 0.18)',
        borderHover: '1px solid rgba(147, 111, 214, 0.55)',
        borderFocus: '1px solid #b47bff',
        boxShadowFocus: '0 0 0 3px rgba(180, 123, 255, 0.2)',
        loadingColor: '#b47bff',
        borderRadius: '10px'
      },
      Card: {
        color: '#231b38',
        colorModal: '#2a2044',
        colorTarget: '#231b38',
        textColor: '#f4edfc',
        titleTextColor: '#faf6fe',
        borderColor: 'rgba(147, 111, 214, 0.32)',
        actionColor: '#2b2046',
        borderRadius: '14px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.22), 0 8px 24px -2px rgba(0, 0, 0, 0.32)'
      },
      Tabs: {
        tabColor: '#231b38',
        tabColorActive: '#30244e',
        tabBorderColor: 'rgba(147, 111, 214, 0.32)',
        tabTextColorBar: '#9d8bb8',
        tabTextColorBarHover: '#b47bff',
        tabTextColorBarActive: '#f4edfc',
        tabTextColorCard: '#9d8bb8',
        tabTextColorCardActive: '#f4edfc',
        barColor: '#b47bff',
        borderRadius: '8px'
      },
      Radio: {
        buttonBorderColor: 'rgba(147, 111, 214, 0.32)',
        buttonBorderColorActive: '#b47bff',
        buttonColor: '#231b38',
        buttonColorActive: '#30244e',
        buttonTextColor: '#9d8bb8',
        buttonTextColorActive: '#f4edfc'
      },
      Dropdown: {
        color: '#2a2044',
        optionTextColor: '#d9cbef',
        optionTextColorHover: '#f4edfc',
        optionTextColorActive: '#f4edfc',
        optionColorHover: '#352955',
        optionColorActive: '#2d2249',
        borderColor: 'rgba(147, 111, 214, 0.35)',
        borderRadius: '10px'
      },
      Popover: {
        color: '#2a2044',
        textColor: '#f4edfc',
        borderColor: 'rgba(147, 111, 214, 0.35)',
        borderRadius: '10px'
      },
      Modal: {
        borderRadius: '16px'
      },
      Dialog: {
        borderRadius: '16px'
      },
      Tooltip: {
        borderRadius: '8px'
      },
      Tag: {
        borderRadius: '6px'
      }
    }
  }
}

// 获取可用主题列表
export const availableThemes = Object.values(naiveThemeConfigs)

// 当前主题配置
export const currentThemeConfig = computed(() => 
  naiveThemeConfigs[currentThemeId.value] || naiveThemeConfigs.light
)

// 当前 Naive UI 主题
export const currentNaiveTheme = computed<GlobalTheme | null>(() => 
  currentThemeConfig.value.naiveTheme
)

// 当前主题覆盖配置
export const currentThemeOverrides = computed<GlobalThemeOverrides>(() => 
  currentThemeConfig.value.themeOverrides || {}
)

const resolveAppliedThemeId = (selectedThemeId: string): string => {
  if (selectedThemeId === 'auto') {
    try {
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
      return prefersDark ? 'dark' : 'light'
    } catch {
      return 'light'
    }
  }
  return selectedThemeId
}

const applyThemeId = (selectedThemeId: string): boolean => {
  const applied = resolveAppliedThemeId(selectedThemeId)
  if (!naiveThemeConfigs[applied]) {
    console.warn(`Theme '${applied}' not found`)
    return false
  }
  currentThemeId.value = applied

  // Keep Tailwind's `dark:` variant in sync with the app theme.
  // Tailwind in this repo uses `darkMode: 'class'`, so we must toggle `.dark`.
  try {
    if (typeof document !== 'undefined' && document.documentElement) {
      const isDark = naiveThemeConfigs[applied]?.naiveTheme === darkTheme
      document.documentElement.classList.toggle('dark', Boolean(isDark))
    }
  } catch (error) {
    // Best-effort only; theme switching must not break if DOM is unavailable.
    console.warn('[Theme] Failed to sync Tailwind dark class:', error)
  }
  return true
}

type MediaQueryListCompat = MediaQueryList & {
  addListener?: (listener: (e: MediaQueryListEvent) => void) => void
  removeListener?: (listener: (e: MediaQueryListEvent) => void) => void
}

let __autoColorSchemeWatchInitialized = false
let __autoColorSchemeQuery: MediaQueryListCompat | null = null
let __autoColorSchemeListener: ((e: MediaQueryListEvent) => void) | null = null

const cleanupAutoColorSchemeWatch = (): void => {
  try {
    const query = __autoColorSchemeQuery
    const listener = __autoColorSchemeListener
    if (!query || !listener) return

    if (typeof query.removeEventListener === 'function') {
      query.removeEventListener('change', listener)
    } else if (typeof query.removeListener === 'function') {
      query.removeListener(listener)
    }
  } catch (error) {
    console.warn('[Theme] Failed to cleanup prefers-color-scheme watcher:', error)
  } finally {
    __autoColorSchemeQuery = null
    __autoColorSchemeListener = null
    __autoColorSchemeWatchInitialized = false
  }
}

const ensureAutoColorSchemeWatch = (settings: ReturnType<typeof useGlobalSettings>): void => {
  // Only relevant when the user-selected theme is 'auto'.
  if (__autoColorSchemeWatchInitialized) return
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return

  try {
    const query = window.matchMedia('(prefers-color-scheme: dark)') as MediaQueryListCompat
    const listener = (_e: MediaQueryListEvent) => {
      if (settings.state.selectedThemeId !== 'auto') return
      applyThemeId('auto')
    }

    if (typeof query.addEventListener === 'function') {
      query.addEventListener('change', listener)
    } else if (typeof query.addListener === 'function') {
      query.addListener(listener)
    }

    // Keep refs so we can clean up on HMR dispose.
    __autoColorSchemeQuery = query
    __autoColorSchemeListener = listener

    // Dev-only: avoid accumulating listeners across Vite HMR reloads.
    if (import.meta.hot) {
      import.meta.hot.dispose(() => {
        cleanupAutoColorSchemeWatch()
      })
    }

    __autoColorSchemeWatchInitialized = true
  } catch (error) {
    console.warn('[Theme] Failed to init prefers-color-scheme watcher:', error)
  }
}

// 主题切换（统一由 useGlobalSettings 持久化）
export const switchTheme = (themeId: string): boolean => {
  const settings = useGlobalSettings(pinia)
  settings.updateThemeId(themeId)

  const ok = applyThemeId(themeId)
  if (ok) {
    console.log(`Pure Naive UI theme switched to: ${themeId}`)
  }
  return ok
}

// 获取当前主题ID
export const getCurrentThemeId = (): string => currentThemeId.value

// 获取主题配置
export const getThemeConfig = (themeId: string): ThemeConfig | null => {
  return naiveThemeConfigs[themeId] || null
}

// 初始化主题系统
export const initializeNaiveTheme = (): void => {
  const settings = useGlobalSettings(pinia)

  // 一次性迁移：localStorage('naive-theme-id') → useGlobalSettings
  // 只在 global-settings/v1 尚未恢复且当前为默认 'auto' 时执行
  try {
    const legacy = localStorage.getItem('naive-theme-id')
    if (legacy && settings.state.selectedThemeId === 'auto' && !settings.hasRestored) {
      settings.updateThemeId(legacy)
    }
  } catch (error) {
    console.warn('Failed to load legacy theme preference:', error)
  }

  // When in 'auto' mode, keep theme synced with OS color scheme changes.
  ensureAutoColorSchemeWatch(settings)

  // 监听全局配置的主题选择，驱动实际应用主题
  // 使用模块级 guard，防止 initializeNaiveTheme 被多次调用时重复注册 watch
  if (!__themeWatchInitialized) {
    __themeWatchInitialized = true
    watch(
      () => settings.state.selectedThemeId,
      (selectedId) => {
        if (!selectedId) return
        applyThemeId(selectedId)
      },
      { immediate: true }
    )
  } else {
    // 已注册 watch：手动应用一次，确保初始化时 theme 与 state 对齐
    applyThemeId(settings.state.selectedThemeId)
  }
}

let __themeWatchInitialized = false

// 检查是否为深色主题
export const isDarkTheme = computed(() => {
  const config = currentThemeConfig.value
  return config.naiveTheme === darkTheme
})

// 为向后兼容性导出的别名
export const naiveTheme = currentNaiveTheme
export const themeOverrides = currentThemeOverrides

import { useTheme } from '@react-navigation/native';
import React, { useMemo } from 'react'
import { Animated, StyleSheet, Text, TextStyle } from 'react-native'
import { fontSize } from '../../utils/constants';
import { getFontFamily } from '../../utils/helper';

interface AppTextProps {
    style?: TextStyle | TextStyle[];
    children: React.ReactNode;
    weight?: 'regular' | 'medium' | 'semiBold' | 'bold' | 'extraBold'
    color?: 'primary' | 'action' | 'notification' | 'background' | 'border' | 'card' | 'text' | 'black' | 'white' | 'default';
    size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'default';
    isAnimated?: boolean;
    numberOfLines?: number;
}

const AppText: React.FC<AppTextProps> = ({
    style,
    children,
    weight = 'regular',
    color = 'default',
    size = 'default',
    isAnimated = false,
    numberOfLines,
}) => {
    const { colors } = useTheme();

    // Color map
    const colorMap: Record<string, string> = {
        primary: colors.primary,
        action: colors.notification,
        notification: colors.notification,
        background: colors.background,
        border: colors.border,
        card: colors.card,
        text: colors.text,
        default: '#232323',
        black: '#000',
        white: '#fff',
    };

    // Font size map
    const sizeMap: Record<string, number> = {
        xxs: fontSize.xxsm,
        xs: fontSize.xsm,
        sm: fontSize.sm,
        md: fontSize.md,
        lg: fontSize.lg,
        xl: fontSize.xlg,
        xxlg: fontSize.xxlg,
        default: 14,
    };

    const textColor = colorMap[color] || colorMap.default;
    const fontSizeValue = sizeMap[size] || sizeMap.default;

    // Memoized styles
    const textStyles = useMemo(
        () =>
            StyleSheet.create({
                text: {
                    fontSize: fontSizeValue,
                    fontFamily: getFontFamily(weight),
                    color: textColor,
                },
            }),
        [fontSizeValue, textColor, weight]
    );

    const TextComponent = isAnimated ? Animated.Text : Text;

    return (
        <TextComponent
            style={[textStyles.text, style]}
            numberOfLines={numberOfLines}
            allowFontScaling={false}
        >
            {children}
        </TextComponent>
    );
};

export default AppText;
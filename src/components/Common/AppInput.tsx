import React, { useState, useCallback } from 'react';
import { StyleProp, StyleSheet, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import AppText from './AppText';
import { getFontFamily } from '../../utils/helper';
import Icon from 'react-native-vector-icons/FontAwesome';

interface AppInputProps {
    label?: string;
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    error?: string | boolean;
    isPassword?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    isMobile?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    maxLength?: number;
}

const AppInput: React.FC<AppInputProps> = ({
    label,
    placeholder = '',
    value,
    onChangeText,
    error,
    isPassword = false,
    leftIcon,
    rightIcon,
    isMobile = false,
    containerStyle,
    maxLength = 200,
}) => {
    const [isActive, setIsActive] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const { colors } = useTheme();

    const handleFocus = useCallback(() => setIsActive(true), []);
    const handleBlur = useCallback(() => setIsActive(false), []);

    return (
        <View style={styles.inputContainer}>
            {label && <AppText style={styles.inputLabel}>{label}</AppText>}
            <View
                style={[
                    styles.inputBox,
                    { borderColor: colors.border },
                    error && styles.errorBorder,
                    isActive && { ...styles.isActive, borderColor: colors.primary },
                    containerStyle,
                ]}>
                {leftIcon && <View style={{ flex: 0.1 }}>{leftIcon}</View>}
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={colors.border}
                    style={[styles.input, { color: colors.text }]}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    secureTextEntry={isPassword ? visibility : false}
                    keyboardType={isMobile ? 'numeric' : 'default'}
                    maxLength={maxLength}
                />
                {rightIcon && <View style={{ marginRight: 15 }}>{rightIcon}</View>}
                {isPassword && <TouchableOpacity onPress={() => setVisibility(!visibility)} activeOpacity={0.8} style={{ marginRight: 15 }}>
                    <Icon
                        name={visibility ? "eye" : "eye-slash"}
                        color={'grey'}
                        size={25}
                    />
                </TouchableOpacity>}
            </View>
            {error && <AppText style={styles.inputError}>{error}</AppText>}
        </View>
    );
};

export default AppInput;

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 20,
    },
    inputBox: {
        width: '100%',
        height: 55,
        borderRadius: 10,
        padding: 0,
        paddingLeft: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1
    },
    input: {
        flex: 1,
        fontFamily: getFontFamily('regular'),
    },
    inputLabel: {
        marginBottom: 2
    },
    inputError: {
        fontSize: 12,
        color: '#ff5353',
        marginLeft: 10,
    },
    errorBorder: {
        borderWidth: 2,
        borderColor: '#ff5353',
    },
    isActive: {
        borderWidth: 2,
    },
});
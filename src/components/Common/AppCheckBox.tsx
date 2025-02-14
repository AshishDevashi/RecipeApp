import React from 'react';
import { View, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import CheckBox from 'react-native-check-box'
import { useTheme } from '@react-navigation/native';
import AppText from './AppText';

interface AppCheckBoxProps {
    label: string;
    value: boolean;
    onValueChange: () => void;
    style?: StyleProp<ViewStyle>;
    error?: string | boolean;
}

const AppCheckBox: React.FC<AppCheckBoxProps> = ({ label, value, onValueChange, style, error }) => {
    const { colors } = useTheme();

    return (
        <View>
            <TouchableOpacity style={[styles.container, style]} onPress={onValueChange}>
                <CheckBox
                    onClick={onValueChange}
                    isChecked={value}
                    checkedCheckBoxColor={colors.notification}
                    checkBoxColor={colors.notification}
                />
                <AppText size="sm" color='notification' style={{ marginLeft: 5 }}>
                    {label}
                </AppText>
            </TouchableOpacity>
            {
                error && (
                    <AppText size="xs" style={{ color: '#ff5353' }}>
                        {error}
                    </AppText>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',

    },
});

export default AppCheckBox;

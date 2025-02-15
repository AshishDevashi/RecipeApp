import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import AppText from './AppText';
interface AppButtonProps {
    title: string;
    onPress: (event: any) => void;
    disabled?: boolean;
    loading?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({ title, onPress, disabled = false, loading = false }) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }, disabled && styles.disabledButton]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color="#fff" size={'large'} />
            ) : (
                <AppText size='lg' weight='semiBold' color='white'>{title}</AppText>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    disabledButton: {
        backgroundColor: '#A9A9A9',
    },
});

export default AppButton;
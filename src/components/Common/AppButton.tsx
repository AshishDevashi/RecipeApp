import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import AppText from './AppText';

// Define the props for the PrimaryButton component
interface AppButtonProps {
    title: string; // Button text
    onPress: (event: any) => void; // Function to call when the button is pressed
    disabled?: boolean; // Whether the button is disabled
    loading?: boolean; // Whether the button is in a loading state
}

const AppButton: React.FC<AppButtonProps> = ({ title, onPress, disabled = false, loading = false }) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }, disabled && styles.disabledButton]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7} // Slightly reduce opacity when pressed
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
        elevation: 3, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    disabledButton: {
        backgroundColor: '#A9A9A9', // Disabled color
    },
});

export default AppButton;
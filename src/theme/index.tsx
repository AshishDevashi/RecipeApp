import { Theme } from '@react-navigation/native';

const LightTheme: Theme = {
    dark: false,
    colors: {
        primary: '#129575',
        notification: '#FF9C00',
        background: '#FFFFFF',
        border: '#D9D9D9',
        card: '#303030',
        text: '#121212',
    },
    fonts: {
        regular: {
            fontFamily: 'Poppins-Regular',
            fontWeight: 'normal',
        },
        medium: {
            fontFamily: 'Poppins-Medium',
            fontWeight: 'normal',
        },
        bold: {
            fontFamily: 'Poppins-Bold',
            fontWeight: 'normal',
        },
        heavy: {
            fontFamily: 'Poppins-ExtraBold',
            fontWeight: 'normal',
        },
    }
};

const DarkTheme: Theme = {
    dark: true,
    colors: {
        primary: '#0EA88D',
        notification: '#FFA726',
        background: '#121212',
        border: '#303030',
        card: '#1E1E1E',
        text: '#E0E0E0',
    },
    fonts: {
        regular: {
            fontFamily: 'Poppins-Regular',
            fontWeight: 'normal',
        },
        medium: {
            fontFamily: 'Poppins-Medium',
            fontWeight: 'normal',
        },
        bold: {
            fontFamily: 'Poppins-Bold',
            fontWeight: 'normal',
        },
        heavy: {
            fontFamily: 'Poppins-ExtraBold',
            fontWeight: 'normal',
        },
    }
};

export const AppTheme = {
    light: LightTheme,
    dark: DarkTheme,
};
import { Platform } from "react-native";

export const DEFAULT_THEME = 'light';
export const isIOS = Platform.OS === 'ios';
export const fontSize = {
    xxsm: 8,
    xsm: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xlg: 18,
    xxlg: 20,
};
export const fontFamilies = {
    POPPINS: {
        regular: isIOS ? 'PoppinsRegular' : 'Poppins-Regular',
        medium: isIOS ? 'PoppinsMedium' : 'Poppins-Medium',
        semiBold: isIOS ? 'PoppinsSemiBold' : 'Poppins-SemiBold',
        bold: isIOS ? 'PoppinsBold' : 'Poppins-Bold',
        extraBold: isIOS ? 'PoppinsExtraBold' : 'Poppins-ExtraBold',
    },
};

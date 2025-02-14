import { fontFamilies } from "./constants";
import Toast from "react-native-toast-message";

export const getFontFamily = (weight: 'regular' | 'medium' | 'semiBold' | 'bold' | 'extraBold') => {
    const selectedFontFamily = fontFamilies.POPPINS;
    return selectedFontFamily[weight];
};
export const showToast = (type: 'success' | 'error', message: string) => {
    Toast.show({
        type,
        text1: typeof message === 'string' ? message : JSON.stringify(message),
        position: 'top',
    });
};

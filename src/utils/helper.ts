import { fontFamilies } from "./constants";

export const getFontFamily = (weight: 'regular' | 'medium' | 'semiBold' | 'bold' | 'extraBold') => {
    console.log(weight)
    const selectedFontFamily = fontFamilies.POPPINS;
    return selectedFontFamily[weight];
};
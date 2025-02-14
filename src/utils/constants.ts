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

export const MEALDBAPI = {
    LISTALLMEALAPI: 'www.themealdb.com/api/json/v1/1/search.php?s=',
    LOOKMEALBYID: 'www.themealdb.com/api/json/v1/1/lookup.php?i=52772',
    LISTALLCATEGORIESAPI: 'www.themealdb.com/api/json/v1/1/categories.php',
    LISTALLCATEGORIES: 'www.themealdb.com/api/json/v1/1/list.php?c=list',
    LISTALLAREA: 'www.themealdb.com/api/json/v1/1/list.php?a=list',
    LISTALLINGREDIENTS: 'www.themealdb.com/api/json/v1/1/list.php?i=list',
    FILTERBYINGREDIENTS: 'www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast',
    FILTERBYIAREA: 'www.themealdb.com/api/json/v1/1/filter.php?a=Canadian',
    FILTERBYCATEGORIES: 'www.themealdb.com/api/json/v1/1/filter.php?c=Seafood'
}

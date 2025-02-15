import { Dimensions, Platform } from "react-native";

export const DEFAULT_THEME = 'light';

export const isIOS = Platform.OS === 'ios';

export const { height, width } = Dimensions.get('window');

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
    LISTALLMEALAPI: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    LOOKMEALBYID: 'https://www.themealdb.com/api/json/v1/1/lookup.php',
    LISTALLCATEGORIESAPI: 'https://www.themealdb.com/api/json/v1/1/categories.php',
    LISTALLCATEGORIES: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    LISTALLAREA: 'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
    LISTALLINGREDIENTS: 'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
    FILTERBYIAREA: 'https://www.themealdb.com/api/json/v1/1/filter.php',
    FILTERBYCATEGORIES: 'http://www.themealdb.com/api/json/v1/1/filter.php',
    FILTERBYNAME: 'https://www.themealdb.com/api/json/v1/1/search.php'
}

export const FALLBACKIMAGE = 'https://media.istockphoto.com/id/1452662817/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=bGI_FngX0iexE3EBANPw9nbXkrJJA4-dcEJhCrP8qMw=';
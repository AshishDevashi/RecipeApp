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

export function getYouTubeVideoId(url: any) {
    // Regular expression to match YouTube video ID
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    // Match the regex against the URL
    const match = url.match(regex);

    // Return the video ID if found, otherwise return null
    return match ? match[1] : null;
}

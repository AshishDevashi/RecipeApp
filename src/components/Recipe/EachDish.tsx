import { useTheme } from "@react-navigation/native";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "../Common/AppText";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EachDish = ({ data }: { data: any }) => {
    const FALLBACKIMAGE = 'https://media.istockphoto.com/id/1452662817/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=bGI_FngX0iexE3EBANPw9nbXkrJJA4-dcEJhCrP8qMw=';
    const { colors } = useTheme();

    return (
        <TouchableOpacity style={[styles.dishContainer, { backgroundColor: colors.background }]}>
            <Image
                source={{ uri: data?.strMealThumb || FALLBACKIMAGE }}
                style={styles.dishImage}
            />
            <AppText weight='bold' style={styles.dishTitle} numberOfLines={3}>{data?.strMeal}</AppText>
            <View style={styles.dishCategory}>
                <Icon name='tag' size={15} color={colors.text} />
                <AppText size='sm'>{data?.strCategory}</AppText>
            </View>
        </TouchableOpacity>
    );
};

export default EachDish;

const styles = StyleSheet.create({
    dishContainer: {
        width: 165,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
    },
    dishImage: {
        width: '100%',
        height: 120,
        borderRadius: 22,
    },
    dishTitle: {
        marginTop: 5,
    },
    dishCategory: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
})
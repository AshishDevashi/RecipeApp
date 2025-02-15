import { useTheme } from "@react-navigation/native";
import { Image, StyleSheet, View } from "react-native";
import AppText from "../Common/AppText";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EachMyDish = ({ data }: { data: any }) => {
    const FALLBACKIMAGE = 'https://media.istockphoto.com/id/1452662817/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=bGI_FngX0iexE3EBANPw9nbXkrJJA4-dcEJhCrP8qMw=';
    const { colors } = useTheme();
    return (
        <View style={[styles.dishContainer, { backgroundColor: colors.background }]} >
            <Image
                source={{ uri: data?.image.uri || FALLBACKIMAGE }}
                style={styles.dishImage}
            />
            <AppText weight='bold' style={styles.dishTitle} numberOfLines={3}>{data?.title}</AppText>
            {data?.description ? <View style={styles.dishCategory}>
                <Icon name='tag' size={15} color={colors.text} />
                <AppText size='sm'>{data?.description}</AppText>
            </View> : false}
            <AppText size='sm'>{data?.ingredients}</AppText>

        </View>
    );
};

export default EachMyDish;

const styles = StyleSheet.create({
    dishContainer: {
        width: 165,
        padding: 16,
        shadowColor: '#fff',
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
import { useFocusEffect, useTheme } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { FlatList, Image, SafeAreaView, StyleSheet, View } from 'react-native'
import AppText from '../../../components/Common/AppText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MEALDBAPI } from '../../../utils/constants';
import EachDish from '../../../components/Recipe/EachDish';

export default function Home() {
    const [allMeals, setAllMeals] = useState([]);
    const { colors } = useTheme();

    const fetchData = async () => {
        const response = await fetch(MEALDBAPI.LISTALLMEALAPI);
        const data = await response.json();
        setAllMeals(data.meals);
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={[styles.container, { backgroundColor: colors.primary }]}>
                <View style={styles.header}>
                    <AppText size='xxl' weight='bold' color='white'>Recipes</AppText>
                    <Icon name='bell-badge-outline' size={25} color='white' />
                </View>
                <View style={[styles.content, { backgroundColor: colors.background }]}>
                    <View style={styles.popularRecipesHeader}>
                        <AppText>Popular Recipes</AppText>
                    </View>
                    <FlatList
                        data={allMeals}
                        renderItem={({ item }) => <EachDish data={item} />}
                        numColumns={2}
                        columnWrapperStyle={[styles.columnWrapper, { backgroundColor: colors.background }]}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 30,
        paddingHorizontal: 20,
    },
    popularRecipesHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 14,
    },
});

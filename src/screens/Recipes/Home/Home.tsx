import { useFocusEffect, useNavigation, useTheme } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import AppText from '../../../components/Common/AppText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { MEALDBAPI } from '../../../utils/constants';
import EachDish from '../../../components/Recipe/EachDish';
import { TouchableOpacity } from 'react-native';

export default function Home() {
    const navigation = useNavigation<any>();
    const [allMeals, setAllMeals] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalData, setTotalData] = useState<number | null>(null);
    const pageSize = 10;

    const { colors } = useTheme();

    const fetchData = async () => {
        if (loading || (totalData !== null && allMeals.length >= totalData)) return;
        setLoading(true);
        try {
            const response = await fetch(MEALDBAPI.LISTALLMEALAPI);
            const data = await response.json();
            if (data.meals) {
                if (totalData === null) setTotalData(data.meals.length); // Set total count once
                const start = (page - 1) * pageSize;
                const paginatedData = data.meals.slice(start, start + pageSize);
                setAllMeals((prevMeals) => [...prevMeals, ...paginatedData]);
            }
        } catch (error) {
            console.error('Error fetching meals:', error);
        }
        setLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [page])
    );

    const loadMore = () => {
        if (!loading && allMeals.length < (totalData || 0)) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={[styles.container, { backgroundColor: colors.primary }]}>
                <View style={styles.header}>
                    <AppText size="xxl" weight="bold" color="white">Recipes</AppText>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Add')}>
                            <AntDesign name="plussquare" size={25} color={'white'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                            <Icon name="bell-badge-outline" size={25} color="white" />
                        </TouchableOpacity>
                    </View>
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
                        onEndReached={loadMore}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={() =>
                            loading ? <ActivityIndicator size="large" color={colors.primary} /> : null
                        }
                        ListEmptyComponent={() =>
                            !loading && <AppText size="lg" weight="bold">No meals found.</AppText>
                        }
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

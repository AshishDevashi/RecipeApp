import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import AppText from '../../../components/Common/AppText';
import Icon from 'react-native-vector-icons/Feather';
import EachDish from '../../../components/Recipe/EachDish';
import { useRoute, useTheme } from '@react-navigation/native';
import { MEALDBAPI } from '../../../utils/constants';

function RecipeList({ navigation }: any) {
    const [title, setTitle] = useState('')
    const [foundData, setFoundData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalData, setTotalData] = useState<number | null>(null);
    const pageSize = 10;

    const { params }: any = useRoute();
    const { colors } = useTheme();

    const fetchData = async () => {
        if (loading || (totalData !== null && foundData.length >= totalData)) return;
        setLoading(true);
        try {
            let response;
            switch (params.type) {
                case 'query':
                    response = await fetch(`${MEALDBAPI.FILTERBYNAME}?s=${params.value}`);
                    setTitle(params.value)
                    break;
                case 'categories':
                    response = await fetch(`${MEALDBAPI.FILTERBYCATEGORIES}?c=${params.value}`);
                    setTitle(params.value)
                    break;
                case 'area':
                    response = await fetch(`${MEALDBAPI.FILTERBYIAREA}?a=${params.value}`);
                    setTitle('Area');
                    break;
                default:
                    response = await fetch(`${MEALDBAPI.FILTERBYCATEGORIES}?c=${params.value}`);
                    setTitle(params.value)
            }
            const data = await response.json();
            if (data.meals) {
                if (totalData === null) setTotalData(data.meals.length);
                const start = (page - 1) * pageSize;
                const paginatedData = data.meals.slice(start, start + pageSize);
                setFoundData((prevData) => [...prevData, ...paginatedData]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    const loadMore = () => {
        if (!loading && foundData.length < (totalData || 0)) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={[styles.container, { backgroundColor: colors.primary }]}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="chevron-left" size={30} color="white" />
                    </TouchableOpacity>
                    <AppText size="xxl" weight="bold" color="white">{title}</AppText>
                    <View style={{ width: 30, height: 30 }} />
                </View>

                <View style={[styles.content, { backgroundColor: colors.background }]}>
                    <FlatList
                        data={foundData}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={({ item }) => <EachDish data={item} />}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 20 }}
                        onEndReached={loadMore}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={() =>
                            loading ? <ActivityIndicator size="large" color={colors.primary} /> : null
                        }
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={() =>
                            !loading && <AppText size="lg" weight="bold" >No recipes found.</AppText>
                        }
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default RecipeList;


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
        paddingHorizontal: 10,
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
});
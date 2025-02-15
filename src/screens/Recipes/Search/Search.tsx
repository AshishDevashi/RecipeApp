import React, { useCallback, useState } from 'react'
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import AppText from '../../../components/Common/AppText'
import { useFocusEffect, useNavigation, useTheme } from '@react-navigation/native';
import { FALLBACKIMAGE, MEALDBAPI } from '../../../utils/constants';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import { SheetManager } from 'react-native-actions-sheet';
import FilterSheet from './FilterSheet';
import AppInput from '../../../components/Common/AppInput';


function Search() {
    const navigation = useNavigation<any>();
    const [value, setValue] = useState('');
    const [allCate, setAllCate] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalData, setTotalData] = useState<number | null>(null);
    const pageSize = 20;

    const { colors } = useTheme();

    const fetchData = async () => {
        if (loading || (totalData !== null && allCate.length >= totalData)) return;
        setLoading(true);
        try {
            const response = await fetch(MEALDBAPI.LISTALLCATEGORIESAPI);
            const data = await response.json();
            if (data.categories) {
                if (totalData === null) setTotalData(data.categories.length); // Set total items once
                const start = (page - 1) * pageSize;
                const paginatedData = data.categories.slice(start, start + pageSize);
                setAllCate((prevData) => [...prevData, ...paginatedData]);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
        setLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [page])
    );

    const loadMore = () => {
        if (!loading && allCate.length < (totalData || 0)) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handleSheet = () => {
        SheetManager.show('customActionSheet', {
            payload: {
                children: <FilterSheet />,
                message: 'This Action Will Create Return Order For This Product.',
            },
        });
    };

    const handleSearch = () => {
        // Search functionality
        if (value.trim().length < 3) return;
        navigation.navigate('RecipeList', { type: 'query', value: value.trim() });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={[styles.container, { backgroundColor: colors.primary }]}>
                <View style={styles.header}>
                    <AppText size="xxl" weight="bold" color="white">Discover</AppText>
                    <TouchableOpacity onPress={handleSheet}>
                        <Icon name="sliders" size={25} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={[styles.content, { backgroundColor: colors.background }]}>
                    <View>
                        <AppInput
                            label="Search"
                            value={value}
                            onChangeText={setValue}
                            placeholder="Search recipe"
                            leftIcon={<Feather name="search" size={20} color={colors.text} style={{ marginTop: -4 }} />}
                            onSubmitEditing={handleSearch}
                        />
                    </View>
                    <View style={styles.popularRecipesHeader}>
                        <AppText>Quick Search</AppText>
                    </View>
                    <FlatList
                        data={allCate}
                        renderItem={({ item }) => <EachCategories data={item} />}
                        numColumns={3}
                        columnWrapperStyle={[styles.columnWrapper, { backgroundColor: colors.background }]}
                        onEndReached={loadMore}
                        onEndReachedThreshold={0.5} // Triggers when 50% from the end
                        ListFooterComponent={() =>
                            loading ? <ActivityIndicator size="large" color={colors.primary} /> : null
                        }
                        ListEmptyComponent={() =>
                            !loading && <AppText size="lg" weight="bold" >No categories found.</AppText>
                        }
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}


export default Search

const EachCategories = ({ data }: any) => {
    const navigation = useNavigation<any>();
    const { colors } = useTheme();
    return (
        <TouchableOpacity style={[styles.dishContainer, { backgroundColor: colors.background }]} onPress={() => navigation.navigate('RecipeList', { type: 'categories', value: data?.strCategory })}>
            <Image
                source={{ uri: data?.strCategoryThumb || FALLBACKIMAGE }}
                style={styles.dishImage}
            />
            <AppText weight='bold' size='sm' style={styles.dishTitle} numberOfLines={3}>{data?.strCategory}</AppText>
        </TouchableOpacity>
    );
};

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
    viewAllText: {
        textDecorationLine: 'underline',
    },
    columnWrapper: {
        // justifyContent: 'space-between',
        columnGap: 20,
        marginBottom: 14,
    },
    dishContainer: {
        width: 100,
        height: 117,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
    },
    dishImage: {
        width: 50,
        height: 50,
        borderRadius: 30,
        resizeMode: 'cover'
    },
    dishTitle: {
        textAlign: 'center',
    },
    dishCategory: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
});

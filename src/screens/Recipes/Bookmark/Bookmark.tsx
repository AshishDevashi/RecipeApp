import React, { useState } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import AppText from '../../../components/Common/AppText'
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import EachDish from '../../../components/Recipe/EachDish';

function Bookmark() {
    const bookMarks = useSelector((state: RootState) => state.recipe.bookMarks);
    const [loading, setLoading] = useState(false);
    const { colors } = useTheme();
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={[styles.container, { backgroundColor: colors.primary }]}>
                <View style={styles.header}>
                    <AppText size='xxl' weight='bold' color='white'>Saved recipes</AppText>
                </View>
                <View style={[styles.content, { backgroundColor: colors.background }]}>
                    <FlatList
                        data={bookMarks}
                        keyExtractor={(item, index) => String(index)}
                        renderItem={({ item }) => <EachDish data={item} />}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        columnWrapperStyle={[styles.columnWrapper, { backgroundColor: colors.background }]}
                        ListFooterComponent={() =>
                            loading ? <ActivityIndicator size="large" color={colors.primary} /> : null
                        }
                        ListEmptyComponent={() =>
                            !loading && <AppText size="lg" weight="bold">No meals found.</AppText>
                        }
                    />
                </View>
            </View>
        </SafeAreaView >
    )
}

export default Bookmark;


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
        justifyContent: 'center',
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

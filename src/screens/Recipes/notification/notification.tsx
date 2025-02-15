import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import AppText from '../../../components/Common/AppText'
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import EachDish from '../../../components/Recipe/EachDish';
import Icon from 'react-native-vector-icons/Feather';

function notification({ navigation }: any) {
    const userData: any = useSelector((state: RootState) => state.auth.userData);
    const { colors } = useTheme();
    const data = {
        strMeal: 'Daal',
        strCategory: 'Khicdi',
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={[styles.container, { backgroundColor: colors.primary }]}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name='chevron-left' size={30} color='white' />
                    </TouchableOpacity>
                    <AppText size='xxl' weight='bold' color='white'>Notification</AppText>
                    <View style={{ width: 30, height: 30 }} />
                </View>
                <View style={[styles.content, { backgroundColor: colors.background }]}>
                    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{ marginTop: 30 }}>
                            <EachDish data={data} />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default notification;

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

import React from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import AppText from '../../../components/Common/AppText'
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import EachDish from '../../../components/Recipe/EachDish';
import AppToggle from '../../../components/Common/AppToggle';

function Profile() {
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
                    <AppText size='xxl' weight='bold' color='white'>Profile</AppText>
                    {/* <Icon name='bell-badge-outline' size={25} color='white' /> */}
                </View>
                <View style={[styles.content, { backgroundColor: colors.background }]}>
                    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={{ uri: 'https://avatar.iran.liara.run/public/10' }}
                                style={{ width: 120, height: 120, borderRadius: 75 }}
                            />
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginLeft: 25 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <AppText size='md' >Recipe</AppText>
                                    <AppText size='xl' weight='bold'>4</AppText>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <AppText size='md'>BookMarks</AppText>
                                    <AppText size='xl' weight='bold'>4</AppText>
                                </View>
                            </View>

                        </View>
                        <View>
                            <AppText size='xl' weight='semiBold' style={{ marginTop: 15 }}>{userData?.name}</AppText>
                            <AppText size='md' style={{ marginTop: -5 }}>{userData?.email}</AppText>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <AppText>Dark Mode : </AppText>
                            <AppToggle />
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <View style={{ paddingVertical: 8, paddingHorizontal: 36, backgroundColor: colors.primary, borderRadius: 10 }}>
                                <AppText color='white' weight='semiBold'>My Recipe</AppText>
                            </View>
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <EachDish data={data} />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Profile


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
});

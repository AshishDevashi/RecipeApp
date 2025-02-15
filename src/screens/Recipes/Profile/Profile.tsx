import React from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import AppText from '../../../components/Common/AppText'
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import AppToggle from '../../../components/Common/AppToggle';
import AppButton from '../../../components/Common/AppButton';
import { getAuth } from '@react-native-firebase/auth';
import { setLogout } from '../../../store/reducers/authSlice';
import { showToast } from '../../../utils/helper';
import EachMyDish from '../../../components/Recipe/EachMyDish';

function Profile() {
    const dispatch = useDispatch();
    const userData: any = useSelector((state: RootState) => state.auth.userData);
    const { bookMarks, myRecipe } = useSelector((state: RootState) => state.recipe);
    const { colors } = useTheme();
    const data = {
        strMeal: 'Daal',
        strCategory: 'Khicdi',
    }
    const handleLogout = () => {
        const auth = getAuth();
        auth.signOut()
            .then(() => {
                dispatch(setLogout())
            })
            .catch(() => {
                showToast('error', 'Error logging out')
            });
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={[styles.container, { backgroundColor: colors.primary }]}>
                <View style={styles.header}>
                    <AppText size='xxl' weight='bold' color='white'>Profile</AppText>
                </View>
                <View style={[styles.content, { backgroundColor: colors.background }]}>
                    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={{ uri: 'https://avatar.iran.liara.run/public/10' }}
                                style={{ width: 120, height: 120, borderRadius: 75 }}
                            />
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginLeft: 25 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <AppText size='md' >Recipe</AppText>
                                    <AppText size='xl' weight='bold'>{myRecipe.length}</AppText>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <AppText size='md'>BookMarks</AppText>
                                    <AppText size='xl' weight='bold'>{bookMarks.length}</AppText>
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
                        <View style={{ marginVertical: 30, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 30 }}>
                            {myRecipe.map((r, index) => {
                                return (
                                    <EachMyDish key={index} data={r} />
                                )
                            })}
                        </View>
                        <AppButton
                            title='Logout'
                            onPress={handleLogout}
                        />
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

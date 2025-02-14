import { useTheme } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import AppText from '../../../components/Common/AppText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Home() {
    const { colors } = useTheme();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: colors.primary, }}>
                <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, justifyContent: 'space-between' }}>
                    <AppText size='xxl' weight='bold' color='white'>Recipes</AppText>
                    <View>
                        <Icon name='bell-badge-outline' size={25} color={'white'} />
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: colors.background, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>

                </View>
            </View>
        </SafeAreaView>
    )
}
import React from 'react'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

export default function Home() {
    const userData = useSelector((state: RootState) => state.auth.userData)
    console.log({ userData });
    return (
        <View>
            <Text>Home</Text>
        </View>
    )
}
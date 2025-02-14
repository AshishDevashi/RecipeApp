import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '@react-navigation/native';


export default function Register() {
    const { colors } = useTheme();
    return (
        <View style={{ alignItems: 'center', marginTop: 100 }}>
            <View style={[styles.box, { backgroundColor: colors.primary }]} />
            <View style={[styles.box, { backgroundColor: colors.background }]} />
            <View style={[styles.box, { backgroundColor: colors.border }]} />
            <View style={[styles.box, { backgroundColor: colors.notification }]} />
            <View style={[styles.box, { backgroundColor: colors.text }]} />
            <View style={[styles.box, { backgroundColor: colors.card }]} />
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 20
    }
})
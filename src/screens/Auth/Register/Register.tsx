import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import AppText from '../../../components/Common/AppText';
import AppInput from '../../../components/Common/AppInput';
import AppButton from '../../../components/Common/AppButton';
import AppCheckBox from '../../../components/Common/AppCheckBox';
import { Formik } from 'formik';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../services/Firebase/AuthServices';

const initalState = {
    name: 'ashish',
    email: 'ashish@gmail.com',
    password: 'ashish123',
    confirmPassword: 'ashish123',
    terms: true,
}
export default function Register() {
    const { colors } = useTheme(); ``
    const [loading, setIsLoading] = useState(false);
    const navigation = useNavigation<any>();
    const dispatch = useDispatch();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.headerContainer}>
                <AppText size='xxl' weight='semiBold'>Create an account</AppText>
                <AppText size='sm' style={styles.subtitle}>Let’s help you set up your account, it won’t take long.</AppText>
            </View>
            <Formik
                initialValues={initalState}
                onSubmit={values => { registerUser(values.name, values.email, values.password, dispatch, setIsLoading) }}>
                {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
                    <View style={styles.formContainer}>
                        <AppInput
                            label='Name'
                            value={values.name}
                            onChangeText={handleChange('name')}
                            placeholder='Enter Name'
                            error={touched.name && errors.name ? errors.name : false}
                        />
                        <AppInput
                            label='Email'
                            value={values.email}
                            onChangeText={handleChange('email')}
                            placeholder='Enter Email Address'
                            error={touched.email && errors.email ? errors.email : false}
                        />
                        <AppInput
                            label='Password'
                            value={values.password}
                            onChangeText={handleChange('password')}
                            placeholder='Enter Password'
                            error={touched.password && errors.password ? errors.password : false}
                            isPassword
                        />
                        <AppInput
                            label='Confirm Password'
                            value={values.confirmPassword}
                            onChangeText={handleChange('confirmPassword')}
                            placeholder='Confirm Password'
                            error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : false}
                            isPassword
                        />
                        <View style={styles.checkboxContainer}>
                            <AppCheckBox
                                label='Accept terms & Condition'
                                value={values.terms}
                                onValueChange={() => setFieldValue('terms', !values.terms)}
                                error={touched.terms && errors.terms ? errors.terms : false}
                            />
                        </View>
                        <AppButton
                            title='Sign Up'
                            onPress={handleSubmit}
                            loading={loading}
                        />
                    </View>
                )}
            </Formik>
            <View style={styles.dividerContainer}>
                <View style={[styles.line, { backgroundColor: colors.border }]} />
                <AppText size='sm' color='border' style={styles.orText}>Or Sign in With</AppText>
                <View style={[styles.line, { backgroundColor: colors.border }]} />
            </View>
            <View style={styles.socialContainer}>
                <TouchableOpacity style={[styles.socialButton, { backgroundColor: colors.background }]}>
                    <Image
                        source={{
                            uri: "https://img.icons8.com/?size=100&id=17949&format=png&color=000000",
                        }}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.socialButton, { backgroundColor: colors.background }]}>
                    <Image
                        source={{
                            uri: "https://img.icons8.com/?size=100&id=118497&format=png&color=000000",
                        }}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.footerContainer}>
                <View style={styles.footerTextContainer}>
                    <AppText size='sm' weight='medium'>Already a member? </AppText>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <AppText weight='medium' color='notification'>Sign In</AppText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
    },
    headerContainer: {
        marginTop: 30,
    },
    subtitle: {
        width: '65%',
    },
    formContainer: {
        marginTop: 20,
    },
    checkboxContainer: {
        marginBottom: 26,
    },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 50,
        marginVertical: 15,
    },
    line: {
        flex: 1,
        height: 1,
    },
    orText: {
        marginHorizontal: 10,
    },
    socialContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialButton: {
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 15,
        elevation: 3, // Shadow for Android
        shadowColor: "#000", // Shadow for iOS
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    icon: {
        width: 40,
        height: 40,
        resizeMode: "contain",
    },
    signInLink: {
        color: "#FFA500",
        fontWeight: "bold",
    },
    footerContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    footerTextContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
})
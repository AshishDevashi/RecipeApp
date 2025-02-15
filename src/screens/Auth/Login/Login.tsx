import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import AppText from '../../../components/Common/AppText';
import { Formik } from 'formik';
import AppInput from '../../../components/Common/AppInput';
import AppButton from '../../../components/Common/AppButton';
import { useDispatch } from 'react-redux';
import { logUser } from '../../../services/Firebase/AuthServices';
import { LoginSchema } from '../../../schema/validationSchema';


const initalState = {
    email: '',
    password: '',
}
export default function Login() {
    const dispatch = useDispatch();
    const { colors } = useTheme();
    const [loading, setIsLoading] = useState(false);
    const navigation = useNavigation<any>();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.headerContainer}>
                <AppText weight='semiBold' style={styles.title}>Hello,</AppText>
                <AppText size='sm' style={styles.subtitle}>Welcome Back!</AppText>
            </View>
            <Formik
                initialValues={initalState}
                validationSchema={LoginSchema}
                onSubmit={values => { logUser(values.email, values.password, dispatch, setIsLoading) }}>
                {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
                    <View style={styles.formContainer}>
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
                        <TouchableOpacity style={styles.forgot}>
                            <AppText size='sm' weight='medium' color='notification'>Forgot Password?</AppText>
                        </TouchableOpacity>
                        <AppButton
                            title='Sign In'
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
                    <AppText size='sm' weight='medium'>Don’t have an account? </AppText>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <AppText weight='medium' color='notification'>Sign up</AppText>
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
        marginTop: 50,
    },
    title: {
        fontSize: 30,
    },
    subtitle: {
        fontSize: 20,
    },
    formContainer: {
        marginTop: 50,
    },
    forgot: {
        marginBottom: 20,
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
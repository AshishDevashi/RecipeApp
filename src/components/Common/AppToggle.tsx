import { useTheme } from '@react-navigation/native';
import React, { useRef, useCallback, useEffect } from 'react';
import {
    TouchableOpacity,
    Animated,
    StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../../store/reducers/authSlice';
import { RootState } from '../../store';


const AppToggle = () => {
    const dispatch = useDispatch();
    const { colors } = useTheme();
    const isDarkMode = useSelector((state: RootState) => state.auth.isDarkMode);
    const toggleAnim = useRef(new Animated.Value(isDarkMode ? 1 : 0)).current;

    const animateToggle = useCallback((toValue: number) => {
        Animated.timing(toggleAnim, {
            toValue,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [toggleAnim]);

    const toggleTheme = useCallback(() => {
        dispatch(setDarkMode(!isDarkMode));
    }, [dispatch, isDarkMode]);

    useEffect(() => {
        animateToggle(isDarkMode ? 1 : 0);
    }, [isDarkMode, animateToggle]);

    const toggleColor = toggleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.border, colors.primary],
    });

    const toggleCirclePosition = toggleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [2, 22],
    });

    return (
        <TouchableOpacity onPress={toggleTheme} activeOpacity={0.8}>
            <Animated.View style={[styles.toggleContainer, { backgroundColor: toggleColor }]}>
                <Animated.View style={[styles.toggleCircle, { left: toggleCirclePosition }]} />
            </Animated.View>
        </TouchableOpacity>
    );
};

export default AppToggle;

const styles = StyleSheet.create({
    toggleContainer: {
        width: 50,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        position: 'relative',
    },
    toggleCircle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: '#fff',
        position: 'absolute',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
});

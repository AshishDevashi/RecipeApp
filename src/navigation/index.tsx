import { NavigationContainer } from '@react-navigation/native';
import { AppTheme } from '../theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from '../screens/Auth/Register/Register';
import Login from '../screens/Auth/Login/Login';
import { Appearance } from 'react-native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import Recipe from '../screens/Recipes';
import { SheetProvider } from 'react-native-actions-sheet';
import '../utils/sheet.ts'
import { setDarkMode } from '../store/reducers/authSlice.ts';
import notification from '../screens/Recipes/notification/notification.tsx';

const authScreens = [
    { name: 'Register', component: Register },
    { name: 'Login', component: Login },
];
const shopScreens = [
    { name: 'Recipe', component: Recipe },
    { name: 'Notification', component: notification },
];

function RootNavigation() {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state: RootState) => state.auth.isDarkMode)
    const Stack = createNativeStackNavigator();
    const { light, dark } = AppTheme;
    const isLogin = useSelector((state: RootState) => state.auth.isLogin);

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            dispatch(setDarkMode(colorScheme === 'dark'))
        });

        return () => subscription.remove(); // Cleanup on unmount
    }, []);
    console.log('is Login', isLogin);
    return (
        <NavigationContainer theme={isDarkMode ? dark : light}>
            <SheetProvider>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {!isLogin ? (
                        <Stack.Group>
                            {authScreens.map(({ name, component }) => (
                                <Stack.Screen key={name} name={name} component={component} />
                            ))}
                        </Stack.Group>
                    ) : (
                        <Stack.Group>
                            {shopScreens.map(({ name, component }) => (
                                <Stack.Screen key={name} name={name} component={component} />
                            ))}
                        </Stack.Group>
                    )}
                </Stack.Navigator>
            </SheetProvider>
        </NavigationContainer>
    );
}


export default RootNavigation;
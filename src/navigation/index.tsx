import { NavigationContainer } from '@react-navigation/native';
import { AppTheme } from '../theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from '../screens/Auth/Register/Register';
import Login from '../screens/Auth/Login/Login';
import Home from '../screens/Recipes/Home/Home';
import { Appearance } from 'react-native';
import { useEffect, useState } from 'react';

const authScreens = [
    { name: 'Register', component: Register },
    { name: 'Login', component: Login },
];
const shopScreens = [
    { name: 'Home', component: Home },
];

function RootNavigation() {
    const [isDarkMode, setDarkMode] = useState(Appearance.getColorScheme() === 'dark');
    const Stack = createNativeStackNavigator();
    const { light, dark } = AppTheme;
    const isLogin = false;

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setDarkMode(colorScheme === 'dark');
        });

        return () => subscription.remove(); // Cleanup on unmount
    }, []);
    return (
        <NavigationContainer theme={isDarkMode ? dark : light}>
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
        </NavigationContainer>
    );
}


export default RootNavigation;
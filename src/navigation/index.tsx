import { NavigationContainer } from '@react-navigation/native';
import { AppTheme } from '../theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from '../screens/Auth/Register/Register';
import Login from '../screens/Auth/Login/Login';
import { Appearance } from 'react-native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import Recipe from '../screens/Recipes';
import { SheetProvider } from 'react-native-actions-sheet';
import { setDarkMode } from '../store/reducers/authSlice.ts';
import Notification from '../screens/Recipes/notification/notification.tsx';
import RecipeList from '../screens/Recipes/Search/RecipeList.tsx';
import RecipeDetails from '../screens/Recipes/RecipeDetails/RecipeDetails.tsx';
import '../utils/sheet.ts'
import Add from '../screens/Recipes/Add/Add.tsx';

const authScreens = [
    { name: 'Register', component: Register },
    { name: 'Login', component: Login },
];
const shopScreens = [
    { name: 'Recipe', component: Recipe },
    { name: 'Notification', component: Notification },
    { name: 'RecipeList', component: RecipeList },
    { name: 'RecipeDetails', component: RecipeDetails },
    { name: 'Add', component: Add },
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
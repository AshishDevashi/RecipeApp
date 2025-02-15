import { useTheme } from "@react-navigation/native";
import Home from "./Home/Home";
import Search from "./Search/Search";
import Profile from "./Profile/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
import Bookmark from "./Bookmark/Bookmark";

const TABS = [
    { name: 'Home', component: Home, icon: 'home' },
    { name: 'Search', component: Search, icon: 'compass' },
    { name: 'Bookmark', component: Bookmark, icon: 'bookmark' },
    { name: 'Profile', component: Profile, icon: 'user' },
];

const Tab = createBottomTabNavigator();
function Recipe() {
    const { colors } = useTheme();


    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ size, focused }) => {
                    const { icon }: any = TABS.find(tab => tab.name === route.name);
                    let color = focused ? colors.primary : '#b3b3b3';
                    return <Icon name={icon} size={size} color={color} />;
                },
                headerShown: false,
                tabBarLabel: '',
                tabBarStyle: {
                    backgroundColor: colors.background,
                },
                tabBarItemStyle: {
                    padding: 10
                },
            })}>
            {TABS.map(tab => (
                <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
            ))}
        </Tab.Navigator>
    );
}

export default Recipe;
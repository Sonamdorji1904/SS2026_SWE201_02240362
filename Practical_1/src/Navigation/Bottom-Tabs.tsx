import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ContactScreen from '../Screen/ContactScreen';
import HomeScreen from '../Screen/HomeScreen';


const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: true,
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen 
            options={{
                tabBarIcon: () => (
                    <AntDesign name="home" size={24} color="black" />
                )
            }}
            name="Home" 
            component={HomeScreen} />
            <Tab.Screen options={{
                tabBarIcon: () => (
                    <MaterialCommunityIcons name="face-man-profile" size={24} color="black" />
                )
            }}
            name="Contact" 
            component={ContactScreen} />
        </Tab.Navigator>
    )
};
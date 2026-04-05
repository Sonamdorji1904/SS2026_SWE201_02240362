import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screen/HomeScreen";
import ContactScreen from "../Screen/ContactScreen";

const Stack = createStackNavigator();

function MainStackNavigator() { 
    return (
        <Stack.Navigator 
            screenOptions={{ headerShown: true }}
            initialRouteName="Home"
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Contact" component={ContactScreen} />
        </Stack.Navigator>
    );
}

export default MainStackNavigator;
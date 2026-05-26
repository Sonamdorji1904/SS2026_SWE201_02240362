import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ContactsProvider } from './context/ContactsContext';
import HomeScreen from './screens/HomeScreen';
import ContactFormScreen from './screens/ContactFormScreen';

export type RootStackParamList = {
  Home: undefined;
  ContactForm: { contact?: any } | undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ContactsProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'My Contacts' }} />
            <Stack.Screen
              name="ContactForm"
              component={ContactFormScreen}
              options={({ route }) => ({ title: route.params?.contact ? 'Edit Contact' : 'Add Contact' })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ContactsProvider>
    </GestureHandlerRootView>
  );
}
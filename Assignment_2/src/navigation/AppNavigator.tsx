// src/navigation/AppNavigator.tsx
// Sets up all navigation:
//   - Bottom Tab Navigator (Home, Categories, Profile)
//   - Stack Navigator wrapping the tabs + Detail + AnimationDemo screens

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'expo-vector-icons';

// Import all screens
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import DetailScreen from '../screens/DetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AnimationDemoScreen from '../screens/AnimationDemoScreen';
import { Workout } from '../data/workouts';

// Create navigators
type RootStackParamList = {
  MainTabs: undefined;
  Detail: { workout: Workout };
  AnimationDemo: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// ─── Bottom Tab Navigator ──────────────────────────────────────────
// Contains the 3 main tabs: Home, Categories, Profile
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#eee',
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: '#4F8EF7',
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoryScreen}
        options={{
          tabBarLabel: 'Workouts',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="dumbbell" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// ─── Root Stack Navigator ──────────────────────────────────────────
// MainTabs sits inside the stack so Detail + AnimationDemo can be
// pushed on top from any tab.
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#1a1a2e',
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: '#f5f7fb' },
        }}
      >
        {/* Main tab layout — no header (tabs have their own) */}
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />

        {/* Detail screen — shown on top of tabs */}
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={({ route }: any) => ({
            title: route.params?.workout?.name ?? 'Workout Detail',
            headerBackTitle: 'Back',
          })}
        />

        {/* Animation Demo — accessed from Profile */}
        <Stack.Screen
          name="AnimationDemo"
          component={AnimationDemoScreen}
          options={{ title: 'Animation Demo', headerBackTitle: 'Back' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;

// src/navigation/AppNavigator.js
// Root navigator: switches between Auth stack and Main stack based on login state

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

import useStore from '../store/useStore';
import LoginScreen from '../screens/LoginScreen';
import TaskListScreen from '../screens/TaskListScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen';
import EditTaskScreen from '../screens/EditTaskScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { COLORS } from '../utils/theme';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const user = useStore((s) => s.user);
  const isAuthLoading = useStore((s) => s.isAuthLoading);
  const rehydrateAuth = useStore((s) => s.rehydrateAuth);
  const rehydrateFilter = useStore((s) => s.rehydrateFilter);

  // On mount: rehydrate persisted auth + filter from AsyncStorage
  useEffect(() => {
    rehydrateAuth();
    rehydrateFilter();
  }, []);

  // Splash / loading state while rehydrating
  if (isAuthLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.background },
          headerTintColor: COLORS.primary,
          headerTitleStyle: { fontWeight: '700' },
          headerShadowVisible: false,
        }}
      >
        {!user ? (
          // ── Auth Stack ─────────────────────────────────────
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        ) : (
          // ── App Stack ──────────────────────────────────────
          <>
            <Stack.Screen
              name="TaskList"
              component={TaskListScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TaskDetail"
              component={TaskDetailScreen}
              options={{ title: 'Task Detail', headerBackTitle: 'Back' }}
            />
            <Stack.Screen
              name="CreateTask"
              component={CreateTaskScreen}
              options={{ title: 'Create Task', headerBackTitle: 'Cancel' }}
            />
            <Stack.Screen
              name="EditTask"
              component={EditTaskScreen}
              options={{ title: 'Edit Task', headerBackTitle: 'Back' }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: 'My Profile', headerBackTitle: 'Back' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

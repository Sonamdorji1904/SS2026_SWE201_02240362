import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./src/Navigation/MainStackNavigator";
import BottomTabs from "./src/Navigation/Bottom-Tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, StyleSheet, Button } from 'react-native';

export default function App() {
  return (
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          {/* <MainStackNavigator /> */}
          <BottomTabs />
        </NavigationContainer>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  }
});
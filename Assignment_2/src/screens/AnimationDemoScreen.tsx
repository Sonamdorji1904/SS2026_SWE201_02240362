// src/screens/AnimationDemoScreen.tsx
// Demonstrates animations and gestures for the assignment requirement
// Animations: Fade In, Scale (bounce), Pulse loop
// Gesture: Press + Long Press

import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  navigation: any;
};

const AnimationDemoScreen: React.FC<Props> = () => {

  // ─── Animation 1: Fade In / Out ───────────────────────────────
  const fadeValue = useRef(new Animated.Value(1)).current;
  const [isFaded, setIsFaded] = useState(false);

  const toggleFade = () => {
    Animated.timing(fadeValue, {
      toValue: isFaded ? 1 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => setIsFaded(!isFaded));
  };

  // ─── Animation 2: Scale / Bounce ──────────────────────────────
  const scaleValue = useRef(new Animated.Value(1)).current;

  const triggerBounce = () => {
    // Scale up then back down (bounce effect)
    Animated.sequence([
      Animated.spring(scaleValue, {
        toValue: 1.4,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // ─── Animation 3: Repeating Pulse ─────────────────────────────
  const pulseValue = useRef(new Animated.Value(1)).current;
  const [isPulsing, setIsPulsing] = useState(false);
  const pulseRef = useRef<Animated.CompositeAnimation | null>(null);

  const togglePulse = () => {
    if (isPulsing) {
      pulseRef.current?.stop();
      Animated.timing(pulseValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      setIsPulsing(false);
    } else {
      // Create a repeating loop
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseValue, {
            toValue: 1.15,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseValue, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      );
      pulseRef.current = loop;
      loop.start();
      setIsPulsing(true);
    }
  };

  // ─── Gesture: Long Press ───────────────────────────────────────
  const handleLongPress = () => {
    Alert.alert('Long Press!', 'You held the button for 600ms — gesture detected!');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Animation Demo</Text>
        <Text style={styles.subtitle}>
          Tap the buttons to see each animation in action.
        </Text>

        {/* ── Demo 1: Fade ── */}
        <View style={styles.demoBox}>
          <Text style={styles.demoTitle}>1. Fade In / Out</Text>
          <Animated.View style={[styles.box, styles.blueBox, { opacity: fadeValue }]}>
            <Text style={styles.boxLabel}>Hello!</Text>
          </Animated.View>
          <TouchableOpacity style={styles.button} onPress={toggleFade}>
            <Text style={styles.buttonText}>
              {isFaded ? 'Fade In' : 'Fade Out'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Demo 2: Bounce Scale ── */}
        <View style={styles.demoBox}>
          <Text style={styles.demoTitle}>2. Scale Bounce</Text>
          <Animated.View
            style={[
              styles.box,
              styles.greenBox,
              { transform: [{ scale: scaleValue }] },
            ]}
          >
            <Text style={styles.boxLabel}>Bounce!</Text>
          </Animated.View>
          <TouchableOpacity style={styles.button} onPress={triggerBounce}>
            <Text style={styles.buttonText}>Bounce It</Text>
          </TouchableOpacity>
        </View>

        {/* ── Demo 3: Pulse Loop ── */}
        <View style={styles.demoBox}>
          <Text style={styles.demoTitle}>3. Repeating Pulse</Text>
          <Animated.View
            style={[
              styles.box,
              styles.orangeBox,
              { transform: [{ scale: pulseValue }] },
            ]}
          >
            <Text style={styles.boxLabel}>♥</Text>
          </Animated.View>
          <TouchableOpacity
            style={[styles.button, isPulsing && styles.buttonRed]}
            onPress={togglePulse}
          >
            <Text style={styles.buttonText}>
              {isPulsing ? 'Stop Pulse' : 'Start Pulse'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── Gesture Demo ── */}
        <View style={styles.demoBox}>
          <Text style={styles.demoTitle}>4. Gesture: Long Press</Text>
          <Text style={styles.gestureHint}>
            Press normally: nothing.{'\n'}
            Hold for 0.6 seconds: alert fires!
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.purpleButton]}
            onPress={() => {}} // regular press does nothing here
            onLongPress={handleLongPress}
            delayLongPress={600}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Hold Me</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  demoBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  box: {
    width: 100,
    height: 100,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  blueBox: {
    backgroundColor: '#4F8EF7',
  },
  greenBox: {
    backgroundColor: '#4CAF50',
  },
  orangeBox: {
    backgroundColor: '#FF9800',
  },
  boxLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#4F8EF7',
    borderRadius: 10,
    paddingHorizontal: 28,
    paddingVertical: 12,
  },
  buttonRed: {
    backgroundColor: '#FF6B6B',
  },
  purpleButton: {
    backgroundColor: '#9C27B0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  gestureHint: {
    textAlign: 'center',
    color: '#777',
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 22,
  },
});

export default AnimationDemoScreen;

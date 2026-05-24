// src/screens/LoginScreen.js
// Sign-in / Sign-up screen with tab toggle

import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Alert, KeyboardAvoidingView, Platform, TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStore from '../store/useStore';
import useForm from '../hooks/useForm';
import Input from '../components/Input';
import Button from '../components/Button';
import { validateSignIn, validateSignUp } from '../utils/helpers';
import { COLORS, SPACING, FONT_SIZE, RADIUS } from '../utils/theme';

const LoginScreen = () => {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const signIn = useStore((s) => s.signIn);
  const signUp = useStore((s) => s.signUp);

  // Sign-in form
  const signInForm = useForm(
    { email: '', password: '' },
    validateSignIn
  );

  // Sign-up form
  const signUpForm = useForm(
    { name: '', email: '', password: '' },
    validateSignUp
  );

  const handleSignIn = async () => {
    await signInForm.handleSubmit(async (values) => {
      try {
        await signIn(values);
        // Navigation handled automatically by root navigator reacting to auth state
      } catch (err) {
        Alert.alert('Sign In Failed', err.message || 'Please try again.');
      }
    });
  };

  const handleSignUp = async () => {
    await signUpForm.handleSubmit(async (values) => {
      try {
        await signUp(values);
      } catch (err) {
        Alert.alert('Sign Up Failed', err.message || 'Please try again.');
      }
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logo}>🐳</Text>
            <Text style={styles.appName}>Task Manager</Text>
            <Text style={styles.tagline}>Stay organized, stay ahead.</Text>
          </View>

          {/* Tab toggle */}
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, mode === 'signin' && styles.tabActive]}
              onPress={() => setMode('signin')}
            >
              <Text style={[styles.tabText, mode === 'signin' && styles.tabTextActive]}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, mode === 'signup' && styles.tabActive]}
              onPress={() => setMode('signup')}
            >
              <Text style={[styles.tabText, mode === 'signup' && styles.tabTextActive]}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Forms */}
          <View style={styles.form}>
            {mode === 'signin' ? (
              <>
                <Input
                  label="Email"
                  value={signInForm.values.email}
                  onChangeText={(v) => signInForm.handleChange('email', v)}
                  error={signInForm.errors.email}
                  placeholder="demo@example.com"
                  keyboardType="email-address"
                />
                <Input
                  label="Password"
                  value={signInForm.values.password}
                  onChangeText={(v) => signInForm.handleChange('password', v)}
                  error={signInForm.errors.password}
                  placeholder="••••••••"
                  secureTextEntry
                />
                <Button
                  title="Sign In"
                  onPress={handleSignIn}
                  loading={signInForm.submitting}
                  style={styles.submitBtn}
                />
                {/* <Text style={styles.hint}>Demo: demo@example.com / password123</Text> */}
              </>
            ) : (
              <>
                <Input
                  label="Full Name"
                  value={signUpForm.values.name}
                  onChangeText={(v) => signUpForm.handleChange('name', v)}
                  error={signUpForm.errors.name}
                  placeholder="Your Name"
                  autoCapitalize="words"
                />
                <Input
                  label="Email"
                  value={signUpForm.values.email}
                  onChangeText={(v) => signUpForm.handleChange('email', v)}
                  error={signUpForm.errors.email}
                  placeholder="you@example.com"
                  keyboardType="email-address"
                />
                <Input
                  label="Password"
                  value={signUpForm.values.password}
                  onChangeText={(v) => signUpForm.handleChange('password', v)}
                  error={signUpForm.errors.password}
                  placeholder="Min 6 characters"
                  secureTextEntry
                />
                <Button
                  title="Create Account"
                  onPress={handleSignUp}
                  loading={signUpForm.submitting}
                  style={styles.submitBtn}
                />
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flexGrow: 1, padding: SPACING.lg },
  header: { alignItems: 'center', marginVertical: SPACING.xl },
  logo: { fontSize: 60 },
  appName: { fontSize: FONT_SIZE.xxxl, fontWeight: '800', color: COLORS.primary, marginTop: SPACING.sm },
  tagline: { fontSize: FONT_SIZE.md, color: COLORS.gray400, marginTop: SPACING.xs },
  tabs: {
    flexDirection: 'row',
    backgroundColor: COLORS.gray100,
    borderRadius: RADIUS.md,
    padding: 4,
    marginBottom: SPACING.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
  },
  tabActive: { backgroundColor: COLORS.white, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  tabText: { fontSize: FONT_SIZE.md, color: COLORS.gray400, fontWeight: '600' },
  tabTextActive: { color: COLORS.primary },
  form: { gap: 0 },
  submitBtn: { marginTop: SPACING.sm },
  hint: { textAlign: 'center', fontSize: FONT_SIZE.sm, color: COLORS.gray400, marginTop: SPACING.md },
});

export default LoginScreen;

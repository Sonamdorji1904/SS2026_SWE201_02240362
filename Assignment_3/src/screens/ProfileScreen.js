// src/screens/ProfileScreen.js
// Shows user info and sign out button

import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStore from '../store/useStore';
import Button from '../components/Button';
import { COLORS, SPACING, FONT_SIZE, RADIUS } from '../utils/theme';

const ProfileScreen = ({ navigation }) => {
  const user = useStore((s) => s.user);
  const signOut = useStore((s) => s.signOut);
  const tasks = useStore((s) => s.tasks);
  const [loading, setLoading] = useState(false);

  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const pendingCount = tasks.filter((t) => t.status === 'pending').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in-progress').length;

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          setLoading(true);
          await signOut();
          // Root navigator will react to auth state change automatically
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      {/* Avatar */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{user?.name?.[0]?.toUpperCase() || 'U'}</Text>
      </View>
      <Text style={styles.name}>{user?.name}</Text>
      <Text style={styles.email}>{user?.email}</Text>

      {/* Stats */}
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{tasks.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.stat}>
          <Text style={[styles.statNumber, { color: COLORS.success }]}>{completedCount}</Text>
          <Text style={styles.statLabel}>Done</Text>
        </View>
        <View style={styles.stat}>
          <Text style={[styles.statNumber, { color: COLORS.warning }]}>{inProgressCount}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.stat}>
          <Text style={[styles.statNumber, { color: COLORS.gray400 }]}>{pendingCount}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
      </View>

      <Button
        title="Sign Out"
        onPress={handleSignOut}
        loading={loading}
        variant="danger"
        style={styles.signOutBtn}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background, alignItems: 'center', paddingTop: SPACING.xl },
  avatar: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: SPACING.md,
  },
  avatarText: { fontSize: 40, color: COLORS.white, fontWeight: '700' },
  name: { fontSize: FONT_SIZE.xxl, fontWeight: '800', color: COLORS.gray900 },
  email: { fontSize: FONT_SIZE.md, color: COLORS.gray400, marginTop: SPACING.xs, marginBottom: SPACING.lg },
  stats: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginHorizontal: SPACING.lg,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: SPACING.xl,
    gap: SPACING.md,
  },
  stat: { flex: 1, alignItems: 'center' },
  statNumber: { fontSize: FONT_SIZE.xxl, fontWeight: '800', color: COLORS.primary },
  statLabel: { fontSize: FONT_SIZE.sm, color: COLORS.gray400, marginTop: 2 },
  signOutBtn: { width: '80%' },
});

export default ProfileScreen;

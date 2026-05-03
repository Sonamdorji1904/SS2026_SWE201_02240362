// src/screens/ProfileScreen.tsx
// Profile and settings screen — shows user info and basic toggles

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatBox from '../components/StatBox';

type Props = {
  navigation: any;
};

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  // Simple user data stored in state
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [darkModeOn, setDarkModeOn] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  // Mock weekly stats
  const weeklyWorkouts = 5;
  const weeklyCalories = 1840;
  const weeklyMinutes = 210;

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing coming soon!');
  };

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: () => {} },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Profile header */}
        <View style={styles.profileHeader}>
          {/* Simple avatar with initials */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>SD</Text>
          </View>
          <Text style={styles.userName}>Sonam Dorji</Text>
          <Text style={styles.userEmail}>sonam.dorji@university.edu</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Weekly stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Week</Text>
          <View style={styles.statsRow}>
            <StatBox label="Workouts" value={weeklyWorkouts} color="#4F8EF7" />
            <StatBox label="Calories" value={weeklyCalories} unit="kcal" color="#FF6B6B" />
            <StatBox label="Minutes" value={weeklyMinutes} color="#9C27B0" />
          </View>
        </View>

        {/* Settings toggles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <View style={styles.settingsCard}>
            <SettingRow
              label="Notifications"
              value={notificationsOn}
              onToggle={() => setNotificationsOn(!notificationsOn)}
            />
            <View style={styles.separator} />
            <SettingRow
              label="Dark Mode"
              value={darkModeOn}
              onToggle={() => setDarkModeOn(!darkModeOn)}
            />
            <View style={styles.separator} />
            <SettingRow
              label="Sound Effects"
              value={soundOn}
              onToggle={() => setSoundOn(!soundOn)}
            />
          </View>
        </View>

        {/* Navigation to Animation Demo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore</Text>
          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => navigation.navigate('AnimationDemo')}
          >
            <Text style={styles.menuRowText}>Animation Demo</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Log out */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Small sub-component for a toggle row ---
type SettingRowProps = {
  label: string;
  value: boolean;
  onToggle: () => void;
};

const SettingRow: React.FC<SettingRowProps> = ({ label, value, onToggle }) => (
  <View style={settingStyles.row}>
    <Text style={settingStyles.label}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onToggle}
      trackColor={{ false: '#ddd', true: '#4F8EF7' }}
      thumbColor="#fff"
    />
  </View>
);

const settingStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 15,
    color: '#333',
  },
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  profileHeader: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 28,
    marginBottom: 8,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#4F8EF7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    color: '#888',
    marginBottom: 14,
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#4F8EF7',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  editButtonText: {
    color: '#4F8EF7',
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 12,
    marginTop: 8,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: -4,
  },
  settingsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 16,
  },
  menuRow: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  menuRowText: {
    fontSize: 15,
    color: '#333',
  },
  menuArrow: {
    fontSize: 20,
    color: '#aaa',
  },
  logoutButton: {
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  logoutText: {
    color: '#FF6B6B',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default ProfileScreen;

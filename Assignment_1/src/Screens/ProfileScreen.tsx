import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Student profile data - replace with your own info
const STUDENT = {
  name: 'Sonam Dorji',
  id: '02240362',
  programme: 'BE Software Engineering',
  year: 'Year 2, Semester 2',
  email: '02240362.cst@rub.edu.bt',
};

// Info rows rendered via FlatList
interface InfoItem {
  id: string;
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const INFO_ITEMS: InfoItem[] = [
  { id: '1', label: 'Student ID', value: STUDENT.id, icon: 'card-outline' },
  { id: '2', label: 'Programme', value: STUDENT.programme, icon: 'school-outline' },
  { id: '3', label: 'Year / Sem', value: STUDENT.year, icon: 'calendar-outline' },
  { id: '4', label: 'Email', value: STUDENT.email, icon: 'mail-outline' },
  { id: '5', label: 'College', value: 'CST, Rinchending', icon: 'business-outline' },
  { id: '6', label: 'University', value: 'Royal University of Bhutan', icon: 'school' },
];

function InfoRow({ item }: { item: InfoItem }) {
  return (
    <View style={styles.row}>
      <Ionicons
        name={item.icon}
        size={20}
        color="#0A84FF"
        style={styles.rowEmoji}
      />
      <View style={styles.rowText}>
        <Text style={styles.rowLabel}>{item.label}</Text>
        <Text style={styles.rowValue}>{item.value}</Text>
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={INFO_ITEMS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        // Profile header rendered above the list
        ListHeaderComponent={
          <View style={styles.profileHeader}>
            {/* Profile picture placeholder */}
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Image source={require('../../assets/avatar.png')} style={{ width: '100%', height: '100%', borderRadius: 50 }} />
              </View>
              <View style={styles.badge}>
                <Ionicons name="camera-outline" size={16} color="#0A84FF" />
              </View>
            </View>
            <Text style={styles.name}>{STUDENT.name}</Text>
            <Text style={styles.programme}>{STUDENT.programme}</Text>

            <View style={styles.divider} />
            <Text style={styles.sectionLabel}>Student Information</Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <View>
            <InfoRow item={item} />
            {/* Divider between rows, not after last */}
            {index < INFO_ITEMS.length - 1 && (
              <View style={styles.rowDivider} />
            )}
          </View>
        )}
        // Wrap all info rows in a card
        ListFooterComponent={<View style={styles.footer} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  listContent: {
    paddingBottom: 110,
  },
  profileHeader: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#23ccff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0A84FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  avatarInitial: {
    fontSize: 42,
    fontWeight: '700',
    color: '#fff',
  },
  // Camera badge on avatar
  badge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeText: {
    fontSize: 14,
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  programme: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 24,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E5E5EA',
    marginBottom: 16,
  },
  sectionLabel: {
    alignSelf: 'flex-start',
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  rowEmoji: {
    fontSize: 20,
    marginRight: 14,
    width: 28,
    textAlign: 'center',
  },
  rowText: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
    marginBottom: 2,
  },
  rowValue: {
    fontSize: 15,
    color: '#1C1C1E',
    fontWeight: '500',
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#F2F2F7',
    marginLeft: 62, // align with text, skip emoji area
  },
  footer: {
    height: 20,
  },
});

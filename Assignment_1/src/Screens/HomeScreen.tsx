import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Each card links to a main tab screen
type NavCard = {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  tab: string;
};

const NAV_CARDS: NavCard[] = [
  {
    title: 'Contacts',
    subtitle: 'Helpdesk, Offices & Services',
    icon: 'people',
    color: '#000000',
    tab: 'Contacts',
  },
  {
    title: 'Schedule',
    subtitle: 'Your weekly timetable',
    icon: 'calendar',
    color: '#000000',
    tab: 'Schedule',
  },
  {
    title: 'Profile',
    subtitle: 'Your student profile',
    icon: 'person',
    color: '#000000',
    tab: 'Profile',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Campus{'\n'}Companion</Text>
          <Text style={styles.subtitle}>
            College of Science and Technology, RUB
          </Text>
        </View>

        {/* Announcement Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerLabel}>📢 Latest Notice</Text>
          <Text style={styles.bannerText}>
            End-semester exams begin from June 1st. Check the schedule for your timetable.
          </Text>
        </View>

        {/* Navigation Cards */}
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.cardGrid}>
          {NAV_CARDS.map((card) => (
            <TouchableOpacity
              key={card.title}
              style={[styles.card, { borderLeftColor: card.color }]}
              onPress={() => navigation.navigate(card.tab)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={card.icon}
                size={28}
                color={card.color}
                style={styles.cardEmoji}
              />
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 110, // space for floating tab bar
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '500',
    marginBottom: 6,
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: '#1C1C1E',
    lineHeight: 44,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#8E8E93',
    fontWeight: '400',
  },
  banner: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  bannerLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10a55d',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bannerText: {
    fontSize: 14,
    color: '#3A3A3C',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 14,
  },
  cardGrid: {
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    borderLeftWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#8E8E93',
  },
});

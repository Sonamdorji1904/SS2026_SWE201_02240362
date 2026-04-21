import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// ─── Info Row ─────────────────────────────────────────────────────────────────
function InfoRow({ iconName, label, value }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIconWrap}>
        <MaterialCommunityIcons name={iconName} size={18} color="#57534E" />
      </View>
      <View style={styles.infoText}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

// ─── Skill Badge ──────────────────────────────────────────────────────────────
function SkillBadge({ label, level, color }) {
  const bars = [1, 2, 3, 4, 5];
  return (
    <View style={styles.skillRow}>
      <Text style={styles.skillLabel}>{label}</Text>
      <View style={styles.skillBars}>
        {bars.map((b) => (
          <View
            key={b}
            style={[
              styles.skillBar,
              { backgroundColor: b <= level ? color : '#E7E5E4' },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

// ─── Achievement Card ─────────────────────────────────────────────────────────
function AchievementCard({ iconName, title, desc, color }) {
  return (
    <View style={[styles.achievement, { borderLeftColor: color }]}>
      <MaterialCommunityIcons name={iconName} size={22} color={color} style={styles.achieveIcon} />
      <View style={{ flex: 1 }}>
        <Text style={styles.achieveTitle}>{title}</Text>
        <Text style={styles.achieveDesc}>{desc}</Text>
      </View>
    </View>
  );
}

// ─── Profile Screen ───────────────────────────────────────────────────────────
export default function ProfileScreen({ navigation }) {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 600;
  const isLandscape = width > height;

  const twoCol = isTablet || isLandscape;

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          isTablet && styles.scrollTablet,
        ]}
      >

        {/* ── Back Button ──────────────────────────────────── */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backText}>← Dashboard</Text>
        </TouchableOpacity>

        {/* ── Profile Hero ─────────────────────────────────── */}
        <View style={[styles.hero, twoCol && styles.heroRow]}>
          {/* Avatar */}
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarInitials}>SD</Text>
            </View>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Active</Text>
            </View>
          </View>

          {/* Name & Info */}
          <View style={[styles.heroInfo, twoCol && styles.heroInfoRow]}>
            <Text style={styles.heroName}>Sonam Dorji</Text>
            <Text style={styles.heroRole}>BE SWE Student · Practical 2</Text>
            <Text style={styles.heroBio}>
              Building responsive React Native apps using Expo. Learning Flexbox,
              navigation, and dimension-aware UI design.
            </Text>

            {/* Quick stats strip */}
            <View style={styles.heroStats}>
              <View style={styles.heroStat}>
                <Text style={styles.heroStatNum}>2</Text>
                <Text style={styles.heroStatLabel}>Screens</Text>
              </View>
              <View style={styles.heroStatDivider} />
              <View style={styles.heroStat}>
                <Text style={styles.heroStatNum}>3</Text>
                <Text style={styles.heroStatLabel}>Devices Tested</Text>
              </View>
              <View style={styles.heroStatDivider} />
              <View style={styles.heroStat}>
                <Text style={styles.heroStatNum}>A+</Text>
                <Text style={styles.heroStatLabel}>Grade</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── Two-column area ───────────────────────────────── */}
        <View style={twoCol ? styles.twoCol : null}>

          {/* Left: Personal Info */}
          <View style={twoCol ? styles.colLeft : null}>
            <Text style={styles.sectionTitle}>Personal Info</Text>
            <View style={styles.card}>
              <InfoRow iconName="account-circle-outline" label="Full Name" value="Sonam Dorji" />
              <InfoRow iconName="school-outline" label="Course" value="BE SWE – Sem 4" />
              <InfoRow iconName="domain" label="College" value="College of Science and Technology" />
              <InfoRow iconName="email-outline" label="Email" value="02240362.cst@rub.edu.bt" />
              <InfoRow iconName="phone-outline" label="Phone" value="+975 17 123 456" />
              <InfoRow iconName="map-marker-outline" label="Location" value="Rinchending, P/ling, Bhutan" />
            </View>

            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.card}>
              <SkillBadge label="React Native" level={4} color="#F97316" />
              <SkillBadge label="JavaScript" level={4} color="#8B5CF6" />
              <SkillBadge label="Flexbox Layout" level={3} color="#0EA5E9" />
              <SkillBadge label="React Navigation" level={3} color="#10B981" />
              <SkillBadge label="Expo" level={5} color="#F97316" />
            </View>
          </View>

          {/* Right: Achievements */}
          <View style={twoCol ? styles.colRight : null}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <View style={styles.achieveList}>
              <AchievementCard
                iconName="trophy-outline"
                title="First App Built"
                desc="Successfully created and ran first Expo project"
                color="#F97316"
              />
              <AchievementCard
                iconName="ruler-square-compass"
                title="Flexbox Master"
                desc="Implemented responsive grid layouts using flex properties"
                color="#8B5CF6"
              />
              <AchievementCard
                iconName="map-outline"
                title="Navigator"
                desc="Integrated stack navigation between multiple screens"
                color="#0EA5E9"
              />
              <AchievementCard
                iconName="cellphone"
                title="Multi-Device"
                desc="Tested layout on phone, tablet, and landscape orientation"
                color="#10B981"
              />
              <AchievementCard
                iconName="lightbulb-on-outline"
                title="useWindowDimensions"
                desc="Used the hook to adapt UI based on screen size at runtime"
                color="#F59E0B"
              />
            </View>

            {/* Practical Units Card */}
            <Text style={styles.sectionTitle}>Units Covered</Text>
            <View style={styles.card}>
              {[
                { unit: 'Unit 2', topic: 'Responsive Layout Basics', done: true },
                { unit: 'Unit 3', topic: 'Navigation & Screen Design', done: true },
              ].map((u) => (
                <View key={u.unit} style={styles.unitRow}>
                  <View style={[styles.unitDot, { backgroundColor: u.done ? '#10B981' : '#E7E5E4' }]} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.unitLabel}>{u.unit}</Text>
                    <Text style={styles.unitTopic}>{u.topic}</Text>
                  </View>
                  <Text style={[styles.unitStatus, { color: u.done ? '#10B981' : '#9CA3AF' }]}>
                    {u.done ? '✓ Done' : 'Pending'}
                  </Text>
                </View>
              ))}
            </View>
          </View>

        </View>

        {/* ── Back to Dashboard ────────────────────────────── */}
        <TouchableOpacity
          style={styles.dashBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <Text style={styles.dashBtnText}>← Back to Dashboard</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F8F5F1',
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  scrollTablet: {
    padding: 32,
    paddingBottom: 60,
  },

  // Back
  backBtn: {
    marginBottom: 16,
  },
  backText: {
    fontSize: 14,
    color: '#F97316',
    fontWeight: '600',
  },

  // Hero
  hero: {
    backgroundColor: '#1C1917',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 24,
  },
  avatarWrap: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#0a443f',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarInitials: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    fontFamily: 'Georgia',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#10B981' + '25',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#10B981' + '50',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  statusText: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '700',
  },
  heroInfo: {
    flex: 1,
    alignItems: 'center',
  },
  heroInfoRow: {
    alignItems: 'flex-start',
  },
  heroName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    fontFamily: 'Georgia',
    marginBottom: 4,
  },
  heroRole: {
    fontSize: 13,
    color: '#A8A29E',
    marginBottom: 10,
  },
  heroBio: {
    fontSize: 13,
    color: '#78716C',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  heroStat: { alignItems: 'center' },
  heroStatNum: {
    fontSize: 22,
    fontWeight: '800',
    color: '#F97316',
    fontFamily: 'Georgia',
  },
  heroStatLabel: {
    fontSize: 10,
    color: '#78716C',
    marginTop: 2,
    textAlign: 'center',
  },
  heroStatDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#292524',
  },

  // Two-column layout
  twoCol: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
  },
  colLeft: { flex: 1 },
  colRight: { flex: 1 },

  // Section title
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1917',
    fontFamily: 'Georgia',
    marginBottom: 10,
    marginTop: 4,
  },

  // Card
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },

  // Info Row
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F4',
  },
  infoIconWrap: {
    width: 24,
    alignItems: 'center',
  },
  infoText: { flex: 1 },
  infoLabel: {
    fontSize: 10,
    color: '#A8A29E',
    marginBottom: 1,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1C1917',
  },

  // Skills
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  skillLabel: {
    flex: 1,
    fontSize: 13,
    color: '#44403C',
  },
  skillBars: {
    flexDirection: 'row',
    gap: 4,
  },
  skillBar: {
    width: 18,
    height: 8,
    borderRadius: 4,
  },

  // Achievements
  achieveList: {
    gap: 10,
    marginBottom: 20,
  },
  achievement: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderLeftWidth: 4,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  achieveIcon: {
    marginTop: 1,
  },
  achieveTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1C1917',
    marginBottom: 2,
  },
  achieveDesc: {
    fontSize: 11,
    color: '#78716C',
    lineHeight: 16,
  },

  // Units
  unitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F4',
  },
  unitDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  unitLabel: {
    fontSize: 10,
    color: '#A8A29E',
    marginBottom: 2,
  },
  unitTopic: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1C1917',
  },
  unitStatus: {
    fontSize: 12,
    fontWeight: '700',
  },

  // Back button
  dashBtn: {
    borderWidth: 2,
    borderColor: '#F97316',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  dashBtnText: {
    color: '#F97316',
    fontWeight: '700',
    fontSize: 16,
  },
});
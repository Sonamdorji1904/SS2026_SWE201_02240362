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

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, unit, accent }) {
  return (
    <View style={[styles.statCard, { borderTopColor: accent }]}>
      <Text style={[styles.statValue, { color: accent }]}>{value}</Text>
      {unit ? <Text style={styles.statUnit}>{unit}</Text> : null}
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// ─── Activity Row ─────────────────────────────────────────────────────────────
function ActivityRow({ iconName, title, time, tag, tagColor }) {
  return (
    <View style={styles.activityRow}>
      <View style={[styles.activityIcon, { backgroundColor: tagColor + '20' }]}>
        <MaterialCommunityIcons name={iconName} size={18} color={tagColor} />
      </View>
      <View style={styles.activityInfo}>
        <Text style={styles.activityTitle}>{title}</Text>
        <Text style={styles.activityTime}>{time}</Text>
      </View>
      <View style={[styles.activityTag, { backgroundColor: tagColor + '15', borderColor: tagColor + '40' }]}>
        <Text style={[styles.activityTagText, { color: tagColor }]}>{tag}</Text>
      </View>
    </View>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ label, value, max, color }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <View style={styles.progressWrap}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressLabel}>{label}</Text>
        <Text style={[styles.progressValue, { color }]}>{value}/{max}</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

// ─── Dashboard Screen ─────────────────────────────────────────────────────────
export default function DashboardScreen({ navigation }) {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 600;
  const isLandscape = width > height;

  // On tablet/landscape: stats go in a 4-column row, otherwise 2x2 grid
  const statsColumns = isTablet ? 4 : 2;

  // On tablet: main content splits into two columns
  const twoColLayout = isTablet || isLandscape;

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          isTablet && styles.scrollTablet,
        ]}
      >

        {/* ── Top Bar ─────────────────────────────────────── */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greeting}>Good morning !</Text>
            <Text style={styles.username}>Sonam Dorji</Text>
          </View>
          <TouchableOpacity
            style={styles.avatarButton}
            onPress={() => navigation.navigate('Profile')}
            activeOpacity={0.8}
          >
            <Text style={styles.avatarText}>SD</Text>
          </TouchableOpacity>
        </View>

        {/* ── Summary Banner ──────────────────────────────── */}
        <View style={styles.banner}>
          <View style={styles.bannerLeft}>
            <Text style={styles.bannerTitle}>Practical 2</Text>
            <Text style={styles.bannerSub}>Responsive Layouts · React Native</Text>
            <View style={styles.bannerBadge}>
              <View style={styles.bannerDot} />
              <Text style={styles.bannerBadgeText}>In Progress</Text>
            </View>
          </View>
          <Text style={styles.bannerEmoji}>📱</Text>
        </View>

        {/* ── Stats Grid ──────────────────────────────────── */}
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={[styles.statsGrid, { flexDirection: isTablet ? 'row' : 'row', flexWrap: 'wrap' }]}>
          <View style={{ width: `${100 / statsColumns}%`, padding: 4 }}>
            <StatCard label="Tasks Done" value="12" accent="#F97316" />
          </View>
          <View style={{ width: `${100 / statsColumns}%`, padding: 4 }}>
            <StatCard label="Hours Coded" value="34" unit="hrs" accent="#8B5CF6" />
          </View>
          <View style={{ width: `${100 / statsColumns}%`, padding: 4 }}>
            <StatCard label="Screens Built" value="2" accent="#0EA5E9" />
          </View>
          <View style={{ width: `${100 / statsColumns}%`, padding: 4 }}>
            <StatCard label="Score" value="9.5" unit="/10" accent="#10B981" />
          </View>
        </View>

        {/* ── Main Content: two-col on tablet ─────────────── */}
        <View style={twoColLayout ? styles.twoCol : null}>

          {/* Left / Full: Progress */}
          <View style={twoColLayout ? styles.colLeft : null}>
            <Text style={styles.sectionTitle}>Progress</Text>
            <View style={styles.card}>
              <ProgressBar label="Flexbox Layouts" value={8} max={10} color="#11a3a3" />
              <ProgressBar label="Navigation Setup" value={10} max={10} color="#10B981" />
              <ProgressBar label="Responsive Logic" value={7} max={10} color="#8B5CF6" />
              <ProgressBar label="Testing Devices" value={5} max={10} color="#0EA5E9" />
            </View>
          </View>

          {/* Right / Full: Activity */}
          <View style={twoColLayout ? styles.colRight : null}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <View style={styles.card}>
              <ActivityRow
                iconName="laptop"
                title="Created DashboardScreen"
                time="2 hours ago"
                tag="Code"
                tagColor="#8B5CF6"
              />
              <ActivityRow
                iconName="puzzle-outline"
                title="Installed React Navigation"
                time="4 hours ago"
                tag="Setup"
                tagColor="#0EA5E9"
              />
              <ActivityRow
                iconName="ruler-square-compass"
                title="Implemented Flexbox grid"
                time="Yesterday"
                tag="Layout"
                tagColor="#F97316"
              />
              <ActivityRow
                iconName="check-circle"
                title="Tested on tablet emulator"
                time="Yesterday"
                tag="Test"
                tagColor="#10B981"
              />
            </View>
          </View>

        </View>

        {/* ── Go to Profile Button ─────────────────────────── */}
        <TouchableOpacity
          style={styles.profileBtn}
          onPress={() => navigation.navigate('Profile')}
          activeOpacity={0.85}
        >
          <Text style={styles.profileBtnText}>View Profile →</Text>
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

  // Top Bar
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 13,
    color: '#9CA3AF',
    fontFamily: 'Georgia',
  },
  username: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1C1917',
    fontFamily: 'Georgia',
  },
  avatarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0a443f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },

  // Banner
  banner: {
    backgroundColor: '#1C1917',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  bannerLeft: { flex: 1 },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'Georgia',
    marginBottom: 4,
  },
  bannerSub: {
    fontSize: 12,
    color: '#A8A29E',
    marginBottom: 12,
  },
  bannerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#19a50a',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  bannerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  bannerBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  bannerIcon: {
    marginLeft: 12,
  },

  bannerEmoji: {
    fontSize: 48,
  },

  // Section title
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1917',
    fontFamily: 'Georgia',
    marginBottom: 10,
    marginTop: 4,
  },

  // Stats
  statsGrid: {
    marginBottom: 20,
    marginHorizontal: -4,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderTopWidth: 3,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    fontFamily: 'Georgia',
    lineHeight: 32,
  },
  statUnit: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: -2,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
  },

  // Two column layout (tablet / landscape)
  twoCol: {
    flexDirection: 'row',
    gap: 16,
  },
  colLeft: { flex: 1 },
  colRight: { flex: 1 },

  // Card wrapper
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    gap: 4,
  },

  // Progress
  progressWrap: {
    marginBottom: 14,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    color: '#57534E',
  },
  progressValue: {
    fontSize: 12,
    fontWeight: '700',
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#F5F5F4',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },

  // Activity
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F4',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityInfo: { flex: 1 },
  activityTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1C1917',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 11,
    color: '#A8A29E',
  },
  activityTag: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  activityTagText: {
    fontSize: 10,
    fontWeight: '700',
  },

  // Profile Button
  profileBtn: {
    backgroundColor: '#F97316',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  profileBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
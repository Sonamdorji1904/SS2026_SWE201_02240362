import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../Navigation/RootNavigator';

type Route = RouteProp<RootStackParamList, 'ContactDetail'>;

export default function ContactDetailScreen() {
  const route = useRoute<Route>();
  const navigation = useNavigation();
  const { name, role, phone, email } = route.params;

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={20} color="#000000" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Avatar circle */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{name.charAt(0)}</Text>
      </View>

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.role}>{role}</Text>

      {/* Info rows */}
      <View style={styles.section}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="call-outline" size={18} color="#1C1C1E" />
            <Text style={styles.rowLabel}>Phone</Text>
          </View>
          <Text style={styles.rowValue}>{phone}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="mail-outline" size={18} color="#1C1C1E" />
            <Text style={styles.rowLabel}>Email</Text>
          </View>
          <Text style={styles.rowValue}>{email}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
  },
  backBtn: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backText: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '500',
    marginLeft: 4,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#0A84FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 38,
    fontWeight: '700',
    color: '#fff',
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  role: {
    fontSize: 15,
    color: '#8E8E93',
    marginBottom: 32,
  },
  section: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLabel: {
    fontSize: 15,
    color: '#1C1C1E',
    fontWeight: '500',
    marginLeft: 8,
  },
  rowValue: {
    fontSize: 14,
    color: '#0A84FF',
    flex: 1,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#F2F2F7',
    marginHorizontal: 16,
  },
});

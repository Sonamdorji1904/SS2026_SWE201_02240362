import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigation/RootNavigator';

type Nav = StackNavigationProp<RootStackParamList, 'Main'>;

interface Contact {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const CONTACTS: Contact[] = [
  { id: '1', name: 'IT Services', role: 'Technical Support', phone: '+975-5-252525', email: 'ithelpdesk@cst.edu.bt', icon: 'laptop-outline' },
  { id: '2', name: 'Student Service Officer', role: 'SSO Office', phone: '+975-5-252526', email: 'studentservices@cst.edu.bt', icon: 'school-outline' },
  { id: '3', name: 'Library', role: 'Resource Center', phone: '+975-5-252527', email: 'library@cst.edu.bt', icon: 'book-outline' },
  { id: '4', name: 'Infirmary', role: 'Medical Services', phone: '+975-5-252528', email: 'health@cst.edu.bt', icon: 'medkit-outline' },
  { id: '5', name: 'Finance Office', role: 'Fees & Payments', phone: '+975-5-252529', email: 'finance@cst.edu.bt', icon: 'card-outline' },
  { id: '6', name: 'Dean of Students Affairs', role: 'Student Affairs', phone: '+975-5-252532', email: 'dean@cst.edu.bt', icon: 'school' },
];

export default function ContactsScreen() {
  const navigation = useNavigation<Nav>();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handlePress = (contact: Contact) => {
    // Dynamic style: highlight on press
    setSelectedId(contact.id);
    setTimeout(() => setSelectedId(null), 300);

    // Navigate and pass params to detail screen
    navigation.navigate('ContactDetail', {
      name: contact.name,
      role: contact.role,
      phone: contact.phone,
      email: contact.email,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contacts</Text>
      <FlatList
        data={CONTACTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              // Dynamic style: highlight selected
              selectedId === item.id && styles.cardHighlighted,
            ]}
            onPress={() => handlePress(item)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={item.icon}
              size={26}
              color="#0A84FF"
              style={styles.emoji}
            />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.role}>{item.role}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    fontSize: 34,
    fontWeight: '800',
    color: '#1C1C1E',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 110,
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  // Dynamic style for highlighted state
  cardHighlighted: {
    backgroundColor: '#E5F1FF',
  },
  emoji: {
    fontSize: 26,
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  role: {
    fontSize: 13,
    color: '#8E8E93',
  },
  arrow: {
    fontSize: 22,
    color: '#C7C7CC',
    fontWeight: '300',
  },
});

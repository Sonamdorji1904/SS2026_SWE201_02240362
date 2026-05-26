import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Contact } from '../type';

interface Props {
  contact: Contact;
  onPress: () => void;
  onDelete: () => void;
}

const ContactItem: React.FC<Props> = ({ contact, onPress, onDelete }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.phone}>{contact.phoneNumber}</Text>
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
        <MaterialIcons name="delete-outline" size={22} color="#d11a2a" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold' as const },
  phone: { fontSize: 14, color: '#666', marginTop: 4 },
  deleteBtn: { padding: 8 },
};

export default ContactItem;
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useContacts } from '../context/ContactsContext';
import { Contact } from '../type';

const ContactFormScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const contact = (route.params as any)?.contact as Contact | undefined;
  const { addContact, updateContact } = useContacts();

  const [name, setName] = useState(contact?.name || '');
  const [phone, setPhone] = useState(contact?.phoneNumber || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Error', 'Name and phone number are required.');
      return;
    }

    setLoading(true);
    let success = false;
    if (contact) {
      success = await updateContact(contact.id, name.trim(), phone.trim());
    } else {
      success = await addContact(name.trim(), phone.trim());
    }
    setLoading(false);
    if (success) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="John Doe" />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="+97517******"
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
        <Text style={styles.saveButtonText}>{loading ? 'Saving...' : 'Save Contact'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 5, marginTop: 15 },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default ContactFormScreen;
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContacts } from '../context/ContactsContext';
import { Contact } from '../type';
import ContactItem from '../components/ContactItem';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { contacts, deleteContact, isLoading } = useContacts();

  const handleEdit = (contact: Contact) => {
    navigation.navigate('ContactForm', { contact });
  };

  const handleDelete = (id: string, name: string) => {
    Alert.alert('Delete Contact', `Delete ${name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteContact(id) },
    ]);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={contacts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ContactItem contact={item} onPress={() => handleEdit(item)} onDelete={() => handleDelete(item.id, item.name)} />
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 50 }}>No contacts found.</Text>}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('ContactForm', {})}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  fab: {
    position: 'absolute' as const,
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: { color: '#fff', fontSize: 24, fontWeight: 'bold' as const },
};

export default HomeScreen;
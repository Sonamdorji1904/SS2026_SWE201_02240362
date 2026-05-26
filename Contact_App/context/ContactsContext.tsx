import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { Contact } from '../type';

type ContactsContextType = {
  contacts: Contact[];
  addContact: (name: string, phone: string) => Promise<boolean>;
  updateContact: (id: string, name: string, phone: string) => Promise<boolean>;
  deleteContact: (id: string) => Promise<boolean>;
  isLoading: boolean;
};

const STORAGE_KEY = '@contact_manager_contacts';
const ContactsContext = createContext<ContactsContextType | undefined>(undefined);

export const useContacts = () => {
  const context = useContext(ContactsContext);
  if (!context) throw new Error('useContacts must be used within ContactsProvider');
  return context;
};

export const ContactsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load contacts from AsyncStorage on startup
  const loadContacts = async () => {
    setIsLoading(true);
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setContacts(JSON.parse(stored));
      } else {
        // Optionally add some dummy contacts for demo
        const demoContacts: Contact[] = [
          { id: '1', name: 'Sonam Dorji', phoneNumber: '+97517121314' },
          { id: '2', name: 'Jigme Ngawang Chogyal', phoneNumber: '+97517456789' },
        ];
        setContacts(demoContacts);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(demoContacts));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load contacts.');
    } finally {
      setIsLoading(false);
    }
  };

  // Save contacts to AsyncStorage whenever they change
  const saveContacts = async (newContacts: Contact[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newContacts));
      setContacts(newContacts);
    } catch (error) {
      Alert.alert('Error', 'Failed to save contacts.');
    }
  };

  const addContact = async (name: string, phone: string): Promise<boolean> => {
    try {
      const newId = Date.now().toString(); // simple unique id
      const newContact: Contact = { id: newId, name, phoneNumber: phone };
      const updated = [...contacts, newContact];
      await saveContacts(updated);
      return true;
    } catch (error) {
      Alert.alert('Error', 'Could not add contact.');
      return false;
    }
  };

  const updateContact = async (id: string, name: string, phone: string): Promise<boolean> => {
    try {
      const updatedContacts = contacts.map(c =>
        c.id === id ? { ...c, name, phoneNumber: phone } : c
      );
      await saveContacts(updatedContacts);
      return true;
    } catch (error) {
      Alert.alert('Error', 'Could not update contact.');
      return false;
    }
  };

  const deleteContact = async (id: string): Promise<boolean> => {
    try {
      const filtered = contacts.filter(c => c.id !== id);
      await saveContacts(filtered);
      return true;
    } catch (error) {
      Alert.alert('Error', 'Could not delete contact.');
      return false;
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <ContactsContext.Provider
      value={{ contacts, addContact, updateContact, deleteContact, isLoading }}>
      {children}
    </ContactsContext.Provider>
  );
};
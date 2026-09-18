import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {
  X,
  History,
  Heart,
  User,
  LogIn,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (destination: 'history' | 'favorites' | 'account') => void;
  onSignIn: () => void;
  onSignOut: () => void;
  user?: { name: string; email: string } | null;
}

export function SideMenu({
  open,
  onClose,
  onNavigate,
  onSignIn,
  onSignOut,
  user,
}: SideMenuProps) {
  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Menu</Text>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <X size={22} color="#09090b" />
            </Pressable>
          </View>

          <View style={styles.userSection}>
            {user ? (
              <View>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
              </View>
            ) : (
              <Pressable style={styles.loginButton} onPress={onSignIn}>
                <LogIn size={20} color="#ffffff" />
                <Text style={styles.loginButtonText}>Entrar na conta</Text>
              </Pressable>
            )}
          </View>

          <View style={styles.menuItems}>
            <Pressable
              style={styles.menuItem}
              onPress={() => onNavigate('history')}>
              <View style={styles.menuItemLeft}>
                <History size={20} color="#71717a" />
                <Text style={styles.menuItemText}>Histórico de Pedidos</Text>
              </View>
              <ChevronRight size={18} color="#a1a1aa" />
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => onNavigate('favorites')}>
              <View style={styles.menuItemLeft}>
                <Heart size={20} color="#71717a" />
                <Text style={styles.menuItemText}>Meus Favoritos</Text>
              </View>
              <ChevronRight size={18} color="#a1a1aa" />
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => onNavigate('account')}>
              <View style={styles.menuItemLeft}>
                <User size={20} color="#71717a" />
                <Text style={styles.menuItemText}>Minha Conta</Text>
              </View>
              <ChevronRight size={18} color="#a1a1aa" />
            </Pressable>
          </View>

          {user && (
            <Pressable style={styles.signOutButton} onPress={onSignOut}>
              <LogOut size={20} color="#ef4444" />
              <Text style={styles.signOutText}>Sair da conta</Text>
            </Pressable>
          )}
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-start',
  },
  container: {
    width: '80%',
    height: '100%',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#09090b',
  },
  closeButton: {
    padding: 8,
  },
  userSection: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f5',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#09090b',
  },
  userEmail: {
    fontSize: 14,
    color: '#71717a',
    marginTop: 2,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6344FF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  menuItems: {
    marginTop: 10,
    gap: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#fafafa',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemText: {
    fontSize: 15,
    color: '#27272a',
    fontWeight: '500',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 'auto',
    marginBottom: 30,
    paddingVertical: 12,
  },
  signOutText: {
    color: '#ef4444',
    fontSize: 15,
    fontWeight: '600',
  },
});
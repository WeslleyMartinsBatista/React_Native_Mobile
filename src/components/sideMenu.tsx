import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { User, LogOut, LogIn, Utensils, ShoppingBag, Settings, Home } from 'lucide-react-native';
import { useAuth } from '../controller/AuthController'; // Ajuste o caminho conforme a estrutura de pastas do projeto

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
  onNavigate?: (screenName: string) => void;
  onSignIn: () => void;
}

export function SideMenu({ open, onClose, onNavigate, onSignIn }: SideMenuProps) {
  const { user, logout } = useAuth() as {
    user: { nome?: string; name?: string; email?: string } | null;
    logout: () => void;
  }

  if (!open) return null;

  const handleNavigation = (screenName: string) => {
    onClose();
    if (onNavigate) {
      onNavigate(screenName);
    }
  };

  return (
    <View style={styles.overlay}>
      
      {/* 1º O MENU: Renderizado primeiro, portanto fica fixo na esquerda */}
      <View style={styles.menuContainer}>
        <View style={styles.topSection}>
          {/* Cabeçalho do Menu: Exibe Nome/E-mail se logado ou o botão "Entrar na conta" */}
          <View style={styles.userHeader}>
            {user ? (
              <View style={styles.userInfoContainer}>
                <View style={styles.avatarCircle}>
                  <User size={24} color="#6344FF" />
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.userName} numberOfLines={1}>
                    {user.nome || user.name || 'Usuário'}
                  </Text>
                  <Text style={styles.userEmail} numberOfLines={1}>
                    {user.email}
                  </Text>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.signInButton}
                onPress={() => {
                  onClose();
                  onSignIn();
                }}>
                <LogIn size={20} color="#6344FF" />
                <Text style={styles.signInText}>Entrar na conta</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Opções de Navegação */}
          <View style={styles.navigationSection}>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => handleNavigation('homeView')}>
              <Home size={20} color="#71717a" />
              <Text style={styles.navText}>Início</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => handleNavigation('cardapioView')}>
              <Utensils size={20} color="#71717a" />
              <Text style={styles.navText}>Cardápio</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => handleNavigation('Checkout')}>
              <ShoppingBag size={20} color="#71717a" />
              <Text style={styles.navText}>Meu Pedido</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Rodapé do Menu */}
        <View style={styles.bottomSection}>
          {user && (
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => {
                logout();
                onClose();
              }}>
              <LogOut size={20} color="#ef4444" />
              <Text style={styles.logoutText}>Sair da conta</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* 2º O FUNDO ESCURO: Renderizado depois, preenchendo o restante da tela na direita */}
      <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 1000,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menuContainer: {
    width: 280,
    backgroundColor: '#ffffff',
    height: '100%',
    padding: 20,
    justifyContent: 'space-between',
  },
  topSection: {
    flex: 1,
  },
  userHeader: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e7',
    marginBottom: 20,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EEECFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#09090b',
  },
  userEmail: {
    fontSize: 13,
    color: '#71717a',
    marginTop: 2,
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  signInText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6344FF',
  },
  navigationSection: {
    gap: 8,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  navText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#27272a',
  },
  bottomSection: {
    borderTopWidth: 1,
    borderTopColor: '#e4e4e7',
    paddingTop: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ef4444',
  },
});
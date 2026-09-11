import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { 
  Menu, ShoppingBag, QrCode, Utensils, Bike, ChevronRight, BellRing, Flame, X
} from 'lucide-react-native';
import { useCart } from '../store/cart'; // Importação do carrinho

const { width, height } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.85;

const COLORS = {
  background: '#F7F4F0', white: '#FFFFFF', dark: '#2A2421', primary: '#C84325',
  grayLight: '#EBE8E2', grayCircle: '#E5E2DC', grayMedium: '#D1CEC7', textMain: '#1A1A1A',
  textMuted: '#7A7571', textOverline: '#96908B',
};

const CATEGORIES = [
  { id: '1', title: 'Churrasco', subtitle: 'Cortes na brasa', icon: '🥩' },
  { id: '2', title: 'Prato feito', subtitle: 'Almoço completo', icon: '🍛' },
  { id: '3', title: 'Lanches', subtitle: 'Feitos na chapa', icon: '🍔' },
  { id: '4', title: 'Bebidas', subtitle: 'Para acompanhar', icon: '🍹' },
  { id: '5', title: 'Acompanhamentos', subtitle: 'Porções e extras', icon: '🍟' },
];

export default function HomeScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Local');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const menuAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const cartAnim = useRef(new Animated.Value(width)).current;
  
  // Puxando dados do carrinho
  const { cartCount, cartTotal } = useCart();

  const openMenu = () => {
    setIsMenuOpen(true);
    Animated.timing(menuAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
  };
  const closeMenu = () => {
    Animated.timing(menuAnim, { toValue: -DRAWER_WIDTH, duration: 300, useNativeDriver: true }).start(() => setIsMenuOpen(false));
  };

  const openCart = () => {
    setIsCartOpen(true);
    Animated.timing(cartAnim, { toValue: width - DRAWER_WIDTH, duration: 300, useNativeDriver: true }).start();
  };
  const closeCart = () => {
    Animated.timing(cartAnim, { toValue: width, duration: 300, useNativeDriver: true }).start(() => setIsCartOpen(false));
  };

  const closeAllDrawers = () => {
    if (isMenuOpen) closeMenu();
    if (isCartOpen) closeCart();
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={openMenu}>
            <Menu color={COLORS.textMain} size={24} />
          </TouchableOpacity>
          
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}><Flame color={COLORS.white} size={16} /></View>
            <Text style={styles.logoText}>Fogo & Fumaça</Text>
          </View>
          
          {/* Ícone da Sacola Atualizado */}
          <TouchableOpacity style={[styles.headerButton, styles.cartButton]} onPress={openCart}>
            <ShoppingBag color={COLORS.white} size={20} />
            {cartCount > 0 && (
              <View style={styles.badgeCount}>
                <Text style={styles.badgeCountText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.heroCard}>
            <View style={styles.badge}><Text style={styles.badgeText}>Demonstração</Text></View>
            <Text style={styles.heroTitle}>Escolha o seu pedido.</Text>
            <Text style={styles.heroSubtitle}>Do churrasco ao almoço, tudo feito na hora.</Text>
            <TouchableOpacity style={styles.scanButton} activeOpacity={0.8}>
              <QrCode color={COLORS.grayMedium} size={20} />
              <Text style={styles.scanButtonText}>Escanear mesa</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tabsContainer}>
            <TouchableOpacity style={[styles.tab, activeTab === 'Local' && styles.activeTab]} onPress={() => setActiveTab('Local')}>
              <Utensils color={activeTab === 'Local' ? COLORS.textMain : COLORS.textMuted} size={18} />
              <Text style={[styles.tabText, activeTab === 'Local' && styles.activeTabText]}>Local</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tab, activeTab === 'Entrega' && styles.activeTab]} onPress={() => setActiveTab('Entrega')}>
              <Bike color={activeTab === 'Entrega' ? COLORS.textMain : COLORS.textMuted} size={18} />
              <Text style={[styles.tabText, activeTab === 'Entrega' && styles.activeTabText]}>Entrega</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionOverline}>Cardápio</Text>
              <Text style={styles.sectionTitle}>O que você quer comer?</Text>
            </View>
            <Text style={styles.sectionCount}>5 categorias</Text>
          </View>

          <View style={styles.categoriesList}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity key={cat.id} style={styles.categoryCard} activeOpacity={0.7} onPress={() => navigation.navigate('MenuScreen', { category: cat.title })}>
                <View style={styles.categoryIconWrapper}><Text style={styles.categoryEmoji}>{cat.icon}</Text></View>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryTitle}>{cat.title}</Text>
                  <Text style={styles.categorySubtitle}>{cat.subtitle}</Text>
                </View>
                <ChevronRight color={COLORS.primary} size={20} strokeWidth={2.5} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.fab} activeOpacity={0.9}>
          <BellRing color={COLORS.white} size={20} strokeWidth={2.5} />
          <Text style={styles.fabText}>Chamar garçom</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* OVERLAY */}
      {(isMenuOpen || isCartOpen) && (
        <TouchableWithoutFeedback onPress={closeAllDrawers}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      {/* MENU ESQUERDO */}
      <Animated.View style={[styles.drawer, styles.drawerLeft, { transform: [{ translateX: menuAnim }] }]}>
        <SafeAreaView style={styles.drawerSafeArea}>
          <View style={styles.drawerHeaderRow}>
            <Text style={styles.drawerTitle}>Menu</Text>
            <TouchableOpacity style={styles.closeCircleButton} onPress={closeMenu}>
              <X color={COLORS.textMain} size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.authBox}>
            <Text style={styles.authBoxTitle}>Olá, visitante</Text>
            <Text style={styles.authBoxSub}>Entre para acompanhar seus pedidos e favoritos.</Text>
            <View style={styles.authBoxButtons}>
              <TouchableOpacity style={styles.btnPrimary} onPress={() => { closeMenu(); navigation.navigate('LoginScreen'); }}>
                <Text style={styles.btnPrimaryText}>Entrar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSecondary} onPress={() => { closeMenu(); navigation.navigate('Register'); }}>
                <Text style={styles.btnSecondaryText}>Criar conta</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={styles.menuLinks}>
            <TouchableOpacity style={styles.menuItem}><Text style={styles.menuItemText}>Histórico de pedidos</Text></TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}><Text style={styles.menuItemText}>Favoritos</Text></TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}><Text style={styles.menuItemText}>Ajuda</Text></TouchableOpacity>
          </ScrollView>
          <Text style={styles.drawerFooterText}>Contas de demonstração locais: os dados não são persistidos.</Text>
        </SafeAreaView>
      </Animated.View>

      {/* SACOLA DIREITA (Atualizada dinamicamente) */}
      <Animated.View style={[styles.drawer, styles.drawerRight, { transform: [{ translateX: cartAnim }] }]}>
        <SafeAreaView style={styles.drawerSafeArea}>
          <View style={styles.drawerHeaderRow}>
            <View>
              <Text style={styles.cartHeaderOverline}>Seu pedido</Text>
              <Text style={styles.drawerTitle}>Sacola</Text>
            </View>
            <TouchableOpacity style={styles.closeCircleButton} onPress={closeCart}>
              <X color={COLORS.textMain} size={20} />
            </TouchableOpacity>
          </View>

          {cartCount === 0 ? (
            <View style={styles.emptyCartContainer}>
              <View style={styles.emptyCartIconWrapper}>
                <ShoppingBag color={COLORS.dark} size={32} strokeWidth={1.5} />
              </View>
              <Text style={styles.emptyCartTitle}>Sua sacola está vazia</Text>
              <TouchableOpacity style={styles.emptyCartButton} onPress={closeCart}>
                <Text style={styles.emptyCartButtonText}>Ver cardápio</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.emptyCartContainer, { justifyContent: 'flex-start', paddingTop: 20 }]}>
              <Text style={[styles.emptyCartTitle, { marginBottom: 10 }]}>Você tem {cartCount} itens</Text>
              <Text style={{ fontSize: 18, color: COLORS.textMuted, marginBottom: 30 }}>
                Total: R$ {cartTotal.toFixed(2).replace('.', ',')}
              </Text>
              <TouchableOpacity 
                style={[styles.emptyCartButton, { backgroundColor: COLORS.primary, width: '100%', alignItems: 'center' }]} 
                onPress={() => { closeCart(); navigation.navigate('Checkout', { orderType: activeTab.toLowerCase() }); }}
              >
                <Text style={[styles.emptyCartButtonText, { color: COLORS.white }]}>Ir para Pagamento</Text>
              </TouchableOpacity>
            </View>
          )}

        </SafeAreaView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 20 : 10, paddingBottom: 20 },
  headerButton: { width: 44, height: 44, backgroundColor: COLORS.grayLight, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  cartButton: { backgroundColor: COLORS.dark },
  badgeCount: { position: 'absolute', top: -5, right: -5, backgroundColor: COLORS.primary, width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  badgeCountText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  logoContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoIcon: { backgroundColor: COLORS.primary, padding: 6, borderRadius: 8 },
  logoText: { fontSize: 16, fontWeight: '700', color: COLORS.textMain },
  heroCard: { backgroundColor: COLORS.dark, borderRadius: 24, padding: 24, marginTop: 10, marginBottom: 24 },
  badge: { backgroundColor: '#D1751F', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginBottom: 16 },
  badgeText: { color: COLORS.dark, fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  heroTitle: { color: COLORS.white, fontSize: 28, fontWeight: 'bold', marginBottom: 8, letterSpacing: -0.5 },
  heroSubtitle: { color: COLORS.grayMedium, fontSize: 14, marginBottom: 24, lineHeight: 20 },
  scanButton: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  scanButtonText: { color: COLORS.grayMedium, fontSize: 15, fontWeight: '600' },
  tabsContainer: { flexDirection: 'row', backgroundColor: COLORS.grayLight, borderRadius: 30, padding: 4, marginBottom: 32 },
  tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 26, gap: 8 },
  activeTab: { backgroundColor: COLORS.white, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  tabText: { fontSize: 15, color: COLORS.textMuted, fontWeight: '600' },
  activeTabText: { color: COLORS.textMain, fontWeight: '700' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 },
  sectionOverline: { fontSize: 13, color: COLORS.textMuted, marginBottom: 4 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.textMain, letterSpacing: -0.5 },
  sectionCount: { fontSize: 12, color: COLORS.textMuted, marginBottom: 4 },
  categoriesList: { gap: 12 },
  categoryCard: { backgroundColor: COLORS.white, borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#EFECE7' },
  categoryIconWrapper: { width: 64, height: 64, backgroundColor: COLORS.background, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  categoryEmoji: { fontSize: 32 },
  categoryInfo: { flex: 1 },
  categoryTitle: { fontSize: 17, fontWeight: 'bold', color: COLORS.dark, marginBottom: 4 },
  categorySubtitle: { fontSize: 13, color: COLORS.textMuted },
  fab: { position: 'absolute', bottom: 24, right: 20, backgroundColor: COLORS.primary, flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 30, gap: 10, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 },
  fabText: { color: COLORS.white, fontSize: 15, fontWeight: '700' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(26, 26, 26, 0.4)', zIndex: 10 },
  drawer: { position: 'absolute', top: 0, bottom: 0, width: DRAWER_WIDTH, backgroundColor: COLORS.white, zIndex: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 15 },
  drawerLeft: { left: 0, borderTopRightRadius: 20, borderBottomRightRadius: 20 },
  drawerRight: { left: 0, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 },
  drawerSafeArea: { flex: 1 },
  drawerHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 30 : 20, paddingBottom: 20 },
  drawerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textMain },
  closeCircleButton: { width: 36, height: 36, backgroundColor: COLORS.grayCircle, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  authBox: { backgroundColor: COLORS.grayLight, marginHorizontal: 15, padding: 16, borderRadius: 12, marginBottom: 20 },
  authBoxTitle: { fontSize: 15, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 4 },
  authBoxSub: { fontSize: 13, color: COLORS.textMuted, lineHeight: 18, marginBottom: 16 },
  authBoxButtons: { flexDirection: 'row', gap: 10 },
  btnPrimary: { flex: 1, backgroundColor: COLORS.primary, paddingVertical: 10, alignItems: 'center', borderRadius: 6 },
  btnPrimaryText: { color: COLORS.white, fontWeight: 'bold', fontSize: 14 },
  btnSecondary: { flex: 1, backgroundColor: COLORS.white, paddingVertical: 10, alignItems: 'center', borderRadius: 6, borderWidth: 1, borderColor: '#E5E2DC' },
  btnSecondaryText: { color: COLORS.textMain, fontWeight: 'bold', fontSize: 14 },
  menuLinks: { flex: 1, borderTopWidth: 1, borderTopColor: COLORS.grayLight, paddingTop: 10, paddingHorizontal: 20 },
  menuItem: { paddingVertical: 16 },
  menuItemText: { fontSize: 15, color: COLORS.textMain, fontWeight: '500' },
  drawerFooterText: { fontSize: 11, color: COLORS.textOverline, textAlign: 'center', padding: 20, borderTopWidth: 1, borderTopColor: COLORS.grayLight },
  cartHeaderOverline: { fontSize: 13, color: COLORS.textMuted, marginBottom: 2 },
  emptyCartContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  emptyCartIconWrapper: { padding: 15, borderRadius: 16, borderWidth: 2, borderColor: COLORS.dark, marginBottom: 20 },
  emptyCartTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 24 },
  emptyCartButton: { backgroundColor: COLORS.grayLight, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  emptyCartButtonText: { fontSize: 15, fontWeight: '600', color: COLORS.textMain }
});
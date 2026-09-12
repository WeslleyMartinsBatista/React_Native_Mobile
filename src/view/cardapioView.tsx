import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  Alert
} from 'react-native';
import { 
  Menu, 
  ShoppingBag, 
  Flame, 
  ArrowLeft, 
  BellRing 
} from 'lucide-react-native';
import { useCart } from '../store/Cart'; // Importação do carrinho

const COLORS = {
  background: '#F7F4F0',
  white: '#FFFFFF',
  dark: '#2A2421',
  primary: '#C84325',
  grayLight: '#EBE8E2',
  grayImageBg: '#E5E2DC',
  border: '#D1CEC7',
  textMain: '#1A1A1A',
  textMuted: '#7A7571',
};

export default function MenuScreen({ route, navigation }) {
  const category = route?.params?.category || 'Churrasco';
  const [activeFilter, setActiveFilter] = useState('Todos');
  
  // Puxando as funções do carrinho
  const { addToCart, cartCount } = useCart();

  const getFilters = () => {
    if (category === 'Bebidas') return ['Todos', 'Sem álcool', 'Com álcool'];
    if (category === 'Lanches') return ['Todos', 'Hambúrgueres', 'Porções'];
    return ['Todos', 'Cortes', 'Espetinhos'];
  };

  const getProducts = () => {
    return [
      { id: '1', title: 'Picanha na brasa', desc: '300g, sal de parrilla e farofa da casa', price: '54.00', icon: '🥩', badge: 'Mais pedido' },
      { id: '2', title: 'Costela fogo lento', desc: 'Macia, defumada por 8 horas', price: '48.00', icon: '🍖', badge: null },
      { id: '3', title: 'Linguiça campeira', desc: 'Acompanha pão de alho', price: '32.00', icon: '🌭', badge: null },
    ];
  };

  const filters = getFilters();
  const products = getProducts();

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Cabeçalho Ajustado com ícone de voltar coerente */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
          {/* Trocado de Menu para ArrowLeft para indicar o retorno à Home */}
          <ArrowLeft color={COLORS.textMain} size={24} />
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}><Flame color={COLORS.white} size={16} /></View>
          <Text style={styles.logoText}>Fogo & Fumaça</Text>
        </View>
        
        <TouchableOpacity style={[styles.headerButton, styles.cartButton]} onPress={() => navigation.navigate('Checkout')}>
          <ShoppingBag color={COLORS.white} size={20} />
          {cartCount > 0 && (
            <View style={styles.badgeCount}>
              <Text style={styles.badgeCountText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft color={COLORS.textMuted} size={16} />
          <Text style={styles.backButtonText}>Todas as categorias</Text>
        </TouchableOpacity>

        <View style={styles.categoryHeaderRow}>
          <View>
            <Text style={styles.categoryOverline}>Cardápio</Text>
            <Text style={styles.categoryTitle}>{category}</Text>
          </View>
          <View style={styles.demoBadge}><Text style={styles.demoBadgeText}>Demonstração</Text></View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersWrapper} contentContainerStyle={styles.filtersContainer}>
          {filters.map((filter) => (
            <TouchableOpacity key={filter} style={[styles.filterPill, activeFilter === filter && styles.activeFilterPill]} onPress={() => setActiveFilter(filter)}>
              <Text style={[styles.filterPillText, activeFilter === filter && styles.activeFilterPillText]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.productList}>
          {products.map((item) => (
            <View key={item.id} style={styles.productCard}>
              <View style={styles.productImageArea}>
                <Text style={styles.productEmoji}>{item.icon}</Text>
                {item.badge && (
                  <View style={styles.productBadge}><Text style={styles.productBadgeText}>{item.badge}</Text></View>
                )}
              </View>

              <View style={styles.productInfoArea}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productDesc}>{item.desc}</Text>
                
                <View style={styles.productFooter}>
                  {/* Preço formatado com vírgula */}
                  <Text style={styles.productPrice}>R$ {parseFloat(item.price).toFixed(2).replace('.', ',')}</Text>
                  
                  {/* Botão de Adicionar Atualizado */}
                  <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => {
                      addToCart(item);
                      Alert.alert('Sucesso', `${item.title} adicionado à sacola!`);
                    }}
                  >
                    <Text style={styles.addButtonText}>+ Adicionar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} activeOpacity={0.9}>
        <BellRing color={COLORS.white} size={20} strokeWidth={2.5} />
        <Text style={styles.fabText}>Chamar garçom</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 20 : 10, paddingBottom: 15 },
  headerButton: { width: 44, height: 44, backgroundColor: COLORS.grayLight, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  cartButton: { backgroundColor: COLORS.dark },
  badgeCount: { position: 'absolute', top: -5, right: -5, backgroundColor: COLORS.primary, width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  badgeCountText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  logoContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoIcon: { backgroundColor: COLORS.primary, padding: 6, borderRadius: 8 },
  logoText: { fontSize: 16, fontWeight: '700', color: COLORS.textMain },
  backButton: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 20, marginBottom: 16 },
  backButtonText: { color: COLORS.textMuted, fontSize: 14, fontWeight: '500' },
  categoryHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 20, marginBottom: 20 },
  categoryOverline: { fontSize: 12, color: COLORS.textMuted, marginBottom: 2 },
  categoryTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.textMain, letterSpacing: -0.5 },
  demoBadge: { borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  demoBadgeText: { fontSize: 11, fontWeight: '700', color: COLORS.textMain },
  filtersWrapper: { marginBottom: 24 },
  filtersContainer: { paddingHorizontal: 20, gap: 12 },
  filterPill: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border },
  activeFilterPill: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterPillText: { fontSize: 14, fontWeight: '600', color: COLORS.textMuted },
  activeFilterPillText: { color: COLORS.white },
  productList: { paddingHorizontal: 20, gap: 16 },
  productCard: { backgroundColor: COLORS.white, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#EFECE7', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  productImageArea: { backgroundColor: COLORS.grayImageBg, height: 110, padding: 16, justifyContent: 'center', position: 'relative' },
  productEmoji: { fontSize: 48 },
  productBadge: { position: 'absolute', top: 16, right: 16, backgroundColor: '#AD381D', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4 },
  productBadgeText: { color: COLORS.white, fontSize: 11, fontWeight: 'bold' },
  productInfoArea: { padding: 16 },
  productTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 6 },
  productDesc: { fontSize: 13, color: COLORS.textMuted, lineHeight: 18, marginBottom: 16 },
  productFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productPrice: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain },
  addButton: { backgroundColor: COLORS.primary, paddingVertical: 8, paddingHorizontal: 14, borderRadius: 6 },
  addButtonText: { color: COLORS.white, fontSize: 14, fontWeight: '700' },
  fab: { position: 'absolute', bottom: 24, right: 20, backgroundColor: COLORS.primary, flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 30, gap: 10, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 },
  fabText: { color: COLORS.white, fontSize: 15, fontWeight: '700' }
});
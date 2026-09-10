import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {
  Utensils,
  ChefHat,
  Coffee,
  Dessert,
  ScanLine,
  MapPin,
  Bike,
  ChevronRight,
  Info,
  LucideIcon,
} from 'lucide-react-native';

// 1. Definição das interfaces para garantir a tipagem correta
interface Category {
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

interface MenuConfig {
  eyebrow: string;
  title: string;
  description: string;
  categories: Category[];
}

// 2. Tipagem do objeto com as duas modalidades aceitas
const menuByService: Record<'local' | 'entrega', MenuConfig> = {
  local: {
    eyebrow: 'Atendimento no restaurante',
    title: 'Escolha para a sua mesa',
    description: 'Navegue pelo cardápio e faça seu pedido quando estiver pronto.',
    categories: [
      { title: 'Pratos da casa', subtitle: 'Receitas para o almoço e jantar', icon: Utensils },
      { title: 'Lanches', subtitle: 'Para dividir ou matar a fome', icon: ChefHat },
      { title: 'Bebidas', subtitle: 'Geladas, quentes e sem álcool', icon: Coffee },
      { title: 'Sobremesas', subtitle: 'Um final doce para a refeição', icon: Dessert },
    ],
  },
  entrega: {
    eyebrow: 'Entrega onde você estiver',
    title: 'Peça sem sair de casa',
    description: 'Veja as opções preparadas para viagem e receba com praticidade.',
    categories: [
      { title: 'Pratos feitos', subtitle: 'Refeições completas para hoje', icon: Utensils },
      { title: 'Lanches', subtitle: 'Favoritos para pedir agora', icon: ChefHat },
      { title: 'Bebidas', subtitle: 'Para acompanhar seu pedido', icon: Coffee },
      { title: 'Porções', subtitle: 'Boas para compartilhar', icon: Dessert },
    ],
  },
};

export default function HomeScreen() {
  // 3. Restringindo o estado estritamente para 'local' ou 'entrega'
  const [serviceMode, setServiceMode] = useState<'local' | 'entrega'>('local');
  const menu = menuByService[serviceMode];

  const handleScanner = () => {
    Alert.alert(
      'Scanner em demonstração',
      'O leitor de QR será conectado ao cardápio do restaurante em uma próxima etapa.'
    );
  };

  const handleCategory = (categoryName: string) => {
    Alert.alert(
      'Categoria em demonstração',
      `${categoryName} será aberto quando o cardápio estiver conectado.`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Top Bar */}
          <View style={styles.header}>
            <View style={styles.brandIcon}>
              <Utensils size={20} color="#ffffff" />
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.brandTitle}>Cardápio Nativo</Text>
              <Text style={styles.brandSubtitle}>Seu pedido, do seu jeito</Text>
            </View>
          </View>

          {/* Banner do QR Code */}
          <View style={styles.qrCard}>
            <View style={styles.qrCardContent}>
              <View style={{ flex: 1 }}>
                <Text style={styles.qrTag}>COMECE POR AQUI</Text>
                <Text style={styles.qrTitle}>Escaneie sua mesa</Text>
                <Text style={styles.qrSub}>
                  Use o QR code da mesa para personalizar seu atendimento.
                </Text>
              </View>
              <Pressable style={styles.qrButton} onPress={handleScanner}>
                <ScanLine size={28} color="#ffffff" />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Abas de Navegação (No local / Entrega) */}
        <View style={styles.tabsContainer}>
          <View style={styles.tabsWrapper}>
            <Pressable
              style={[styles.tab, serviceMode === 'local' && styles.activeTab]}
              onPress={() => setServiceMode('local')}>
              <View style={styles.tabContent}>
                <MapPin
                  size={16}
                  color={serviceMode === 'local' ? '#6344FF' : '#71717a'}
                />
                <Text
                  style={[
                    styles.tabText,
                    serviceMode === 'local' && styles.activeTabText,
                  ]}>
                  No local
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={[styles.tab, serviceMode === 'entrega' && styles.activeTab]}
              onPress={() => setServiceMode('entrega')}>
              <View style={styles.tabContent}>
                <Bike
                  size={16}
                  color={serviceMode === 'entrega' ? '#6344FF' : '#71717a'}
                />
                <Text
                  style={[
                    styles.tabText,
                    serviceMode === 'entrega' && styles.activeTabText,
                  ]}>
                  Entrega
                </Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Categorias */}
        <View style={styles.content}>
          <View style={styles.sectionHeader}>
            <View style={styles.dot} />
            <Text style={styles.eyebrow}>{menu.eyebrow}</Text>
          </View>
          <Text style={styles.sectionTitle}>{menu.title}</Text>
          <Text style={styles.sectionSub}>{menu.description}</Text>

          <View style={styles.categoryList}>
            {menu.categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Pressable
                  key={category.title}
                  style={styles.categoryCard}
                  onPress={() => handleCategory(category.title)}>
                  <View style={styles.categoryIconBg}>
                    <IconComponent size={20} color="#6344FF" />
                  </View>
                  <View style={{ flex: 1, marginLeft: 16 }}>
                    <Text style={styles.categoryTitle}>{category.title}</Text>
                    <Text style={styles.categorySub}>{category.subtitle}</Text>
                  </View>
                  <ChevronRight size={20} color="#a1a1aa" />
                </Pressable>
              );
            })}
          </View>

          {/* Banner de Aviso/Demonstração */}
          <View style={styles.infoBox}>
            <Info size={20} color="#6344FF" />
            <Text style={styles.infoText}>
              Demonstração: as categorias e o scanner ainda não estão conectados ao restaurante.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  content: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  brandIcon: {
    height: 44,
    width: 44,
    borderRadius: 16,
    backgroundColor: '#6344FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#71717a',
  },
  brandSubtitle: {
    fontSize: 12,
    color: '#a1a1aa',
    marginTop: 2,
  },
  qrCard: {
    marginTop: 20,
    borderRadius: 24,
    backgroundColor: '#F8F7FF',
    padding: 20,
  },
  qrCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  qrTag: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6344FF',
  },
  qrTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#09090b',
    marginTop: 6,
  },
  qrSub: {
    fontSize: 13,
    color: '#71717a',
    marginTop: 6,
    lineHeight: 18,
  },
  qrButton: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#6344FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    marginTop: 28,
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e7',
  },
  tabsWrapper: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#6344FF',
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#71717a',
  },
  activeTabText: {
    color: '#09090b',
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6344FF',
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '600',
    color: '#71717a',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#09090b',
    marginTop: 8,
  },
  sectionSub: {
    fontSize: 14,
    color: '#71717a',
    marginTop: 6,
    lineHeight: 20,
  },
  categoryList: {
    marginTop: 24,
    gap: 12,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    backgroundColor: '#ffffff',
    padding: 16,
  },
  categoryIconBg: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#EEECFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#09090b',
  },
  categorySub: {
    fontSize: 12,
    color: '#71717a',
    marginTop: 2,
  },
  infoBox: {
    marginTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#F8F7FF',
    padding: 16,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#27272a',
    lineHeight: 18,
  },
}); // Fechamento correto aqui no final

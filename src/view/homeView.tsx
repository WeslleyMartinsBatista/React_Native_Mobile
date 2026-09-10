import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
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
  Menu,
  LucideIcon,
} from 'lucide-react-native';

// Interfaces
interface Category {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  imageUrl: string;
}

interface MenuConfig {
  eyebrow: string;
  title: string;
  description: string;
  categories: Category[];
}

const menuByService: Record<'local' | 'entrega', MenuConfig> = {
  local: {
    eyebrow: 'Atendimento no restaurante',
    title: 'Escolha para a sua mesa',
    description: 'Navegue pelo cardápio e faça seu pedido quando estiver pronto.',
    categories: [
      {
        title: 'Churrasco',
        subtitle: 'Receitas para o almoço e jantar',
        icon: Utensils,
        imageUrl: 'https://img.magnific.com/fotos-premium/churrasco-tradicional-brasileiro-perto-do-fogo_70216-3339.jpg?semt=ais_hybrid&w=740&q=80',
      },
      {
        title: 'Lanches',
        subtitle: 'Para dividir ou matar a fome',
        icon: ChefHat,
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
      },
      {
        title: 'Prato Feito',
        subtitle: 'Receitas para o almoço e jantar',
        icon: Utensils,
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
      },
      {
        title: 'Bebidas',
        subtitle: 'Geladas, quentes e sem álcool',
        icon: Coffee,
        imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80',
      },
      {
        title: 'Porções',
        subtitle: 'Para dividir ou matar a fome',
        icon: ChefHat,
        imageUrl: 'https://img.magnific.com/fotos-gratis/batatas-fritas-douradas-em-uma-cesta-de-vime-com-fundo-bokeh_84443-86965.jpg?semt=ais_hybrid&w=740&q=80',
      },
      {
        title: 'Sobremesas',
        subtitle: 'Um final doce para a refeição',
        icon: Dessert,
        imageUrl: 'https://cdn.pixabay.com/photo/2016/06/12/15/03/cupcakes-1452178_1280.jpg',
      },
    ],
  },
  entrega: {
    eyebrow: 'Entrega onde você estiver',
    title: 'Peça sem sair de casa',
    description: 'Veja as opções preparadas para viagem e receba com praticidade.',
    categories: [
      {
        title: 'Pratos feitos',
        subtitle: 'Refeições completas para hoje',
        icon: Utensils,
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
      },
      {
        title: 'Lanches',
        subtitle: 'Favoritos para pedir agora',
        icon: ChefHat,
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
      },
      {
        title: 'Bebidas',
        subtitle: 'Para acompanhar seu pedido',
        icon: Coffee,
        imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80',
      },
      {
        title: 'Porções',
        subtitle: 'Boas para compartilhar',
        icon: Dessert,
        imageUrl: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600&q=80',
      },
    ],
  },
};

export default function HomeScreen() {
  const [serviceMode, setServiceMode] = useState<'local' | 'entrega'>('local');
  const menu = menuByService[serviceMode];

  const handleMenuPress = () => {
    Alert.alert('Menu', 'Abre o menu de navegação do aplicativo.');
  };

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
          {/* Top Bar com Botão de Menu */}
          <View style={styles.header}>
            <Pressable style={styles.menuButton} onPress={handleMenuPress}>
              <Menu size={22} color="#ffffff" />
            </Pressable>
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

        {/* Categorias com Imagem de Fundo */}
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
                  style={styles.categoryCardContainer}
                  onPress={() => handleCategory(category.title)}>
                  <ImageBackground
                    source={{ uri: category.imageUrl }}
                    style={styles.categoryBackgroundImage}
                    imageStyle={{ borderRadius: 16 }}>
                    <View style={styles.categoryOverlay}>
                      <View style={styles.categoryIconBg}>
                        <IconComponent size={20} color="#6344FF" />
                      </View>
                      <View style={{ flex: 1, marginLeft: 16 }}>
                        <Text style={styles.categoryTitle}>{category.title}</Text>
                        <Text style={styles.categorySub}>{category.subtitle}</Text>
                      </View>
                      <ChevronRight size={20} color="#ffffff" />
                    </View>
                  </ImageBackground>
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
  menuButton: {
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
  categoryCardContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  categoryBackgroundImage: {
    width: '100%',
  },
  categoryOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.55)', // Camada escura para legibilidade do texto
    padding: 16,
    borderRadius: 16,
  },
  categoryIconBg: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  categorySub: {
    fontSize: 12,
    color: '#e4e4e7',
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
});
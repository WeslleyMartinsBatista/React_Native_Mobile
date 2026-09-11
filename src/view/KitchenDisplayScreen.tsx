import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import { ChefHat, Clock, Flame } from 'lucide-react-native';

const COLORS = {
  background: '#F7F4F0', // Fundo bege claro
  white: '#FFFFFF',
  primary: '#C84325',    // Laranja/Vermelho principal
  primaryLight: '#FBE9E7', // Fundo do banner de alerta
  grayCard: '#EBE8E2',   // Fundo dos cartões de pedido
  border: '#E0DDD6',
  textMain: '#1A1A1A',
  textMuted: '#7A7571',
  
  // Tags e Botões Específicos
  deliveryBg: '#F57F17',
  deliveryText: '#FFFFFF',
  localBg: '#E0DDD6',
  localText: '#1A1A1A',
  btnReadyBg: '#D7E5D5', // Fundo verde claro do botão "Pronto para retirada"
  btnReadyText: '#2E7D32', // Texto verde escuro
};

export default function KitchenDisplayScreen({ navigation }) {
  
  // Mock Data organizado por colunas
  const queueOrders = [
    { id: '184', type: 'Local', table: 'Mesa 06', items: '2x Picanha, 1x pão de alho', time: '06 min' },
    { id: 'D-218', type: 'Delivery', table: 'Marina Souza', items: '2x Burger brasa, 1x refrigerante', time: '32 min' },
  ];

  const preparingOrders = [
    { id: '187', type: 'Local', table: 'Mesa 02', items: '1x Burger brasa, 1x batata', time: '11 min' },
  ];

  const completedOrders = [
    { id: 'D-217', type: 'Delivery', table: 'Rafael Lima', items: '1x Costela, 2x arroz biro-biro', time: '8 min' },
  ];

  // Componente reutilizável para o Cartão de Pedido
  const OrderCard = ({ order, status }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>#{order.id}</Text>
        <View style={[styles.typeBadge, order.type === 'Delivery' ? styles.typeDelivery : styles.typeLocal]}>
          <Text style={[styles.typeText, order.type === 'Delivery' ? styles.typeTextDelivery : styles.typeTextLocal]}>
            {order.type}
          </Text>
        </View>
      </View>

      <Text style={styles.orderTable}>{order.table}</Text>
      <Text style={styles.orderItems}>{order.items}</Text>

      <View style={styles.timeRow}>
        <Clock color={COLORS.textMuted} size={14} />
        <Text style={styles.timeText}>{order.time}</Text>
      </View>

      {/* Renderiza o botão correto baseado na coluna */}
      {status === 'queue' && (
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Iniciar preparo</Text>
        </TouchableOpacity>
      )}
      {status === 'preparing' && (
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Marcar como completo</Text>
        </TouchableOpacity>
      )}
      {status === 'completed' && (
        <View style={styles.readyBadge}>
          <Text style={styles.readyBadgeText}>✓ Pronto para retirada</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* ==========================================
          CABEÇALHO
      ========================================== */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTopRow}>
          <View style={styles.logoRow}>
            <View style={styles.logoIcon}>
              <ChefHat color="#FFF" size={14} />
            </View>
            <Text style={styles.logoText}>Fogo & Fumaça</Text>
            <View style={styles.badge}><Text style={styles.badgeText}>Cozinha</Text></View>
          </View>
          
          <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace('LoginScreen')}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.pageTitle}>Painel da cozinha</Text>
        <Text style={styles.pageSubtitle}>Pedidos encaminhados pelo atendimento.</Text>

        {/* Banner de Alerta */}
        <View style={styles.alertBanner}>
          <Flame color={COLORS.primary} size={16} />
          <Text style={styles.alertText}>Dados de demonstração compartilhados com a tela de atendimento.</Text>
        </View>
      </View>

      {/* ==========================================
          COLUNAS KANBAN (Horizontal Scroll)
      ========================================== */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.kanbanContainer}
      >
        
        {/* COLUNA 1: Na Fila */}
        <View style={styles.column}>
          <View style={styles.columnHeader}>
            <View>
              <Text style={styles.columnTitle}>Na fila</Text>
              <Text style={styles.columnSubtitle}>Aguardando início</Text>
            </View>
            <View style={styles.countBadge}><Text style={styles.countText}>{queueOrders.length}</Text></View>
          </View>
          
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.columnList}>
            {queueOrders.map(order => <OrderCard key={order.id} order={order} status="queue" />)}
          </ScrollView>
        </View>

        {/* COLUNA 2: Em Preparo */}
        <View style={styles.column}>
          <View style={styles.columnHeader}>
            <View>
              <Text style={styles.columnTitle}>Em preparo</Text>
              <Text style={styles.columnSubtitle}>Sendo produzido</Text>
            </View>
            <View style={styles.countBadge}><Text style={styles.countText}>{preparingOrders.length}</Text></View>
          </View>
          
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.columnList}>
            {preparingOrders.map(order => <OrderCard key={order.id} order={order} status="preparing" />)}
          </ScrollView>
        </View>

        {/* COLUNA 3: Completo */}
        <View style={styles.column}>
          <View style={styles.columnHeader}>
            <View>
              <Text style={styles.columnTitle}>Completo</Text>
              <Text style={styles.columnSubtitle}>Aguardando retirada</Text>
            </View>
            <View style={styles.countBadge}><Text style={styles.countText}>{completedOrders.length}</Text></View>
          </View>
          
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.columnList}>
            {completedOrders.map(order => <OrderCard key={order.id} order={order} status="completed" />)}
          </ScrollView>
        </View>

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  // -- Header & Títulos --
  headerContainer: {
    padding: 24,
    paddingBottom: 16,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    backgroundColor: COLORS.primary,
    padding: 6,
    borderRadius: 6,
  },
  logoText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  badge: {
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textMuted,
  },
  logoutButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMain,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textMain,
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 20,
  },

  // -- Banner de Alerta --
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    padding: 12,
    borderRadius: 8,
    gap: 10,
  },
  alertText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },

  // -- Kanban Board --
  kanbanContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 16,
  },
  column: {
    width: 320, // Largura fixa para manter o visual de cardápio nas colunas
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 16,
  },
  columnHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  columnTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textMain,
    marginBottom: 2,
  },
  columnSubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  countBadge: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textMain,
  },
  columnList: {
    gap: 12,
  },

  // -- Order Card --
  orderCard: {
    backgroundColor: COLORS.grayCard,
    borderRadius: 12,
    padding: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  typeDelivery: { backgroundColor: COLORS.deliveryBg },
  typeLocal: { backgroundColor: COLORS.localBg },
  typeText: { fontSize: 11, fontWeight: '800' },
  typeTextDelivery: { color: COLORS.deliveryText },
  typeTextLocal: { color: COLORS.localText },
  orderTable: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 4,
  },
  orderItems: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 18,
    marginBottom: 16,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  
  // -- Botões dos Cards --
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  readyBadge: {
    backgroundColor: COLORS.btnReadyBg,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  readyBadgeText: {
    color: COLORS.btnReadyText,
    fontSize: 14,
    fontWeight: 'bold',
  }
});
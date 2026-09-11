import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import { 
  Flame, 
  LogOut, 
  Clock, 
  BellRing, 
  Truck, 
  MapPin, 
  ChefHat 
} from 'lucide-react-native';

const COLORS = {
  background: '#F7F4F0', // Fundo bege claro
  white: '#FFFFFF',
  dark: '#2A2421',       // Marrom escuro da central de atenção
  primary: '#C84325',    // Vermelho/Laranja dos botões
  primaryHover: '#A6331A',
  grayLight: '#EBE8E2',
  grayCardBg: '#F3F1EC', // Fundo dos cards de pedidos
  border: '#E0DDD6',
  textMain: '#1A1A1A',
  textMuted: '#7A7571',
  
  // Cores de Status das Mesas
  statusLivre: '#E0E0E0',     // Cinza
  statusOcupada: '#2E7D32',   // Verde
  statusAguardando: '#F57F17', // Amarelo
  statusChamado: '#C62828',    // Vermelho
};

export default function AttendantDashboardScreen({ navigation }) {
  // Mock Data
  const tables = [
    { id: '1', number: '01', status: 'Livre', color: COLORS.statusLivre },
    { id: '2', number: '02', status: 'Ocupada', color: COLORS.statusOcupada },
    { id: '3', number: '03', status: 'Aguardando', color: COLORS.statusAguardando },
    { id: '4', number: '04', status: 'Ocupada', color: COLORS.statusOcupada },
    { id: '5', number: '05', status: 'Livre', color: COLORS.statusLivre },
    { id: '6', number: '06', status: 'Chamar garçom', color: COLORS.statusChamado },
    { id: '7', number: '07', status: 'Ocupada', color: COLORS.statusOcupada },
    { id: '8', number: '08', status: 'Livre', color: COLORS.statusLivre },
  ];

  const activeCalls = [
    { id: '1', title: 'Mesa 06', action: 'Solicitou atendimento', time: 'há 1 min' },
    { id: '2', title: 'Mesa 03', action: 'Pediu a conta', time: 'há 4 min' },
  ];

  const orders = [
    { id: '184', table: 'Mesa 06', items: '2x Picanha, 1x pão de alho', status: 'Na fila', type: 'Local' },
    { id: '187', table: 'Mesa 02', items: '1x Burger brasa, 1x batata', status: 'Em preparo', type: 'Local' },
    { id: 'D-218', table: 'Marina Souza', items: '2x Burger brasa, 1x refrigerante', status: 'Na fila', type: 'Delivery' },
    { id: 'D-217', table: 'Rafael Lima', items: '1x Costela, 2x arroz biro-biro', status: 'Completo', type: 'Delivery' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* ==========================================
            CABEÇALHO
        ========================================== */}
        <View style={styles.header}>
          <View>
            <View style={styles.logoRow}>
              <View style={styles.logoIcon}><Flame color="#FFF" size={12} /></View>
              <Text style={styles.logoText}>Fogo & Fumaça</Text>
              <View style={styles.badge}><Text style={styles.badgeText}>Modo operação</Text></View>
            </View>
            <Text style={styles.greetingTitle}>Bom turno, Camila.</Text>
            <Text style={styles.greetingSubtitle}>Visão geral do salão e dos pedidos.</Text>
          </View>
          
          <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace('LoginScreen')}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>

        {/* ==========================================
            NOVO LAYOUT: INDICADORES (Esquerda) + CENTRAL (Direita)
        ========================================== */}
        <View style={styles.topSectionRow}>
          
          {/* COLUNA ESQUERDA: Cards Empilhados */}
          <View style={styles.kpiColumn}>
            <View style={styles.kpiCard}>
              <View style={styles.kpiHeader}>
                <Text style={styles.kpiTitle}>Pedidos em aberto</Text>
                <Clock color={COLORS.primary} size={18} />
              </View>
              <Text style={styles.kpiValue}>12</Text>
              <Text style={styles.kpiSub}>3 aguardando despacho</Text>
            </View>

            <View style={styles.kpiCard}>
              <View style={styles.kpiHeader}>
                <Text style={styles.kpiTitle}>Chamados ativos</Text>
                <BellRing color={COLORS.primary} size={18} />
              </View>
              <Text style={styles.kpiValue}>2</Text>
              <Text style={styles.kpiSub}>Mesa 06 há 1 minuto</Text>
            </View>

            <View style={styles.kpiCard}>
              <View style={styles.kpiHeader}>
                <Text style={styles.kpiTitle}>Delivery hoje</Text>
                <Truck color={COLORS.primary} size={18} />
              </View>
              <Text style={styles.kpiValue}>08</Text>
              <Text style={styles.kpiSub}>2 saem nos próximos 15 min</Text>
            </View>
          </View>

          {/* COLUNA DIREITA: Central de Atenção */}
          <View style={styles.attentionPanel}>
            <View style={styles.attentionHeader}>
              <View>
                <Text style={styles.attentionOverline}>Central de atenção</Text>
                <Text style={styles.attentionTitle}>Chamados agora</Text>
              </View>
              <BellRing color={COLORS.primary} size={20} />
            </View>

            <View style={styles.attentionList}>
              {activeCalls.map((call) => (
                <View key={call.id} style={styles.attentionCard}>
                  <View style={styles.attentionCardHeader}>
                    <Text style={styles.attentionCardTitle}>{call.title}</Text>
                    <Text style={styles.attentionCardTime}>{call.time}</Text>
                  </View>
                  <Text style={styles.attentionCardAction}>{call.action}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.attentionButton}>
              <MapPin color={COLORS.textMain} size={16} />
              <Text style={styles.attentionButtonText}>Abrir rota de delivery</Text>
            </TouchableOpacity>
          </View>

        </View>

        {/* ==========================================
            MAPA DE MESAS (100% de Largura)
        ========================================== */}
        <View style={styles.fullWidthSection}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Mapa de mesas</Text>
              <Text style={styles.sectionSubtitle}>Toque para abrir a comanda.</Text>
            </View>
            <Text style={styles.sectionCount}>8 mesas</Text>
          </View>

          <View style={styles.tablesGrid}>
            {tables.map((table) => (
              <TouchableOpacity key={table.id} style={styles.tableCard} activeOpacity={0.7}>
                <View style={[styles.tableDot, { backgroundColor: table.color }]} />
                <Text style={styles.tableNumber}>Mesa {table.number}</Text>
                <Text style={styles.tableStatus}>{table.status}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Legenda */}
          <View style={styles.legendRow}>
            <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: COLORS.statusOcupada }]} /><Text style={styles.legendText}>Ocupada</Text></View>
            <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: COLORS.statusAguardando }]} /><Text style={styles.legendText}>Aguardando</Text></View>
            <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: COLORS.statusChamado }]} /><Text style={styles.legendText}>Chamado</Text></View>
          </View>
        </View>

        {/* ==========================================
            CENTRAL DE PEDIDOS
        ========================================== */}
        <View style={styles.fullWidthSection}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Central de pedidos</Text>
              <Text style={styles.sectionSubtitle}>Encaminhe para a cozinha e acione a retirada quando estiver completo.</Text>
            </View>
            <ChefHat color={COLORS.primary} size={20} />
          </View>

          <View style={styles.ordersGrid}>
            {orders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <Text style={styles.orderId}>#{order.id}</Text>
                  <View style={[styles.orderTypeBadge, order.type === 'Delivery' && styles.orderTypeDelivery]}>
                    <Text style={[styles.orderTypeText, order.type === 'Delivery' && styles.orderTypeTextDelivery]}>
                      {order.type}
                    </Text>
                  </View>
                </View>
                
                <Text style={styles.orderTable}>{order.table}</Text>
                <Text style={styles.orderItems}>{order.items}</Text>

                <View style={styles.orderFooter}>
                  <View style={styles.orderStatusBadge}>
                    <Text style={styles.orderStatusText}>{order.status}</Text>
                  </View>
                  
                  {order.status === 'Na fila' && (
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.actionButtonText}>Encaminhar à cozinha</Text>
                    </TouchableOpacity>
                  )}
                  {order.status === 'Completo' && order.type === 'Delivery' && (
                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#2E7D32' }]}>
                      <Text style={styles.actionButtonText}>Chamar motoboy</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { padding: 24, paddingBottom: 60 },

  // --- Header ---
  header: { marginBottom: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  logoIcon: { backgroundColor: COLORS.primary, padding: 4, borderRadius: 4 },
  logoText: { fontSize: 14, fontWeight: '700', color: COLORS.textMain },
  badge: { borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  badgeText: { fontSize: 10, fontWeight: '600', color: COLORS.textMuted },
  greetingTitle: { fontSize: 26, fontWeight: 'bold', color: COLORS.textMain, letterSpacing: -0.5 },
  greetingSubtitle: { fontSize: 14, color: COLORS.textMuted, marginTop: 4 },
  logoutButton: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  logoutText: { fontSize: 13, fontWeight: '600', color: COLORS.textMain },

  // --- Novo Layout: Indicadores e Central (Lado a Lado) ---
  topSectionRow: {
    flexDirection: Platform.OS === 'web' || Platform.isPad ? 'row' : 'column',
    gap: 20,
    marginBottom: 24,
  },
  
  // Coluna Esquerda: KPIs
  kpiColumn: {
    flex: 1,
    gap: 16,
  },
  kpiCard: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 20,
  },
  kpiHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  kpiTitle: { fontSize: 13, fontWeight: '600', color: COLORS.textMuted },
  kpiValue: { fontSize: 32, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 4 },
  kpiSub: { fontSize: 12, color: COLORS.textMuted },

  // Coluna Direita: Central Escura
  attentionPanel: {
    flex: 1.2, // Ocupa um pouco mais de espaço se a tela permitir
    backgroundColor: COLORS.dark,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'space-between',
  },
  attentionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  attentionOverline: { fontSize: 11, color: '#96908B', marginBottom: 2 },
  attentionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.white },
  attentionList: { gap: 12, marginBottom: 20, flex: 1 },
  attentionCard: { backgroundColor: '#3A322D', padding: 16, borderRadius: 12 },
  attentionCardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  attentionCardTitle: { fontSize: 14, fontWeight: 'bold', color: COLORS.white },
  attentionCardTime: { fontSize: 12, color: COLORS.primary },
  attentionCardAction: { fontSize: 13, color: '#B3ACA5' },
  attentionButton: { backgroundColor: COLORS.grayLight, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, paddingVertical: 14, borderRadius: 8 },
  attentionButtonText: { fontSize: 14, fontWeight: 'bold', color: COLORS.textMain },

  // --- Seções Full Width (Mesas e Pedidos) ---
  fullWidthSection: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 4 },
  sectionSubtitle: { fontSize: 13, color: COLORS.textMuted },
  sectionCount: { fontSize: 12, fontWeight: '600', color: COLORS.textMuted },

  // --- Grid de Mesas ---
  tablesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  tableCard: {
    width: Platform.OS === 'web' || Platform.isPad ? '23%' : '47%', // 4 colunas em telas grandes, 2 em celulares
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 16,
  },
  tableDot: { width: 10, height: 10, borderRadius: 5, marginBottom: 12 },
  tableNumber: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 4 },
  tableStatus: { fontSize: 13, color: COLORS.textMuted },
  
  legendRow: { flexDirection: 'row', gap: 16, borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: 16 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12, color: COLORS.textMuted, fontWeight: '500' },

  // --- Grid de Pedidos ---
  ordersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  orderCard: {
    width: Platform.OS === 'web' || Platform.isPad ? '48%' : '100%', // 2 colunas em telas grandes, 1 em celulares
    backgroundColor: COLORS.grayCardBg,
    borderRadius: 12,
    padding: 20,
  },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  orderId: { fontSize: 14, fontWeight: 'bold', color: COLORS.textMain },
  orderTypeBadge: { backgroundColor: COLORS.grayLight, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  orderTypeText: { fontSize: 11, fontWeight: 'bold', color: COLORS.textMain },
  orderTypeDelivery: { backgroundColor: '#F57F17' },
  orderTypeTextDelivery: { color: COLORS.white },
  
  orderTable: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 4 },
  orderItems: { fontSize: 13, color: COLORS.textMuted, marginBottom: 20 },
  
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderStatusBadge: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  orderStatusText: { fontSize: 12, fontWeight: '600', color: COLORS.textMuted },
  actionButton: { backgroundColor: COLORS.primary, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 6 },
  actionButtonText: { color: COLORS.white, fontSize: 13, fontWeight: 'bold' },
});
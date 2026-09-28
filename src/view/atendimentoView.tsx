import React, { useState, useEffect, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions
} from 'react-native';
import { 
  Flame, 
  Clock, 
  BellRing, 
  Truck, 
  MapPin, 
  ChefHat 
} from 'lucide-react-native';

const COLORS = {
  background: '#F7F4F0',
  white: '#FFFFFF',
  dark: '#2A2421',
  primary: '#C84325',
  primaryHover: '#A6331A',
  grayLight: '#EBE8E2',
  grayCardBg: '#F3F1EC',
  border: '#E0DDD6',
  textMain: '#1A1A1A',
  textMuted: '#7A7571',
  
  statusLivre: '#E0E0E0',
  statusOcupada: '#2E7D32',
  statusAguardando: '#F57F17',
  statusChamado: '#C62828',
};

// Interfaces para tipagem dos dados dinâmicos
export interface TableData {
  id: string;
  number: string;
  status: 'Livre' | 'Ocupada' | 'Aguardando' | 'Chamar garçom';
}

export interface ActiveCall {
  id: string;
  title: string;
  action: string;
  time: string;
}

export interface OrderData {
  id: string;
  table: string;
  items: string;
  status: 'Na fila' | 'Em preparo' | 'Completo';
  type: 'Local' | 'Delivery';
}

export default function AttendantDashboardScreen({ navigation }: any) {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;
  const styles = useMemo(() => getStyles(isLargeScreen), [isLargeScreen]);

  // ==========================================
  // ESTADOS DINÂMICOS DA APLICAÇÃO
  // ==========================================
  const [attendantName, setAttendantName] = useState<string>('Atendente');
  const [tables, setTables] = useState<TableData[]>([]);
  const [activeCalls, setActiveCalls] = useState<ActiveCall[]>([]);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Mapeamento de cores de status para as mesas
  const getTableColor = (status: TableData['status']) => {
    switch (status) {
      case 'Ocupada': return COLORS.statusOcupada;
      case 'Aguardando': return COLORS.statusAguardando;
      case 'Chamar garçom': return COLORS.statusChamado;
      default: return COLORS.statusLivre;
    }
  };

  // ==========================================
  // BUSCA E SINCRONIZAÇÃO DE DADOS
  // ==========================================
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        // COLOQUE AQUI A CHAMADA PARA A SUA API / WEBSOCKET / FIREBASE
        // Exemplo de integração:
        // const response = await api.get('/atendimento/dashboard');
        // setTables(response.data.tables);
        // setActiveCalls(response.data.calls);
        // setOrders(response.data.orders);
        
      } catch (error) {
        console.error('Erro ao carregar dados do painel:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  // Cálculo dinâmico dos indicadores
  const kpis = useMemo(() => {
    const openOrders = orders.filter(o => o.status !== 'Completo').length;
    const callsCount = activeCalls.length;
    const deliveryToday = orders.filter(o => o.type === 'Delivery').length;

    return { openOrders, callsCount, deliveryToday };
  }, [orders, activeCalls]);

  // Ações dos botões dos pedidos
  const handleForwardToKitchen = (orderId: string) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: 'Em preparo' } : o))
    );
  };

  const handleCallCourier = (orderId: string) => {
    // Lógica para acionar serviço de entrega/motoboy
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <View>
            <View style={styles.logoRow}>
              <View style={styles.logoIcon}><Flame color="#FFF" size={12} /></View>
              <Text style={styles.logoText}>Fogo & Fumaça</Text>
              <View style={styles.badge}><Text style={styles.badgeText}>Modo operação</Text></View>
            </View>
            <Text style={styles.greetingTitle}>Bom turno, {attendantName}.</Text>
            <Text style={styles.greetingSubtitle}>Visão geral do salão e dos pedidos.</Text>
          </View>
          
          <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace('LoginScreen')}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Atualizando dados do salão...</Text>
          </View>
        ) : (
          <>
            {/* INDICADORES E CENTRAL */}
            <View style={styles.topSectionRow}>
              
              {/* KPIs */}
              <View style={styles.kpiColumn}>
                <View style={styles.kpiCard}>
                  <View style={styles.kpiHeader}>
                    <Text style={styles.kpiTitle}>Pedidos em aberto</Text>
                    <Clock color={COLORS.primary} size={18} />
                  </View>
                  <Text style={styles.kpiValue}>{kpis.openOrders}</Text>
                  <Text style={styles.kpiSub}>Em processamento no salão</Text>
                </View>

                <View style={styles.kpiCard}>
                  <View style={styles.kpiHeader}>
                    <Text style={styles.kpiTitle}>Chamados ativos</Text>
                    <BellRing color={COLORS.primary} size={18} />
                  </View>
                  <Text style={styles.kpiValue}>{kpis.callsCount}</Text>
                  <Text style={styles.kpiSub}>Aguardando atendimento</Text>
                </View>

                <View style={styles.kpiCard}>
                  <View style={styles.kpiHeader}>
                    <Text style={styles.kpiTitle}>Delivery hoje</Text>
                    <Truck color={COLORS.primary} size={18} />
                  </View>
                  <Text style={styles.kpiValue}>{kpis.deliveryToday}</Text>
                  <Text style={styles.kpiSub}>Pedidos registrados</Text>
                </View>
              </View>

              {/* Central de Atendimento */}
              <View style={styles.attentionPanel}>
                <View style={styles.attentionHeader}>
                  <View>
                    <Text style={styles.attentionOverline}>Central de atenção</Text>
                    <Text style={styles.attentionTitle}>Chamados agora</Text>
                  </View>
                  <BellRing color={COLORS.primary} size={20} />
                </View>

                <View style={styles.attentionList}>
                  {activeCalls.length === 0 ? (
                    <Text style={styles.emptyText}>Nenhum chamado pendente no momento.</Text>
                  ) : (
                    activeCalls.map((call) => (
                      <View key={call.id} style={styles.attentionCard}>
                        <View style={styles.attentionCardHeader}>
                          <Text style={styles.attentionCardTitle}>{call.title}</Text>
                          <Text style={styles.attentionCardTime}>{call.time}</Text>
                        </View>
                        <Text style={styles.attentionCardAction}>{call.action}</Text>
                      </View>
                    ))
                  )}
                </View>

                <TouchableOpacity style={styles.attentionButton}>
                  <MapPin color={COLORS.textMain} size={16} />
                  <Text style={styles.attentionButtonText}>Abrir rota de delivery</Text>
                </TouchableOpacity>
              </View>

            </View>

            {/* MAPA DE MESAS */}
            <View style={styles.fullWidthSection}>
              <View style={styles.sectionHeader}>
                <View>
                  <Text style={styles.sectionTitle}>Mapa de mesas</Text>
                  <Text style={styles.sectionSubtitle}>Toque para abrir a comanda.</Text>
                </View>
                <Text style={styles.sectionCount}>{tables.length} mesas</Text>
              </View>

              <View style={styles.tablesGrid}>
                {tables.length === 0 ? (
                  <Text style={styles.emptyText}>Nenhuma mesa cadastrada.</Text>
                ) : (
                  tables.map((table) => (
                    <TouchableOpacity key={table.id} style={styles.tableCard} activeOpacity={0.7}>
                      <View style={[styles.tableDot, { backgroundColor: getTableColor(table.status) }]} />
                      <Text style={styles.tableNumber}>Mesa {table.number}</Text>
                      <Text style={styles.tableStatus}>{table.status}</Text>
                    </TouchableOpacity>
                  ))
                )}
              </View>

              <View style={styles.legendRow}>
                <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: COLORS.statusOcupada }]} /><Text style={styles.legendText}>Ocupada</Text></View>
                <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: COLORS.statusAguardando }]} /><Text style={styles.legendText}>Aguardando</Text></View>
                <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: COLORS.statusChamado }]} /><Text style={styles.legendText}>Chamado</Text></View>
              </View>
            </View>

            {/* CENTRAL DE PEDIDOS */}
            <View style={styles.fullWidthSection}>
              <View style={styles.sectionHeader}>
                <View>
                  <Text style={styles.sectionTitle}>Central de pedidos</Text>
                  <Text style={styles.sectionSubtitle}>Encaminhe para a cozinha e acione a retirada quando estiver completo.</Text>
                </View>
                <ChefHat color={COLORS.primary} size={20} />
              </View>

              <View style={styles.ordersGrid}>
                {orders.length === 0 ? (
                  <Text style={styles.emptyText}>Nenhum pedido ativo na central.</Text>
                ) : (
                  orders.map((order) => (
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
                          <TouchableOpacity 
                            style={styles.actionButton}
                            onPress={() => handleForwardToKitchen(order.id)}
                          >
                            <Text style={styles.actionButtonText}>Encaminhar à cozinha</Text>
                          </TouchableOpacity>
                        )}
                        {order.status === 'Completo' && order.type === 'Delivery' && (
                          <TouchableOpacity 
                            style={[styles.actionButton, { backgroundColor: '#2E7D32' }]}
                            onPress={() => handleCallCourier(order.id)}
                          >
                            <Text style={styles.actionButtonText}>Chamar motoboy</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  ))
                )}
              </View>
            </View>
          </>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (isLargeScreen: boolean) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { padding: isLargeScreen ? 32 : 20, paddingBottom: 60 },

  loadingContainer: { paddingVertical: 40, alignItems: 'center' },
  loadingText: { marginTop: 12, fontSize: 14, color: COLORS.textMuted },
  emptyText: { fontSize: 13, color: COLORS.textMuted, fontStyle: 'italic', paddingVertical: 12 },

  header: { marginBottom: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  logoIcon: { backgroundColor: COLORS.primary, padding: 4, borderRadius: 4 },
  logoText: { fontSize: 14, fontWeight: '700', color: COLORS.textMain },
  badge: { borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  badgeText: { fontSize: 10, fontWeight: '600', color: COLORS.textMuted },
  greetingTitle: { fontSize: isLargeScreen ? 28 : 24, fontWeight: 'bold', color: COLORS.textMain, letterSpacing: -0.5 },
  greetingSubtitle: { fontSize: 14, color: COLORS.textMuted, marginTop: 4 },
  logoutButton: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  logoutText: { fontSize: 13, fontWeight: '600', color: COLORS.textMain },

  topSectionRow: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    gap: 20,
    marginBottom: 24,
  },
  
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

  attentionPanel: {
    flex: 1.2,
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

  fullWidthSection: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: isLargeScreen ? 24 : 20,
    marginBottom: 24,
  },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, paddingRight: isLargeScreen ? 0 : 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 4 },
  sectionSubtitle: { fontSize: 13, color: COLORS.textMuted },
  sectionCount: { fontSize: 12, fontWeight: '600', color: COLORS.textMuted },

  tablesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  tableCard: {
    width: isLargeScreen ? '23%' : '47%', 
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 16,
  },
  tableDot: { width: 10, height: 10, borderRadius: 5, marginBottom: 12 },
  tableNumber: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 4 },
  tableStatus: { fontSize: 13, color: COLORS.textMuted },
  
  legendRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: 16 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12, color: COLORS.textMuted, fontWeight: '500' },

  ordersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  orderCard: {
    width: isLargeScreen ? '48%' : '100%',
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
  
  orderFooter: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', alignItems: 'center' },
  orderStatusBadge: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  orderStatusText: { fontSize: 12, fontWeight: '600', color: COLORS.textMuted },
  actionButton: { backgroundColor: COLORS.primary, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 6 },
  actionButtonText: { color: COLORS.white, fontSize: 13, fontWeight: 'bold' },
});
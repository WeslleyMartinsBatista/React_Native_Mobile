import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Switch,
  TextInput,
  Alert,
  Modal,
  useWindowDimensions 
} from 'react-native';
import { 
  Flame, LogOut, LayoutDashboard, ClipboardList, 
  MenuSquare, Tags, Armchair, Users, BarChart3, 
  Settings, DollarSign, TrendingUp, ShoppingBag, 
  ChevronRight, ArrowUpRight, Plus, Edit3, QrCode,
  Search, Filter, Eye, XCircle, Trash2, Star, Image as ImageIcon,
  UserCircle2, Receipt, Calculator, UtensilsCrossed,
  Shield, KeyRound, Phone, IdCard, Calendar, PieChart, 
  TrendingDown, Award, Download, Store, Clock, 
  CreditCard, Smartphone, Lock, Bell, Moon
} from 'lucide-react-native';

const COLORS = {
  background: '#F7F4F0', white: '#FFFFFF', dark: '#2A2421', primary: '#C84325',
  grayLight: '#EBE8E2', border: '#D1CEC7', textMain: '#1A1A1A', textMuted: '#7A7571',
  success: '#2E7D32', successLight: '#E8F5E9',
};

const MENU_ITEMS = [
  { id: 'Visão Geral', icon: LayoutDashboard },
  { id: 'Pedidos', icon: ClipboardList },
  { id: 'Cardápio', icon: MenuSquare },
  { id: 'Categorias', icon: Tags },
  { id: 'Mesas', icon: Armchair },
  { id: 'Equipe', icon: Users },
  { id: 'Relatórios', icon: BarChart3 },
  { id: 'Configurações', icon: Settings },
];

export default function AdminManagementScreen({ navigation }: any) {
  // ==========================================
  // RESPONSIVIDADE EM TEMPO REAL
  // ==========================================
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;
  const styles = useMemo(() => getStyles(isLargeScreen), [isLargeScreen]);

  const [activeTab, setActiveTab] = useState<string>('Visão Geral');
  const [reportPeriod, setReportPeriod] = useState<string>('Esta semana');
  
  // ==========================================
  // DADOS SIMULADOS (MOCKS)
  // ==========================================
  const dashboardData = {
    faturamento: 'R$ 3.250,00', crescimentoFaturamento: '+12%', pedidos: '84', ticketMedio: 'R$ 38,69',
    produtosDestaque: [
      { id: 1, nome: 'Picanha na brasa', vendas: 32, valor: 'R$ 1.728,00' },
      { id: 2, nome: 'Costela fogo lento', vendas: 24, valor: 'R$ 1.152,00' },
      { id: 3, nome: 'Chopp Artesanal 500ml', vendas: 45, valor: 'R$ 675,00' },
    ],
    pedidosRecentes: [
      { id: '#192', mesa: 'Mesa 04', valor: 'R$ 162,00', status: 'Concluído', time: '14:30' },
      { id: '#191', mesa: 'Delivery', valor: 'R$ 84,00', status: 'Em rota', time: '14:15' },
      { id: '#190', mesa: 'Mesa 01', valor: 'R$ 210,00', status: 'Concluído', time: '13:50' },
    ]
  };

  const ordersListInitial = [
    { id: '#194', type: 'Mesa', customer: 'Mesa 06', items: '2x Picanha, 1x Suco de Laranja', total: '120,00', time: '14:30', payment: 'Pix', status: 'Em preparo' },
    { id: '#195', type: 'Delivery', customer: 'Marina Souza', items: '1x Burger duplo, 1x Fritas', total: '45,00', time: '14:45', payment: 'Cartão', status: 'Recebido' },
    { id: '#196', type: 'Retirada', customer: 'João Silva', items: '1x Costela fogo lento', total: '48,00', time: '14:50', payment: 'Dinheiro', status: 'Pronto' },
    { id: '#191', type: 'Mesa', customer: 'Mesa 02', items: '3x Chopp 500ml, 1x Linguiça', total: '84,00', time: '13:10', payment: 'Pix', status: 'Entregue' },
  ];

  const menuItemsInitial = [
    { id: '1', name: 'Picanha na brasa', description: 'Carne bovina acompanhada de arroz, farofa e vinagrete.', category: 'Carnes', price: '54,90', active: true, highlight: true },
    { id: '2', name: 'Costela fogo lento', description: 'Macia, defumada por 8 horas com molho barbecue rústico.', category: 'Carnes', price: '48,00', active: true, highlight: false },
    { id: '3', name: 'Burger duplo', description: 'Pão brioche, 2 blends de 150g, queijo prato e bacon.', category: 'Lanches', price: '32,00', active: false, highlight: false },
  ];

  const categoriesInitial = [
    { id: 'c1', name: 'Entradas', description: 'Petiscos e porções para começar', count: 5, active: true },
    { id: 'c2', name: 'Carnes', description: 'Cortes nobres e acompanhamentos', count: 12, active: true },
    { id: 'c3', name: 'Hambúrgueres', description: 'Blends artesanais feitos na chapa', count: 8, active: true },
    { id: 'c4', name: 'Bebidas', description: 'Sucos, refrigerantes e cervejas', count: 15, active: true },
    { id: 'c5', name: 'Sobremesas', description: 'Doces, pudins e sorvetes', count: 0, active: false },
  ];

  const tablesInitial = [
    { id: '1', number: '01', status: 'Livre', waiter: null, consumption: { items: [], total: '0,00' } },
    { id: '2', number: '02', status: 'Ocupada', waiter: 'Lucas Silva', consumption: { items: ['1x Picanha na brasa', '3x Chopp 500ml'], total: '99,90' } },
    { id: '3', number: '03', status: 'Aguardando pagamento', waiter: 'Camila Santos', consumption: { items: ['2x Burger duplo', '2x Refrigerante'], total: '74,00' } },
    { id: '4', number: '04', status: 'Reservada', waiter: null, consumption: { items: [], total: '0,00' } },
  ];

  const staffInitial = [
    { id: '1', name: 'Juliano Grass', role: 'Administrador', cpf: '000.111.222-33', phone: '(55) 99999-9999', login: 'juliano.admin', active: true },
    { id: '2', name: 'Camila Santos', role: 'Gerente', cpf: '111.222.333-44', phone: '(55) 98888-8888', login: 'camila.ger', active: true },
    { id: '3', name: 'Lucas Silva', role: 'Garçom', cpf: '222.333.444-55', phone: '(55) 97777-7777', login: 'lucas.g', active: true },
    { id: '4', name: 'Augusto Lima', role: 'Cozinheiro', cpf: '333.444.555-66', phone: '(55) 96666-6666', login: 'augusto.c', active: true },
    { id: '5', name: 'Marina Souza', role: 'Caixa', cpf: '444.555.666-77', phone: '(55) 95555-5555', login: 'marina.cx', active: false },
  ];
  
  const [orders, setOrders] = useState(ordersListInitial);
  const [products, setProducts] = useState(menuItemsInitial);
  const [categories, setCategories] = useState(categoriesInitial);
  const [tables, setTables] = useState<any[]>(tablesInitial);
  const [staff, setStaff] = useState(staffInitial);
  const [modalType, setModalType] = useState<string | null>(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: 'Carnes', number: '', role: 'Garçom', phone: '' });

  const openForm = (type: string, item: any = {}) => {
    setModalType(type); setEditingId(item.id || null);
    setForm({ name: item.name || item.nome || '', description: item.description || item.descricao || '', price: item.price || '', category: item.category || 'Carnes', number: item.number || '', role: item.role || 'Garçom', phone: item.phone || '' });
  };
  const closeForm = () => { setModalType(null); setEditingId(null); };
  
  const saveForm = () => {
    if (modalType === 'product') {
      if (!form.name.trim() || !form.price.trim()) return Alert.alert('Campos obrigatórios', 'Informe nome e preço do produto.');
      const item: any = { id: editingId || String(Date.now()), name: form.name.trim(), description: form.description.trim() || 'Produto do cardápio', category: form.category, price: form.price, active: true, highlight: false };
      setProducts(current => editingId ? current.map(x => x.id === editingId ? { ...x, ...item } : x) : [...current, item]);
    } else if (modalType === 'category') {
      if (!form.name.trim()) return Alert.alert('Campo obrigatório', 'Informe o nome da categoria.');
      const item: any = { id: editingId || `c${Date.now()}`, name: form.name.trim(), description: form.description.trim() || 'Nova categoria do cardápio', count: 0, active: true };
      setCategories(current => editingId ? current.map(x => x.id === editingId ? { ...x, ...item } : x) : [...current, item]);
    } else if (modalType === 'table') {
      if (!form.number.trim()) return Alert.alert('Campo obrigatório', 'Informe o número da mesa.');
      const item: any = { id: editingId || String(Date.now()), number: form.number.trim(), status: 'Livre', waiter: null, consumption: { items: [], total: '0,00' } };
      setTables(current => editingId ? current.map(x => x.id === editingId ? { ...x, ...item } : x) : [...current, item]);
    } else if (modalType === 'staff') {
      if (!form.name.trim()) return Alert.alert('Campo obrigatório', 'Informe o nome do funcionário.');
      const item: any = { id: editingId || String(Date.now()), name: form.name.trim(), role: form.role, cpf: 'Não informado', phone: form.phone || 'Não informado', login: form.name.trim().toLowerCase().replace(/\s+/g, '.'), active: true };
      setStaff(current => editingId ? current.map(x => x.id === editingId ? { ...x, ...item } : x) : [...current, item]);
    }
    closeForm(); Alert.alert('Salvo', 'As alterações foram aplicadas nesta demonstração.');
  };
  
  const advanceOrder = (order: any) => {
    const flow = ['Recebido', 'Em preparo', 'Pronto', 'Entregue'];
    const next = flow[Math.min(flow.indexOf(order.status) + 1, flow.length - 1)] || 'Em preparo';
    setOrders(current => current.map(item => item.id === order.id ? { ...item, status: next } : item));
  };

  const reportsData = {
    financeiro: { faturamento: 'R$ 14.520,00', totalVendas: 350, ticketMedio: 'R$ 41,48' },
    produtos: [
      { id: 1, nome: 'Picanha na brasa', qtd: 145, receita: 'R$ 7.960,00', fill: '100%', type: 'top' },
      { id: 2, nome: 'Chopp 500ml', qtd: 210, receita: 'R$ 3.150,00', fill: '70%', type: 'top' },
      { id: 3, nome: 'Pudim de Leite', qtd: 8, receita: 'R$ 120,00', fill: '5%', type: 'bottom' },
    ],
    pedidos: {
      concluidos: 342, cancelados: 8,
      tipos: { mesa: { qtd: 200, pct: '57%' }, delivery: { qtd: 100, pct: '29%' }, retirada: { qtd: 50, pct: '14%' } }
    },
    equipe: [
      { id: 1, nome: 'Lucas Silva', pedidos: 140, vendas: 'R$ 5.800,00', fill: '100%' },
      { id: 2, nome: 'Camila Santos', pedidos: 110, vendas: 'R$ 4.200,00', fill: '75%' },
    ]
  };

  // ==========================================
  // RENDERIZAÇÕES DAS TELAS
  // ==========================================
  
  const renderVisaoGeral = () => (
    <View style={styles.contentArea}>
      <Text style={styles.pageTitle}>Visão Geral</Text>
      <Text style={styles.pageSubtitle}>Acompanhamento em tempo real do seu negócio.</Text>
      
      <View style={styles.kpiGrid}>
        <View style={styles.kpiCard}>
          <View style={styles.kpiHeader}>
            <Text style={styles.kpiLabel}>Faturamento do dia</Text>
            <View style={styles.iconBox}><DollarSign color={COLORS.primary} size={18} /></View>
          </View>
          <View style={styles.kpiRow}>
            <Text style={styles.kpiValue}>{dashboardData.faturamento}</Text>
            <View style={styles.kpiBadge}><ArrowUpRight color={COLORS.success} size={14} /><Text style={styles.kpiBadgeText}>{dashboardData.crescimentoFaturamento}</Text></View>
          </View>
        </View>

        <View style={styles.kpiCard}>
          <View style={styles.kpiHeader}>
            <Text style={styles.kpiLabel}>Pedidos concluídos</Text>
            <View style={styles.iconBox}><ShoppingBag color={COLORS.primary} size={18} /></View>
          </View>
          <Text style={styles.kpiValue}>{dashboardData.pedidos}</Text>
        </View>

        <View style={styles.kpiCard}>
          <View style={styles.kpiHeader}>
            <Text style={styles.kpiLabel}>Ticket médio</Text>
            <View style={styles.iconBox}><TrendingUp color={COLORS.primary} size={18} /></View>
          </View>
          <Text style={styles.kpiValue}>{dashboardData.ticketMedio}</Text>
        </View>
      </View>

      <View style={styles.splitGrid}>
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Mais vendidos hoje</Text></View>
          {dashboardData.produtosDestaque.map((item, index) => (
            <View key={item.id} style={[styles.listItem, index === dashboardData.produtosDestaque.length - 1 && styles.noBorder]}>
              <View><Text style={styles.itemTitle}>{item.nome}</Text><Text style={styles.itemSub}>{item.vendas} unidades vendidas</Text></View>
              <Text style={styles.itemValue}>{item.valor}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Pedidos recentes</Text><TouchableOpacity onPress={() => setActiveTab('Pedidos')}><Text style={styles.linkText}>Ver todos</Text></TouchableOpacity></View>
          {dashboardData.pedidosRecentes.map((pedido, index) => (
            <View key={pedido.id} style={[styles.listItem, index === dashboardData.pedidosRecentes.length - 1 && styles.noBorder]}>
              <View style={styles.orderInfo}>
                <View style={styles.orderAvatar}><Text style={styles.orderAvatarText}>{pedido.id.replace('#', '')}</Text></View>
                <View><Text style={styles.itemTitle}>{pedido.mesa}</Text><Text style={styles.itemSub}>{pedido.time} • {pedido.status}</Text></View>
              </View>
              <Text style={styles.itemValue}>{pedido.valor}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderPedidos = () => (
    <View style={styles.contentArea}>
      <View style={styles.sectionHeaderRow}>
        <View><Text style={styles.pageTitle}>Pedidos</Text><Text style={styles.pageSubtitle}>Acompanhe e gerencie o fluxo de pedidos de todos os canais.</Text></View>
      </View>
      <View style={styles.searchFilterRow}>
        <View style={styles.searchBar}>
          <Search color={COLORS.textMuted} size={18} />
          <TextInput placeholder="Buscar por número do pedido ou mesa..." style={styles.searchInput} placeholderTextColor={COLORS.textMuted}/>
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={() => Alert.alert('Filtros', 'Filtros demonstrativos disponíveis nesta tela.')}><Filter color={COLORS.textMain} size={18} />{isLargeScreen && <Text style={styles.filterButtonText}>Filtros</Text>}</TouchableOpacity>
      </View>
      <View style={styles.statusTabsWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statusTabsContainer}>
          {['Todos', 'Recebido', 'Em preparo', 'Pronto', 'Entregue', 'Cancelado'].map((status, index) => (
            <TouchableOpacity key={status} onPress={() => Alert.alert('Filtro de pedidos', `Filtro selecionado: ${status}`)} style={[styles.statusPill, index === 0 && styles.statusPillActive]}>
              <Text style={[styles.statusPillText, index === 0 && styles.statusPillTextActive]}>{status}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.listContainer}>
        {orders.map(order => (
          <View key={order.id} style={styles.orderAdminCard}>
            <View style={styles.orderAdminHeader}>
              <View style={styles.orderAdminIdBox}>
                <Text style={styles.orderAdminId}>{order.id}</Text>
                <View style={[styles.roleBadge, { backgroundColor: order.type === 'Delivery' ? '#FFF3E0' : COLORS.grayLight }]}><Text style={[styles.roleBadgeText, { color: order.type === 'Delivery' ? '#E65100' : COLORS.textMain }]}>{order.type}</Text></View>
              </View>
              <View style={[styles.statusBadge, order.status === 'Entregue' && styles.statusBadgeSuccess]}><Text style={[styles.statusBadgeText, order.status === 'Entregue' && styles.statusBadgeTextSuccess]}>{order.status}</Text></View>
            </View>
            <View style={styles.orderAdminBody}>
              <View style={{ flex: 1, paddingRight: 16 }}><Text style={styles.orderAdminCustomer}>{order.customer}</Text><Text style={styles.orderAdminItems} numberOfLines={2}>{order.items}</Text></View>
              <View style={{ alignItems: 'flex-end' }}><Text style={styles.orderAdminTotal}>R$ {order.total}</Text><Text style={styles.orderAdminTime}>{order.time} • {order.payment}</Text></View>
            </View>
            <View style={styles.orderAdminFooter}>
              <TouchableOpacity style={styles.actionBtnOutline} onPress={() => Alert.alert('Detalhes do pedido', `Pedido ${order.id}\nCliente: ${order.customer}\nTotal: R$ ${order.total}`)}><Eye size={16} color={COLORS.textMain} /><Text style={styles.actionBtnOutlineText}>Detalhes</Text></TouchableOpacity>
              <View style={styles.orderAdminFooterRight}>
                {order.status !== 'Entregue' && order.status !== 'Cancelado' && (
                  <TouchableOpacity style={styles.actionBtnPrimary} onPress={() => advanceOrder(order)}><Text style={styles.actionBtnPrimaryText}>Avançar Status</Text></TouchableOpacity>
                )}
                <TouchableOpacity style={styles.cancelButton} onPress={() => Alert.alert('Cancelar pedido', `Deseja cancelar o pedido ${order.id}?`, [{ text: 'Não', style: 'cancel' }, { text: 'Cancelar pedido', style: 'destructive', onPress: () => setOrders(current => current.map(item => item.id === order.id ? { ...item, status: 'Cancelado' } : item)) }])}><XCircle size={20} color="#D32F2F" /></TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderCardapio = () => (
    <View style={styles.contentArea}>
      <View style={styles.sectionHeaderRow}>
        <View><Text style={styles.pageTitle}>Cardápio</Text><Text style={styles.pageSubtitle}>Cadastre, edite e controle a disponibilidade dos produtos.</Text></View>
        <TouchableOpacity style={styles.actionBtnPrimary} onPress={() => openForm('product')}><Plus color={COLORS.white} size={18} /><Text style={styles.actionBtnPrimaryText}>Novo Produto</Text></TouchableOpacity>
      </View>
      <View style={styles.searchFilterRow}>
        <View style={styles.searchBar}><Search color={COLORS.textMuted} size={18} /><TextInput placeholder="Buscar por nome do produto..." style={styles.searchInput} placeholderTextColor={COLORS.textMuted}/></View>
        <TouchableOpacity style={styles.filterButton} onPress={() => Alert.alert('Filtros', 'Filtros demonstrativos disponíveis nesta tela.')}><Filter color={COLORS.textMain} size={18} /></TouchableOpacity>
      </View>
      <View style={styles.statusTabsWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statusTabsContainer}>
          {['Todas', 'Carnes', 'Lanches', 'Porções', 'Bebidas'].map((cat, index) => (
            <TouchableOpacity key={cat} onPress={() => Alert.alert('Filtro de cardápio', `Categoria selecionada: ${cat}`)} style={[styles.statusPill, index === 0 && styles.statusPillActive]}><Text style={[styles.statusPillText, index === 0 && styles.statusPillTextActive]}>{cat}</Text></TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.listContainer}>
        {products.map((item) => (
          <View key={item.id} style={[styles.menuItemCard, !item.active && styles.menuItemCardInactive]}>
            <View style={styles.menuItemImagePlaceholder}><ImageIcon color={COLORS.textMuted} size={24} /></View>
            <View style={styles.menuItemInfo}>
              <View style={styles.menuItemTitleRow}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                {item.highlight && (<View style={styles.highlightBadge}><Star color="#F57F17" size={12} fill="#F57F17" /><Text style={styles.highlightBadgeText}>Destaque</Text></View>)}
              </View>
              <Text style={styles.menuItemDesc} numberOfLines={2}>{item.description}</Text>
              <View style={styles.menuItemFooter}><Text style={styles.itemSub}>{item.category}</Text><Text style={styles.itemValue}>R$ {item.price}</Text></View>
            </View>
            <View style={styles.menuItemActions}>
              <View style={styles.switchWrapper}>
                <Text style={styles.switchLabel}>{item.active ? 'Disponível' : 'Indisponível'}</Text>
                <Switch value={item.active} onValueChange={() => setProducts(current => current.map(x => x.id === item.id ? { ...x, active: !x.active } : x))} trackColor={{ false: COLORS.border, true: '#FBE9E7' }} thumbColor={item.active ? COLORS.primary : COLORS.grayLight}/>
              </View>
              <View style={styles.actionButtonsCol}>
                <TouchableOpacity style={styles.iconButton} onPress={() => openForm('product', item)}><Edit3 color={COLORS.textMain} size={18} /></TouchableOpacity>
                <TouchableOpacity style={[styles.iconButton, { backgroundColor: '#FFEBEE' }]} onPress={() => Alert.alert('Excluir produto', `Excluir ${item.name}?`, [{ text: 'Cancelar', style: 'cancel' }, { text: 'Excluir', style: 'destructive', onPress: () => setProducts(current => current.filter(x => x.id !== item.id)) }])}><Trash2 color="#D32F2F" size={18} /></TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderCategorias = () => {
    const handleDeleteCategory = (category: any) => {
      if (category.count > 0) {
        Alert.alert('Ação não permitida', `A categoria "${category.name}" possui ${category.count} produto(s) vinculado(s).\n\nTransfira os produtos ou exclua-os antes de apagar a categoria.`);
      } else {
        Alert.alert('Excluir categoria', `Excluir a categoria "${category.name}"?`, [{ text: 'Cancelar', style: 'cancel' }, { text: 'Excluir', style: 'destructive', onPress: () => setCategories(current => current.filter(item => item.id !== category.id)) }]);
      }
    };

    return (
      <View style={styles.contentArea}>
        <View style={styles.sectionHeaderRow}>
          <View><Text style={styles.pageTitle}>Categorias</Text><Text style={styles.pageSubtitle}>Organize o cardápio e facilite a busca dos clientes.</Text></View>
          <TouchableOpacity style={styles.actionBtnPrimary} onPress={() => openForm('category')}><Plus color={COLORS.white} size={18} /><Text style={styles.actionBtnPrimaryText}>Nova Categoria</Text></TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          {categories.map((cat) => (
            <View key={cat.id} style={[styles.listItemBase, !cat.active && styles.menuItemCardInactive]}>
              <View style={styles.listInfo}>
                <View style={styles.menuItemTitleRow}><Text style={styles.itemTitle}>{cat.name}</Text><View style={styles.countBadge}><Text style={styles.countBadgeText}>{cat.count} produtos</Text></View></View>
                <Text style={styles.itemSub}>{cat.description}</Text>
              </View>
              <View style={styles.listActions}>
                <View style={styles.switchWrapper}><Text style={styles.switchLabel}>{cat.active ? 'Ativa' : 'Inativa'}</Text><Switch value={cat.active} onValueChange={() => setCategories(current => current.map(item => item.id === cat.id ? { ...item, active: !item.active } : item))} trackColor={{ false: COLORS.border, true: '#FBE9E7' }} thumbColor={cat.active ? COLORS.primary : COLORS.grayLight}/></View>
                <View style={styles.actionButtonsCol}>
                  <TouchableOpacity style={styles.iconButton} onPress={() => openForm('category', cat)}><Edit3 color={COLORS.textMain} size={18} /></TouchableOpacity>
                  <TouchableOpacity style={[styles.iconButton, { backgroundColor: cat.count > 0 ? COLORS.grayLight : '#FFEBEE' }]} onPress={() => handleDeleteCategory(cat)}>
                    <Trash2 color={cat.count > 0 ? COLORS.textMuted : "#D32F2F"} size={18} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderMesas = () => {
    const getStatusStyle = (status: string) => {
      switch(status) {
        case 'Livre': return { bg: '#E8F5E9', text: '#2E7D32' };
        case 'Ocupada': return { bg: '#E3F2FD', text: '#1565C0' };
        case 'Reservada': return { bg: '#FFF3E0', text: '#E65100' };
        case 'Aguardando pagamento': return { bg: '#FFEBEE', text: '#C62828' };
        default: return { bg: COLORS.grayLight, text: COLORS.textMuted };
      }
    };
    return (
      <View style={styles.contentArea}>
        <View style={styles.sectionHeaderRow}>
          <View><Text style={styles.pageTitle}>Mesas e Consumo</Text><Text style={styles.pageSubtitle}>Gerencie o salão, adicione produtos e feche contas.</Text></View>
          <TouchableOpacity style={styles.actionBtnPrimary} onPress={() => openForm('table')}><Plus color={COLORS.white} size={18} /><Text style={styles.actionBtnPrimaryText}>Nova Mesa</Text></TouchableOpacity>
        </View>
        <View style={styles.gridContainer}>
          {tables.map((table) => {
            const statusStyle = getStatusStyle(table.status);
            return (
              <View key={table.id} style={[styles.gridCard, table.status === 'Ocupada' && { borderColor: '#BBDEFB', borderWidth: 2 }]}>
                <View style={styles.gridCardHeader}>
                  <Text style={styles.gridCardTitle}>Mesa {table.number}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}><Text style={[styles.statusBadgeText, { color: statusStyle.text }]}>{table.status}</Text></View>
                </View>
                <View style={styles.tableBody}>
                  {table.status === 'Livre' && (<View style={styles.tableEmptyState}><UtensilsCrossed color={COLORS.border} size={32} /><Text style={styles.tableEmptyText}>Pronta para uso</Text></View>)}
                  {table.status === 'Reservada' && (<View style={styles.tableEmptyState}><UserCircle2 color="#FFB74D" size={32} /><Text style={[styles.tableEmptyText, { color: '#E65100' }]}>Reserva para 20:00</Text></View>)}
                  {(table.status === 'Ocupada' || table.status === 'Aguardando pagamento') && (
                    <>
                      <View style={styles.tableWaiterRow}><UserCircle2 color={COLORS.textMuted} size={16} /><Text style={styles.tableWaiterText}>Atendida por: <Text style={{fontWeight: 'bold', color: COLORS.textMain}}>{table.waiter}</Text></Text></View>
                      <View style={styles.tableConsumptionBox}>
                        {table.consumption.items.map((item: string, idx: number) => (<Text key={idx} style={styles.tableItemText} numberOfLines={1}>• {item}</Text>))}
                      </View>
                      <View style={styles.tableTotalRow}><Text style={styles.tableTotalLabel}>Total Parcial:</Text><Text style={styles.tableTotalValue}>R$ {table.consumption.total}</Text></View>
                    </>
                  )}
                </View>
                <View style={styles.tableFooter}>
                  {table.status === 'Livre' && (<TouchableOpacity style={styles.actionBtnPrimary} onPress={() => setTables(current => current.map(x => x.id === table.id ? { ...x, status: 'Ocupada', waiter: 'Admin' } : x))}><Text style={styles.actionBtnPrimaryText}>Abrir Mesa</Text></TouchableOpacity>)}
                  {table.status === 'Reservada' && (<TouchableOpacity style={styles.actionBtnOutline} onPress={() => setTables(current => current.map(x => x.id === table.id ? { ...x, status: 'Livre', waiter: null } : x))}><Text style={styles.actionBtnOutlineText}>Cancelar Reserva</Text></TouchableOpacity>)}
                  {table.status === 'Ocupada' && (
                    <View style={styles.tableActionRow}>
                      <TouchableOpacity style={[styles.actionBtnOutline, { flex: 1, paddingHorizontal: 0, justifyContent: 'center' }]} onPress={() => Alert.alert('Comanda', 'A comanda da mesa foi aberta para gerenciamento.')}><Text style={styles.actionBtnOutlineText}>Gerenciar Comanda</Text></TouchableOpacity>
                      <TouchableOpacity style={[styles.actionBtnPrimary, { flex: 1, paddingHorizontal: 0, alignItems: 'center' }]} onPress={() => Alert.alert('Fechar conta', 'A conta foi preparada para recebimento.')}><Text style={styles.actionBtnPrimaryText}>Fechar Conta</Text></TouchableOpacity>
                    </View>
                  )}
                  {table.status === 'Aguardando pagamento' && (
                    <View style={styles.tableActionRow}>
                      <TouchableOpacity style={[styles.secondaryButton, { flex: 1, marginTop: 0 }]} onPress={() => Alert.alert('Dividir Conta', `Rateio do total de R$ ${table.consumption.total}`)}><Calculator color={COLORS.textMain} size={16} /><Text style={styles.secondaryButtonText}>Dividir</Text></TouchableOpacity>
                      <TouchableOpacity style={[styles.actionBtnPrimary, { flex: 1, backgroundColor: COLORS.success, paddingHorizontal: 0, alignItems: 'center' }]} onPress={() => Alert.alert('Pagamento recebido', `Pagamento de R$ ${table.consumption.total} registrado.`)}><Text style={styles.actionBtnPrimaryText}>Receber</Text></TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderEquipe = () => {
    const getRoleConfig = (role: string) => {
      switch(role) {
        case 'Administrador': case 'Gerente': return { color: '#512DA8', bg: '#EDE7F6', perms: 'Acesso completo (Cardápio, Mesas, Equipe, Relatórios)' };
        case 'Garçom': return { color: '#0288D1', bg: '#E1F5FE', perms: 'Visualiza mesas, cria pedidos e altera pedidos.' };
        case 'Cozinheiro': return { color: '#E65100', bg: '#FFF3E0', perms: 'Visualiza fila de pedidos e altera status (Preparo/Pronto).' };
        case 'Caixa': return { color: '#2E7D32', bg: '#E8F5E9', perms: 'Visualiza pedidos, realiza pagamentos e fecha mesas.' };
        default: return { color: COLORS.textMuted, bg: COLORS.grayLight, perms: 'Permissões não definidas.' };
      }
    };
    return (
      <View style={styles.contentArea}>
        <View style={styles.sectionHeaderRow}>
          <View><Text style={styles.pageTitle}>Equipe</Text><Text style={styles.pageSubtitle}>Gerencie os funcionários, dados de acesso e permissões.</Text></View>
          <TouchableOpacity style={styles.actionBtnPrimary} onPress={() => openForm('staff')}><Plus color={COLORS.white} size={18} /><Text style={styles.actionBtnPrimaryText}>Novo Funcionário</Text></TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          {staff.map((user) => {
            const roleConfig = getRoleConfig(user.role);
            return (
              <View key={user.id} style={[styles.staffCard, !user.active && styles.menuItemCardInactive]}>
                <View style={styles.staffHeader}>
                  <View style={styles.staffNameRow}>
                    <View style={[styles.staffAvatar, { backgroundColor: roleConfig.bg }]}><Text style={[styles.staffAvatarText, { color: roleConfig.color }]}>{user.name.charAt(0)}</Text></View>
                    <View><Text style={styles.itemTitle}>{user.name}</Text><View style={[styles.roleBadge, { backgroundColor: roleConfig.bg, marginTop: 4, alignSelf: 'flex-start' }]}><Text style={[styles.roleBadgeText, { color: roleConfig.color }]}>{user.role}</Text></View></View>
                  </View>
                  <View style={styles.switchWrapper}><Text style={styles.switchLabel}>{user.active ? 'Ativo' : 'Inativo'}</Text><Switch value={user.active} onValueChange={() => setStaff(current => current.map(item => item.id === user.id ? { ...item, active: !item.active } : item))} trackColor={{ false: COLORS.border, true: '#FBE9E7' }} thumbColor={user.active ? COLORS.primary : COLORS.grayLight}/></View>
                </View>
                <View style={styles.staffDetailsGrid}>
                  <View style={styles.staffDetailItem}><IdCard color={COLORS.textMuted} size={14} /><Text style={styles.staffDetailText}>{user.cpf}</Text></View>
                  <View style={styles.staffDetailItem}><Phone color={COLORS.textMuted} size={14} /><Text style={styles.staffDetailText}>{user.phone}</Text></View>
                  <View style={styles.staffDetailItem}><Users color={COLORS.textMuted} size={14} /><Text style={styles.staffDetailText}>Login: <Text style={{fontWeight: 'bold', color: COLORS.textMain}}>{user.login}</Text></Text></View>
                </View>
                <View style={styles.staffPermissionsBox}><Shield color={roleConfig.color} size={16} /><Text style={styles.staffPermissionsText}>{roleConfig.perms}</Text></View>
                <View style={styles.staffActions}>
                  <TouchableOpacity style={styles.actionBtnOutline} onPress={() => Alert.alert('Senha redefinida', 'Um link demonstrativo de redefinição foi enviado.')}><KeyRound color={COLORS.textMain} size={16} /><Text style={styles.actionBtnOutlineText}>Redefinir Senha</Text></TouchableOpacity>
                  <TouchableOpacity style={[styles.iconButton, { marginLeft: 'auto' }]} onPress={() => openForm('staff', user)}><Edit3 color={COLORS.textMain} size={18} /></TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderRelatorios = () => (
    <View style={styles.contentArea}>
      <View style={styles.sectionHeaderRow}>
        <View><Text style={styles.pageTitle}>Relatórios</Text><Text style={styles.pageSubtitle}>Analise o desempenho e o financeiro do restaurante.</Text></View>
        <TouchableOpacity style={styles.actionBtnOutline} onPress={() => Alert.alert('Relatório exportado', 'O relatório demonstrativo foi preparado para download.')}><Download color={COLORS.textMain} size={18} /><Text style={styles.actionBtnOutlineText}>Exportar PDF</Text></TouchableOpacity>
      </View>
      <View style={styles.statusTabsWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statusTabsContainer}>
          {['Hoje', 'Esta semana', 'Este mês', 'Personalizado'].map((period) => (
            <TouchableOpacity key={period} style={[styles.statusPill, reportPeriod === period && styles.statusPillActive]} onPress={() => setReportPeriod(period)}>
              {period === 'Personalizado' && <Calendar color={reportPeriod === period ? COLORS.white : COLORS.textMuted} size={14} style={{marginRight: 6}} />}
              <Text style={[styles.statusPillText, reportPeriod === period && styles.statusPillTextActive]}>{period}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.splitGrid}>
        <View style={{ flex: 1, gap: 24 }}>
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Resumo Financeiro</Text>
            <View style={styles.reportHighlightBox}>
              <Text style={styles.reportHighlightLabel}>Faturamento Total</Text>
              <Text style={styles.reportHighlightValue}>{reportsData.financeiro.faturamento}</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 16, marginTop: 16 }}>
              <View style={styles.reportStatBox}><Text style={styles.kpiLabel}>Pedidos</Text><Text style={styles.itemValue}>{reportsData.financeiro.totalVendas}</Text></View>
              <View style={styles.reportStatBox}><Text style={styles.kpiLabel}>Ticket Médio</Text><Text style={styles.itemValue}>{reportsData.financeiro.ticketMedio}</Text></View>
            </View>
          </View>
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Análise de Pedidos</Text>
            <View style={styles.chartBarContainer}>
              <View style={styles.multiBarWrapper}>
                <View style={[styles.multiBarSegment, { width: reportsData.pedidos.tipos.mesa.pct as any, backgroundColor: COLORS.primary }]} />
                <View style={[styles.multiBarSegment, { width: reportsData.pedidos.tipos.delivery.pct as any, backgroundColor: '#FF9800' }]} />
                <View style={[styles.multiBarSegment, { width: reportsData.pedidos.tipos.retirada.pct as any, backgroundColor: '#4CAF50' }]} />
              </View>
              <View style={styles.multiBarLegend}>
                <Text style={styles.legendText}><View style={[styles.legendDot, {backgroundColor: COLORS.primary}]} /> Mesa ({reportsData.pedidos.tipos.mesa.pct})</Text>
                <Text style={styles.legendText}><View style={[styles.legendDot, {backgroundColor: '#FF9800'}]} /> Delivery</Text>
                <Text style={styles.legendText}><View style={[styles.legendDot, {backgroundColor: '#4CAF50'}]} /> Retirada</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 16, marginTop: 16 }}>
              <View style={[styles.reportStatBox, { borderColor: '#E8F5E9', backgroundColor: '#F1F8E9' }]}><Text style={styles.kpiLabel}>Concluídos</Text><Text style={[styles.itemValue, { color: COLORS.success }]}>{reportsData.pedidos.concluidos}</Text></View>
              <View style={[styles.reportStatBox, { borderColor: '#FFEBEE', backgroundColor: '#FFEBEE' }]}><Text style={styles.kpiLabel}>Cancelados</Text><Text style={[styles.itemValue, { color: '#C62828' }]}>{reportsData.pedidos.cancelados}</Text></View>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, gap: 24 }}>
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Desempenho de Produtos</Text>
            {reportsData.produtos.map((prod) => (
              <View key={prod.id} style={styles.reportListItem}>
                <View style={styles.reportListHeader}><Text style={styles.itemTitle}>{prod.nome}</Text><Text style={styles.itemValue}>{prod.receita}</Text></View>
                <View style={styles.reportListSub}>
                  <Text style={styles.itemSub}>{prod.qtd} vendidos</Text>
                  {prod.type === 'bottom' && (<View style={styles.alertBadge}><TrendingDown size={12} color="#C62828" /><Text style={styles.alertBadgeText}>Baixa saída</Text></View>)}
                </View>
                <View style={styles.progressBarBg}><View style={[styles.progressBarFill, { width: prod.fill as any, backgroundColor: prod.type === 'bottom' ? '#EF5350' : COLORS.primary }]} /></View>
              </View>
            ))}
          </View>
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Ranking da Equipe</Text>
            {reportsData.equipe.map((func, index) => (
              <View key={func.id} style={styles.reportListItem}>
                <View style={styles.reportListHeader}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>{index === 0 && <Award size={16} color="#F57F17" />}<Text style={styles.itemTitle}>{func.nome}</Text></View>
                  <Text style={styles.itemValue}>{func.vendas}</Text>
                </View>
                <Text style={styles.itemSub}>{func.pedidos} pedidos realizados</Text>
                <View style={styles.progressBarBg}><View style={[styles.progressBarFill, { width: func.fill as any, backgroundColor: '#F57F17' }]} /></View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );

  const renderConfiguracoes = () => (
    <View style={styles.contentArea}>
      <View style={styles.sectionHeaderRow}>
        <View><Text style={styles.pageTitle}>Configurações</Text><Text style={styles.pageSubtitle}>Personalize as regras de negócio, operação e segurança do sistema.</Text></View>
        <TouchableOpacity style={styles.actionBtnPrimary} onPress={() => Alert.alert('Sucesso', 'Configurações salvas!')}><Text style={styles.actionBtnPrimaryText}>Salvar Alterações</Text></TouchableOpacity>
      </View>
      <View style={styles.splitGrid}>
        <View style={{ flex: 1, gap: 24 }}>
          <View style={styles.sectionCard}>
            <View style={styles.settingsHeader}><Store color={COLORS.textMain} size={20} /><Text style={styles.sectionTitle}>Dados do Restaurante</Text></View>
            <Text style={styles.inputLabel}>Nome do Estabelecimento</Text><TextInput style={styles.input} value="Fogo & Fumaça" />
            <Text style={styles.inputLabel}>Endereço Completo</Text><TextInput style={styles.input} value="Rua das Churrasqueiras, 123 - Centro, Santo Ângelo - RS" />
            <Text style={styles.inputLabel}>Telefone / WhatsApp</Text><TextInput style={styles.input} value="(55) 99999-9999" />
            <Text style={styles.inputLabel}>Horário de Funcionamento</Text><TextInput style={[styles.input, { marginBottom: 0 }]} value="Terça a Domingo - 18h às 23h30" />
          </View>
          <View style={styles.sectionCard}>
            <View style={styles.settingsHeader}><Clock color={COLORS.textMain} size={20} /><Text style={styles.sectionTitle}>Operação e Pedidos</Text></View>
            <Text style={styles.inputLabel}>Tempo Médio de Preparo (minutos)</Text><TextInput style={styles.input} value="30" keyboardType="numeric" />
            <View style={styles.formGroupRow}><View><Text style={styles.itemTitle}>Habilitar Delivery</Text><Text style={styles.itemSub}>Aceitar pedidos para entrega externa</Text></View><Switch value={true} trackColor={{ false: COLORS.border, true: '#FBE9E7' }} thumbColor={COLORS.primary} /></View>
            <View style={[styles.formGroupRow, { borderBottomWidth: 0, paddingBottom: 0, marginBottom: 0 }]}><View><Text style={styles.itemTitle}>Habilitar Retirada</Text><Text style={styles.itemSub}>Cliente retira o pedido no balcão</Text></View><Switch value={true} trackColor={{ false: COLORS.border, true: '#FBE9E7' }} thumbColor={COLORS.primary} /></View>
          </View>
        </View>
        <View style={{ flex: 1, gap: 24 }}>
          <View style={styles.sectionCard}>
            <View style={styles.settingsHeader}><CreditCard color={COLORS.textMain} size={20} /><Text style={styles.sectionTitle}>Formas de Pagamento</Text></View>
            <View style={styles.formGroupRow}><Text style={styles.itemTitle}>Pix</Text><Switch value={true} trackColor={{ false: COLORS.border, true: '#FBE9E7' }} thumbColor={COLORS.primary} /></View>
            <View style={styles.formGroupRow}><Text style={styles.itemTitle}>Dinheiro</Text><Switch value={true} trackColor={{ false: COLORS.border, true: '#FBE9E7' }} thumbColor={COLORS.primary} /></View>
            <View style={styles.formGroupRow}><Text style={styles.itemTitle}>Cartão de Crédito</Text><Switch value={true} trackColor={{ false: COLORS.border, true: '#FBE9E7' }} thumbColor={COLORS.primary} /></View>
            <View style={[styles.formGroupRow, { borderBottomWidth: 0, paddingBottom: 0, marginBottom: 0 }]}><Text style={styles.itemTitle}>Cartão de Débito</Text><Switch value={true} trackColor={{ false: COLORS.border, true: '#FBE9E7' }} thumbColor={COLORS.primary} /></View>
          </View>
          <View style={styles.sectionCard}>
            <View style={styles.settingsHeader}><Smartphone color={COLORS.textMain} size={20} /><Text style={styles.sectionTitle}>Sistema e Interface</Text></View>
            <View style={styles.formGroupRow}><View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}><Bell size={16} color={COLORS.textMuted}/><Text style={styles.itemTitle}>Notificações Sonoras</Text></View><Switch value={true} trackColor={{ false: COLORS.border, true: '#FBE9E7' }} thumbColor={COLORS.primary} /></View>
            <View style={[styles.formGroupRow, { borderBottomWidth: 0, paddingBottom: 0, marginBottom: 0 }]}><View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}><Moon size={16} color={COLORS.textMuted}/><Text style={styles.itemTitle}>Modo Escuro (Dark Mode)</Text></View><Switch value={false} trackColor={{ false: COLORS.border, true: '#EBE8E2' }} thumbColor={COLORS.grayLight} /></View>
          </View>
          <View style={styles.sectionCard}>
            <View style={styles.settingsHeader}><Lock color={COLORS.textMain} size={20} /><Text style={styles.sectionTitle}>Segurança</Text></View>
            <TouchableOpacity style={styles.actionBtnOutline} onPress={() => Alert.alert('Alterar senha', 'A tela de alteração de senha será aberta na versão conectada.')}><Text style={styles.actionBtnOutlineText}>Alterar Senha de Acesso</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtnOutline, { marginTop: 12, borderColor: '#FFEBEE', backgroundColor: '#FFEBEE' }]} onPress={() => Alert.alert('Sessões encerradas', 'As outras sessões demonstrativas foram encerradas.')}><Text style={[styles.actionBtnOutlineText, { color: '#D32F2F' }]}>Encerrar Outras Sessões</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* MENU LATERAL */}
        <View style={styles.sidebar}>
          <View style={styles.sidebarHeader}>
            <View style={styles.logoRow}><View style={styles.logoIcon}><Flame color={COLORS.white} size={16} /></View><Text style={styles.logoText}>Fogo & Fumaça</Text></View>
            <View style={styles.badge}><Text style={styles.badgeText}>Administração</Text></View>
          </View>

          <ScrollView horizontal={!isLargeScreen} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={styles.menuScroll} contentContainerStyle={styles.menuContent}>
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <TouchableOpacity key={item.id} style={[styles.menuItem, isActive && styles.menuItemActive]} onPress={() => setActiveTab(item.id)}>
                  <Icon color={isActive ? COLORS.white : COLORS.textMuted} size={20} />
                  <Text style={[styles.menuItemText, isActive && styles.menuItemTextActive]}>{item.id}</Text>
                  {isLargeScreen && isActive && <ChevronRight color={COLORS.white} size={16} style={{ marginLeft: 'auto' }} />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          {isLargeScreen && (<TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace('LoginScreen')}><LogOut color={COLORS.textMain} size={20} /><Text style={styles.logoutText}>Sair do sistema</Text></TouchableOpacity>)}
        </View>

        {/* ÁREA DE CONTEÚDO */}
        <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
          {activeTab === 'Visão Geral' && renderVisaoGeral()}
          {activeTab === 'Pedidos' && renderPedidos()}
          {activeTab === 'Cardápio' && renderCardapio()}
          {activeTab === 'Categorias' && renderCategorias()}
          {activeTab === 'Mesas' && renderMesas()}
          {activeTab === 'Equipe' && renderEquipe()}
          {activeTab === 'Relatórios' && renderRelatorios()}
          {activeTab === 'Configurações' && renderConfiguracoes()}
        </ScrollView>
        <Modal visible={!!modalType} transparent animationType="slide" onRequestClose={closeForm}>
          <View style={styles.modalOverlay}><View style={styles.formModal}>
            <View style={styles.modalHeader}><Text style={styles.modalTitle}>{editingId ? 'Editar' : 'Novo'} {modalType === 'product' ? 'produto' : modalType === 'category' ? 'categoria' : modalType === 'table' ? 'mesa' : 'funcionário'}</Text><TouchableOpacity onPress={closeForm}><Text style={styles.modalClose}>×</Text></TouchableOpacity></View>
            {(modalType === 'product' || modalType === 'category' || modalType === 'staff') && <><Text style={styles.modalLabel}>Nome</Text><TextInput style={styles.modalInput} value={form.name} onChangeText={(value: string) => setForm(x => ({ ...x, name: value }))} placeholder="Digite o nome" placeholderTextColor={COLORS.textMuted}/></>}
            {modalType === 'table' && <><Text style={styles.modalLabel}>Número da mesa</Text><TextInput style={styles.modalInput} value={form.number} onChangeText={(value: string) => setForm(x => ({ ...x, number: value }))} placeholder="Ex.: 05" keyboardType="numeric" placeholderTextColor={COLORS.textMuted}/></>}
            {(modalType === 'product' || modalType === 'category') && <><Text style={styles.modalLabel}>Descrição</Text><TextInput style={styles.modalInput} value={form.description} onChangeText={(value: string) => setForm(x => ({ ...x, description: value }))} placeholder="Descrição" placeholderTextColor={COLORS.textMuted}/></>}
            {modalType === 'product' && <><Text style={styles.modalLabel}>Preço</Text><TextInput style={styles.modalInput} value={form.price} onChangeText={(value: string) => setForm(x => ({ ...x, price: value }))} placeholder="Ex.: 32,90" keyboardType="decimal-pad" placeholderTextColor={COLORS.textMuted}/></>}
            {modalType === 'staff' && <><Text style={styles.modalLabel}>Telefone</Text><TextInput style={styles.modalInput} value={form.phone} onChangeText={(value: string) => setForm(x => ({ ...x, phone: value }))} placeholder="(00) 00000-0000" keyboardType="phone-pad" placeholderTextColor={COLORS.textMuted}/><Text style={styles.modalLabel}>Cargo</Text><TextInput style={styles.modalInput} value={form.role} onChangeText={(value: string) => setForm(x => ({ ...x, role: value }))} placeholder="Cargo" placeholderTextColor={COLORS.textMuted}/></>}
            <View style={styles.modalActions}><TouchableOpacity style={styles.modalCancel} onPress={closeForm}><Text>Cancelar</Text></TouchableOpacity><TouchableOpacity style={styles.modalSave} onPress={saveForm}><Text style={styles.modalSaveText}>Salvar</Text></TouchableOpacity></View>
          </View></View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

// ==========================================
// FUNÇÃO QUE GERA OS ESTILOS DINAMICAMENTE
// ==========================================
const getStyles = (isLargeScreen: boolean) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, flexDirection: isLargeScreen ? 'row' : 'column' },
  
  sidebar: { width: isLargeScreen ? 280 : '100%', backgroundColor: COLORS.white, borderRightWidth: isLargeScreen ? 1 : 0, borderBottomWidth: isLargeScreen ? 0 : 1, borderColor: COLORS.border, paddingTop: 24, paddingBottom: isLargeScreen ? 24 : 0, justifyContent: 'space-between' },
  sidebarHeader: { paddingHorizontal: 20, marginBottom: 24, flexDirection: isLargeScreen ? 'column' : 'row', justifyContent: 'space-between', alignItems: isLargeScreen ? 'flex-start' : 'center' },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: isLargeScreen ? 12 : 0 },
  logoIcon: { backgroundColor: COLORS.primary, padding: 6, borderRadius: 6 },
  logoText: { fontSize: 18, fontWeight: '800', color: COLORS.textMain },
  badge: { borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { fontSize: 11, fontWeight: '700', color: COLORS.textMuted, textTransform: 'uppercase' },
  
  menuScroll: { flexGrow: 0 },
  menuContent: { paddingHorizontal: isLargeScreen ? 16 : 20, paddingBottom: isLargeScreen ? 20 : 16, gap: isLargeScreen ? 8 : 12 },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12 },
  menuItemActive: { backgroundColor: COLORS.primary },
  menuItemText: { fontSize: 15, fontWeight: '600', color: COLORS.textMuted },
  menuItemTextActive: { color: COLORS.white },
  logoutButton: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 16, paddingHorizontal: 32, borderTopWidth: 1, borderTopColor: COLORS.border },
  logoutText: { fontSize: 15, fontWeight: '600', color: COLORS.textMain },

  mainContent: { flex: 1, backgroundColor: COLORS.background },
  contentArea: { padding: isLargeScreen ? 40 : 20, paddingBottom: 60 },
  pageTitle: { fontSize: 28, fontWeight: 'bold', color: COLORS.textMain, letterSpacing: -0.5, marginBottom: 4 },
  pageSubtitle: { fontSize: 15, color: COLORS.textMuted, marginBottom: 32 },
  
  sectionHeaderRow: { flexDirection: isLargeScreen ? 'row' : 'column', justifyContent: 'space-between', alignItems: isLargeScreen ? 'center' : 'flex-start', marginBottom: 24, gap: 16 },
  actionBtnPrimary: { backgroundColor: COLORS.primary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12 },
  actionBtnPrimaryText: { color: COLORS.white, fontSize: 14, fontWeight: 'bold' },
  actionBtnOutline: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, justifyContent: 'center' },
  actionBtnOutlineText: { fontSize: 14, fontWeight: '600', color: COLORS.textMain },
  
  // Grid
  splitGrid: { flexDirection: isLargeScreen ? 'row' : 'column', gap: 24 },
  sectionCard: { flex: 1, backgroundColor: COLORS.white, borderRadius: 16, padding: 24, borderWidth: 1, borderColor: '#EFECE7' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textMain },
  linkText: { fontSize: 14, fontWeight: '600', color: COLORS.primary },
  
  // Dashboard / KPIs
  kpiGrid: { flexDirection: isLargeScreen ? 'row' : 'column', gap: 16, marginBottom: 32 },
  kpiCard: { flex: 1, backgroundColor: COLORS.white, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#EFECE7' },
  kpiHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  kpiLabel: { fontSize: 14, fontWeight: '600', color: COLORS.textMuted },
  iconBox: { backgroundColor: COLORS.grayLight, padding: 8, borderRadius: 8 },
  kpiRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  kpiValue: { fontSize: 28, fontWeight: 'bold', color: COLORS.textMain, letterSpacing: -0.5 },
  kpiBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.successLight, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, gap: 4 },
  kpiBadgeText: { color: COLORS.success, fontSize: 12, fontWeight: 'bold' },

  // Listas Gerais
  listContainer: { gap: 12 },
  listItemBase: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: '#EFECE7', borderRadius: 12, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  listItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: COLORS.grayLight },
  listInfo: { flex: 1 },
  listActions: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  noBorder: { borderBottomWidth: 0, paddingBottom: 0 },
  itemTitle: { fontSize: 15, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 4 },
  itemSub: { fontSize: 13, color: COLORS.textMuted },
  itemValue: { fontSize: 15, fontWeight: 'bold', color: COLORS.textMain },
  iconButton: { padding: 8, backgroundColor: COLORS.grayLight, borderRadius: 8 },
  
  // Buscas e Filtros
  searchFilterRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, paddingHorizontal: 12 },
  searchInput: { flex: 1, paddingVertical: 12, paddingHorizontal: 8, fontSize: 14, color: COLORS.textMain },
  filterButton: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12 },
  filterButtonText: { fontSize: 14, fontWeight: '600', color: COLORS.textMain },
  statusTabsWrapper: { marginBottom: 24, borderBottomWidth: 1, borderBottomColor: COLORS.grayLight, paddingBottom: 12 },
  statusTabsContainer: { gap: 8 },
  statusPill: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, flexDirection: 'row', alignItems: 'center' },
  statusPillActive: { backgroundColor: COLORS.dark, borderColor: COLORS.dark },
  statusPillText: { fontSize: 13, fontWeight: '600', color: COLORS.textMuted },
  statusPillTextActive: { color: COLORS.white },

  // Pedidos 
  orderAdminCard: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: '#EFECE7', borderRadius: 12, padding: 16 },
  orderAdminHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: COLORS.grayLight },
  orderAdminIdBox: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  orderAdminId: { fontSize: 16, fontWeight: '900', color: COLORS.textMain },
  orderAdminBody: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  orderAdminCustomer: { fontSize: 15, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 4 },
  orderAdminItems: { fontSize: 13, color: COLORS.textMuted, lineHeight: 18 },
  orderAdminTotal: { fontSize: 16, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 4 },
  orderAdminTime: { fontSize: 12, color: COLORS.textMuted, fontWeight: '500' },
  orderAdminFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTopWidth: 1, borderTopColor: COLORS.grayLight },
  orderAdminFooterRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  cancelButton: { padding: 4 },
  orderInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  orderAvatar: { width: 40, height: 40, borderRadius: 8, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  orderAvatarText: { fontSize: 13, fontWeight: 'bold', color: COLORS.textMain },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, backgroundColor: '#FFF9C4' },
  statusBadgeText: { fontSize: 12, fontWeight: 'bold', color: '#F57F17' },
  statusBadgeSuccess: { backgroundColor: COLORS.successLight },
  statusBadgeTextSuccess: { color: COLORS.success },

  // Cardápio & Categorias
  menuItemCard: { flexDirection: isLargeScreen ? 'row' : 'column', backgroundColor: COLORS.white, borderWidth: 1, borderColor: '#EFECE7', borderRadius: 16, padding: 16, gap: 16 },
  menuItemCardInactive: { opacity: 0.6, backgroundColor: '#FAFAFA' },
  menuItemImagePlaceholder: { width: isLargeScreen ? 80 : '100%', height: 80, backgroundColor: COLORS.grayLight, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  menuItemInfo: { flex: 1, justifyContent: 'space-between' },
  menuItemTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  highlightBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FFF9C4', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  highlightBadgeText: { fontSize: 10, fontWeight: 'bold', color: '#F57F17', textTransform: 'uppercase' },
  menuItemDesc: { fontSize: 13, color: COLORS.textMuted, lineHeight: 18, marginBottom: 8 },
  menuItemFooter: { flexDirection: 'row', gap: 16, alignItems: 'center' },
  menuItemActions: { flexDirection: isLargeScreen ? 'row' : 'row-reverse', alignItems: 'center', justifyContent: 'space-between', gap: 16, borderTopWidth: isLargeScreen ? 0 : 1, borderTopColor: COLORS.grayLight, paddingTop: isLargeScreen ? 0 : 12 },
  switchWrapper: { alignItems: isLargeScreen ? 'center' : 'flex-start', gap: 4 },
  switchLabel: { fontSize: 11, fontWeight: '600', color: COLORS.textMuted },
  actionButtonsCol: { flexDirection: 'row', gap: 8 },
  countBadge: { backgroundColor: COLORS.grayLight, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  countBadgeText: { fontSize: 11, fontWeight: 'bold', color: COLORS.textMuted },

  // Mesas
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  gridCard: { width: isLargeScreen ? '31%' : '100%', backgroundColor: COLORS.white, borderWidth: 1, borderColor: '#EFECE7', borderRadius: 12, padding: 16 },
  gridCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  gridCardTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textMain },
  secondaryButton: { marginTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12, backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.border, borderRadius: 8 },
  secondaryButtonText: { fontSize: 13, fontWeight: '600', color: COLORS.textMain },
  tableBody: { minHeight: 120, justifyContent: 'center', marginBottom: 16 },
  tableEmptyState: { alignItems: 'center', justifyContent: 'center', gap: 8 },
  tableEmptyText: { fontSize: 13, color: COLORS.textMuted, fontWeight: '500' },
  tableWaiterRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  tableWaiterText: { fontSize: 13, color: COLORS.textMuted },
  tableConsumptionBox: { backgroundColor: '#F9F9F9', padding: 12, borderRadius: 8, gap: 4, marginBottom: 12, borderWidth: 1, borderColor: '#F0F0F0' },
  tableItemText: { fontSize: 13, color: COLORS.textMuted },
  tableTotalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tableTotalLabel: { fontSize: 14, fontWeight: '600', color: COLORS.textMain },
  tableTotalValue: { fontSize: 18, fontWeight: 'bold', color: COLORS.textMain },
  tableFooter: { borderTopWidth: 1, borderTopColor: COLORS.grayLight, paddingTop: 16 },
  tableActionRow: { flexDirection: 'row', gap: 8 },

  // Equipe
  staffCard: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: '#EFECE7', borderRadius: 12, padding: 16 },
  staffHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  staffNameRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  staffAvatar: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  staffAvatarText: { fontSize: 18, fontWeight: 'bold' },
  staffDetailsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: COLORS.grayLight },
  staffDetailItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  staffDetailText: { fontSize: 13, color: COLORS.textMuted },
  staffPermissionsBox: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#FAFAFA', padding: 12, borderRadius: 8, marginBottom: 16, borderWidth: 1, borderColor: '#F0F0F0' },
  staffPermissionsText: { flex: 1, fontSize: 12, color: COLORS.textMuted, lineHeight: 16 },
  staffActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  roleBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  roleBadgeText: { fontSize: 12, fontWeight: 'bold' },

  // Relatórios
  reportHighlightBox: { backgroundColor: COLORS.dark, padding: 20, borderRadius: 12, marginTop: 8 },
  reportHighlightLabel: { color: COLORS.grayLight, fontSize: 14, marginBottom: 8 },
  reportHighlightValue: { color: COLORS.white, fontSize: 32, fontWeight: 'bold' },
  reportStatBox: { flex: 1, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, padding: 16 },
  reportListItem: { marginBottom: 20 },
  reportListHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  reportListSub: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  progressBarBg: { height: 8, backgroundColor: COLORS.grayLight, borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 4 },
  alertBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FFEBEE', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  alertBadgeText: { fontSize: 10, fontWeight: 'bold', color: '#C62828' },
  chartBarContainer: { marginTop: 12 },
  multiBarWrapper: { flexDirection: 'row', height: 16, borderRadius: 8, overflow: 'hidden', marginBottom: 12 },
  multiBarSegment: { height: '100%' },
  multiBarLegend: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  legendText: { flexDirection: 'row', alignItems: 'center', fontSize: 12, color: COLORS.textMuted },
  legendDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },

  // Configurações
  settingsHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: COLORS.grayLight },
  formGroupRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: COLORS.grayLight, marginBottom: 16 },
  inputLabel: { fontSize: 13, fontWeight: '600', color: COLORS.textMuted, marginBottom: 8 },
  input: { backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 14, fontSize: 15, color: COLORS.textMain, marginBottom: 20 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', padding: 20 },
  formModal: { backgroundColor: COLORS.white, borderRadius: 20, padding: 22, maxWidth: 520, width: '100%', alignSelf: 'center' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  modalTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textMain }, modalClose: { fontSize: 28, color: COLORS.textMuted },
  modalLabel: { fontSize: 12, fontWeight: '700', color: COLORS.textMain, marginBottom: 6, marginTop: 8 },
  modalInput: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 12, color: COLORS.textMain, fontSize: 15 },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 22 },
  modalCancel: { borderWidth: 1, borderColor: COLORS.border, paddingVertical: 12, paddingHorizontal: 18, borderRadius: 8 },
  modalSave: { backgroundColor: COLORS.primary, paddingVertical: 12, paddingHorizontal: 22, borderRadius: 8 }, modalSaveText: { color: COLORS.white, fontWeight: '800' }
});
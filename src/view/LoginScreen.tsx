import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Flame, X } from 'lucide-react-native';
import { useAuth } from '../controller/AuthController';

const COLORS = {
  darkBg: '#121418',     // Fundo escuro atrás do modal
  cardBg: '#F7F4F0',     // Fundo creme do formulário
  primary: '#C84325',    // Laranja/Vermelho
  grayLight: '#EBE8E2',  // Fundo das caixas e botão X
  border: '#D1CEC7',     // Bordas dos inputs
  textMain: '#1A1A1A',
  textMuted: '#7A7571',
};

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha o e-mail e a senha.');
      return;
    }

    setIsLoading(true);
    try {
      const loggedUser = await login(email, password);
      
      // Rotas baseadas no nível de acesso
      if (loggedUser.role === 'ADMIN') {
        navigation.replace('AdminDashboard');
      } else if (loggedUser.role === 'KITCHEN') {
        navigation.replace('KitchenDisplay');
      } else {
        navigation.replace('Home');
      }
    } catch (error) {
      Alert.alert('Falha no Login', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.card}>
          
          {/* Cabeçalho */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logoIcon}>
                <Flame color="#FFF" size={16} />
              </View>
              <Text style={styles.logoText}>Fogo & Fumaça</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
              <X color={COLORS.textMain} size={18} />
            </TouchableOpacity>
          </View>

          {/* Títulos e Badge */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Acesso demonstrativo</Text>
          </View>
          <Text style={styles.title}>Entrar na sua conta</Text>
          <Text style={styles.subtitle}>Use uma das contas de demonstração abaixo.</Text>

          {/* Caixa de Demonstração */}
          <View style={styles.demoBox}>
            <Text style={styles.demoText}><Text style={styles.bold}>Cliente:</Text> lucas@gmail.com</Text>
            <Text style={styles.demoText}><Text style={styles.bold}>Atendente:</Text> joao@gmail.com</Text>
            <Text style={styles.demoText}><Text style={styles.bold}>Cozinha:</Text> augusto@gmail.com</Text>
            <Text style={styles.demoText}><Text style={styles.bold}>Senha para todos:</Text> 123456</Text>
          </View>

          {/* Formulário */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="voce@email.com"
              placeholderTextColor={COLORS.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Sua senha"
              placeholderTextColor={COLORS.textMuted}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Botão Principal */}
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.primaryButtonText}>Entrar</Text>
            )}
          </TouchableOpacity>

          {/* Links de Rodapé */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Ainda não tem uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.replace('Register')}>
              <Text style={styles.footerLink}>Criar conta</Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.darkBg },
  keyboardView: { flex: 1, justifyContent: 'center', padding: 20 },
  card: { backgroundColor: COLORS.cardBg, borderRadius: 24, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  logoContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoIcon: { backgroundColor: COLORS.primary, padding: 6, borderRadius: 8 },
  logoText: { fontSize: 16, fontWeight: '700', color: COLORS.textMain },
  closeButton: { width: 32, height: 32, backgroundColor: COLORS.grayLight, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  badge: { alignSelf: 'flex-start', borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginBottom: 12 },
  badgeText: { color: COLORS.textMain, fontSize: 11, fontWeight: '600' },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 8 },
  subtitle: { fontSize: 14, color: COLORS.textMuted, marginBottom: 20 },
  demoBox: { backgroundColor: COLORS.grayLight, padding: 16, borderRadius: 12, marginBottom: 24 },
  demoText: { fontSize: 13, color: COLORS.textMuted, marginBottom: 4 },
  bold: { fontWeight: '700', color: COLORS.textMain },
  formGroup: { marginBottom: 16 },
  label: { fontSize: 12, fontWeight: '600', color: COLORS.textMain, marginBottom: 6 },
  input: { backgroundColor: 'transparent', borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 14, fontSize: 15, color: COLORS.textMain },
  primaryButton: { backgroundColor: COLORS.primary, padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  primaryButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  forgotPassword: { alignSelf: 'center', marginTop: 16, borderBottomWidth: 1, borderBottomColor: COLORS.primary },
  forgotPasswordText: { color: COLORS.primary, fontSize: 14, fontWeight: '500' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  footerText: { color: COLORS.textMuted, fontSize: 14 },
  footerLink: { color: COLORS.primary, fontSize: 14, fontWeight: '700' },
});
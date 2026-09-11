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
  ScrollView,
} from 'react-native';
import { Flame, X } from 'lucide-react-native';

const COLORS = {
  darkBg: '#121418',
  cardBg: '#F7F4F0',
  primary: '#C84325',
  grayLight: '#EBE8E2',
  border: '#D1CEC7',
  textMain: '#1A1A1A',
  textMuted: '#7A7571',
};

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    nome: '', email: '', senha: '', cep: '', cidade: '', bairro: '', rua: '', numero: '', complemento: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
            <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('Home')}>
              <X color={COLORS.textMain} size={18} />
            </TouchableOpacity>
          </View>

          {/* O formulário de registro é longo, precisa de ScrollView interno */}
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Demonstração</Text>
            </View>
            <Text style={styles.title}>Criar sua conta</Text>
            <Text style={styles.subtitle}>Cadastre seus dados para pedidos mais rápidos.</Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Nome completo</Text>
              <TextInput style={styles.input} placeholder="Seu nome" placeholderTextColor={COLORS.textMuted} onChangeText={t => handleChange('nome', t)} />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput style={styles.input} placeholder="voce@email.com" placeholderTextColor={COLORS.textMuted} keyboardType="email-address" autoCapitalize="none" onChangeText={t => handleChange('email', t)} />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Senha</Text>
              <TextInput style={styles.input} placeholder="Sua senha" placeholderTextColor={COLORS.textMuted} secureTextEntry onChangeText={t => handleChange('senha', t)} />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>CEP</Text>
              <TextInput style={styles.input} placeholder="00000-000" placeholderTextColor={COLORS.textMuted} keyboardType="numeric" maxLength={9} onChangeText={t => handleChange('cep', t)} />
            </View>

            <View style={styles.row}>
              <View style={[styles.formGroup, { flex: 1, marginRight: 12 }]}>
                <Text style={styles.label}>Cidade</Text>
                <TextInput style={styles.input} placeholder="Sua cidade" placeholderTextColor={COLORS.textMuted} onChangeText={t => handleChange('cidade', t)} />
              </View>
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.label}>Bairro</Text>
                <TextInput style={styles.input} placeholder="Seu bairro" placeholderTextColor={COLORS.textMuted} onChangeText={t => handleChange('bairro', t)} />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Rua</Text>
              <TextInput style={styles.input} placeholder="Rua e número" placeholderTextColor={COLORS.textMuted} onChangeText={t => handleChange('rua', t)} />
            </View>

            <View style={styles.row}>
              <View style={[styles.formGroup, { flex: 1, marginRight: 12 }]}>
                <Text style={styles.label}>Número</Text>
                <TextInput style={styles.input} placeholder="123" placeholderTextColor={COLORS.textMuted} keyboardType="numeric" onChangeText={t => handleChange('numero', t)} />
              </View>
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.label}>Complemento</Text>
                <TextInput style={styles.input} placeholder="Apto, bloco..." placeholderTextColor={COLORS.textMuted} onChangeText={t => handleChange('complemento', t)} />
              </View>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={() => console.log('Cadastrar', formData)}>
              <Text style={styles.primaryButtonText}>Criar conta</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Já tem uma conta? </Text>
              <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
                <Text style={styles.footerLink}>Entrar</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.darkBg },
  keyboardView: { flex: 1, justifyContent: 'center', padding: 20 },
  card: { backgroundColor: COLORS.cardBg, borderRadius: 24, maxHeight: '90%', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24, paddingBottom: 16 },
  logoContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoIcon: { backgroundColor: COLORS.primary, padding: 6, borderRadius: 8 },
  logoText: { fontSize: 16, fontWeight: '700', color: COLORS.textMain },
  closeButton: { width: 32, height: 32, backgroundColor: COLORS.grayLight, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 24 },
  badge: { alignSelf: 'flex-start', borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginBottom: 12 },
  badgeText: { color: COLORS.textMain, fontSize: 11, fontWeight: '600' },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.textMain, marginBottom: 8 },
  subtitle: { fontSize: 14, color: COLORS.textMuted, marginBottom: 24 },
  formGroup: { marginBottom: 16 },
  row: { flexDirection: 'row' },
  label: { fontSize: 12, fontWeight: '600', color: COLORS.textMain, marginBottom: 6 },
  input: { backgroundColor: 'transparent', borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 14, fontSize: 15, color: COLORS.textMain },
  primaryButton: { backgroundColor: COLORS.primary, padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  primaryButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { color: COLORS.textMuted, fontSize: 14 },
  footerLink: { color: COLORS.primary, fontSize: 14, fontWeight: '700' },
});
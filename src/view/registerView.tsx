import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  Flame,
  X,
  User,
  Mail,
  LockKeyhole,
  MapPin,
  Building,
  Home,
  Hash,
  FileText,
  UserCheck,
  LogIn,
  Compass,
} from 'lucide-react-native';

import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'registerView'>;

export default function RegisterScreen({ navigation }: Props) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    cep: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
    complemento: '',
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = (e?: any) => {
    if (e && e.preventDefault) e.preventDefault();
    console.log('Dados cadastrados:', formData);
  };

  const handleGoToLogin = (e?: any) => {
    if (e && e.preventDefault) e.preventDefault();
    navigation.replace('loginView');
  };

  const handleGuestAccess = (e?: any) => {
    if (e && e.preventDefault) e.preventDefault();
    navigation.navigate('homeView');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          
          <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.topRow}>
                <View style={styles.iconContainer}>
                  <Flame size={32} color="#6344FF" />
                </View>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={(e) => {
                    if (e && e.preventDefault) e.preventDefault();
                    navigation.navigate('homeView');
                  }}>
                  <X size={20} color="#71717a" />
                </TouchableOpacity>
              </View>

              <Text style={styles.title}>Criar sua conta</Text>
              <Text style={styles.subtitle}>
                Cadastre seus dados para realizar pedidos com mais facilidade.
              </Text>
            </View>

            {/* Formulário */}
            <View style={styles.formGroup}>
              {/* Nome completo */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nome completo</Text>
                <View style={styles.inputWrapper}>
                  <User size={20} color="#71717a" style={styles.fieldIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Digite seu nome"
                    placeholderTextColor="#a1a1aa"
                    onChangeText={(t) => handleChange('nome', t)}
                  />
                </View>
              </View>

              {/* E-mail */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>E-mail</Text>
                <View style={styles.inputWrapper}>
                  <Mail size={20} color="#71717a" style={styles.fieldIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="voce@email.com"
                    placeholderTextColor="#a1a1aa"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={(t) => handleChange('email', t)}
                  />
                </View>
              </View>

              {/* Senha */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Senha</Text>
                <View style={styles.inputWrapper}>
                  <LockKeyhole size={20} color="#71717a" style={styles.fieldIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Crie uma senha"
                    placeholderTextColor="#a1a1aa"
                    secureTextEntry
                    onChangeText={(t) => handleChange('senha', t)}
                  />
                </View>
              </View>

              {/* CEP */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>CEP</Text>
                <View style={styles.inputWrapper}>
                  <MapPin size={20} color="#71717a" style={styles.fieldIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="00000-000"
                    placeholderTextColor="#a1a1aa"
                    keyboardType="numeric"
                    maxLength={9}
                    onChangeText={(t) => handleChange('cep', t)}
                  />
                </View>
              </View>

              {/* Cidade e Bairro */}
              <View style={styles.row}>
                <View style={[styles.inputContainer, { flex: 1 }]}>
                  <Text style={styles.label}>Cidade</Text>
                  <View style={styles.inputWrapper}>
                    <Building size={18} color="#71717a" style={styles.fieldIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Sua cidade"
                      placeholderTextColor="#a1a1aa"
                      onChangeText={(t) => handleChange('cidade', t)}
                    />
                  </View>
                </View>

                <View style={[styles.inputContainer, { flex: 1 }]}>
                  <Text style={styles.label}>Bairro</Text>
                  <View style={styles.inputWrapper}>
                    <Home size={18} color="#71717a" style={styles.fieldIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Seu bairro"
                      placeholderTextColor="#a1a1aa"
                      onChangeText={(t) => handleChange('bairro', t)}
                    />
                  </View>
                </View>
              </View>

              {/* Rua */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Rua</Text>
                <View style={styles.inputWrapper}>
                  <Home size={20} color="#71717a" style={styles.fieldIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Nome da sua rua"
                    placeholderTextColor="#a1a1aa"
                    onChangeText={(t) => handleChange('rua', t)}
                  />
                </View>
              </View>

              {/* Número e Complemento */}
              <View style={styles.row}>
                <View style={[styles.inputContainer, { flex: 1 }]}>
                  <Text style={styles.label}>Número</Text>
                  <View style={styles.inputWrapper}>
                    <Hash size={18} color="#71717a" style={styles.fieldIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="123"
                      placeholderTextColor="#a1a1aa"
                      keyboardType="numeric"
                      onChangeText={(t) => handleChange('numero', t)}
                    />
                  </View>
                </View>

                <View style={[styles.inputContainer, { flex: 1 }]}>
                  <Text style={styles.label}>Complemento</Text>
                  <View style={styles.inputWrapper}>
                    <FileText size={18} color="#71717a" style={styles.fieldIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Apto, bloco..."
                      placeholderTextColor="#a1a1aa"
                      onChangeText={(t) => handleChange('complemento', t)}
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* Ações (Mesmo modelo da tela de login) */}
            <View style={styles.actions}>
              {/* 1. Concluir cadastro */}
              <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
                <UserCheck size={20} color="#ffffff" style={styles.buttonIcon} />
                <Text style={styles.primaryButtonText}>Concluir cadastro</Text>
              </TouchableOpacity>

              {/* 2. Efetuar login */}
              <TouchableOpacity style={styles.outlineButton} onPress={handleGoToLogin}>
                <LogIn size={20} color="#6344FF" style={styles.buttonIcon} />
                <Text style={styles.outlineButtonText}>Efetuar login</Text>
              </TouchableOpacity>

              {/* 3. Continuar sem conta */}
              <TouchableOpacity style={styles.ghostButton} onPress={handleGuestAccess}>
                <Compass size={20} color="#6344FF" style={styles.buttonIcon} />
                <Text style={styles.ghostButtonText}>Continuar sem conta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  header: {
    marginBottom: 24,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    height: 64,
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#EEECFF',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F4F4F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#09090b',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#71717a',
    lineHeight: 20,
  },
  formGroup: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  inputContainer: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#09090b',
  },
  inputWrapper: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
  },
  fieldIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#09090b',
  },
  actions: {
    marginTop: 28,
    gap: 12,
  },
  buttonIcon: {
    marginRight: 8,
  },
  primaryButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#6344FF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  outlineButton: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D2C9FF',
    backgroundColor: '#F8F7FF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineButtonText: {
    color: '#6344FF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  ghostButton: {
    height: 48,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ghostButtonText: {
    color: '#6344FF',
    fontWeight: '600',
    fontSize: 15,
  },
});